import type { Config } from 'tailwindcss';

// Palette par défaut de Tailwind, pas les tokens de marque d'apps/web
// (ADR 0011, décision 1) : outil interne, pas de branding à porter.
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
