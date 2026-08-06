import { getTranslations } from 'next-intl/server';

/**
 * Lien d'évitement (MODULE 14) : premier élément focusable de la page,
 * invisible jusqu'au focus clavier. Server Component autonome (pas besoin
 * du NextIntlClientProvider) pour rester utilisable même si l'hydratation
 * du reste de l'arbre échoue.
 */
export async function SkipLink() {
  const t = await getTranslations('Navigation');

  return (
    <a
      href="#main-content"
      className="bg-primary-fill sr-only rounded-md px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
    >
      {t('skipToContent')}
    </a>
  );
}
