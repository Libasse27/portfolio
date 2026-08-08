import { z } from 'zod';

/**
 * Validées au bootstrap (`ConfigModule.forRoot({ validate })`, `main.ts`),
 * jamais à l'import d'un module isolé — les tests unitaires (qui
 * instancient un contrôleur/service via `Test.createTestingModule`, pas
 * l'`AppModule` complet) n'ont donc pas besoin de ces valeurs pour passer
 * en CI. Aucune valeur par défaut : contrairement à `SITE_URL` côté
 * `apps/web`, une base de données ou un secret JWT absent doit faire
 * échouer le démarrage, pas se rabattre sur une valeur qui aurait l'air
 * réelle (règle 0.2.2, ADR 0010).
 */
const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL est requis (aucune instance PostgreSQL par défaut)'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET doit faire au moins 32 caractères'),
  PORT: z.coerce.number().int().positive().default(3001),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): Env {
  return envSchema.parse(config);
}
