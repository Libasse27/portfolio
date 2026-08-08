import type { BlogPostFrontmatter } from '@portfolio/validations';

/** Forme retournée par apps/api (miroir de database/prisma/schema.prisma `BlogPost`). */
export interface BlogPostRecord extends BlogPostFrontmatter {
  id: string;
  slug: string;
  corps: string;
  createdAt: string;
  updatedAt: string;
}
