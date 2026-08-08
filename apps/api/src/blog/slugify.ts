// Plage Unicode des diacritiques combinants (U+0300–U+036F), après
// normalisation NFD — construite via String.fromCharCode plutôt qu'un
// littéral pour éviter tout risque de corruption d'encodage du fichier.
const DIACRITICS_RANGE_START = String.fromCharCode(0x0300);
const DIACRITICS_RANGE_END = String.fromCharCode(0x036f);
const COMBINING_DIACRITICS = new RegExp(`[${DIACRITICS_RANGE_START}-${DIACRITICS_RANGE_END}]`, 'g');

/** Dérive un slug d'URL à partir d'un titre (minuscules, sans diacritiques, tirets). */
export function slugify(titre: string): string {
  return titre
    .normalize('NFD')
    .replace(COMBINING_DIACRITICS, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
