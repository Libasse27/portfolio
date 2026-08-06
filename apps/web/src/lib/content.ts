import { aboutSchema, experienceSchema, type About, type Experience } from '@portfolio/validations';
import profilRaw from '../../../../content/about/profil.json';
import centreSanteRaw from '../../../../content/experience/centre-sante-seydina-issa-laye.json';

export const profil: About = aboutSchema.parse(profilRaw);

// Registre explicite plutôt qu'un chargement dynamique : à un ou deux
// fichiers, un import par fichier suffit (à reconsidérer si
// content/experience/ dépasse ~5 fichiers, PHASE 3 passe 2).
export const experiences: Experience[] = [centreSanteRaw].map((raw) => experienceSchema.parse(raw));
