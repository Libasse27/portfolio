import type { Metadata } from 'next';
import { Unbounded, Public_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
  title: '[À COMPLÉTER : Nom complet] — [À COMPLÉTER : Titre professionnel]',
  description: '[À COMPLÉTER : proposition de valeur en une phrase — MODULE 2]',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${unbounded.variable} ${publicSans.variable} ${jetBrainsMono.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
