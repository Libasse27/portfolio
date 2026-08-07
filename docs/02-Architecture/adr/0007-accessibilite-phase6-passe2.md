# ADR 0007 — Accessibilité (Phase 6, passe 2)

**Statut** : Acceptée
**Date** : 2026-08-07

## Contexte

ADR 0005 (Phase 6, passe 1) avait traité deux défauts identifiés lors de la
revue Phase 4 (contraste des fonds pleins, absence de skip link) et reporté
explicitement trois chantiers : une vérification de contraste exhaustive au
lieu des seuls cas déjà repérés, la navigation clavier complète (piège de
focus du menu mobile, ordre de tabulation), et l'audit Lighthouse
Accessibilité/axe-core automatisé. Cette passe traite les deux premiers.

## Décisions

1. **`VennDiagram` — contour des boutons d'intersection inactifs, `/40` →
   `/75`.** Ces boutons (zones de recouvrement du diagramme) n'ont pas de
   libellé visible (seulement un `aria-label`) : leur contour est l'unique
   indice visuel de la présence d'un contrôle interactif, ce qui les soumet
   au seuil non-textuel WCAG 1.4.11 (3:1). À `border-app-text-muted/40`, le
   contour mesuré (couleur diluée sur `--color-bg`) tombe à 2.28:1 en thème
   sombre et 1.77:1 en thème clair. À `/75`, il atteint 4.95:1 (sombre) et
   3.28:1 (clair), au-dessus du seuil dans les deux thèmes ; l'état actif
   (`border-app-text`, plein) et l'état survolé (`border-app-text-muted`
   plein) restent inchangés et plus contrastés encore.

2. **`MobileMenu` traité comme une boîte de dialogue modale.** Le panneau
   plein écran couvrait visuellement le bouton d'ouverture (et le reste de
   l'en-tête) sans les retirer de l'ordre de tabulation : un utilisateur
   clavier pouvait atterrir sur un élément masqué sous le panneau. Ajouts :
   - `role="dialog"` + `aria-modal="true"` sur le panneau ;
   - focus déplacé vers le bouton de fermeture à l'ouverture, restitué au
     bouton d'ouverture à la fermeture (clic sur le bouton fermer, clic sur
     un lien de section, ou touche Échap) ;
   - piège de focus manuel (Tab sur le dernier élément focusable du panneau
     revient au premier, Shift+Tab sur le premier revient au dernier) —
     implémenté à la main (liste des éléments focusables du panneau via
     `querySelectorAll`), sans dépendance supplémentaire ;
   - défilement du `body` verrouillé (`overflow: hidden`) tant que le
     panneau est ouvert.
   - Tests : `MobileMenu.test.tsx` (5 cas — focus à l'ouverture, Échap,
     piège de focus dans les deux sens, fermeture au clic sur un lien).

3. **`Badge` (pôles dev/compta/infra) : contraste vérifié suffisant dans son
   usage actuel.** Les trois variants ne sont utilisés qu'une fois
   (`Hero.tsx`), posés directement sur `--color-bg` (jamais sur
   `--color-surface`). Mesuré à cet emplacement : 4.68–5.64:1 en sombre,
   5.13–6.56:1 en clair — au-dessus du seuil AA (4.5:1) sur les trois pôles
   dans les deux thèmes. Point de vigilance pour la suite : posé sur
   `--color-surface` au lieu de `--color-bg`, `dev` et `infra` tomberaient à
   4.29:1/4.33:1 en sombre (sous le seuil) — si `Badge` est un jour réutilisé
   sur un fond carte (ex. futures sections Projets/Compétences), revérifier
   le contraste à cet emplacement avant de le déployer tel quel.

## Non traité cette passe (hors périmètre)

- **Token `--color-border` (`#2b333a` sombre / `#dfe5e9` clair).** Mesuré à
  1.2–1.4:1 contre `--color-bg`/`--color-surface` selon l'emplacement — bien
  sous le seuil non-textuel de 3:1. Il sert à la fois de séparateur purement
  décoratif (bordures d'en-tête, de pied de page — hors périmètre 1.4.11) et
  de contour de composants interactifs identifiables autrement (champs de
  `ContactForm`, onglets `ExperienceFilter` — tous porteurs d'un libellé
  visible ou d'un remplissage distinct, donc non strictement dépendants du
  contour seul). Faire remonter ce token demanderait une revue visuelle
  d'ensemble (impact sur des dizaines d'usages décoratifs) : à traiter dans
  une passe dédiée avec son propre ADR, pas en corrigeant le token à la
  volée ici.
- **Audit Lighthouse Accessibilité / axe-core automatisé en CI** — toujours
  bloqué par le bug `chrome-launcher` sous Windows (ADR 0004), en attente de
  Playwright (MODULE 16.3, ADR 0001).
- **Ordre de tabulation hors `MobileMenu`** — non revu systématiquement
  cette passe (`Navigation` desktop et les sections restent dans l'ordre du
  DOM, sans piège ni élément masqué identifié).

## Conséquences

- Tout nouveau composant plein écran/modal doit suivre le patron posé par
  `MobileMenu` (rôle dialog, gestion de focus, piège de focus, Échap).
- Tout nouveau contrôle interactif sans libellé visible (icône seule) doit
  vérifier le contraste de son indice visuel (contour, remplissage) au seuil
  non-textuel de 3:1, comme `VennDiagram`.
- `Badge` reste correct dans son usage actuel ; une réutilisation sur fond
  `--color-surface` doit revérifier le contraste avant de merger.
