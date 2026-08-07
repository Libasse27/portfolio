import createMiddleware from 'next-intl/middleware';
import { routing } from '@portfolio/i18n';

export default createMiddleware(routing);

export const config = {
  // apple-icon (apps/web/src/app/apple-icon.tsx) est servi sans extension de
  // fichier (route dynamique générant un PNG) : sans exclusion explicite, le
  // matcher par défaut (qui n'exclut que les segments avec un point) le
  // traite comme une page et le préfixe par la locale (/fr/apple-icon),
  // qui n'existe pas → 404.
  matcher: ['/((?!api|trpc|_next|_vercel|apple-icon|.*\\..*).*)'],
};
