import { getTranslations } from 'next-intl/server';
import { Link } from '@portfolio/i18n';

export default async function NotFound() {
  const t = await getTranslations('Navigation');

  return (
    <>
      <h1>Page introuvable</h1>
      <Link href="/">{t('homeLabel')}</Link>
    </>
  );
}
