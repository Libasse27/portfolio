import type { Config } from 'tailwindcss';

/** Thème étendu (palette, typographie) ajouté en PHASE 1 — Design System. */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
