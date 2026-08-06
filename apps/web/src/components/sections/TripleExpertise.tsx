import { getTranslations } from 'next-intl/server';
import { profil } from '@/lib/content';
import { VennDiagram } from './VennDiagram';

export async function TripleExpertise() {
  const t = await getTranslations('TripleExpertise');
  const { narratif, poles, intersections } = profil.positionnement;

  return (
    <section id="expertise" className="mx-auto max-w-[1280px] px-6 py-24">
      <h2 className="font-heading text-app-text text-3xl font-bold">{t('heading')}</h2>
      <p className="text-app-text-muted mt-3 max-w-2xl">{narratif}</p>
      <VennDiagram poles={poles} intersections={intersections} />
    </section>
  );
}
