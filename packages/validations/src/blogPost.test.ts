import { describe, expect, it } from 'vitest';
import { blogPostFrontmatterSchema } from './blogPost';

const valide = {
  titre: 'Automatiser un état SYSCOHADA avec Node.js',
  extrait: "Retour d'expérience sur la génération d'états financiers.",
  datePublication: '2026-08-07',
  theme: 'compta',
  tags: ['syscohada', 'node'],
};

describe('blogPostFrontmatterSchema', () => {
  it('accepte un frontmatter valide sans dateMiseAJour', () => {
    expect(blogPostFrontmatterSchema.safeParse(valide).success).toBe(true);
  });

  it('accepte un frontmatter valide avec dateMiseAJour', () => {
    expect(
      blogPostFrontmatterSchema.safeParse({ ...valide, dateMiseAJour: '2026-08-10' }).success,
    ).toBe(true);
  });

  it('rejette un theme hors de dev/compta/infra', () => {
    expect(blogPostFrontmatterSchema.safeParse({ ...valide, theme: 'design' }).success).toBe(false);
  });

  it('rejette une date de publication mal formée', () => {
    expect(
      blogPostFrontmatterSchema.safeParse({ ...valide, datePublication: '07/08/2026' }).success,
    ).toBe(false);
  });

  it('rejette une liste de tags vide', () => {
    expect(blogPostFrontmatterSchema.safeParse({ ...valide, tags: [] }).success).toBe(false);
  });

  it('rejette un titre vide', () => {
    expect(blogPostFrontmatterSchema.safeParse({ ...valide, titre: '' }).success).toBe(false);
  });
});
