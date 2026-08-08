import { blogPostFrontmatterSchema } from '@portfolio/validations';
import { z } from 'zod';

/**
 * Frontmatter (`@portfolio/validations`) + corps Markdown/MDX — même
 * schéma que le contenu fichier (ADR 0009), pour que l'API et le site
 * public ne valident jamais un article différemment (ADR 0010, décision 5).
 * `slug` n'est pas un champ d'entrée : dérivé du titre à la création par
 * `blog.service.ts`, jamais désynchronisable (même principe que ADR 0009
 * décision 4, appliqué à un titre plutôt qu'à un nom de fichier).
 */
export const createBlogPostSchema = blogPostFrontmatterSchema.extend({
  corps: z.string().min(1),
});

export const updateBlogPostSchema = createBlogPostSchema.partial();

export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>;
