import { z } from 'zod';

/**
 * Format imposé par le MODULE 5 — pas de barre de progression en pourcentage
 * (anti-pattern, ANNEXE B) : niveaux nommés associés à une preuve vérifiable.
 */
export const skillLevelSchema = z.enum(['Notions', 'Opérationnel', 'Avancé', 'Expert']);

export const skillSchema = z.object({
  nom: z.string().min(1),
  pole: z.enum(['dev', 'compta', 'infra', 'transverse']),
  niveau: skillLevelSchema,
  annees: z.number().positive(),
  /** Slug du projet ou nom de la certification qui atteste la compétence. */
  preuve: z.string().min(1),
});

export type SkillLevel = z.infer<typeof skillLevelSchema>;
export type Skill = z.infer<typeof skillSchema>;
