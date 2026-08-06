import { getTranslations } from 'next-intl/server';
import { profil } from '@/lib/content';

/**
 * Pas de mentions légales/CGU (ADR 0003 : NINEA/RCCM non formalisés) ni de
 * doublon des bascules thème/langue (déjà dans la nav persistante, Phase 2).
 */
export async function Footer() {
  const t = await getTranslations('Footer');
  const nav = await getTranslations('Navigation');
  const year = new Date().getFullYear();

  const sitemap = [
    { href: '#expertise', label: nav('expertiseLink') },
    { href: '#a-propos', label: nav('aboutLink') },
    { href: '#experience', label: nav('experienceLink') },
    { href: '#contact', label: nav('contactLink') },
  ];

  return (
    <footer className="border-app-border border-t">
      <div className="mx-auto max-w-[1280px] px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <p className="font-heading text-app-text text-sm font-bold">
              {profil.identite.nomComplet}
            </p>
            <p className="text-app-text-muted mt-1 text-sm">{profil.identite.titre}</p>
          </div>

          <nav aria-label={t('sitemapHeading')}>
            <p className="text-app-text-muted text-xs font-semibold uppercase tracking-wide">
              {t('sitemapHeading')}
            </p>
            <ul className="mt-3 space-y-2">
              {sitemap.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-app-text-muted hover:text-app-text text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-app-border mt-10 flex flex-col items-start justify-between gap-4 border-t pt-6 text-sm sm:flex-row sm:items-center">
          <p className="text-app-text-muted">
            © {year} {profil.identite.nomComplet} — {t('rightsReserved')} {t('legalPending')}
          </p>
          <a href="#hero" className="text-app-text-muted hover:text-app-text">
            {t('backToTop')}
          </a>
        </div>
      </div>
    </footer>
  );
}
