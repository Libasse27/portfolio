import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import messagesFr from '@portfolio/i18n/src/messages/fr.json';
import { SkipLink } from './SkipLink';

vi.mock('next-intl/server', () => ({
  getTranslations: async (namespace: string) => {
    const dict = messagesFr[namespace as keyof typeof messagesFr] as Record<string, string>;
    return (key: string) => dict[key];
  },
}));

describe('SkipLink', () => {
  it('pointe vers #main-content avec le libellé traduit', async () => {
    render(await SkipLink());

    expect(screen.getByRole('link', { name: messagesFr.Navigation.skipToContent })).toHaveAttribute(
      'href',
      '#main-content',
    );
  });
});
