import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('affiche son contenu', () => {
    render(<Button>Me contacter</Button>);
    expect(screen.getByRole('button', { name: 'Me contacter' })).toBeInTheDocument();
  });

  it('expose le variant via data-variant', () => {
    render(<Button variant="secondary">Voir les projets</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'secondary');
  });

  it('utilise "primary" comme variant par défaut', () => {
    render(<Button>Défaut</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'primary');
  });
});
