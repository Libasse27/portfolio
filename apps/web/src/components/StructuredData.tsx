import { profil } from '@/lib/content';
import { env } from '@/lib/env';
import type { AppLocale } from '@portfolio/i18n';

/**
 * JSON-LD schema.org (MODULE 14). Limité à Person/WebSite/ProfessionalService
 * cette passe : SoftwareApplication (projets), Article/RSS (blog),
 * FAQPage et BreadcrumbList demandent un contenu qui n'existe pas encore
 * (ADR 0004) — pas de schéma inventé pour du contenu absent.
 */
export function StructuredData({ locale }: { locale: AppLocale }) {
  const { identite, positionnement } = profil;
  const personId = `${env.SITE_URL}/#person`;
  const websiteId = `${env.SITE_URL}/#website`;

  const graph = [
    {
      '@type': 'Person',
      '@id': personId,
      name: identite.nomComplet,
      jobTitle: identite.titre,
      email: `mailto:${identite.contacts.emailPro}`,
      telephone: identite.contacts.telephone,
      url: env.SITE_URL,
      sameAs: [`https://${identite.contacts.linkedin}`, `https://${identite.contacts.github}`],
      address: {
        '@type': 'PostalAddress',
        addressLocality: identite.localisation.ville,
        addressCountry: 'SN',
      },
      knowsAbout: positionnement.poles.map((pole) => pole.nom),
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: identite.nomComplet,
      url: env.SITE_URL,
      inLanguage: locale,
      publisher: { '@id': personId },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${env.SITE_URL}/#service`,
      name: identite.nomComplet,
      description: identite.slogan,
      areaServed: identite.localisation.zoneIntervention,
      provider: { '@id': personId },
      url: env.SITE_URL,
    },
  ];

  const jsonLd = { '@context': 'https://schema.org', '@graph': graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
