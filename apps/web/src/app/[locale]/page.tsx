import { getTranslations } from 'next-intl/server';
import { Button } from '@portfolio/ui';

/**
 * Page d'accueil provisoire — le contenu réel (MODULE 2 et 3) sera intégré
 * en PHASE 3 (Contenu), une fois la PHASE 0 (Vision & Cadrage) validée.
 */
export default async function HomePage() {
  const t = await getTranslations('HomePage');

  return (
    <main className="p-8">
      <h1 className="font-heading text-app-text text-3xl font-bold">{t('heading')}</h1>
      <p className="text-app-text-muted mt-2">{t('tagline')}</p>
      <Button variant="primary" className="mt-6">
        {t('projectsCta')}
      </Button>
    </main>
  );
}
