'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { LinkButton } from '@portfolio/ui';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

interface NavLink {
  href: string;
  label: string;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Menu plein écran mobile (MODULE 13.1) — justifié maintenant que des liens
 * de section existent réellement (ADR 0002 le reportait faute de liens).
 *
 * Traité comme une boîte de dialogue modale (ADR 0005, Phase 6 passe 2) : le
 * panneau plein écran couvre visuellement le bouton d'ouverture et le reste
 * de l'en-tête, mais ceux-ci restaient atteignables au clavier (Tab) sans
 * piège de focus — un lecteur d'écran ou un clavier seul pouvait donc
 * atterrir sur un élément masqué. Le focus est désormais capturé dans le
 * panneau tant qu'il est ouvert, et restitué au bouton d'ouverture à la
 * fermeture (clic, Échap, ou lien de section cliqué).
 */
export function MobileMenu({ links, contactCta }: { links: NavLink[]; contactCta: string }) {
  const t = useTranslations('Navigation');
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const firstFocusable = panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    firstFocusable?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div className="sm:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t('menuOpen')}
        aria-expanded={open}
        className="text-app-text inline-flex h-9 w-9 items-center justify-center rounded-md"
      >
        <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
      </button>

      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t('menuOpen')}
          className="bg-app-bg fixed inset-0 z-[60] flex flex-col p-6"
        >
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={close}
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
                onClick={close}
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
            <LinkButton href="#contact" variant="primary" onClick={close}>
              {contactCta}
            </LinkButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}
