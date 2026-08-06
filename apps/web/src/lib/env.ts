import { z } from 'zod';

/**
 * Variables d'environnement validées au démarrage (MODULE 17.17). SITE_URL
 * n'a pas de valeur en dur : le nom de domaine n'est pas encore acquis
 * (PersonalBrand.md). Le défaut localhost ne doit JAMAIS être déployé tel
 * quel — voir apps/web/.env.example.
 */
const envSchema = z.object({
  SITE_URL: z.string().url().default('http://localhost:3000'),
});

export const env = envSchema.parse({
  SITE_URL: process.env.SITE_URL,
});
