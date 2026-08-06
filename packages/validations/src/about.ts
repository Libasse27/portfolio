import { z } from 'zod';

/**
 * Schéma imposé par les MODULES 2, 2.1, 3, 4 et 11 du master prompt — profil
 * unique (identité, récit, positionnement, chiffres clés). `differenciateurs`
 * n'impose pas .min(5) : Positionnement.md a explicitement écarté le 5e angle
 * générique (conformité bailleurs, sans expérience réelle) plutôt que de le
 * remplacer par du contenu générique (règle 0.2.1).
 */
export const aboutSchema = z.object({
  identite: z.object({
    nomComplet: z.string().min(1),
    titre: z.string().min(1),
    slogan: z.string().min(1),
    localisation: z.object({
      ville: z.string().min(1),
      pays: z.string().min(1),
      zoneIntervention: z.array(z.string().min(1)).min(1),
    }),
    langues: z.array(z.object({ langue: z.string().min(1), niveau: z.string().min(1) })).min(1),
    disponibilite: z.object({
      statut: z.string().min(1),
      modalites: z.array(z.string().min(1)).min(1),
      delaiDemarrage: z.string().min(1),
    }),
    contacts: z.object({
      emailPro: z.string().email(),
      telephone: z.string().min(1),
      whatsapp: z.string().min(1),
      linkedin: z.string().min(1),
      github: z.string().min(1),
      // Nom de domaine pas encore acquis (PersonalBrand.md) : absent tant
      // qu'il n'est pas réservé, plutôt que rempli d'un texte factice.
      portfolio: z.string().min(1).optional(),
    }),
  }),

  vision: z.string().min(1),
  mission: z.string().min(1),
  valeurs: z.array(z.object({ nom: z.string().min(1), description: z.string().min(1) })).min(1),

  recit: z.object({
    quiSuisJe: z.string().min(1),
    parcours: z.string().min(1),
    filConducteur: z.string().min(1),
    difficultes: z
      .array(z.object({ probleme: z.string().min(1), lecon: z.string().min(1) }))
      .min(1),
    reussites: z
      .array(z.object({ titre: z.string().min(1), description: z.string().min(1) }))
      .min(1),
    philosophie: z.string().min(1),
    ambitions: z.string().min(1),
  }),

  differenciateurs: z.array(z.string().min(1)).min(1),

  positionnement: z.object({
    narratif: z.string().min(1),
    poles: z
      .array(
        z.object({
          id: z.enum(['dev', 'compta', 'infra']),
          nom: z.string().min(1),
          description: z.string().min(1),
        }),
      )
      .min(1),
    intersections: z
      .array(
        z.object({
          poles: z.array(z.enum(['dev', 'compta', 'infra'])).min(2),
          titre: z.string().min(1),
          illustration: z.string().min(1),
        }),
      )
      .min(1),
  }),

  metriques: z
    .array(
      z.object({
        indicateur: z.string().min(1),
        valeur: z.string().min(1),
        note: z.string().optional(),
      }),
    )
    .min(1),

  // Chiffre "clients / organisations accompagnés" (MODULE 11) détaillé par
  // des noms réels, cités sous réserve de vérification/autorisation
  // (PersonalBrand.md) — non affichables publiquement tant que non levés.
  organisationsCitees: z.object({
    liste: z.array(z.string().min(1)).min(1),
    statutAutorisation: z.enum(['a-verifier', 'autorise']),
  }),
});

export type About = z.infer<typeof aboutSchema>;
