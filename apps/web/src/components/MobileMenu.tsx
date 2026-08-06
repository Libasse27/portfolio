'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { LinkButton } from '@portfolio/ui';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

interface NavLink {
  href: string;
  label: string;
}

/**
 * Menu plein écran mobile (MODULE 13.1) — justifié maintenant que des liens
 * de section existent réellement (ADR 0002 le reportait faute de liens).
 */
export function MobileMenu({ links, contactCta }: { links: NavLink[]; contactCta: string }) {
  const t = useTranslations('Navigation');
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t('menuOpen')}
        aria-expanded={open}
        className="text-app-text inline-flex h-9 w-9 items-center justify-center rounded-md"
      >
        <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
      </button>

      {open ? (
        <div className="bg-app-bg fixed inset-0 z-[60] flex flex-col p-6">
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t('menuClose')}
              className="text-app-text inline-flex h-9 w-9 items-center justify-center rounded-md"
            >
              <X size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <nav className="mt-10 flex flex-1 flex-col gap-6" aria-label={t('menuOpen')}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-heading text-app-text text-2xl font-semibold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <LinkButton href="#contact" variant="primary" onClick={() => setOpen(false)}>
              {contactCta}
            </LinkButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}
