# DevOps — PHASE 7 (passe 1)

## Docker

Deux images pour `apps/web` (MODULE 16.1) :

| Image                           | Usage                                         | Fichier                   |
| ------------------------------- | --------------------------------------------- | ------------------------- |
| `docker/development/Dockerfile` | Dev conteneurisé, hot reload par bind mount   | `docker-compose.dev.yml`  |
| `docker/production/Dockerfile`  | Image de prod minimale (Next.js `standalone`) | `docker-compose.prod.yml` |

```bash
# Dev — depuis la racine du monorepo
docker compose -f docker/compose/docker-compose.dev.yml up

# Prod (voie auto-hébergée, alternative à Vercel — docs/14-Deployment)
docker compose -f docker/compose/docker-compose.prod.yml up --build -d
```

L'image de prod suit le patron multi-stage standard Turborepo (`turbo prune
@portfolio/web --docker`) : le contexte de build élagué au seul scope
`@portfolio/web` garde l'image finale petite (pas de code des packages
inutilisés, pas de `node_modules` complet).

### `DOCKER_BUILD` et `output: 'standalone'`

`apps/web/next.config.ts` n'active `output: 'standalone'` que si la
variable d'environnement `DOCKER_BUILD=true` est posée (le Dockerfile de
prod la pose avant `turbo run build`). Volontairement pas activé par
défaut : la génération de cette sortie copie les `node_modules` tracés par
liens symboliques, ce qui échoue (`EPERM`) sous Windows sans mode
développeur activé — ça aurait cassé `pnpm build` en local pour un mode
dont seule l'image Docker a besoin. Détails : ADR 0008.

## CI/CD

- `.github/workflows/ci.yml` — lint, types, tests, build, Lighthouse CI sur
  chaque push/PR vers `master`.
- `.github/workflows/deploy.yml` — se déclenche après un `CI` réussi sur
  `master`, déploie sur Vercel. Inactif tant que les secrets Vercel ne sont
  pas posés (docs/14-Deployment/README.md).

## Monitoring — statut

MODULE 16.1 prévoit Sentry (erreurs) et Better Stack (disponibilité). Ni
l'un ni l'autre n'est câblé : les deux demandent un compte et des
identifiants réels que je ne dois pas inventer (même règle que le contenu
Phase 3 et les identifiants de déploiement — ADR 0008). L'analytics visiteur
(Plausible/Umami) est traité séparément, voir `docs/11-Analytics/README.md`.

Prochaine étape pour débloquer : créer les comptes Sentry et Better Stack,
fournir le DSN Sentry et l'URL de monitor Better Stack ; intégration côté
code (`@sentry/nextjs`, endpoint de heartbeat) à faire dans une passe
dédiée une fois ces identifiants disponibles — pas de SDK à moitié câblé
sans destination réelle.
