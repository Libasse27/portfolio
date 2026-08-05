import { describe, expect, it } from 'vitest';
import { formatFCFA } from './formatFCFA';

/** \s couvre aussi l'espace insécable fine que l'ICU fr-SN utilise comme séparateur de milliers. */
function stripSpaces(value: string): string {
  return value.replace(/\s/g, '');
}

describe('formatFCFA', () => {
  it('formate un montant entier sans décimale', () => {
    expect(stripSpaces(formatFCFA(1500000))).toContain('1500000');
  });

  it('inclut le symbole de la devise XOF', () => {
    expect(stripSpaces(formatFCFA(1000))).toContain('FCFA');
  });

  it('gère le montant zéro', () => {
    expect(formatFCFA(0)).toContain('0');
  });
});
