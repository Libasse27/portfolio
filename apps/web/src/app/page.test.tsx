import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from './page';

describe('HomePage', () => {
  it('affiche un titre de niveau 1 unique', () => {
    render(<HomePage />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it("affiche un appel à l'action vers les projets", () => {
    render(<HomePage />);
    expect(screen.getByRole('button', { name: 'Voir les projets' })).toBeInTheDocument();
  });
});
