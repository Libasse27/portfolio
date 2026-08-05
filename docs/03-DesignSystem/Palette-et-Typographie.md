# Design System — Palette & Typographie (Phase 1)

> Décision validée par Libaase le 2026-08-05, à partir de la comparaison
> publiée dans un artefact (3 directions de palette × 3 polices de titre).

## Direction retenue

- **Palette : Teranga Slate** — neutres froids façon documentation
  Stripe/Linear/Vercel, cohérents avec le positionnement "Enterprise
  Technical Elegance" du MODULE 12.
- **Police de titre : Unbounded** — géométrique et affirmée.
- **Corps : Public Sans**, **Monospace : JetBrains Mono** — constants quel
  que soit le choix de police de titre (lisibilité déjà tranchée, pas une
  variable de personnalité).

## Règle de conception

La couleur primaire (actions, CTA) **double comme accent du pôle
Développement**, conformément à la règle de hiérarchie du MODULE 4 : le
développement est le pôle mis en avant en premier, la comptabilité et
l'infrastructure sont des multiplicateurs de valeur, pas des accents rivaux.

## Tokens (implémentés dans `apps/web/src/app/globals.css`)

| Rôle                           | Sombre (par défaut) | Clair       |
| ------------------------------ | ------------------- | ----------- |
| `--color-bg`                   | `#12161A`           | `#F7F9FA`   |
| `--color-surface`              | `#191E23`           | `#FFFFFF`   |
| `--color-border`               | `#2B333A`           | `#DFE5E9`   |
| `--color-text`                 | `#EDF1F4`           | `#12161A`   |
| `--color-text-muted`           | `#9FACB6`           | `#5B6670`   |
| `--color-primary` (= pôle Dev) | `#1496B8`           | `#0C5D74`   |
| `--color-pole-compta`          | `#D48A1E`           | `#92430A`   |
| `--color-pole-infra`           | `#7B7FF5`           | `#4F46E5`   |
| `--color-success`              | `#22A559`           | (identique) |
| `--color-warning`              | `#EAB308`           | (identique) |
| `--color-error`                | `#E5484D`           | (identique) |
| `--color-info`                 | `#3B82F6`           | (identique) |

Les couleurs sémantiques (succès/alerte/erreur/info) restent volontairement
identiques entre thèmes et distinctes des accents de pôle, pour ne jamais
confondre un badge de filtrage et un état de formulaire.

**Thème par défaut** : sombre (MODULE 12). Le système respecte
`prefers-color-scheme: light` en l'absence de préférence explicite.
`[data-theme="dark"|"light"]` sur `<html>` prend le pas sur les deux — ce
sera le point d'ancrage du futur sélecteur de thème (persistance par cookie,
MODULE 15 V1), pas encore implémenté à ce stade.

**Espacement, rayons, élévation** : voir `packages/ui/src/tokens.ts`
(échelle 4 px, rayons 4/8/12/16/full, 5 niveaux d'ombre — valeurs des ombres
dans `globals.css`, adaptées par thème).

**Polices** : chargées via `next/font/google` dans
`apps/web/src/app/layout.tsx` (Unbounded, Public Sans, JetBrains Mono —
poids 400/700, 400/600, 400/700), exposées en variables CSS
(`--font-heading`, `--font-body`, `--font-mono`) et mappées dans
`apps/web/tailwind.config.ts` (`font-heading`, `font-sans`, `font-mono`).

## Composants primitifs

- `Button` (`packages/ui/src/components/Button.tsx`) — 3 variantes
  (`primary`, `secondary`, `ghost`), stylées avec les tokens ci-dessus.
  `primary` utilise `--color-primary` (donc l'accent Dev), cohérent avec la
  règle de hiérarchie.

## Reste à faire (hors périmètre de cette itération)

- Sélecteur de thème clair/sombre avec persistance (cookie), prévu au
  MODULE 15 (V1) / à construire avec la section Navigation (Phase 4).
- Composants primitifs additionnels (Card, Input, Badge) — à ajouter au fil
  du développement des sections (Phase 4), pas en une seule fois.
- Vérification finale de contraste WCAG AA sur toutes les combinaisons
  texte/fond, à faire en Phase 6 (Accessibilité & Tests) avec l'outillage
  dédié (axe DevTools), au-delà de la vérification visuelle faite ici.
