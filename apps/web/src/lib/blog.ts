import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import { blogPostFrontmatterSchema, type BlogPostFrontmatter } from '@portfolio/validations';

// content/blog n'est pas importé statiquement (contrairement à
// content/about, content/experience — voir apps/web/src/lib/content.ts) :
// le nombre d'articles n'est pas connu à l'écriture du code, fs.readdirSync
// est nécessaire (ADR 0009, décision 2). N'exécute que côté serveur/build.
const BLOG_DIR = path.join(process.cwd(), '../../content/blog');
const MOTS_PAR_MINUTE = 200;

export type BlogPost = BlogPostFrontmatter & {
  slug: string;
  content: string;
  readingTimeMinutes: number;
};

export type BlogHeading = { depth: 2 | 3; text: string; id: string };

function computeReadingTimeMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / MOTS_PAR_MINUTE));
}

/**
 * Extrait les titres ##/### du Markdown brut (pas de l'arbre compilé, pour
 * rester un simple Server Component sans dépendre de l'AST MDX) et leur
 * assigne le même id que `rehype-slug` (même bibliothèque sous-jacente,
 * `github-slugger`, y compris la gestion des doublons) — ADR 0009, décision 6.
 */
export function extractHeadings(markdown: string): BlogHeading[] {
  const slugger = new GithubSlugger();
  const headings: BlogHeading[] = [];
  for (const line of markdown.split('\n')) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    const hashes = match?.[1];
    const rawText = match?.[2];
    if (!hashes || !rawText) continue;
    const depth = hashes.length as 2 | 3;
    const text = rawText.trim();
    headings.push({ depth, text, id: slugger.slug(text) });
  }
  return headings;
}

function readPostFile(fileName: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), 'utf-8');
  const { data, content } = matter(raw);
  const frontmatter = blogPostFrontmatterSchema.parse(data);
  return {
    ...frontmatter,
    slug: fileName.replace(/\.mdx$/, ''),
    content,
    readingTimeMinutes: computeReadingTimeMinutes(content),
  };
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map(readPostFile)
    .sort((a, b) => b.datePublication.localeCompare(a.datePublication));
}

export function getBlogPost(slug: string): BlogPost | null {
  return getAllBlogPosts().find((post) => post.slug === slug) ?? null;
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return getAllBlogPosts()
    .filter((candidate) => candidate.slug !== post.slug && candidate.theme === post.theme)
    .slice(0, limit);
}
