import { describe, expect, it } from 'vitest';
import { formatDateSN } from './formatDateSN';

describe('formatDateSN', () => {
  it('formate une date ISO en style long par défaut', () => {
    const result = formatDateSN('2026-08-05T12:00:00Z');
    expect(result).toContain('2026');
  });

  it('accepte un objet Date', () => {
    const result = formatDateSN(new Date('2026-01-15T00:00:00Z'), 'short');
    expect(result).toContain('26');
  });
});
