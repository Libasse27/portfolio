import { describe, expect, it, vi, beforeEach } from 'vitest';
import { env } from '@/lib/env';

describe('rss.xml', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('génère un flux valide sans <item> tant qu’aucun article n’existe', async () => {
    vi.doMock('@/lib/blog', () => ({ getAllBlogPosts: () => [] }));
    const { GET } = await import('./route');
    const response = GET();

    expect(response.headers.get('Content-Type')).toBe('application/rss+xml; charset=utf-8');
    const body = await response.text();
    expect(body).toContain('<rss version="2.0">');
    expect(body).toContain(`<link>${env.SITE_URL}/blog</link>`);
    expect(body).not.toContain('<item>');
  });

  it('ajoute un <item> par article, avec échappement XML du titre', async () => {
    vi.doMock('@/lib/blog', () => ({
      getAllBlogPosts: () => [
        {
          slug: 'article-un',
          titre: 'Titre & <spécial>',
          extrait: 'Un extrait.',
          datePublication: '2026-08-01',
          theme: 'dev',
        },
      ],
    }));
    const { GET } = await import('./route');
    const body = await GET().text();

    expect(body).toContain(`<link>${env.SITE_URL}/blog/article-un</link>`);
    expect(body).toContain('Titre &amp; &lt;spécial&gt;');
  });
});
