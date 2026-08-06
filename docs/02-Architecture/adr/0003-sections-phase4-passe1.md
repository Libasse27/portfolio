# ADR 0003 — Sections Phase 4 (passe 1) : Hero, Triple Expertise, À propos, Expérience, Contact, Footer

**Statut** : Acceptée
**Date** : 2026-08-06

## Contexte

Phase 3 (passe 1) a livré `content/about/profil.json` et
`content/experience/*.json` (1 poste). Projets, Services, Compétences,
Formation, FAQ restent bloqués (faits manquants, voir
`docs/07-Content/README.md`). L'utilisateur a choisi de construire les 6
sections dont le contenu est déjà entièrement sourcé, dans l'ordre du
MODULE 13, en sautant les sections bloquées.

Le contenu long (récit, positionnement, valeurs) reste en français
uniquement : `content/about/profil.json` n'est pas encore traduit (MODULE
18 séquence FR puis traduction EN). Les visiteurs `/en` voient donc ce
texte en français jusqu'à la traduction — écart connu, pas un nouveau
blocage.

## Décisions

1. **CTAs Hero adaptés au contenu disponible.** Pas de « Voir les
   projets » (section absente) ni de téléchargement CV (PDF pas encore
   généré, MODULE 15 V1 #11). CTA primaire → `#contact`, secondaire →
   `#a-propos` — les deux existent dans cette passe.

2. **Contact : formulaire fonctionnel sans backend.** `apps/api` n'existe
   pas (ADR 0001) ; aucun service d'envoi d'e-mail configuré. Validation
   Zod (`contactFormSchema`, `packages/validations`) **côté client
   uniquement** cette passe — réutilisable telle quelle par un futur
   `apps/api`. Honeypot anti-spam (champ `societe`, invisible et non
   focusable). Soumission via lien `mailto:` généré (sujet/corps
   pré-remplis) plutôt qu'une simulation d'envoi qui n'aboutirait nulle
   part. Réservation de créneau (Calendly) omise : URL non fournie
   (`PersonalBrand.md` : optionnelle).

3. **Footer sans mentions légales/CGU.** Statut légal (NINEA/RCCM) non
   formalisé. Pas de politique de confidentialité fabriquée. Plan du site
   limité aux sections qui existent réellement ; note « Mentions légales —
   à venir » plutôt qu'un lien mort ou une page inventée. Pas de doublon
   des bascules thème/langue (déjà dans la nav persistante, Phase 2) :
   juste plan du site, retour en haut et copyright.

4. **Portraits/logos omis.** Aucun asset réel disponible (`assets/avatar`,
   `assets/logos` vides) — pas d'image générique de remplacement (ANNEXE B).

5. **Framer Motion ajouté maintenant.** Mandaté par MODULE 16.1, différé en
   Phase 2 faute d'usage immédiat (ADR 0002) ; usage réel désormais :
   entrées de section (`SectionReveal`, `whileInView`, 500ms, easing
   `cubic-bezier(0.16,1,0.3,1)`) et compteurs animés (MODULE 11).
   `prefers-reduced-motion` géré une seule fois via
   `<MotionConfig reducedMotion="user">` dans le layout racine plutôt que
   dans chaque composant. Pas de condensation de nav au scroll cette passe
   (polish différé, non bloquant).

6. **Navigation enrichie de liens de section** (`#expertise`, `#a-propos`,
   `#experience`, `#contact`) et d'un **menu plein écran mobile** minimal —
   les deux étaient explicitement reportés par l'ADR 0002 faute de
   sections réelles à lier ; ce n'est plus le cas.

7. **Primitifs `packages/ui` complétés** : `Badge` (variants par pôle +
   neutre) et `LinkButton` (même apparence que `Button`, élément `<a>`,
   pour les CTA de navigation/ancre) — `Button` reste un `<button>` pur.

## Conséquences

- Projets, Services, Compétences, Formation, FAQ restent à construire dès
  que leur contenu sera débloqué (Phase 3, passe suivante).
- Les tests unitaires par composant remplacent un test de composition de
  `page.tsx` : les composants Server Components asynchrones utilisés en
  JSX (`<Hero />`, etc.) ne peuvent pas être rendus par
  `@testing-library/react` seul (limite connue de React Testing Library
  avec les Server Components) ; chaque section est donc testée
  individuellement (`await Hero()` puis `render()`), et la composition
  finale est vérifiée par le build de production (`pnpm build`,
  génération statique réussie de `/fr` et `/en`).
