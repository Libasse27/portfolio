import { routing } from '@portfolio/i18n/src/routing';

/**
 * `fr` (défaut) n'a pas de préfixe (`localePrefix: 'as-needed'`, ADR 0002) :
 * partagé par layout.tsx, sitemap.ts et les pages blog pour que l'URL
 * canonique reste identique partout où elle est calculée.
 */
export function localePath(locale: string, pathname = ''): string {
  const base = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${base}${pathname}` || '/';
}
