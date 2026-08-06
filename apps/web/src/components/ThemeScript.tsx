import { themeInitScript } from '@/lib/theme';

/** Script statique (aucune entrée utilisateur) : lecture directe autorisée. */
export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}
