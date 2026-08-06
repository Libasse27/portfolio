import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messagesFr from '@portfolio/i18n/src/messages/fr.json';
import { profil } from '@/lib/content';
import { VennDiagram } from './VennDiagram';

function renderDiagram() {
  const { poles, intersections } = profil.positionnement;
  return render(
    <NextIntlClientProvider locale="fr" messages={messagesFr}>
      <VennDiagram poles={poles} intersections={intersections} />
    </NextIntlClientProvider>,
  );
}

describe('VennDiagram', () => {
  it("affiche l'indice par défaut, sans intersection sélectionnée", () => {
    renderDiagram();
    expect(screen.getByText(messagesFr.TripleExpertise.hint)).toBeInTheDocument();
  });

  it("révèle l'illustration d'une intersection au clic", () => {
    renderDiagram();
    const [first] = profil.positionnement.intersections;
    if (!first)
      throw new Error('profil.positionnement.intersections doit contenir au moins une entrée');
    const button = screen.getByRole('button', {
      name: messagesFr.TripleExpertise.intersectionLabel.replace('{titre}', first.titre),
    });

    fireEvent.click(button);

    expect(screen.getByText(first.titre)).toBeInTheDocument();
    expect(screen.getByText(first.illustration)).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });
});
