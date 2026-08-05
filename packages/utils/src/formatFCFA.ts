/** Le XOF n'a pas de sous-unité usuelle : aucune décimale n'est affichée. */
export function formatFCFA(amount: number): string {
  return new Intl.NumberFormat('fr-SN', {
    style: 'currency',
    currency: 'XOF',
    maximumFractionDigits: 0,
  }).format(amount);
}
