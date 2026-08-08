import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

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
      // Typographie des articles MDX (Phase 8, ADR 0009) : pointe vers les
      // mêmes variables CSS que le reste du thème plutôt que la palette
      // grise par défaut du plugin, pour rester cohérent en clair/sombre.
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--color-text)',
            '--tw-prose-headings': 'var(--color-text)',
            '--tw-prose-links': 'var(--color-primary)',
            '--tw-prose-bold': 'var(--color-text)',
            '--tw-prose-bullets': 'var(--color-text-muted)',
            '--tw-prose-hr': 'var(--color-border)',
            '--tw-prose-quotes': 'var(--color-text-muted)',
            '--tw-prose-quote-borders': 'var(--color-border)',
            '--tw-prose-captions': 'var(--color-text-muted)',
            '--tw-prose-code': 'var(--color-text)',
            '--tw-prose-pre-bg': 'var(--color-surface)',
            '--tw-prose-pre-border': 'var(--color-border)',
            maxWidth: 'none',
            code: { fontWeight: '400' },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: { border: '1px solid var(--tw-prose-pre-border)' },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
