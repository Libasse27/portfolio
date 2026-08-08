import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@portfolio/i18n/src/routing';
import { getAllBlogPosts } from '@/lib/blog';
import { profil } from '@/lib/content';
import { env } from '@/lib/env';
import { localePath } from '@/lib/localePath';
import { SectionReveal } from '@/components/SectionReveal';
import { BlogFilter } from '@/components/blog/BlogFilter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });
  const title = `${t('heading')} — ${profil.identite.nomComplet}`;
  const description = t('metaDescription');
  const url = `${env.SITE_URL}${localePath(locale, '/blog')}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${env.SITE_URL}${localePath(loc, '/blog')}`]),
      ),
    },
    openGraph: { title, description, url, type: 'website' },
  };
}

export default async function BlogIndexPage() {
  const t = await getTranslations('Blog');
  const posts = getAllBlogPosts();

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-24">
      <SectionReveal>
        <h1 className="font-heading text-app-text text-3xl font-bold">{t('heading')}</h1>
        <p className="text-app-text-muted mt-2 max-w-2xl">{t('intro')}</p>
        <div className="mt-8">
          <BlogFilter posts={posts} />
        </div>
      </SectionReveal>
    </section>
  );
}
