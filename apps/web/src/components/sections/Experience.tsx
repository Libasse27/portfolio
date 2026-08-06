import { getTranslations } from 'next-intl/server';
import { experiences } from '@/lib/content';
import { SectionReveal } from '@/components/SectionReveal';
import { ExperienceFilter } from './ExperienceFilter';

export async function Experience() {
  const t = await getTranslations('Experience');

  return (
    <section id="experience" className="mx-auto max-w-[1280px] px-6 py-24">
      <SectionReveal>
        <h2 className="font-heading text-app-text text-3xl font-bold">{t('heading')}</h2>
        <div className="mt-8">
          <ExperienceFilter experiences={experiences} />
        </div>
      </SectionReveal>
    </section>
  );
}
