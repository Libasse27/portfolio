import { z } from 'zod';

/**
 * Schéma imposé par le MODULE 13.13 du master prompt — formulaire de
 * contact. `societe` est un champ honeypot anti-spam (MODULE 17.19) : un
 * champ invisible pour un humain, rempli uniquement par les bots — la
 * soumission doit être rejetée s'il n'est pas vide. Réutilisable tel quel
 * côté serveur quand `apps/api` existera (ADR 0003).
 */
export const contactFormSchema = z.object({
  nom: z.string().min(1),
  email: z.string().email(),
  organisation: z.string().optional(),
  typeProjet: z.string().min(1),
  budget: z.string().optional(),
  message: z.string().min(1),
  societe: z.string().max(0).optional(),
});

export type ContactForm = z.infer<typeof contactFormSchema>;
