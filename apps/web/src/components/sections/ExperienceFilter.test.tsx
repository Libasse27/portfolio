import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messagesFr from '@portfolio/i18n/src/messages/fr.json';
import { experiences } from '@/lib/content';
import { ExperienceFilter } from './ExperienceFilter';

const [firstExperience] = experiences;
if (!firstExperience)
  throw new Error('content/experience doit contenir au moins un poste pour ce test');

function renderFilter() {
  return render(
    <NextIntlClientProvider locale="fr" messages={messagesFr}>
      <ExperienceFilter experiences={experiences} />
    </NextIntlClientProvider>,
  );
}

describe('ExperienceFilter', () => {
  it('affiche les expériences par défaut ("Tous les pôles")', () => {
    renderFilter();
    expect(screen.getByText(firstExperience.entreprise, { exact: false })).toBeInTheDocument();
  });

  it('affiche un état vide pour un pôle sans expérience associée', () => {
    renderFilter();
    fireEvent.click(screen.getByRole('button', { name: messagesFr.Experience.filterDev }));
    expect(screen.getByText(messagesFr.Experience.emptyState)).toBeInTheDocument();
  });

  it('affiche les expériences du pôle infra au filtre correspondant', () => {
    renderFilter();
    fireEvent.click(screen.getByRole('button', { name: messagesFr.Experience.filterInfra }));
    expect(screen.getByText(firstExperience.entreprise, { exact: false })).toBeInTheDocument();
  });
});
