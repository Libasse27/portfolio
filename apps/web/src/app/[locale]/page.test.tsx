import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import messagesFr from '@portfolio/i18n/src/messages/fr.json';
import HomePage from './page';

// getTranslations() a besoin du contexte de requête Next.js (AsyncLocalStorage
// posé par le middleware), indisponible sous Vitest : on le remplace par un
// traducteur minimal lisant les vrais messages fr.json du package @portfolio/i18n.
// On importe le JSON par sous-chemin (et non via '@portfolio/i18n') pour ne pas
// évaluer packages/i18n/src/navigation.ts, qui dépend de next/navigation —
// injoignable sous Vitest en dehors du runtime App Router de Next.js.
vi.mock('next-intl/server', () => ({
  getTranslations: async (namespace: string) => {
    const dict = messagesFr[namespace as keyof typeof messagesFr] as Record<string, string>;
    return (key: string) => dict[key];
  },
}));

describe('HomePage', () => {
  it('affiche un titre de niveau 1 unique', async () => {
    render(await HomePage());
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it("affiche un appel à l'action vers les projets", async () => {
    render(await HomePage());
    expect(
      screen.getByRole('button', { name: messagesFr.HomePage.projectsCta }),
    ).toBeInTheDocument();
  });
});
