import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Administration — Portfolio Libaase Dia',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
