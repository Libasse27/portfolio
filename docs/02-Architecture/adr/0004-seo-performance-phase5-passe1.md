# ADR 0004 — SEO & Performance (Phase 5, passe 1)

**Statut** : Acceptée
**Date** : 2026-08-06

## Contexte

ADR 0001 avait explicitement reporté Lighthouse CI à cette phase
("auditer une page placeholder n'aurait pas de valeur") — les 6 sections de
la Phase 4 changent ça. Le build Phase 4 a aussi révélé un dépassement du
budget MODULE 14 : First Load JS ≈ 182 kB contre un budget de 150 kB gzip,
principalement dû à l'import complet de `framer-motion`.

Comme en Phase 3/4, une partie de MODULE 14 reste bloquée faute de
contenu : `BreadcrumbList` (pas de pages profondes), `SoftwareApplication`
par projet, `Article`/flux RSS (pas de blog), `FAQPage` (pas de FAQ),
contenu long-forme ≥800 mots par projet. Cette passe couvre le reste :
métadonnées réelles, structured data Person/WebSite/ProfessionalService,
Open Graph + image dynamique, sitemap/robots, correction du budget JS, et
mise en place de Lighthouse CI. L'audit d'accessibilité complet reste
Phase 6 (ADR 0001).

## Décisions

1. **`SITE_URL` validé par Zod (MODULE 17.17), pas de domaine en dur.**
   `PersonalBrand.md` : domaine pas encore acquis. `apps/web/src/lib/env.ts`
   valide `SITE_URL` (`z.string().url().default('http://localhost:3000')`) ;
   sitemap/robots/canonical/OG/JSON-LD l'utilisent tous.
   `apps/web/.env.example` documente qu'il doit être positionné au vrai
   domaine avant mise en production (Vercel) — le défaut localhost ne doit
   jamais être déployé tel quel.

2. **Metadata FR/EN réelles.** `packages/i18n/src/messages/{fr,en}.json` →
   `Metadata.title`/`description` passent des placeholders `[À COMPLÉTER]`
   au vrai titre/slogan (`content/about/profil.json`, validé Phase 3).
   Traduction anglaise du titre/slogan uniquement (chaînes courtes
   d'interface) — le récit long reste FR-only (Phase 3/4).

3. **Structured data limitée à Person/WebSite/ProfessionalService**
   (`apps/web/src/components/StructuredData.tsx`, JSON-LD `@graph`).
   `SoftwareApplication`, `Article`/RSS, `FAQPage` : pas de contenu, donc
   pas de schéma inventé. `BreadcrumbList` : pas de pages profondes,
   non applicable.

4. **Bundle : `LazyMotion` + `m` au lieu de `motion`.** `<LazyMotion
features={domAnimation} strict>` posé une fois dans le layout racine ;
   `SectionReveal`/`AnimatedCounters` (seuls usages) passent de `motion.*`
   à `m.*`. Résultat mesuré : First Load JS de `/[locale]` **182 kB → 153 kB**
   (-29 kB). Reste ~3 kB au-dessus du budget de 150 kB — écart mineur,
   non traité cette passe (rendements décroissants pour une optimisation
   plus invasive maintenant) ; à surveiller lors de l'ajout des sections
   restantes.

5. **Image OG sans police personnalisée.** `apps/web/src/app/[locale]/
opengraph-image.tsx` (`next/og`, déjà inclus dans Next — pas de nouvelle
   dépendance) utilise la police par défaut de Satori plutôt que de
   récupérer une police par réseau au build : un fetch réseau s'est déjà
   montré peu fiable dans cet environnement (voir l'incident de résolution
   `next/font` en Phase 2). Palette Teranga Slate copiée en dur depuis
   `globals.css` (Satori ne lit pas les variables CSS).

6. **Lighthouse CI : seuils conservateurs (0.8), pas 100/100/100/100
   immédiat.** MODULE 17.12 veut Lighthouse bloquant en CI ; l'exiger
   parfait dès cette passe bloquerait sur des points hors périmètre (a11y
   Phase 6, contenu Projets/FAQ manquant). **La mesure locale a été
   bloquée par un bug connu de `chrome-launcher` sous Windows** : l'audit
   Lighthouse s'exécute jusqu'au bout (tous les audits Performance/
   Accessibilité/Bonnes pratiques/SEO passent), mais le nettoyage du
   dossier temporaire de Chrome échoue avec `EPERM` après la fermeture du
   processus, avant l'écriture des scores — reproduit deux fois
   identiquement, propre à l'environnement Windows sandboxé de cette
   session, pas au code de l'application. Le premier run CI (runner Linux
   `ubuntu-latest`) servira de mesure de référence réelle ; les seuils de
   `apps/web/lighthouserc.js` sont fixés à 0.8 par prudence et devront être
   resserrés vers 100 une fois cette mesure connue.

## Conséquences

- `apps/web/lighthouserc.js` audite `/fr` et `/en` via `pnpm start`
  (`startServerCommand`), nouvelle étape « Lighthouse CI » dans
  `.github/workflows/ci.yml` après le build.
- Prochaine action recommandée : après le premier run CI vert, relire le
  rapport Lighthouse et resserrer les seuils de `lighthouserc.js` vers la
  valeur réellement atteinte (viser 100 au fil des phases suivantes,
  MODULE 14).
