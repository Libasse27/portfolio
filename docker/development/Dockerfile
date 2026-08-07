# Image de développement — apps/web (MODULE 16.1, PHASE 7).
# Hot reload via bind mount (voir docker/compose/docker-compose.dev.yml) :
# cette image ne sert que de runtime pnpm/Node, le code source vient du volume.
FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

# Manifests copiés séparément du reste du code pour mettre en cache
# `pnpm install` tant que les dépendances ne changent pas (les 6 packages
# du monorepo qui ont un package.json réel — le reste est en squelette
# .gitkeep, voir README).
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/eslint-config/package.json packages/eslint-config/package.json
COPY packages/i18n/package.json packages/i18n/package.json
COPY packages/ui/package.json packages/ui/package.json
COPY packages/utils/package.json packages/utils/package.json
COPY packages/validations/package.json packages/validations/package.json

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["pnpm", "--filter", "@portfolio/web", "dev"]
