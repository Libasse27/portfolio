'use client';

import { useLocale, useTranslations } from 'next-intl';
import { routing, usePathname, useRouter } from '@portfolio/i18n';

export function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div role="group" aria-label={t('label')} className="flex items-center gap-2 text-sm">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-current={loc === locale ? 'true' : undefined}
          aria-label={t(loc)}
          className={
            loc === locale
              ? 'text-app-text font-semibold'
              : 'text-app-text-muted hover:text-app-text transition-colors'
          }
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
