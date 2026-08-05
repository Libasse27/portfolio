/**
 * Tokens du design system (MODULE 12). Les valeurs de couleur et d'élévation
 * vivent dans `globals.css` (variables CSS, car elles changent avec le thème
 * clair/sombre) ; ce fichier n'en exporte que les noms, pour la sécurité de
 * type des composants. Espacement et rayons sont indépendants du thème et
 * gardent donc leur valeur directement ici.
 *
 * Direction retenue en Phase 1 : palette "Teranga Slate" + police de titre
 * "Unbounded" (voir docs/03-DesignSystem/).
 */
export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  12: '48px',
  16: '64px',
  24: '96px',
  32: '128px',
} as const;

export const radius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const;

/** Correspond aux 5 niveaux d'ombre définis dans globals.css (--shadow-1 … --shadow-5). */
export const elevation = {
  1: 'var(--shadow-1)',
  2: 'var(--shadow-2)',
  3: 'var(--shadow-3)',
  4: 'var(--shadow-4)',
  5: 'var(--shadow-5)',
} as const;

/** Noms des rôles de police, alimentés par next/font dans apps/web/src/app/layout.tsx. */
export const fontFamily = {
  heading: 'var(--font-heading)',
  body: 'var(--font-body)',
  mono: 'var(--font-mono)',
} as const;

export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;
export type ElevationToken = keyof typeof elevation;
export type FontFamilyToken = keyof typeof fontFamily;
