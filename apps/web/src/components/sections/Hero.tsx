import { getTranslations } from 'next-intl/server';
import { Badge, LinkButton } from '@portfolio/ui';
import { profil } from '@/lib/content';

/**
 * CTA adaptés au contenu disponible (ADR 0003) : ni « Voir les projets »
 * (section absente cette passe) ni téléchargement de CV (PDF pas encore
 * généré, MODULE 15 V1). Primaire → #contact, secondaire → #a-propos.
 */
export async function Hero() {
  const t = await getTranslations('Hero');
  const { nomComplet, titre, slogan, disponibilite } = profil.identite;
  const { poles } = profil.positionnement;

  return (
    <section id="hero" className="mx-auto max-w-[1280px] px-6 py-24 sm:py-32">
      <p className="text-primary font-heading text-sm font-semibold uppercase tracking-wide">
        {t('polesLabel')}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {poles.map((pole) => (
          <Badge key={pole.id} variant={pole.id}>
            {pole.nom}
          </Badge>
        ))}
      </div>

      <h1 className="font-heading text-app-text mt-6 text-4xl font-bold sm:text-5xl">
        {nomComplet}
      </h1>
      <p className="text-app-text-muted mt-3 text-lg">{titre}</p>
      <p className="text-app-text mt-6 max-w-2xl text-xl font-medium">{slogan}</p>

      <div className="mt-5">
        <Badge variant="neutral">{disponibilite.statut}</Badge>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <LinkButton href="#contact" variant="primary">
          {t('primaryCta')}
        </LinkButton>
        <LinkButton href="#a-propos" variant="secondary">
          {t('secondaryCta')}
        </LinkButton>
      </div>
    </section>
  );
}
