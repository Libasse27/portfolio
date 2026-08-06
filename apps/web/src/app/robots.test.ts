import { describe, expect, it } from 'vitest';
import { env } from '@/lib/env';
import robots from './robots';

describe('robots', () => {
  it('autorise tout le site et référence le sitemap', () => {
    const result = robots();
    expect(result.rules).toEqual({ userAgent: '*', allow: '/' });
    expect(result.sitemap).toBe(`${env.SITE_URL}/sitemap.xml`);
  });
});
