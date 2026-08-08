import type { MetadataRoute } from 'next';
// Sous-chemin plutôt que '@portfolio/i18n' : évite d'évaluer
// packages/i18n/src/navigation.ts (donc next/navigation), inutile ici et
// injoignable sous Vitest hors du runtime App Router de Next.js.
import { routing } from '@portfolio/i18n/src/routing';
import { env } from '@/lib/env';
import { localePath } from '@/lib/localePath';
import { getAllBlogPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${env.SITE_URL}${localePath(locale)}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: locale === routing.defaultLocale ? 1 : 0.8,
  }));

  // /blog n'entre dans le sitemap que s'il existe au moins un article
  // publié (ADR 0009) : pas de page vide soumise à l'indexation.
  const posts = getAllBlogPosts();
  if (posts.length === 0) return pages;

  const blogPages = routing.locales.flatMap((locale) => [
    {
      url: `${env.SITE_URL}${localePath(locale, '/blog')}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    ...posts.map((post) => ({
      url: `${env.SITE_URL}${localePath(locale, `/blog/${post.slug}`)}`,
      lastModified: new Date(post.dateMiseAJour ?? post.datePublication),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ]);

  return [...pages, ...blogPages];
}
