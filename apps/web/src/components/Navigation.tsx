import { getTranslations } from 'next-intl/server';
import { Link } from '@portfolio/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

// Lien stylé comme Button (variant primary) : Button rend un <button>,
// incompatible avec un <a> imbriqué (next-intl Link).
const ctaClasses =
  'inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm ' +
  'font-semibold text-white transition-colors duration-150 hover:opacity-90 ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-primary';

/**
 * Coquille de navigation minimale (Phase 2 — ADR 0002) : logo, bascule de
 * langue, bascule de thème, CTA contact. Les liens de section, la
 * condensation au scroll et le menu plein écran mobile arrivent en Phase 4
 * avec les sections réelles.
 */
export async function Navigation() {
  const t = await getTranslations('Navigation');

  return (
    <header className="bg-app-surface/80 border-app-border sticky top-0 z-50 border-b backdrop-blur">
      <nav
        className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-3"
        aria-label={t('homeLabel')}
      >
        <Link href="/" className="font-heading text-app-text text-sm font-bold tracking-wide">
          LIBASSE DIA
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
          {/* Ancre same-page (pas une route) : <a> natif plutôt que le Link
              localisé, qui préfixerait la locale sur "#contact". */}
          <a href="#contact" className={ctaClasses}>
            {t('contactCta')}
          </a>
        </div>
      </nav>
    </header>
  );
}
