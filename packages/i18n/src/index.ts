import fr from './messages/fr.json';
import en from './messages/en.json';

export { routing, type AppLocale } from './routing';
export { Link, redirect, usePathname, useRouter, getPathname } from './navigation';

export const messages = { fr, en } as const;
