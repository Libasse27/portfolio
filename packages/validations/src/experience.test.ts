import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { experienceSchema } from './experience';

const contentDir = join(__dirname, '../../../content/experience');

describe('contenu experience', () => {
  const files = readdirSync(contentDir).filter((file) => file.endsWith('.json'));

  it('contient au moins une expérience', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)('%s respecte experienceSchema (MODULE 7)', (file) => {
    const raw = readFileSync(join(contentDir, file), 'utf-8');
    const result = experienceSchema.safeParse(JSON.parse(raw));
    expect(result.success).toBe(true);
  });
});
