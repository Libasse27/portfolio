'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@portfolio/ui';
import { contactFormSchema, type ContactForm as ContactFormData } from '@portfolio/validations';

type FieldErrors = Partial<Record<'nom' | 'email' | 'typeProjet' | 'message', string>>;

const emptyValues: ContactFormData = {
  nom: '',
  email: '',
  organisation: '',
  typeProjet: '',
  budget: '',
  message: '',
  societe: '',
};

/**
 * ADR 0003 : pas de backend/service d'e-mail configuré cette passe — la
 * soumission construit un lien `mailto:` réel plutôt que de simuler un envoi
 * qui n'aboutirait nulle part.
 */
export function buildMailtoUrl(data: ContactFormData, recipientEmail: string): string {
  const subject = `Contact portfolio — ${data.typeProjet}`;
  const bodyLines = [
    `Nom : ${data.nom}`,
    `E-mail : ${data.email}`,
    data.organisation ? `Organisation : ${data.organisation}` : null,
    `Type de projet : ${data.typeProjet}`,
    data.budget ? `Budget indicatif : ${data.budget}` : null,
    '',
    data.message,
  ].filter((line): line is string => line !== null);

  return `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
}

export function ContactForm({ recipientEmail }: { recipientEmail: string }) {
  const t = useTranslations('Contact');
  const [values, setValues] = useState<ContactFormData>(emptyValues);
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleChange(field: keyof ContactFormData) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = contactFormSchema.safeParse(values);

    if (!result.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (field === 'email') nextErrors.email = t('errorEmail');
        else if (field === 'nom' || field === 'typeProjet' || field === 'message') {
          nextErrors[field] = t('errorRequired');
        }
        // "societe" (honeypot) invalide : soumission ignorée sans message,
        // pour ne pas indiquer aux bots que le champ a été détecté.
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    window.location.href = buildMailtoUrl(result.data, recipientEmail);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="contact-nom" className="text-app-text text-sm font-medium">
          {t('formNameLabel')}
        </label>
        <input
          id="contact-nom"
          value={values.nom}
          onChange={handleChange('nom')}
          aria-invalid={Boolean(errors.nom)}
          aria-describedby={errors.nom ? 'contact-nom-error' : undefined}
          className="border-app-border bg-app-surface text-app-text mt-1 w-full rounded-md border px-3 py-2 text-sm"
        />
        {errors.nom ? (
          <p id="contact-nom-error" className="text-error mt-1 text-xs">
            {errors.nom}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-email" className="text-app-text text-sm font-medium">
          {t('formEmailLabel')}
        </label>
        <input
          id="contact-email"
          type="email"
          value={values.email}
          onChange={handleChange('email')}
          placeholder={t('formEmailPlaceholder')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          className="border-app-border bg-app-surface text-app-text mt-1 w-full rounded-md border px-3 py-2 text-sm"
        />
        {errors.email ? (
          <p id="contact-email-error" className="text-error mt-1 text-xs">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-organisation" className="text-app-text text-sm font-medium">
          {t('formOrganisationLabel')}
        </label>
        <input
          id="contact-organisation"
          value={values.organisation}
          onChange={handleChange('organisation')}
          className="border-app-border bg-app-surface text-app-text mt-1 w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="contact-type-projet" className="text-app-text text-sm font-medium">
          {t('formTypeProjetLabel')}
        </label>
        <input
          id="contact-type-projet"
          value={values.typeProjet}
          onChange={handleChange('typeProjet')}
          placeholder={t('formTypeProjetPlaceholder')}
          aria-invalid={Boolean(errors.typeProjet)}
          aria-describedby={errors.typeProjet ? 'contact-type-projet-error' : undefined}
          className="border-app-border bg-app-surface text-app-text mt-1 w-full rounded-md border px-3 py-2 text-sm"
        />
        {errors.typeProjet ? (
          <p id="contact-type-projet-error" className="text-error mt-1 text-xs">
            {errors.typeProjet}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-budget" className="text-app-text text-sm font-medium">
          {t('formBudgetLabel')}
        </label>
        <input
          id="contact-budget"
          value={values.budget}
          onChange={handleChange('budget')}
          className="border-app-border bg-app-surface text-app-text mt-1 w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="text-app-text text-sm font-medium">
          {t('formMessageLabel')}
        </label>
        <textarea
          id="contact-message"
          value={values.message}
          onChange={handleChange('message')}
          placeholder={t('formMessagePlaceholder')}
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className="border-app-border bg-app-surface text-app-text mt-1 w-full rounded-md border px-3 py-2 text-sm"
        />
        {errors.message ? (
          <p id="contact-message-error" className="text-error mt-1 text-xs">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot anti-spam (MODULE 17.19) : invisible et non focusable pour
          un humain, rempli uniquement par les bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="contact-societe">Société</label>
        <input
          id="contact-societe"
          tabIndex={-1}
          autoComplete="off"
          value={values.societe}
          onChange={handleChange('societe')}
        />
      </div>

      <Button type="submit" variant="primary">
        {t('submitCta')}
      </Button>
    </form>
  );
}
