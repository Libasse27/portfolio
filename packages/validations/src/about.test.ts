import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { aboutSchema } from './about';

const contentDir = join(__dirname, '../../../content/about');

describe('contenu about', () => {
  const files = readdirSync(contentDir).filter((file) => file.endsWith('.json'));

  it('contient un profil', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)('%s respecte aboutSchema (MODULES 2/3/4/11)', (file) => {
    const raw = readFileSync(join(contentDir, file), 'utf-8');
    const result = aboutSchema.safeParse(JSON.parse(raw));
    expect(result.success).toBe(true);
  });
});
