import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LinkButton } from './LinkButton';

describe('LinkButton', () => {
  it('affiche un lien avec son contenu et son href', () => {
    render(<LinkButton href="#contact">Me contacter</LinkButton>);
    expect(screen.getByRole('link', { name: 'Me contacter' })).toHaveAttribute('href', '#contact');
  });

  it('expose le variant via data-variant', () => {
    render(
      <LinkButton href="#a-propos" variant="secondary">
        Découvrir mon parcours
      </LinkButton>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('data-variant', 'secondary');
  });
});
