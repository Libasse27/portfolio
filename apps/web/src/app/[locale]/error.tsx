'use client'; // error.tsx doit être un Client Component (contrainte Next.js App Router)

import { useTranslations } from 'next-intl';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('ErrorPage');

  return (
    <main>
      <h1>{t('heading')}</h1>
      <button onClick={reset}>{t('retry')}</button>
    </main>
  );
}
