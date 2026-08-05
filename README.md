# Portfolio Enterprise

Portfolio professionnel tri-expertise — Développement Full-Stack, Comptabilité
& Gestion Financière (SYSCOHADA/OHADA), Infrastructure & Télécoms.

Piloté par le master prompt : [`docs/00-MasterPrompt/MasterPrompt.md`](./docs/00-MasterPrompt/MasterPrompt.md).

## État du projet

- **PHASE 0 — Vision & Cadrage** : en attente (voir `docs/01-Business`).
- **PHASE 2 — Architecture & Fondations** : initialisée (ce dépôt).
- Le contenu affiché (`apps/web`) est volontairement placeholder
  (`[À COMPLÉTER]`) tant que la PHASE 0 n'est pas validée — voir
  `docs/02-Architecture/adr/0001-initialisation-monorepo.md`.

## Prérequis

- Node.js ≥ 20 (voir `.nvmrc`)
- pnpm ≥ 9 (`npm install -g pnpm` si nécessaire)

## Démarrage (< 5 minutes)

```bash
pnpm install
pnpm dev
```

L'application `web` démarre sur http://localhost:3000.

## Commandes utiles

| Commande          | Effet                                        |
| ----------------- | -------------------------------------------- |
| `pnpm dev`        | Lance toutes les apps en mode développement  |
| `pnpm build`      | Build de production (tous les packages/apps) |
| `pnpm lint`       | ESLint sur tout le monorepo                  |
| `pnpm type-check` | Vérification TypeScript stricte              |
| `pnpm test`       | Tests unitaires (Vitest) avec couverture     |
| `pnpm format`     | Formatage Prettier                           |

## Structure

```
apps/web/           Portfolio public (Next.js 15, App Router)
packages/ui/         Design system partagé (tokens + primitives)
packages/utils/      Utilitaires partagés (formatFCFA, formatDateSN, …)
packages/eslint-config/  Configuration ESLint partagée
content/             Contenu structuré (MDX/JSON) — à alimenter en PHASE 3
docs/                Documentation (business, architecture, design, SEO…)
```

Le reste de l'arborescence prescrite par le MODULE 16.2 (apps/api,
apps/admin, apps/mobile, database/, docker/, infra/…) existe en squelette
(`.gitkeep`) et sera peuplé progressivement selon le MODULE 16.3.

## Qualité

- TypeScript strict, zéro `any`.
- Husky + lint-staged + Commitlint (Conventional Commits) sur chaque commit.
- CI GitHub Actions bloquante : lint, types, tests, build (`.github/workflows/ci.yml`).

## Licence

Propriétaire — tous droits réservés.
