# État SEO & Performance — PHASE 5

Décisions et raisons détaillées : `docs/02-Architecture/adr/
0004-seo-performance-phase5-passe1.md` et `docs/02-Architecture/adr/
0006-budget-js-phase5-passe2.md`.

## Fait (passe 1)

- Métadonnées FR/EN réelles (titre, description, canonical, hreflang).
- Open Graph + Twitter Card, image OG générée dynamiquement
  (`apps/web/src/app/[locale]/opengraph-image.tsx`).
- JSON-LD `Person`, `WebSite`, `ProfessionalService`
  (`apps/web/src/components/StructuredData.tsx`).
- `sitemap.xml` et `robots.txt` (conventions Next natives).
- Budget JS : First Load JS ramené de 182 kB à 153 kB (`LazyMotion`/`m` au
  lieu de `motion`) — encore ~3 kB au-dessus du budget de 150 kB, à
  surveiller.
- Lighthouse CI en place (`apps/web/lighthouserc.js`), seuils conservateurs
  (0.8) en attendant la première mesure réelle sur le runner CI.

## Fait (passe 2)

- Budget JS : `@next/bundle-analyzer` (`ANALYZE=true pnpm build`) a
  identifié `zod` (~11 kB gzip), embarqué via `contactFormSchema` importé
  au niveau module dans `ContactForm`, comme cause du dépassement. Import
  différé (`await import('@portfolio/validations')` au submit) : First
  Load JS de `/[locale]` **153 kB → 139 kB**, sous le budget de 150 kB.

## Bloqué — contenu manquant

| Élément                             | Bloqué par                                                    |
| ----------------------------------- | ------------------------------------------------------------- |
| `SoftwareApplication` (JSON-LD)     | Pas de fiches projets (`content/projects/` vide)              |
| `Article` + flux RSS                | Pas de contenu de blog (`content/blog/` vide)                 |
| `FAQPage` (JSON-LD)                 | Pas de FAQ (`content/faq/` vide)                              |
| `BreadcrumbList`                    | Pas de pages profondes (site à une seule page pour l'instant) |
| Contenu long-forme ≥800 mots/projet | Idem `SoftwareApplication`                                    |

## Non traité cette passe (hors périmètre)

- Audit et corrections d'accessibilité complets — Phase 6 (ADR 0001).
- Contraste vérifié sur les deux thèmes — Phase 6.
- Test explicite "Slow 3G" documenté — à faire une fois les seuils
  Lighthouse resserrés sur mesure réelle.
