import { describe, expect, it, vi, beforeEach } from 'vitest';
import { routing } from '@portfolio/i18n/src/routing';
import { env } from '@/lib/env';

describe('sitemap', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('contient une entrée par locale, la locale par défaut sans préfixe, sans /blog tant que vide', async () => {
    vi.doMock('@/lib/blog', () => ({ getAllBlogPosts: () => [] }));
    const { default: sitemap } = await import('./sitemap');
    const entries = sitemap();
    expect(entries).toHaveLength(routing.locales.length);

    const fr = entries.find((entry) => entry.url === `${env.SITE_URL}/`);
    const en = entries.find((entry) => entry.url === `${env.SITE_URL}/en`);
    expect(fr).toBeDefined();
    expect(en).toBeDefined();
    expect(fr?.priority).toBe(1);
  });

  it('ajoute /blog et chaque article, par locale, dès qu’un article existe', async () => {
    vi.doMock('@/lib/blog', () => ({
      getAllBlogPosts: () => [
        { slug: 'mon-article', datePublication: '2026-08-01', dateMiseAJour: undefined },
      ],
    }));
    const { default: sitemap } = await import('./sitemap');
    const entries = sitemap();

    // 2 pages locale + (1 /blog + 1 article) × 2 locales
    expect(entries).toHaveLength(routing.locales.length + 2 * 2);
    expect(entries.some((entry) => entry.url === `${env.SITE_URL}/blog`)).toBe(true);
    expect(entries.some((entry) => entry.url === `${env.SITE_URL}/en/blog`)).toBe(true);
    expect(entries.some((entry) => entry.url === `${env.SITE_URL}/blog/mon-article`)).toBe(true);
  });
});
