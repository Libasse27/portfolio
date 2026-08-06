import { describe, expect, it } from 'vitest';
import { contactFormSchema } from './contact';

const valide = {
  nom: 'Aïssatou Fall',
  email: 'aissatou.fall@example.com',
  typeProjet: 'ERP de gestion commerciale',
  message: "Bonjour, je souhaite discuter d'un projet d'ERP pour mon entreprise.",
};

describe('contactFormSchema', () => {
  it('accepte un formulaire valide avec champs optionnels omis', () => {
    expect(contactFormSchema.safeParse(valide).success).toBe(true);
  });

  it('accepte un formulaire valide avec tous les champs renseignés', () => {
    expect(
      contactFormSchema.safeParse({
        ...valide,
        organisation: 'Fall & Fils',
        budget: '5 000 000 - 10 000 000 FCFA',
        societe: '',
      }).success,
    ).toBe(true);
  });

  it('rejette un email invalide', () => {
    expect(contactFormSchema.safeParse({ ...valide, email: 'pas-un-email' }).success).toBe(false);
  });

  it('rejette un message vide', () => {
    expect(contactFormSchema.safeParse({ ...valide, message: '' }).success).toBe(false);
  });

  it('rejette une soumission avec le champ honeypot rempli (bot)', () => {
    expect(contactFormSchema.safeParse({ ...valide, societe: 'Bot Corp' }).success).toBe(false);
  });
});
