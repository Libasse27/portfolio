import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messagesFr from '@portfolio/i18n/src/messages/fr.json';
import { ContactForm, buildMailtoUrl } from './ContactForm';

const recipientEmail = 'libdevprod@gmail.com';

describe('buildMailtoUrl', () => {
  it('construit un lien mailto avec sujet et corps encodés', () => {
    const url = buildMailtoUrl(
      {
        nom: 'Aïssatou Fall',
        email: 'aissatou.fall@example.com',
        organisation: 'Fall & Fils',
        typeProjet: 'ERP',
        budget: '',
        message: 'Bonjour',
        societe: '',
      },
      recipientEmail,
    );

    expect(url.startsWith(`mailto:${recipientEmail}?subject=`)).toBe(true);
    expect(url).toContain(encodeURIComponent('Contact portfolio — ERP'));
    expect(url).toContain(encodeURIComponent('Organisation : Fall & Fils'));
  });
});

function renderForm() {
  return render(
    <NextIntlClientProvider locale="fr" messages={messagesFr}>
      <ContactForm recipientEmail={recipientEmail} />
    </NextIntlClientProvider>,
  );
}

describe('ContactForm', () => {
  // handleSubmit importe le schéma zod à la demande (budget JS, ADR 0004) :
  // le clic déclenche une résolution asynchrone, à attendre via findBy/waitFor.
  it('affiche des erreurs de validation sur un formulaire vide', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: messagesFr.Contact.submitCta }));

    expect(await screen.findAllByText(messagesFr.Contact.errorRequired)).not.toHaveLength(0);
  });

  it('ignore silencieusement une soumission avec le honeypot rempli', async () => {
    renderForm();
    fireEvent.change(screen.getByLabelText(messagesFr.Contact.formNameLabel), {
      target: { value: 'Aïssatou Fall' },
    });
    fireEvent.change(screen.getByLabelText(messagesFr.Contact.formEmailLabel), {
      target: { value: 'aissatou.fall@example.com' },
    });
    fireEvent.change(screen.getByLabelText(messagesFr.Contact.formTypeProjetLabel), {
      target: { value: 'ERP' },
    });
    fireEvent.change(screen.getByLabelText(messagesFr.Contact.formMessageLabel), {
      target: { value: 'Bonjour' },
    });
    fireEvent.change(screen.getByLabelText('Société'), { target: { value: 'Bot Corp' } });

    fireEvent.click(screen.getByRole('button', { name: messagesFr.Contact.submitCta }));

    await waitFor(() => {
      expect(screen.queryByText(messagesFr.Contact.errorRequired)).not.toBeInTheDocument();
    });
  });

  describe('soumission valide', () => {
    const originalLocation = window.location;

    beforeEach(() => {
      // jsdom ne gère pas la navigation réelle : on remplace window.location
      // par un objet simple pour observer l'affectation de `href`.
      Object.defineProperty(window, 'location', { writable: true, value: { href: '' } });
    });

    afterEach(() => {
      Object.defineProperty(window, 'location', { writable: true, value: originalLocation });
    });

    it('construit et déclenche le lien mailto pour un formulaire valide', async () => {
      renderForm();
      fireEvent.change(screen.getByLabelText(messagesFr.Contact.formNameLabel), {
        target: { value: 'Aïssatou Fall' },
      });
      fireEvent.change(screen.getByLabelText(messagesFr.Contact.formEmailLabel), {
        target: { value: 'aissatou.fall@example.com' },
      });
      fireEvent.change(screen.getByLabelText(messagesFr.Contact.formTypeProjetLabel), {
        target: { value: 'ERP' },
      });
      fireEvent.change(screen.getByLabelText(messagesFr.Contact.formMessageLabel), {
        target: { value: 'Bonjour' },
      });

      fireEvent.click(screen.getByRole('button', { name: messagesFr.Contact.submitCta }));

      await waitFor(() => {
        expect(window.location.href).toContain(`mailto:${recipientEmail}`);
      });
    });
  });
});
