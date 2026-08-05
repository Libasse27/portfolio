export type FormatDateSNStyle = 'short' | 'long';

/** Formate une date au fuseau Africa/Dakar, locale fr-SN. */
export function formatDateSN(date: Date | string, style: FormatDateSNStyle = 'long'): string {
  const parsed = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat('fr-SN', {
    timeZone: 'Africa/Dakar',
    dateStyle: style,
  }).format(parsed);
}
