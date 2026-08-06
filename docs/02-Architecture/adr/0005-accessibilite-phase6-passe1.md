# ADR 0005 — Accessibilité (Phase 6, passe 1)

**Statut** : Acceptée
**Date** : 2026-08-06

## Contexte

ADR 0001 avait reporté l'audit d'accessibilité complet à la PHASE 6, et ADR
0004 (Phase 5) l'a confirmé hors périmètre SEO/Performance. Cette passe
ouvre la PHASE 6 sur deux points identifiés lors de la revue des sections
livrées en Phase 4 : un contraste insuffisant (WCAG AA, 4.5:1) sur certains
textes blancs posés sur fond de couleur en thème sombre, et l'absence de
lien d'évitement (« skip link ») vers le contenu principal.

## Décisions

1. **Token `--color-primary-fill` distinct de `--color-primary`.**
   `--color-primary` seul (`#1496b8` en thème sombre) n'offre que 3.45:1
   avec du texte blanc en fond plein — sous le seuil AA de 4.5:1 — bien
   qu'il reste correct comme couleur de texte/accent sur le fond de page
   (5.27:1). `--color-primary-fill` (`#127891` en sombre) est réservé aux
   fonds pleins avec texte blanc (boutons `primary`, filtres actifs) et
   atteint le seuil requis. En thème clair, `--color-primary` (`#0c5d74`)
   est déjà à 7.41:1 : `--color-primary-fill` y prend la même valeur, pas
   de teinte distincte nécessaire. Appliqué à `Button` (variant `primary`)
   et `ExperienceFilter` (état actif) ; exposé via Tailwind
   (`bg-primary-fill`, `apps/web/tailwind.config.ts`).

2. **`Badge` : opacité de fond `/10` au lieu de `/15`.** À `/15`, les
   variants `dev` et `infra` tombaient à 4.38:1/4.40:1 en thème sombre,
   sous le seuil AA. `/10` restaure la marge sur les trois variants
   colorés sans changer la teinte de base (MODULE 4).

3. **Lien d'évitement (`SkipLink`, MODULE 14).** Server Component autonome
   (pas de dépendance à `NextIntlClientProvider`, pour rester utilisable
   même si l'hydratation du reste de l'arbre échoue), premier élément
   focusable du `<body>` avant `Navigation`. Cible `#main-content`, posé
   sur un nouveau `<main id="main-content">` qui enveloppe `children` dans
   `apps/web/src/app/[locale]/layout.tsx`. `not-found.tsx` et `error.tsx`
   (mêmes segment, rendus comme `children` de ce layout) ont perdu leur
   `<main>` interne pour éviter un `<main>` imbriqué.

## Non traité cette passe (hors périmètre)

- Audit Lighthouse Accessibilité / axe-core automatisé en CI — la mesure
  Lighthouse réelle reste bloquée par le bug `chrome-launcher` sous
  Windows documenté en ADR 0004 ; à couvrir dès que Playwright (MODULE
  16.3, reporté ADR 0001) est en place pour la Phase 6.
- Vérification de contraste exhaustive sur tous les composants (pôles
  Compta/Infra hors `Badge`, états `hover`/`disabled`) — cette passe ne
  couvre que les cas identifiés par la revue Phase 4.
- Navigation clavier complète (piège de focus du menu mobile, ordre de
  tabulation) — à couvrir dans une passe Phase 6 ultérieure.

## Conséquences

- `Button`, `Badge`, `ExperienceFilter` utilisent les nouveaux tokens ;
  tout nouveau composant avec fond plein + texte blanc doit utiliser
  `bg-primary-fill`, pas `bg-primary`.
- `apps/web/src/app/[locale]/layout.tsx` structure désormais le
  `<body>` en `SkipLink` → `Navigation` → `<main id="main-content">`.
