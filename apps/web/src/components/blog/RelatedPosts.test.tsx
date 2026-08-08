import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { BlogPost } from '@/lib/blog';
import { RelatedPosts } from './RelatedPosts';

vi.mock('@portfolio/i18n', () => ({
  Link: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

const related: BlogPost[] = [
  {
    slug: 'autre-article',
    titre: 'Un autre article',
    extrait: 'Extrait.',
    datePublication: '2026-08-01',
    theme: 'dev',
    tags: ['nextjs'],
    content: '',
    readingTimeMinutes: 3,
  },
];

describe('RelatedPosts', () => {
  it('ne rend rien sans article lié', () => {
    const { container } = render(<RelatedPosts posts={[]} heading="Articles liés" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('affiche un lien par article lié', () => {
    render(<RelatedPosts posts={related} heading="Articles liés" />);
    expect(screen.getByText('Articles liés')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Un autre article' })).toHaveAttribute(
      'href',
      '/blog/autre-article',
    );
  });
});
