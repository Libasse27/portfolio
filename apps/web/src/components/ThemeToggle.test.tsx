import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messagesFr from '@portfolio/i18n/src/messages/fr.json';
import { ThemeToggle } from './ThemeToggle';

function renderToggle() {
  return render(
    <NextIntlClientProvider locale="fr" messages={messagesFr}>
      <ThemeToggle />
    </NextIntlClientProvider>,
  );
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
    document.cookie = 'theme=; path=/; max-age=0';
  });

  it('bascule data-theme et pose le cookie de persistance au clic', () => {
    renderToggle();

    const toggle = screen.getByRole('button', {
      name: messagesFr.ThemeToggle.switchToLight,
    });
    fireEvent.click(toggle);

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.cookie).toContain('theme=light');
  });

  it('revient au thème sombre au second clic', () => {
    renderToggle();

    fireEvent.click(screen.getByRole('button', { name: messagesFr.ThemeToggle.switchToLight }));
    fireEvent.click(screen.getByRole('button', { name: messagesFr.ThemeToggle.switchToDark }));

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.cookie).toContain('theme=dark');
  });
});
