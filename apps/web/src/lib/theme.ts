export type Theme = 'light' | 'dark';

export const THEME_COOKIE_NAME = 'theme';

/**
 * Script anti-flash (ADR 0002) : exécuté avant la peinture, il lit le cookie
 * de préférence et pose data-theme sur <html> avant que le CSS ne s'applique.
 * En son absence, `@media (prefers-color-scheme)` dans globals.css gère déjà
 * le thème par défaut sans flash — ce script ne fait que respecter un choix
 * explicite déjà mémorisé.
 */
export const themeInitScript = `(function(){try{var m=document.cookie.match(/(?:^|; )${THEME_COOKIE_NAME}=(dark|light)/);if(m){document.documentElement.setAttribute('data-theme',m[1]);}}catch(e){}})();`;
