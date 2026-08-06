import { getTranslations } from 'next-intl/server';
import { Link } from '@portfolio/i18n';
import { LinkButton } from '@portfolio/ui';
import { profil } from '@/lib/content';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';

/**
 * Coquille de navigation (Phase 2 — ADR 0002) enrichie des liens de section
 * (Phase 4 — ADR 0003), maintenant que les sections existent réellement.
 * Toujours pas de condensation au scroll (ADR 0002, hors périmètre).
 */
export async function Navigation() {
  const t = await getTranslations('Navigation');

  const links = [
    { href: '#expertise', label: t('expertiseLink') },
    { href: '#a-propos', label: t('aboutLink') },
    { href: '#experience', label: t('experienceLink') },
    { href: '#contact', label: t('contactLink') },
  ];

  return (
    <header className="bg-app-surface/80 border-app-border sticky top-0 z-50 border-b backdrop-blur">
      <nav
        className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-3"
        aria-label={t('homeLabel')}
      >
        <Link href="/" className="font-heading text-app-text text-sm font-bold tracking-wide">
          {profil.identite.nomComplet}
        </Link>

        <div className="hidden items-center gap-6 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-app-text-muted hover:text-app-text text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 sm:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <LinkButton href="#contact" variant="primary">
            {t('contactCta')}
          </LinkButton>
        </div>

        <MobileMenu links={links} contactCta={t('contactCta')} />
      </nav>
    </header>
  );
}
