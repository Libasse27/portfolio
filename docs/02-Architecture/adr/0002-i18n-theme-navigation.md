# ADR 0002 — i18n, thème persistant et coquille de navigation (Phase 2)

**Statut** : Acceptée
**Date** : 2026-08-06

## Contexte

Le README documentait la PHASE 2 comme « initialisée » (monorepo + CI,
ADR 0001), avec i18n, navigation et bascule de thème explicitement reportés
à la PHASE 4 — note informelle dans
`docs/03-DesignSystem/Palette-et-Typographie.md`, jamais actée en ADR. Le
Master Prompt (MODULE 19.1) définit pourtant la sortie de la PHASE 2 comme :
monorepo initialisé, CI en place, layout, navigation, i18n, thèmes. Décision
prise de refermer cet écart maintenant plutôt qu'en Phase 4.

## Décisions

1. **i18n : `next-intl` v4** (mandaté par MODULE 16.1). Routing avec
   `localePrefix: 'as-needed'` — `fr` (locale par défaut, MODULE 2 :
   locale de référence fr-SN) sans préfixe sur `/`, `en` préfixé sur `/en`.
   Alternative écartée : `'always'` (préfixe systématique sur les deux
   locales), moins bon pour le SEO/UX de l'audience principale francophone
   qui devrait alors naviguer sous `/fr`.

2. **Thème : mécanisme fait main (cookie + script bloquant anti-flash),
   sans dépendance `next-themes`.** `next-themes` n'est pas mandaté par le
   Master Prompt (règle 17.7 : aucune dépendance sans justification écrite).
   Alternative écartée : lire le cookie côté serveur (`cookies()` dans le
   layout racine) — cela forcerait le rendu dynamique de **toutes** les
   pages du site (l'usage de `cookies()` désactive le rendu statique sur
   toute la route), ce qui contredit l'objectif SSG/TTFB du MODULE 14. Le
   script inline (`apps/web/src/components/ThemeScript.tsx`) lit
   `document.cookie` côté client avant la peinture et pose `data-theme` sur
   `<html>` ; en son absence, `@media (prefers-color-scheme)` (déjà en
   place dans `globals.css` depuis la Phase 1) gère le défaut sans flash.
   Les pages restent statiquement générées.

3. **`packages/i18n` activé maintenant.** Prévu pour l'« Étape 2 » du
   démarrage progressif (ADR 0001, MODULE 16.3), il héberge le routing
   next-intl, les helpers de navigation typés (`Link`, `usePathname`,
   `useRouter`) et les messages d'interface (nav / thème / langue) — à
   distinguer du `content/` métier (schémas Phase 3, MODULE 6/7).

4. **Navigation : coquille minimale seulement.** Logo/nom, sélecteur de
   langue, bascule de thème, CTA « Me contacter » (`apps/web/src/components/
Navigation.tsx`). Explicitement hors périmètre pour l'instant, à traiter
   en Phase 4 avec les sections réelles :
   - liens de section (aucune section n'existe encore — règle 0.2.2,
     anti-contenu factice) ;
   - condensation de la nav au scroll (nécessiterait Framer Motion, pas
     encore une dépendance justifiée — règle 17.7) ;
   - menu plein écran mobile (rien à y afficher tant qu'il n'y a pas de
     liens de section).

## Conséquences

- La PHASE 2 passe de « initialisée » à « validée » (README mis à jour).
- `docs/03-DesignSystem/Palette-et-Typographie.md` : la ligne « Reste à
  faire » sur le sélecteur de thème est retirée, remplacée par un renvoi
  vers cet ADR.
- Le CTA « Me contacter » et le sélecteur de langue restent fonctionnels
  mais pointent vers du contenu qui n'existe pas encore (ancre `#contact`
  sans section correspondante) : comportement transitoire assumé, à
  corriger quand la section Contact sera livrée en Phase 4.
