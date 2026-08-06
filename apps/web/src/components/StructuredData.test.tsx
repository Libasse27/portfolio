import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { profil } from '@/lib/content';
import { env } from '@/lib/env';
import { StructuredData } from './StructuredData';

function parseJsonLd() {
  const { container } = render(<StructuredData locale="fr" />);
  const script = container.querySelector('script[type="application/ld+json"]');
  expect(script).not.toBeNull();
  return JSON.parse(script!.innerHTML) as {
    '@context': string;
    '@graph': Record<string, unknown>[];
  };
}

describe('StructuredData', () => {
  it('inclut Person, WebSite et ProfessionalService avec le bon contexte', () => {
    const jsonLd = parseJsonLd();
    expect(jsonLd['@context']).toBe('https://schema.org');

    const types = jsonLd['@graph'].map((node) => node['@type']);
    expect(types).toEqual(expect.arrayContaining(['Person', 'WebSite', 'ProfessionalService']));
  });

  it('sourcé sur content/about/profil.json, sans fait inventé', () => {
    const jsonLd = parseJsonLd();
    const person = jsonLd['@graph'].find((node) => node['@type'] === 'Person');

    expect(person).toMatchObject({
      name: profil.identite.nomComplet,
      jobTitle: profil.identite.titre,
      email: `mailto:${profil.identite.contacts.emailPro}`,
      url: env.SITE_URL,
    });
  });

  it('ne génère pas de schémas pour du contenu absent (SoftwareApplication, Article, FAQPage)', () => {
    const jsonLd = parseJsonLd();
    const types = jsonLd['@graph'].map((node) => node['@type']);
    expect(types).not.toEqual(
      expect.arrayContaining(['SoftwareApplication', 'Article', 'FAQPage', 'BreadcrumbList']),
    );
  });
});
