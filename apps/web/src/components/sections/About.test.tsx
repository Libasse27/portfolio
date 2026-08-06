import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import messagesFr from '@portfolio/i18n/src/messages/fr.json';
import { profil } from '@/lib/content';
import { About } from './About';

vi.mock('next-intl/server', () => ({
  getTranslations: async (namespace: string) => {
    const dict = messagesFr[namespace as keyof typeof messagesFr] as Record<string, string>;
    return (key: string) => dict[key];
  },
}));

describe('About', () => {
  it('affiche le récit, les valeurs et les différenciateurs depuis content/about/profil.json', async () => {
    render(await About());

    expect(screen.getByText(profil.recit.quiSuisJe)).toBeInTheDocument();
    expect(screen.getByText(profil.recit.filConducteur)).toBeInTheDocument();
    for (const valeur of profil.valeurs) {
      expect(screen.getByText(valeur.nom)).toBeInTheDocument();
    }
    for (const item of profil.differenciateurs) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });
});
