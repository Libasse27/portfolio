import { describe, expect, it, vi } from 'vitest';

describe('env', () => {
  it('retombe sur http://localhost:3000 si SITE_URL est absent', async () => {
    vi.resetModules();
    delete process.env.SITE_URL;
    const { env } = await import('./env');
    expect(env.SITE_URL).toBe('http://localhost:3000');
  });

  it('utilise SITE_URL quand il est défini et valide', async () => {
    vi.resetModules();
    process.env.SITE_URL = 'https://libaase-dia.example';
    const { env } = await import('./env');
    expect(env.SITE_URL).toBe('https://libaase-dia.example');
    delete process.env.SITE_URL;
  });

  it('rejette une valeur qui n’est pas une URL valide', async () => {
    vi.resetModules();
    process.env.SITE_URL = 'pas-une-url';
    await expect(import('./env')).rejects.toThrow();
    delete process.env.SITE_URL;
  });
});
