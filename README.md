# Portfolio Enterprise

Portfolio professionnel tri-expertise — Développement Full-Stack, Comptabilité
& Gestion Financière (SYSCOHADA/OHADA), Infrastructure & Télécoms.

Piloté par le master prompt : [`docs/00-MasterPrompt/MasterPrompt.md`](./docs/00-MasterPrompt/MasterPrompt.md).

## État du projet

- **PHASE 0 — Vision & Cadrage** : validée (voir `docs/01-Business`).
- **PHASE 1 — Branding & Design System** : validée (palette Teranga Slate,
  typographie, tokens, primitive Button — voir `docs/03-DesignSystem`).
- **PHASE 2 — Architecture & Fondations** : validée (monorepo, CI,
  internationalisation FR/EN, thème persistant, coquille de navigation —
  voir `docs/02-Architecture/adr/0002-i18n-theme-navigation.md`).
- **PHASE 3 — Contenu** : en cours — profil/à-propos rédigé
  (`content/about/profil.json`), expérience (1 poste). Projets, compétences,
  services, formation, certifications et FAQ restent bloqués en attente de
  faits (aucun fait inventé, règle 0.2.2) — état détaillé dans
  `docs/07-Content/README.md`.
- **PHASE 4 — Développement des sections** : en cours — Hero, Triple
  Expertise (Venn interactif), À propos (récit + compteurs animés),
  Expérience (timeline filtrable), Contact (formulaire + `mailto:`) et
  Footer livrés, sourcés sur le contenu déjà rédigé. Projets, Services,
  Compétences, Formation, FAQ restent à construire une fois leur contenu
  débloqué — voir `docs/02-Architecture/adr/0003-sections-phase4-passe1.md`.
- **PHASE 5 — SEO & Performance** : en cours — métadonnées réelles, Open
  Graph + image dynamique, JSON-LD Person/WebSite/ProfessionalService,
  sitemap/robots, budget JS réduit (182 kB → 153 kB), Lighthouse CI en
  place (seuils conservateurs, à resserrer après la première mesure CI
  réelle) — voir `docs/06-SEO/README.md` et
  `docs/02-Architecture/adr/0004-seo-performance-phase5-passe1.md`.
  `SITE_URL` doit être positionné au vrai domaine avant mise en
  production (`apps/web/.env.example`) — non encore acquis.

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
- CI GitHub Actions bloquante : lint, types, tests, build, Lighthouse
  (`.github/workflows/ci.yml`).

## Licence

Propriétaire — tous droits réservés.
