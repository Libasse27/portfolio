import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messagesFr from '@portfolio/i18n/src/messages/fr.json';
import { profil } from '@/lib/content';
import { Contact } from './Contact';

vi.mock('next-intl/server', () => ({
  getTranslations: async (namespace: string) => {
    const dict = messagesFr[namespace as keyof typeof messagesFr] as Record<string, string>;
    return (key: string) => dict[key];
  },
}));

async function renderContact() {
  const element = await Contact();
  return render(
    <NextIntlClientProvider locale="fr" messages={messagesFr}>
      {element}
    </NextIntlClientProvider>,
  );
}

describe('Contact', () => {
  it('affiche les coordonnées directes construites depuis content/about/profil.json', async () => {
    await renderContact();
    const { emailPro, telephone, whatsapp } = profil.identite.contacts;

    expect(screen.getByRole('link', { name: emailPro })).toHaveAttribute(
      'href',
      `mailto:${emailPro}`,
    );

    // Téléphone et WhatsApp partagent le même numéro affiché (deux liens
    // distincts, même nom accessible) : on distingue par href attendu.
    const numberHrefs = screen
      .getAllByRole('link', { name: telephone })
      .map((link) => link.getAttribute('href'));
    expect(numberHrefs).toContain(`tel:${telephone.replace(/\s+/g, '')}`);
    expect(numberHrefs).toContain(`https://wa.me/${whatsapp.replace(/\D/g, '')}`);
  });

  it('inclut le formulaire de contact', async () => {
    await renderContact();
    expect(screen.getByRole('button', { name: messagesFr.Contact.submitCta })).toBeInTheDocument();
  });
});
