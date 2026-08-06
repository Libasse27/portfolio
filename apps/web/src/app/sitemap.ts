import type { MetadataRoute } from 'next';
// Sous-chemin plutôt que '@portfolio/i18n' : évite d'évaluer
// packages/i18n/src/navigation.ts (donc next/navigation), inutile ici et
// injoignable sous Vitest hors du runtime App Router de Next.js.
import { routing } from '@portfolio/i18n/src/routing';
import { env } from '@/lib/env';

function localePath(locale: string) {
  return locale === routing.defaultLocale ? '/' : `/${locale}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.map((locale) => ({
    url: `${env.SITE_URL}${localePath(locale)}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: locale === routing.defaultLocale ? 1 : 0.8,
  }));
}
