import type { Metadata } from 'next';
import { Unbounded, Public_Sans, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, messages, type AppLocale } from '@portfolio/i18n';
import { Navigation } from '@/components/Navigation';
import { ThemeScript } from '@/components/ThemeScript';
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return { title: t('title'), description: t('description') };
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
    >
      <head>
        <ThemeScript />
      </head>
      <body className="font-sans">
        <NextIntlClientProvider locale={locale} messages={messages[locale]}>
          <Navigation />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
