import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing, messages, type AppLocale } from '@portfolio/i18n';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: AppLocale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return { locale, messages: messages[locale] };
});
