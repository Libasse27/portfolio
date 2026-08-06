# ADR 0006 — Budget JS (Phase 5, passe 2)

**Statut** : Acceptée
**Date** : 2026-08-06

## Contexte

ADR 0004 (Phase 5, passe 1) avait ramené le First Load JS de `/[locale]`
de 182 kB à 153 kB via `LazyMotion`/`m`, en notant un reliquat d'environ
3 kB au-dessus du budget MODULE 14 (150 kB gzip), non traité faute de
cible évidente à ce moment-là ("rendements décroissants pour une
optimisation plus invasive").

Un `@next/bundle-analyzer` ponctuel (`ANALYZE=true pnpm build`, voir
décision 2) a identifié la cible : `contactFormSchema`
(`@portfolio/validations`) importé au niveau module dans `ContactForm.tsx`
embarquait `zod` en entier dans le JS initial de la page — **~11,2 kB
gzip** à lui seul — alors qu'il n'est utilisé qu'à la soumission du
formulaire, jamais au premier rendu.

## Décisions

1. **Import différé de `zod` dans `ContactForm`.** `contactFormSchema`
   passe d'un `import` statique à `const { contactFormSchema } = await
import('@portfolio/validations')` à l'intérieur de `handleSubmit`
   (devenu async). Le code-splitting de Next place le schéma (et `zod`)
   dans un chunk séparé, chargé à la demande au premier submit plutôt
   qu'au chargement de la page. Résultat mesuré : First Load JS de
   `/[locale]` **153 kB → 139 kB** (-14 kB, dont ~11 kB de `zod` et le
   reste en glue code), soit 11 kB sous le budget de 150 kB.
   `apps/web/src/components/sections/ContactForm.test.tsx` adapté :
   assertions post-soumission via `findBy*`/`waitFor` plutôt que
   synchrones, pour attendre la résolution de l'import.

2. **`@next/bundle-analyzer` ajouté en devDependency, derrière
   `ANALYZE=true`.** No-op en build normal (`enabled: process.env.ANALYZE
=== 'true'` dans `apps/web/next.config.ts`) : sert de diagnostic
   ponctuel pour identifier la prochaine cible si le budget est de
   nouveau dépassé lors de l'ajout des sections restantes (Projets,
   Services, Compétences, Formation, FAQ — bloquées faute de contenu,
   voir `docs/07-Content/README.md`), pas d'usage automatisé en CI cette
   passe.

## Non traité cette passe

- Pas de seuil CI qui échoue automatiquement au dépassement du budget
  (MODULE 14 le mentionne comme cible à terme) — `ANALYZE=true` reste un
  diagnostic manuel pour l'instant.
- Les autres schémas de `@portfolio/validations` (`aboutSchema`,
  `experienceSchema`) ne sont importés côté client qu'en `type`-only
  (effacés à la compilation) : aucun import différé nécessaire pour eux.

## Conséquences

- Tout nouveau composant client import ant une valeur (pas seulement un
  `type`) depuis `@portfolio/validations` doit évaluer si un import
  différé est justifié, sur le même modèle que `ContactForm`.
- `pnpm --filter @portfolio/web build` avec `ANALYZE=true` en préfixe
  régénère les rapports dans `apps/web/.next/analyze/` (non versionnés,
  couverts par `.next/` dans `.gitignore`).
