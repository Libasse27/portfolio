import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import messagesFr from '@portfolio/i18n/src/messages/fr.json';
import { profil } from '@/lib/content';
import { Hero } from './Hero';

vi.mock('next-intl/server', () => ({
  getTranslations: async (namespace: string) => {
    const dict = messagesFr[namespace as keyof typeof messagesFr] as Record<string, string>;
    return (key: string) => dict[key];
  },
}));

describe('Hero', () => {
  it('affiche le nom, le titre et le slogan depuis content/about/profil.json', async () => {
    render(await Hero());
    expect(
      screen.getByRole('heading', { level: 1, name: profil.identite.nomComplet }),
    ).toBeInTheDocument();
    expect(screen.getByText(profil.identite.titre)).toBeInTheDocument();
    expect(screen.getByText(profil.identite.slogan)).toBeInTheDocument();
  });

  it('affiche un badge par pôle', async () => {
    render(await Hero());
    for (const pole of profil.positionnement.poles) {
      expect(screen.getByText(pole.nom)).toBeInTheDocument();
    }
  });

  it('propose des CTA vers #contact et #a-propos', async () => {
    render(await Hero());
    expect(screen.getByRole('link', { name: messagesFr.Hero.primaryCta })).toHaveAttribute(
      'href',
      '#contact',
    );
    expect(screen.getByRole('link', { name: messagesFr.Hero.secondaryCta })).toHaveAttribute(
      'href',
      '#a-propos',
    );
  });
});
