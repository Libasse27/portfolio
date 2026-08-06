import type { Config } from 'tailwindcss';

/**
 * Thème étendu en PHASE 1 — Design System. Les couleurs pointent vers les
 * variables CSS définies dans `globals.css` (palette "Teranga Slate"), pas
 * vers des valeurs figées : le thème clair/sombre change la valeur des
 * variables, jamais les classes Tailwind utilisées dans les composants.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'app-bg': 'var(--color-bg)',
        'app-surface': 'var(--color-surface)',
        'app-border': 'var(--color-border)',
        'app-text': 'var(--color-text)',
        'app-text-muted': 'var(--color-text-muted)',
        primary: 'var(--color-primary)',
        // Remplissage plein (boutons, filtres actifs) : ADR 0005, contraste
        // texte blanc / fond suffisant dans les deux thèmes.
        'primary-fill': 'var(--color-primary-fill)',
        'pole-dev': 'var(--color-primary)',
        'pole-compta': 'var(--color-pole-compta)',
        'pole-infra': 'var(--color-pole-infra)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        sans: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        1: 'var(--shadow-1)',
        2: 'var(--shadow-2)',
        3: 'var(--shadow-3)',
        4: 'var(--shadow-4)',
        5: 'var(--shadow-5)',
      },
    },
  },
  plugins: [],
};

export default config;
