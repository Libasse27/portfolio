import { z } from 'zod';

/** Schéma imposé par le MODULE 6.1 du master prompt — fiche projet. */
export const projectSchema = z.object({
  slug: z.string().min(1),
  titre: z.string().min(1),
  accroche: z.string().min(1),
  categorie: z.enum(['saas', 'application-metier', 'site-web', 'infrastructure', 'automatisation']),
  poles: z.array(z.enum(['dev', 'compta', 'infra'])).min(1),
  statut: z.enum(['en-production', 'en-developpement', 'prototype', 'archive']),
  periode: z.object({
    debut: z.string().min(1),
    fin: z.string().optional(),
  }),
  client: z.string().min(1),
  role: z.string().min(1),

  contexte: z.string().min(1),
  objectifs: z.array(z.string().min(1)),
  contraintes: z.array(z.string().min(1)),

  stack: z.array(
    z.object({
      categorie: z.string().min(1),
      technologies: z.array(z.string().min(1)).min(1),
    }),
  ),
  architecture: z.object({
    description: z.string().min(1),
    schema: z.string().min(1),
    decisions: z.array(
      z.object({
        choix: z.string().min(1),
        justification: z.string().min(1),
        alternative: z.string().min(1),
      }),
    ),
  }),

  fonctionnalites: z.array(
    z.object({
      module: z.string().min(1),
      description: z.string().min(1),
    }),
  ),
  defis: z.array(
    z.object({
      probleme: z.string().min(1),
      solution: z.string().min(1),
      resultat: z.string().min(1),
    }),
  ),
  resultats: z.array(
    z.object({
      metrique: z.string().min(1),
      valeur: z.string().min(1),
    }),
  ),
  lecons: z.array(z.string().min(1)),

  medias: z.object({
    captures: z.array(z.string().min(1)),
    video: z.string().optional(),
    demo: z.string().optional(),
    repo: z.string().optional(),
  }),
  confidentialite: z.enum(['public', 'partiel', 'sous-nda']),
});

export type Project = z.infer<typeof projectSchema>;
