'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { THEME_COOKIE_NAME, type Theme } from '@/lib/theme';

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function getCurrentTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'light' || attr === 'dark' ? attr : getSystemTheme();
}

/**
 * Thème initialement `null` (au lieu du thème système) pour éviter tout
 * mismatch d'hydratation : le rendu serveur ignore la préférence client.
 * L'icône n'apparaît qu'après montage, une fois le thème réel connu.
 */
export function ThemeToggle() {
  const t = useTranslations('ThemeToggle');
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  function toggle() {
    const next: Theme = (theme ?? getCurrentTheme()) === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    document.cookie = `${THEME_COOKIE_NAME}=${next}; path=/; max-age=31536000; samesite=lax`;
    setTheme(next);
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t('switchToLight') : t('switchToDark')}
      className="text-app-text hover:text-primary inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors"
    >
      {theme !== null &&
        (isDark ? (
          <Sun size={18} strokeWidth={1.5} aria-hidden="true" />
        ) : (
          <Moon size={18} strokeWidth={1.5} aria-hidden="true" />
        ))}
    </button>
  );
}
