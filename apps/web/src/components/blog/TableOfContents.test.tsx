import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TableOfContents } from './TableOfContents';

describe('TableOfContents', () => {
  it("ne rend rien sans titre extrait de l'article", () => {
    const { container } = render(<TableOfContents headings={[]} heading="Sommaire" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('affiche un lien par titre, pointant vers son ancre', () => {
    render(
      <TableOfContents
        headings={[
          { depth: 2, text: 'Introduction', id: 'introduction' },
          { depth: 3, text: 'Détail', id: 'détail' },
        ]}
        heading="Sommaire"
      />,
    );

    expect(screen.getByRole('navigation', { name: 'Sommaire' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Introduction' })).toHaveAttribute(
      'href',
      '#introduction',
    );
    expect(screen.getByRole('link', { name: 'Détail' })).toHaveAttribute('href', '#détail');
  });
});
