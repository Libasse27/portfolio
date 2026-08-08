import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blog';
import { profil } from '@/lib/content';
import { env } from '@/lib/env';

// Next.js 15 rend les Route Handlers GET dynamiques par défaut (changement
// par rapport à 14) : le contenu ne change qu'à la reconstruction (nouveau
// fichier MDX), donc statique explicitement — cohérent avec sitemap.ts/
// robots.ts (SSG, ADR 0004).
export const dynamic = 'force-static';

// Chemin avec extension (.xml) : déjà exclu du matcher i18n
// (`.*\..*`, middleware.ts), comme sitemap.xml/robots.txt — pas de
// préfixe de locale, un flux unique (ADR 0009, décision 9 : le corps des
// articles n'est pas traduit, même limite que le reste du contenu éditorial).
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const posts = getAllBlogPosts();
  const siteUrl = env.SITE_URL;
  const items = posts
    .map((post) => {
      const link = `${siteUrl}/blog/${post.slug}`;
      return `
    <item>
      <title>${escapeXml(post.titre)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(post.datePublication).toUTCString()}</pubDate>
      <description>${escapeXml(post.extrait)}</description>
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(profil.identite.nomComplet)} — Blog</title>
    <link>${siteUrl}/blog</link>
    <description>${escapeXml(profil.identite.slogan)}</description>
    <language>fr-SN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
