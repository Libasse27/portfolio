import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messagesFr from '@portfolio/i18n/src/messages/fr.json';
import { LanguageSwitcher } from './LanguageSwitcher';

const replace = vi.fn();

// Mock autonome : ne PAS réutiliser le module réel via vi.importActual, qui
// évaluerait packages/i18n/src/navigation.ts (donc next-intl/navigation, donc
// next/navigation) — injoignable sous Vitest en dehors du runtime App Router
// de Next.js.
vi.mock('@portfolio/i18n', () => ({
  routing: { locales: ['fr', 'en'], defaultLocale: 'fr' },
  usePathname: () => '/',
  useRouter: () => ({ replace }),
}));

function renderSwitcher() {
  return render(
    <NextIntlClientProvider locale="fr" messages={messagesFr}>
      <LanguageSwitcher />
    </NextIntlClientProvider>,
  );
}

describe('LanguageSwitcher', () => {
  it('signale la langue active via aria-current', () => {
    renderSwitcher();

    expect(screen.getByRole('button', { name: messagesFr.LanguageSwitcher.fr })).toHaveAttribute(
      'aria-current',
      'true',
    );
    expect(
      screen.getByRole('button', { name: messagesFr.LanguageSwitcher.en }),
    ).not.toHaveAttribute('aria-current');
  });

  it('change de locale en conservant le chemin courant au clic', () => {
    renderSwitcher();

    fireEvent.click(screen.getByRole('button', { name: messagesFr.LanguageSwitcher.en }));

    expect(replace).toHaveBeenCalledWith('/', { locale: 'en' });
  });
});
