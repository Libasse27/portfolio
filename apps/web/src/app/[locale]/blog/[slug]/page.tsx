import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import { routing } from '@portfolio/i18n/src/routing';
import { formatDateSN } from '@portfolio/utils';
import { Badge } from '@portfolio/ui';
import { getAllBlogPosts, getBlogPost, getRelatedPosts, extractHeadings } from '@/lib/blog';
import { profil } from '@/lib/content';
import { env } from '@/lib/env';
import { localePath } from '@/lib/localePath';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  // notFound() ici, pas seulement `return {}` : sans ça, la résolution des
  // métadonnées "réussit" (silencieusement, avec un objet vide) avant que
  // le composant de page n'appelle lui-même notFound() — le statut HTTP
  // reste 200 au lieu de 404 (route sans slug pré-rendu par
  // generateStaticParams, cas vérifié en conditions réelles avec `next start`).
  if (!post) notFound();

  const url = `${env.SITE_URL}${localePath(locale, `/blog/${post.slug}`)}`;

  return {
    title: `${post.titre} — ${profil.identite.nomComplet}`,
    description: post.extrait,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          `${env.SITE_URL}${localePath(loc, `/blog/${post.slug}`)}`,
        ]),
      ),
    },
    openGraph: {
      title: post.titre,
      description: post.extrait,
      url,
      type: 'article',
      publishedTime: post.datePublication,
      modifiedTime: post.dateMiseAJour ?? post.datePublication,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const t = await getTranslations('Blog');
  const themeLabel: Record<typeof post.theme, string> = {
    dev: t('filterDev'),
    compta: t('filterCompta'),
    infra: t('filterInfra'),
  };
  const headings = extractHeadings(post.content);
  const related = getRelatedPosts(post);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.titre,
    description: post.extrait,
    datePublished: post.datePublication,
    dateModified: post.dateMiseAJour ?? post.datePublication,
    author: { '@type': 'Person', name: profil.identite.nomComplet, url: env.SITE_URL },
    url: `${env.SITE_URL}${localePath(routing.defaultLocale, `/blog/${post.slug}`)}`,
  };

  return (
    <article className="mx-auto max-w-[1280px] px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <header className="max-w-3xl">
        <Badge variant={post.theme}>{themeLabel[post.theme]}</Badge>
        <h1 className="font-heading text-app-text mt-4 text-3xl font-bold">{post.titre}</h1>
        <p className="text-app-text-muted mt-3 text-sm">
          {formatDateSN(post.datePublication)} ·{' '}
          {t('readingTime', { minutes: post.readingTimeMinutes })}
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="mdx-content prose prose-neutral max-w-none">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  rehypeSlug,
                  [
                    rehypePrettyCode,
                    {
                      theme: { dark: 'github-dark', light: 'github-light' },
                      keepBackground: false,
                    },
                  ],
                ],
              },
            }}
          />
        </div>
        <TableOfContents headings={headings} heading={t('tocHeading')} />
      </div>

      <RelatedPosts posts={related} heading={t('relatedHeading')} />
    </article>
  );
}
