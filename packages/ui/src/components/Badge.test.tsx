import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('affiche son contenu', () => {
    render(<Badge>Développement</Badge>);
    expect(screen.getByText('Développement')).toBeInTheDocument();
  });

  it('expose le variant via data-variant', () => {
    render(<Badge variant="compta">Comptabilité</Badge>);
    expect(screen.getByText('Comptabilité')).toHaveAttribute('data-variant', 'compta');
  });

  it('utilise "neutral" comme variant par défaut', () => {
    render(<Badge>Disponible</Badge>);
    expect(screen.getByText('Disponible')).toHaveAttribute('data-variant', 'neutral');
  });
});
