/**
 * Tokens fixés par le MODULE 12 du master prompt (échelle d'espacement, rayons).
 * La palette de couleurs et les familles typographiques restent [À DÉFINIR] :
 * elles sont produites lors de la PHASE 1 — Branding & Design System.
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

export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;
