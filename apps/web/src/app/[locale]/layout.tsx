import type { Metadata } from 'next';
import { Unbounded, Public_Sans, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import { routing, messages, type AppLocale } from '@portfolio/i18n';
import { Navigation } from '@/components/Navigation';
import { ThemeScript } from '@/components/ThemeScript';
import { StructuredData } from '@/components/StructuredData';
import { profil } from '@/lib/content';
import { env } from '@/lib/env';
import '../globals.css';

// Direction typographique validée en Phase 1 : Unbounded (titres) + Public Sans
// (corps) + JetBrains Mono (code/données), voir docs/03-DesignSystem/.
const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-heading',
});
const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-body',
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-mono',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function localePath(locale: string) {
  return locale === routing.defaultLocale ? '/' : `/${locale}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const title = t('title');
  const description = t('description');
  const url = `${env.SITE_URL}${localePath(locale)}`;

  return {
    metadataBase: new URL(env.SITE_URL),
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${env.SITE_URL}${localePath(loc)}`]),
      ),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: profil.identite.nomComplet,
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: requested } = await params;
  if (!hasLocale(routing.locales, requested)) {
    notFound();
  }
  const locale: AppLocale = requested;

  // Rendu statique : sans cet appel, l'usage de useTranslations/getTranslations
  // dans les enfants dégraderait toute la route en rendu dynamique (MODULE 14).
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${unbounded.variable} ${publicSans.variable} ${jetBrainsMono.variable}`}
      // ThemeScript pose data-theme sur <html> avant l'hydratation (ADR 0002,
      // anti-flash) : React doit ignorer cet attribut posé hors de son contrôle.
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <StructuredData locale={locale} />
      </head>
      <body className="font-sans">
        <NextIntlClientProvider locale={locale} messages={messages[locale]}>
          {/* Respecte prefers-reduced-motion globalement (MODULE 12) plutôt
              que de le vérifier dans chaque composant animé. LazyMotion
              (mode strict) impose l'usage de `m.*` plutôt que `motion.*`
              partout dans l'arbre — évite de réembarquer les proxies de
              composants complets (ADR 0004, budget JS MODULE 14). */}
          <LazyMotion features={domAnimation} strict>
            <MotionConfig reducedMotion="user">
              <Navigation />
              {children}
            </MotionConfig>
          </LazyMotion>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
