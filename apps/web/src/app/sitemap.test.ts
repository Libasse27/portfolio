import { describe, expect, it } from 'vitest';
import { routing } from '@portfolio/i18n/src/routing';
import { env } from '@/lib/env';
import sitemap from './sitemap';

describe('sitemap', () => {
  it('contient une entrée par locale, la locale par défaut sans préfixe', () => {
    const entries = sitemap();
    expect(entries).toHaveLength(routing.locales.length);

    const fr = entries.find((entry) => entry.url === `${env.SITE_URL}/`);
    const en = entries.find((entry) => entry.url === `${env.SITE_URL}/en`);
    expect(fr).toBeDefined();
    expect(en).toBeDefined();
    expect(fr?.priority).toBe(1);
  });
});
