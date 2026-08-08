import { describe, expect, it, vi, beforeEach } from 'vitest';
import { extractHeadings } from './blog';

describe('extractHeadings', () => {
  it('extrait les titres ## et ###, ignore # et ####', () => {
    const markdown = [
      '# Titre de page (h1, ignoré)',
      '',
      '## Introduction',
      'Un paragraphe.',
      '### Détail',
      '#### Sous-détail (ignoré)',
      '## Conclusion',
    ].join('\n');

    expect(extractHeadings(markdown)).toEqual([
      { depth: 2, text: 'Introduction', id: 'introduction' },
      { depth: 3, text: 'Détail', id: 'détail' },
      { depth: 2, text: 'Conclusion', id: 'conclusion' },
    ]);
  });

  it('déduplique les ids des titres identiques comme github-slugger', () => {
    const markdown = '## Contexte\n## Contexte';
    expect(extractHeadings(markdown)).toEqual([
      { depth: 2, text: 'Contexte', id: 'contexte' },
      { depth: 2, text: 'Contexte', id: 'contexte-1' },
    ]);
  });

  it('retourne un tableau vide sans titre', () => {
    expect(extractHeadings('Juste un paragraphe, sans titre.')).toEqual([]);
  });
});

describe('getAllBlogPosts / getBlogPost (content/blog réel)', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("retourne un tableau vide tant qu'aucun article n'est publié (ADR 0009)", async () => {
    const { getAllBlogPosts } = await import('./blog');
    expect(getAllBlogPosts()).toEqual([]);
  });

  it('retourne null pour un slug inexistant', async () => {
    const { getBlogPost } = await import('./blog');
    expect(getBlogPost('article-inexistant')).toBeNull();
  });
});

describe('getAllBlogPosts (répertoire simulé)', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.doMock('node:fs', () => ({
      default: {
        existsSync: vi.fn(() => true),
        readdirSync: vi.fn(() => ['premier-article.mdx', 'second-article.mdx', '.gitkeep']),
        readFileSync: vi.fn((filePath: string) => {
          if (filePath.includes('premier-article')) {
            return [
              '---',
              "titre: 'Premier article'",
              "extrait: 'Un extrait.'",
              "datePublication: '2026-08-01'",
              'theme: dev',
              "tags: ['nextjs']",
              '---',
              '## Introduction',
              Array(210).fill('mot').join(' '),
            ].join('\n');
          }
          return [
            '---',
            "titre: 'Second article'",
            "extrait: 'Un autre extrait.'",
            "datePublication: '2026-08-05'",
            'theme: dev',
            "tags: ['syscohada']",
            '---',
            'Contenu court.',
          ].join('\n');
        }),
      },
    }));
  });

  it('charge, trie par date décroissante et calcule le temps de lecture', async () => {
    const { getAllBlogPosts, getRelatedPosts } = await import('./blog');
    const posts = getAllBlogPosts();

    expect(posts.map((post) => post.slug)).toEqual(['second-article', 'premier-article']);
    const [premier, second] = [posts[1], posts[0]];
    if (!premier || !second) throw new Error('posts manquants');
    expect(premier.readingTimeMinutes).toBe(1); // ~210 mots / 200 mots-min, arrondi

    const related = getRelatedPosts(second);
    expect(related.map((post) => post.slug)).toEqual(['premier-article']);
  });
});
