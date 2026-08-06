import { defineRouting } from 'next-intl/routing';

/**
 * fr = locale par défaut (MODULE 2 : fr-SN), sans préfixe sur "/".
 * en préfixé sur "/en" — ADR 0002 : meilleur SEO/UX pour l'audience
 * principale francophone que le préfixe systématique ("always").
 */
export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
});

export type AppLocale = (typeof routing.locales)[number];
