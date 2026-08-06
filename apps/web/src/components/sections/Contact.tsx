import { getTranslations } from 'next-intl/server';
import { profil } from '@/lib/content';
import { SectionReveal } from '@/components/SectionReveal';
import { ContactForm } from './ContactForm';

export async function Contact() {
  const t = await getTranslations('Contact');
  const { emailPro, telephone, whatsapp, linkedin, github } = profil.identite.contacts;

  return (
    <section id="contact" className="mx-auto max-w-[1280px] px-6 py-24">
      <SectionReveal>
        <h2 className="font-heading text-app-text text-3xl font-bold">{t('heading')}</h2>
        <p className="text-app-text-muted mt-3 max-w-2xl">{t('intro')}</p>

        <div className="mt-10 grid gap-12 md:grid-cols-2">
          <ContactForm recipientEmail={emailPro} />

          <div>
            <h3 className="font-heading text-app-text text-lg font-semibold">
              {t('directContactHeading')}
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex gap-2">
                <dt className="text-app-text-muted">{t('emailLabel')}</dt>
                <dd>
                  <a className="text-primary hover:underline" href={`mailto:${emailPro}`}>
                    {emailPro}
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-app-text-muted">{t('phoneLabel')}</dt>
                <dd>
                  <a
                    className="text-primary hover:underline"
                    href={`tel:${telephone.replace(/\s+/g, '')}`}
                  >
                    {telephone}
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-app-text-muted">{t('whatsappLabel')}</dt>
                <dd>
                  <a
                    className="text-primary hover:underline"
                    href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {whatsapp}
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-app-text-muted">LinkedIn</dt>
                <dd>
                  <a
                    className="text-primary hover:underline"
                    href={`https://${linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {linkedin}
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-app-text-muted">GitHub</dt>
                <dd>
                  <a
                    className="text-primary hover:underline"
                    href={`https://${github}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {github}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
