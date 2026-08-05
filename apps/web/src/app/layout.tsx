import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-body' });

export const metadata: Metadata = {
  title: '[À COMPLÉTER : Nom complet] — [À COMPLÉTER : Titre professionnel]',
  description: '[À COMPLÉTER : proposition de valeur en une phrase — MODULE 2]',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
