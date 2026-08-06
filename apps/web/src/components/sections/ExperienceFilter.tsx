'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Experience } from '@portfolio/validations';

const POLES = ['dev', 'compta', 'infra'] as const;
type PoleFilter = 'all' | (typeof POLES)[number];

export function ExperienceFilter({ experiences }: { experiences: Experience[] }) {
  const t = useTranslations('Experience');
  const [filter, setFilter] = useState<PoleFilter>('all');

  const filtered =
    filter === 'all'
      ? experiences
      : experiences.filter((exp) => exp.polesMobilises.includes(filter));

  const filterLabel: Record<PoleFilter, string> = {
    all: t('filterAll'),
    dev: t('filterDev'),
    compta: t('filterCompta'),
    infra: t('filterInfra'),
  };

  return (
    <div>
      <div role="group" aria-label={t('heading')} className="flex flex-wrap gap-2">
        {(['all', ...POLES] as const).map((pole) => (
          <button
            key={pole}
            type="button"
            onClick={() => setFilter(pole)}
            aria-pressed={filter === pole}
            className={[
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              filter === pole
                ? 'border-primary bg-primary text-white'
                : 'border-app-border text-app-text-muted hover:border-primary hover:text-app-text',
            ].join(' ')}
          >
            {filterLabel[pole]}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {filtered.length === 0 ? (
          <p className="text-app-text-muted italic">{t('emptyState')}</p>
        ) : (
          <ol className="border-app-border space-y-8 border-l pl-6">
            {filtered.map((experience) => (
              <li key={`${experience.entreprise}-${experience.poste}`} className="relative">
                <span
                  className="bg-primary absolute -left-[27px] top-1.5 h-3 w-3 rounded-full"
                  aria-hidden="true"
                />
                <p className="text-app-text-muted text-xs">
                  {experience.periode.debut} — {experience.periode.fin ?? t('current')}
                </p>
                <h3 className="font-heading text-app-text text-lg font-semibold">
                  {experience.poste} · {experience.entreprise}
                </h3>
                <p className="text-app-text-muted text-sm">
                  {experience.lieu} · {experience.secteur}
                </p>
                <p className="text-app-text mt-2 text-sm">{experience.contexte}</p>
                <ul className="text-app-text-muted mt-3 list-disc space-y-1 pl-5 text-sm">
                  {experience.realisations.map((realisation) => (
                    <li key={realisation}>{realisation}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
