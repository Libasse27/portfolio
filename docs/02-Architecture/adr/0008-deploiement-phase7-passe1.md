# ADR 0008 — Déploiement & monitoring (Phase 7, passe 1)

**Statut** : Acceptée
**Date** : 2026-08-07

## Contexte

MODULE 16.1 impose Vercel (hébergement), Docker (dev/prod), GitHub Actions
(CI/CD) et un trio de monitoring (Sentry, Plausible/Umami, Better Stack).
Comme pour le contenu (Phase 3, règle 0.2.2), ces briques dépendent
d'identifiants et de comptes externes réels qu'il ne faut pas inventer :
cette passe pose le scaffolding qui ne dépend d'aucun compte (Docker, en-
têtes de sécurité, workflow de déploiement gardé jusqu'à l'arrivée de vrais
secrets), et documente précisément ce qui reste bloqué et pourquoi
(docs/14-Deployment, docs/12-DevOps, docs/11-Analytics).

## Décisions

1. **`output: 'standalone'` gardé par `DOCKER_BUILD=true`, pas activé par
   défaut.** Next.js copie les `node_modules` tracés dans `.next/
standalone` via des liens symboliques ; sous Windows sans mode
   développeur, cette copie échoue (`EPERM`). Comme le poste de
   développement du projet est Windows, activer `standalone`
   inconditionnellement aurait cassé `pnpm build` en local (CI reste sur
   `ubuntu-latest`, non affectée). `docker/production/Dockerfile` pose
   `ENV DOCKER_BUILD=true` avant `turbo run build`, seul endroit où le mode
   est nécessaire. La clé est absente de l'objet de config plutôt que
   posée à `undefined` : `tsconfig.base.json` a `exactOptionalPropertyTypes:
true`, qui interdit d'assigner explicitement `undefined` à une propriété
   typée `"standalone" | "export"` (sans `| undefined`) — la construction
   passe donc par un spread conditionnel (`...(condition ? { output: ... }
: {})`).

2. **CSP par hash pour `ThemeScript`, pas par nonce.** Le script anti-flash
   inline (`src/components/ThemeScript.tsx`, voir ADR 0002) est statique et
   déterministe (aucune entrée utilisateur) : `next.config.ts` calcule son
   SHA-256 au chargement de la config et l'ajoute à `script-src` comme
   `'sha256-…'`. Alternative écartée : un nonce par requête, le patron
   Next.js le plus courant, mais qui force `dynamic = 'force-dynamic'` sur
   les pages le consommant — incompatible avec le rendu statique (SSG)
   actuel de `/[locale]` (ADR 0004). `style-src` garde `'unsafe-inline'` :
   Framer Motion anime via l'attribut `style` posé par JS (transform/
   opacity), qu'une CSP stricte ne peut pas cibler finement sans casser les
   animations existantes (SectionReveal, AnimatedCounters, VennDiagram) ;
   risque jugé acceptable (contrairement à `script-src 'unsafe-inline'`,
   une CSS injectée ne peut pas exécuter de JS).
   Le JSON-LD (`StructuredData.tsx`) n'a pas besoin d'entrée dans
   `script-src` : un `<script type="application/ld+json">` est exempté par
   la spec CSP (ce n'est pas un script exécutable).
   `connect-src`/`script-src` resteront à `'self'` tant qu'aucun analytics
   ni Sentry n'est câblé (docs/11-Analytics, docs/12-DevOps) — à rouvrir
   au(x) domaine(s) réel(s) à ce moment-là, pas avant.

3. **Image Docker de prod : patron multi-stage Turborepo standard**
   (`turbo prune --docker` → install → build → runner minimal, utilisateur
   non-root `nextjs`). Choix du patron documenté par Vercel/Turborepo
   lui-même pour ce cas précis (monorepo pnpm + Next.js) plutôt qu'une
   image ad hoc.

4. **`deploy.yml` : garde par `env.VERCEL_TOKEN != ''`, pas par un `if` de
   job sur `secrets`.** Le contexte `secrets` n'est disponible dans aucune
   condition `if` (job ou étape) — seul `env` l'est au niveau d'une étape.
   Le token est donc exposé en `env` de job (source `secrets.VERCEL_TOKEN`,
   ce qui est le mécanisme normal pour l'y injecter) puis chaque étape porte
   `if: env.VERCEL_TOKEN != ''`. Résultat : le job se termine vert sans
   rien exécuter tant que le secret n'existe pas, plutôt que d'échouer en
   rouge à chaque merge sur `master`.

5. **Déclenchement par `workflow_run` sur `CI`, pas par `push` direct.**
   Ne déploie que ce qui a déjà passé lint/types/tests/build/Lighthouse ;
   `github.event.workflow_run.head_sha` garantit de déployer exactement le
   commit qui a été validé (pas `HEAD` de `master` au moment du
   déclenchement, qui pourrait déjà avoir avancé).

6. **CLI Vercel officiel dans le workflow, pas une action tierce.** Alternative
   écartée : des actions communautaires (ex. `amondnet/vercel-action`)
   existent et sont plus concises, mais introduisent une dépendance
   supplémentaire à faire confiance pour manipuler un token de déploiement
   de production. Le flux `vercel pull` / `vercel build` / `vercel deploy
--prebuilt`, documenté officiellement par Vercel pour GitHub Actions,
   n'ajoute qu'une dépendance (le CLI Vercel lui-même, déjà nécessaire à
   toute intégration Vercel).

## Non traité cette passe (hors périmètre)

- Comptes Vercel, Sentry, Plausible/Umami, Better Stack — aucun créé,
  documenté comme bloquant dans docs/14-Deployment, docs/12-DevOps,
  docs/11-Analytics.
- TLS sur la voie Docker auto-hébergée (pas de domaine ni de certificat
  réels — `docker/nginx/nginx.conf`).
- Alternative « intégration Git native Vercel » (déploiement automatique
  sans passer par `deploy.yml`) — documentée comme option valable dans
  docs/14-Deployment, non retenue par défaut pour garder le succès de la CI
  comme condition explicite de déploiement.

## Conséquences

- Toute nouvelle destination réseau (analytics, Sentry, polices externes…)
  doit être ajoutée explicitement à la CSP (`next.config.ts`) — silencieuse
  sinon (bloquée par défaut).
- Tout nouveau script inline statique doit être ajouté à `script-src` par
  hash (voir le calcul pour `ThemeScript`), pas par un assouplissement
  global de la politique.
- Le Dockerfile de prod est le seul endroit qui doit poser
  `DOCKER_BUILD=true` ; l'ajouter ailleurs (ex. script `pnpm build` local)
  romprait `pnpm build` sous Windows.
