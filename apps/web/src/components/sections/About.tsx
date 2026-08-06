import { getTranslations } from 'next-intl/server';
import { profil } from '@/lib/content';
import { SectionReveal } from '@/components/SectionReveal';
import { AnimatedCounters } from './AnimatedCounters';

export async function About() {
  const t = await getTranslations('About');
  const { recit, valeurs, differenciateurs, metriques } = profil;

  return (
    <section id="a-propos" className="mx-auto max-w-[1280px] px-6 py-24">
      <SectionReveal>
        <h2 className="font-heading text-app-text text-3xl font-bold">{t('heading')}</h2>

        <div className="text-app-text mt-8 max-w-3xl space-y-4">
          <p>{recit.quiSuisJe}</p>
          <p>{recit.parcours}</p>
          <p className="font-medium italic">{recit.filConducteur}</p>
        </div>

        <div className="mt-12">
          <h3 className="font-heading text-app-text text-lg font-semibold">
            {t('metricsHeading')}
          </h3>
          <div className="mt-4">
            <AnimatedCounters metriques={metriques} />
          </div>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="font-heading text-app-text text-lg font-semibold">
              {t('valuesHeading')}
            </h3>
            <dl className="mt-4 space-y-4">
              {valeurs.map((valeur) => (
                <div key={valeur.nom}>
                  <dt className="text-app-text font-semibold">{valeur.nom}</dt>
                  <dd className="text-app-text-muted mt-1 text-sm">{valeur.description}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="font-heading text-app-text text-lg font-semibold">
              {t('differentiatorsHeading')}
            </h3>
            <ul className="mt-4 space-y-3">
              {differenciateurs.map((item) => (
                <li key={item} className="text-app-text-muted text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="font-heading text-app-text text-lg font-semibold">
              {t('challengesHeading')}
            </h3>
            <ul className="mt-4 space-y-4">
              {recit.difficultes.map((difficulte) => (
                <li key={difficulte.probleme}>
                  <p className="text-app-text text-sm font-medium">{difficulte.probleme}</p>
                  <p className="text-app-text-muted mt-1 text-sm">{difficulte.lecon}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-app-text text-lg font-semibold">
              {t('achievementsHeading')}
            </h3>
            <ul className="mt-4 space-y-4">
              {recit.reussites.map((reussite) => (
                <li key={reussite.titre}>
                  <p className="text-app-text text-sm font-medium">{reussite.titre}</p>
                  <p className="text-app-text-muted mt-1 text-sm">{reussite.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="font-heading text-app-text text-lg font-semibold">
              {t('philosophyHeading')}
            </h3>
            <p className="text-app-text-muted mt-4 text-sm">{recit.philosophie}</p>
          </div>
          <div>
            <h3 className="font-heading text-app-text text-lg font-semibold">
              {t('ambitionsHeading')}
            </h3>
            <p className="text-app-text-muted mt-4 text-sm">{recit.ambitions}</p>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
