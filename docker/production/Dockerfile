# Image de production — apps/web (MODULE 16.1, PHASE 7).
# Patron multi-stage standard Turborepo (turbo prune --docker) + sortie
# `output: 'standalone'` de Next.js (next.config.ts) pour une image finale
# minimale (pas de node_modules complet, pas de code source des autres apps).
# Contexte de build : la racine du monorepo (voir docker-compose.prod.yml).

FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN npm install -g turbo@2.3.3

# --- Étape 1 : élagage du monorepo au seul scope @portfolio/web ---
FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune @portfolio/web --docker

# --- Étape 2 : installation des dépendances élaguées + build ---
FROM base AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .
# `turbo prune` n'élague que les workspaces déclarés (apps/*, packages/*) :
# deux fichiers hors de ce périmètre sont lus au build et manquent sinon —
# tsconfig.base.json (apps/web/tsconfig.json l'`extends`) et content/ (lu
# statiquement par apps/web/src/lib/content.ts).
COPY --from=pruner /app/tsconfig.base.json ./tsconfig.base.json
COPY --from=pruner /app/content ./content

# DOCKER_BUILD active `output: 'standalone'` (apps/web/next.config.ts) : pas
# le comportement par défaut, pour ne pas casser `pnpm build` hors conteneur
# (échoue par EPERM sous Windows sans mode développeur — copie tracée des
# node_modules par liens symboliques).
ENV DOCKER_BUILD=true
RUN turbo run build --filter=@portfolio/web

# --- Étape 3 : exécution — image finale minimale, utilisateur non-root ---
FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
EXPOSE 3000

CMD ["node", "apps/web/server.js"]
