import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messagesFr from '@portfolio/i18n/src/messages/fr.json';
import { MobileMenu } from './MobileMenu';

// Mock autonome (voir LanguageSwitcher.test.tsx) : évite d'évaluer
// packages/i18n/src/navigation.ts, qui dépend de next/navigation.
vi.mock('@portfolio/i18n', () => ({
  routing: { locales: ['fr', 'en'], defaultLocale: 'fr' },
  usePathname: () => '/',
  useRouter: () => ({ replace: vi.fn() }),
}));

const firstLink = { href: '#expertise', label: messagesFr.Navigation.expertiseLink };
const links = [firstLink, { href: '#a-propos', label: messagesFr.Navigation.aboutLink }];

function renderMobileMenu() {
  return render(
    <NextIntlClientProvider locale="fr" messages={messagesFr}>
      <MobileMenu links={links} contactCta={messagesFr.Navigation.contactCta} />
    </NextIntlClientProvider>,
  );
}

describe('MobileMenu', () => {
  it('déplace le focus vers le bouton de fermeture à l’ouverture', () => {
    renderMobileMenu();

    fireEvent.click(screen.getByRole('button', { name: messagesFr.Navigation.menuOpen }));

    expect(screen.getByRole('button', { name: messagesFr.Navigation.menuClose })).toHaveFocus();
  });

  it('ferme le menu et restitue le focus au bouton d’ouverture avec Échap', () => {
    renderMobileMenu();

    const openButton = screen.getByRole('button', { name: messagesFr.Navigation.menuOpen });
    fireEvent.click(openButton);
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(
      screen.queryByRole('button', { name: messagesFr.Navigation.menuClose }),
    ).not.toBeInTheDocument();
    expect(openButton).toHaveFocus();
  });

  it('piège le focus dans le panneau : Tab sur le dernier élément revient au premier', () => {
    renderMobileMenu();

    fireEvent.click(screen.getByRole('button', { name: messagesFr.Navigation.menuOpen }));

    const closeButton = screen.getByRole('button', { name: messagesFr.Navigation.menuClose });
    const contactLink = screen.getByRole('link', { name: messagesFr.Navigation.contactCta });

    contactLink.focus();
    fireEvent.keyDown(document, { key: 'Tab' });

    expect(closeButton).toHaveFocus();
  });

  it('piège le focus dans le panneau : Shift+Tab sur le premier élément revient au dernier', () => {
    renderMobileMenu();

    fireEvent.click(screen.getByRole('button', { name: messagesFr.Navigation.menuOpen }));

    const closeButton = screen.getByRole('button', { name: messagesFr.Navigation.menuClose });
    const contactLink = screen.getByRole('link', { name: messagesFr.Navigation.contactCta });

    closeButton.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });

    expect(contactLink).toHaveFocus();
  });

  it('ferme le menu au clic sur un lien de section', () => {
    renderMobileMenu();

    fireEvent.click(screen.getByRole('button', { name: messagesFr.Navigation.menuOpen }));
    fireEvent.click(screen.getByRole('link', { name: firstLink.label }));

    expect(
      screen.queryByRole('button', { name: messagesFr.Navigation.menuClose }),
    ).not.toBeInTheDocument();
  });
});
