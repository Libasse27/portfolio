# ADR 0001 — Initialisation du monorepo

**Statut** : Acceptée
**Date** : 2026-08-05

## Contexte

Démarrage technique du dépôt (PHASE 2 du protocole, MODULE 19), avant la
validation complète de la PHASE 0 (Vision & Cadrage). Le contenu réel
(identité, récit, projets) n'est pas encore disponible.

## Décisions

1. **pnpm workspaces + Turborepo**, conformément au MODULE 16.1. Alternative
   écartée : Nx (plus lourd à configurer pour un point de départ).
2. **Démarrage progressif** (MODULE 16.3) : squelette de dossiers complet
   avec `.gitkeep`, mais code réel limité à `apps/web`, `packages/ui`,
   `packages/utils`, `packages/eslint-config`, `content/`, `docs/`.
3. **Contenu de `apps/web` marqué `[À COMPLÉTER]`** plutôt que du contenu
   fictif, conformément à la règle 0.2.2 du master prompt.
4. **Playwright et Lighthouse CI reportés** à la PHASE 6 (Accessibilité &
   Tests) et PHASE 5 (SEO & Performance) : les auditer sur une page
   placeholder sans design ni contenu réel n'aurait pas de valeur, et leur
   ajout maintenant violerait la règle anti-sur-ingénierie (pas de dépendance
   sans usage immédiat).
5. **ESLint 9 (flat config)** partagé via `@portfolio/eslint-config`,
   décliné en config de base (TypeScript strict) et config React
   (`react-internal.js`), consommé par `apps/web` via `next/core-web-vitals`.
6. **Tokens de `packages/ui` limités à l'espacement et aux rayons** (valeurs
   déjà fixées par le MODULE 12). La palette de couleurs et les familles
   typographiques restent `[À DÉFINIR]` : elles seront produites en PHASE 1
   (Branding & Design System), pas inventées ici.

## Conséquences

- Le dépôt est fonctionnel et testable dès maintenant (`pnpm install && pnpm dev`).
- Aucune section de contenu final n'est encore écrite : la PHASE 0 doit être
  validée avant la PHASE 3 (Contenu) et la PHASE 4 (Développement des sections).
