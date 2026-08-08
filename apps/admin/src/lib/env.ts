import { z } from 'zod';

const envSchema = z.object({
  API_URL: z.string().url(),
});

/**
 * Fonction plutôt que constante évaluée à l'import (contrairement à
 * `apps/web/src/lib/env.ts`, où `SITE_URL` a une valeur par défaut sûre) :
 * `API_URL` n'en a pas — sans API réelle déployée, apps/admin ne peut pas
 * fonctionner (ADR 0011). Valider à l'import casserait `next build` en CI,
 * où aucune API réelle n'existe ; valider seulement au moment d'un appel
 * réseau (Server Action/Component) laisse le build passer et échoue
 * clairement à l'exécution si la variable manque toujours.
 */
export function getApiUrl(): string {
  return envSchema.parse({ API_URL: process.env.API_URL }).API_URL;
}
