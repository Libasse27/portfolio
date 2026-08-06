import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messagesFr from '@portfolio/i18n/src/messages/fr.json';
import { Navigation } from './Navigation';

vi.mock('next-intl/server', () => ({
  getTranslations: async (namespace: string) => {
    const dict = messagesFr[namespace as keyof typeof messagesFr] as Record<string, string>;
    return (key: string) => dict[key];
  },
}));

// Mock autonome (voir LanguageSwitcher.test.tsx) : évite d'évaluer
// packages/i18n/src/navigation.ts, qui dépend de next/navigation.
vi.mock('@portfolio/i18n', () => ({
  routing: { locales: ['fr', 'en'], defaultLocale: 'fr' },
  usePathname: () => '/',
  useRouter: () => ({ replace: vi.fn() }),
  Link: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe('Navigation', () => {
  it('affiche le nom, le sélecteur de langue, la bascule de thème et le CTA contact', async () => {
    render(
      <NextIntlClientProvider locale="fr" messages={messagesFr}>
        {await Navigation()}
      </NextIntlClientProvider>,
    );

    expect(screen.getByText('LIBASSE DIA')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: messagesFr.Navigation.contactCta })).toHaveAttribute(
      'href',
      '#contact',
    );
    expect(
      screen.getByRole('group', { name: messagesFr.LanguageSwitcher.label }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: messagesFr.ThemeToggle.switchToLight }),
    ).toBeInTheDocument();
  });
});
