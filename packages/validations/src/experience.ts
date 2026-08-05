import { z } from 'zod';

/** Schéma imposé par le MODULE 7 du master prompt — expérience professionnelle. */
export const experienceSchema = z.object({
  entreprise: z.string().min(1),
  secteur: z.string().min(1),
  logo: z.string().optional(),
  poste: z.string().min(1),
  type: z.enum(['CDI', 'CDD', 'Freelance', 'Consultant', 'Prestation']),
  periode: z.object({
    debut: z.string().min(1),
    fin: z.string().nullable(),
  }),
  lieu: z.string().min(1),
  contexte: z.string().min(1),
  responsabilites: z.array(z.string().min(1)).min(1),
  realisations: z.array(z.string().min(1)).min(1),
  technologies: z.array(z.string().min(1)),
  polesMobilises: z.array(z.enum(['dev', 'compta', 'infra'])).min(1),
});

export type Experience = z.infer<typeof experienceSchema>;
