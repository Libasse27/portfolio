import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messagesFr from '@portfolio/i18n/src/messages/fr.json';
import type { BlogPost } from '@/lib/blog';
import { BlogFilter } from './BlogFilter';

// Mock autonome (voir Navigation.test.tsx) : évite d'évaluer
// packages/i18n/src/navigation.ts, qui dépend de next/navigation.
vi.mock('@portfolio/i18n', () => ({
  Link: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

const posts: BlogPost[] = [
  {
    slug: 'article-dev',
    titre: 'Article développement',
    extrait: 'Un extrait dev.',
    datePublication: '2026-08-01',
    theme: 'dev',
    tags: ['nextjs'],
    content: '',
    readingTimeMinutes: 4,
  },
  {
    slug: 'article-compta',
    titre: 'Article comptabilité',
    extrait: 'Un extrait compta.',
    datePublication: '2026-07-15',
    theme: 'compta',
    tags: ['syscohada'],
    content: '',
    readingTimeMinutes: 6,
  },
];

function renderFilter(items: BlogPost[]) {
  return render(
    <NextIntlClientProvider locale="fr" messages={messagesFr}>
      <BlogFilter posts={items} />
    </NextIntlClientProvider>,
  );
}

describe('BlogFilter', () => {
  it('affiche tous les articles par défaut ("Tous les thèmes")', () => {
    renderFilter(posts);
    expect(screen.getByText('Article développement')).toBeInTheDocument();
    expect(screen.getByText('Article comptabilité')).toBeInTheDocument();
  });

  it('filtre par thème au clic', () => {
    renderFilter(posts);
    fireEvent.click(screen.getByRole('button', { name: messagesFr.Blog.filterCompta }));

    expect(screen.getByText('Article comptabilité')).toBeInTheDocument();
    expect(screen.queryByText('Article développement')).not.toBeInTheDocument();
  });

  it("affiche l'état vide quand aucun article ne correspond au thème sélectionné", () => {
    renderFilter(posts);
    fireEvent.click(screen.getByRole('button', { name: messagesFr.Blog.filterInfra }));
    expect(screen.getByText(messagesFr.Blog.emptyState)).toBeInTheDocument();
  });

  it("affiche l'état vide quand aucun article n'existe (ADR 0009)", () => {
    renderFilter([]);
    expect(screen.getByText(messagesFr.Blog.emptyState)).toBeInTheDocument();
  });
});
