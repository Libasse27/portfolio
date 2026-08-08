import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BlogPostForm } from './BlogPostForm';

describe('BlogPostForm', () => {
  it('pré-remplit les champs à partir de defaultValues', () => {
    render(
      <BlogPostForm
        action={vi.fn()}
        submitLabel="Enregistrer"
        defaultValues={{
          titre: 'Mon article',
          extrait: 'Résumé',
          corps: '## Titre',
          datePublication: '2026-08-08',
          theme: 'dev',
          tags: ['nextjs', 'nestjs'],
        }}
      />,
    );

    expect(screen.getByLabelText('Titre')).toHaveValue('Mon article');
    expect(screen.getByLabelText('Extrait')).toHaveValue('Résumé');
    expect(screen.getByLabelText('Tags (séparés par des virgules)')).toHaveValue('nextjs, nestjs');
    expect(screen.getByRole('button', { name: 'Enregistrer' })).toBeInTheDocument();
  });
});
