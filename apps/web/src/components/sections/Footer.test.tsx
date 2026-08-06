import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import messagesFr from '@portfolio/i18n/src/messages/fr.json';
import { profil } from '@/lib/content';
import { Footer } from './Footer';

vi.mock('next-intl/server', () => ({
  getTranslations: async (namespace: string) => {
    const dict = messagesFr[namespace as keyof typeof messagesFr] as Record<string, string>;
    return (key: string) => dict[key];
  },
}));

describe('Footer', () => {
  it('affiche le plan du site vers les sections existantes et le retour en haut', async () => {
    render(await Footer());

    expect(screen.getByRole('link', { name: messagesFr.Navigation.expertiseLink })).toHaveAttribute(
      'href',
      '#expertise',
    );
    expect(screen.getByRole('link', { name: messagesFr.Navigation.contactLink })).toHaveAttribute(
      'href',
      '#contact',
    );
    expect(screen.getByRole('link', { name: messagesFr.Footer.backToTop })).toHaveAttribute(
      'href',
      '#hero',
    );
    expect(screen.getByText(messagesFr.Footer.legalPending, { exact: false })).toBeInTheDocument();
    expect(
      screen.getAllByText(profil.identite.nomComplet, { exact: false }).length,
    ).toBeGreaterThan(0);
  });
});
