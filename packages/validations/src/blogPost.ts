import { z } from 'zod';

/**
 * Frontmatter d'un article de blog (MODULE 11, MODULE 15). `theme` reprend
 * les mêmes ids que les pôles (`positionnement.poles` de `about.ts`) : un
 * article se rattache à un pôle, ce qui réutilise directement la palette et
 * les badges de pôle existants (Badge dev/compta/infra) plutôt que
 * d'introduire une taxonomie de couleurs parallèle. `tags` reste libre pour
 * un classement plus fin. Le slug n'est pas dans le frontmatter : il est
 * dérivé du nom de fichier par le loader (`apps/web/src/lib/blog.ts`), pour
 * éviter toute désynchronisation entre nom de fichier et URL.
 */
export const blogPostFrontmatterSchema = z.object({
  titre: z.string().min(1),
  extrait: z.string().min(1),
  datePublication: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format attendu : AAAA-MM-JJ'),
  dateMiseAJour: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format attendu : AAAA-MM-JJ')
    .optional(),
  theme: z.enum(['dev', 'compta', 'infra']),
  tags: z.array(z.string().min(1)).min(1),
});

export type BlogPostFrontmatter = z.infer<typeof blogPostFrontmatterSchema>;
