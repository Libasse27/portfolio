# ADR 0009 — Blog technique (Phase 8, passe 1)

**Statut** : Acceptée
**Date** : 2026-08-07

## Contexte

MODULE 11 (point 11) et MODULE 15 (V1 indispensable) imposent un blog MDX :
liste filtrable par thème, temps de lecture, sommaire flottant, coloration
syntaxique, articles liés, flux RSS, schema.org `Article`. `content/blog/`
et `docs/10-Blog/` existent depuis l'initialisation du monorepo mais sont
vides (`.gitkeep`) : aucun sujet ni brouillon d'article réel n'a été fourni.

Comme pour le contenu Phase 3 et l'infrastructure Phase 7 (règle 0.2.2 —
« Tu n'inventes JAMAIS de fait ») : un article technique publié sous le nom
de Libaase est un contenu attribuable, pas un gabarit générique. Cette passe
construit uniquement la mécanique (schéma, chargement de contenu, rendu
MDX, liste, page article, sommaire, coloration syntaxique, articles liés,
flux RSS) — zéro article publié. `content/blog/` reste vide ; le mécanisme
est vérifié par ses tests et par son état vide (aucune donnée factice).

## Décisions

1. **`next-mdx-remote/rsc` plutôt que `@next/mdx` ou Contentlayer.**
   `@next/mdx` transforme chaque fichier `.mdx` en route Next.js — casserait
   la séparation déjà établie entre `content/` (données pures, chargées via
   `apps/web/src/lib/`) et `app/` (routes). Contentlayer est peu maintenu en
   amont et ajoute une étape de génération. `next-mdx-remote/rsc` compile le
   Markdown en Server Component sans JS client embarqué (budget JS
   `< 150 kB` gzip, MODULE 14, ADR 0006) et lit `content/blog/*.mdx` comme
   de simples fichiers, cohérent avec le patron existant.

2. **Chargement par `fs.readdirSync` (`apps/web/src/lib/blog.ts`), pas par
   import statique.** `content/about/profil.json` et `content/experience/`
   sont importés statiquement (nombre de fichiers connu à l'avance,
   commentaire de `content.ts` : « à reconsidérer si content/experience/
   dépasse ~5 fichiers »). Le blog n'a pas de nombre de fichiers connu au
   moment d'écrire le code : `fs.readdirSync` est nécessaire, exécuté
   uniquement côté serveur/build (jamais expédié au client), compatible
   avec `generateStaticParams` (SSG, ADR 0004).

3. **`theme` du frontmatter réutilise les ids de pôle (`dev` / `compta` /
   `infra`), pas une taxonomie de couleurs séparée.** Permet de réutiliser
   directement `Badge` (`packages/ui`) et les classes `pole-*` déjà
   calibrées pour le contraste WCAG AA (ADR 0005), et prépare le maillage
   interne pôles ↔ blog demandé par MODULE 14. `tags` reste un tableau libre
   pour un classement plus fin, sans validation de vocabulaire fermé.

4. **`slug` dérivé du nom de fichier, absent du frontmatter.** Évite une
   désynchronisation possible entre le nom de fichier et une valeur
   `slug` déclarée séparément dans le frontmatter.

5. **Coloration syntaxique par `rehype-pretty-code` (Shiki) à double thème
   (`dark`/`light`), pas par une bibliothèque client (ex. Prism côté
   navigateur).** Shiki tokenise au moment du rendu serveur (SSG) et produit
   du HTML statique avec des variables CSS par thème (`--shiki-dark`,
   `--shiki-light`) : zéro JS de coloration syntaxique expédié au client. Le
   site bascule déjà le thème via l'attribut `data-theme` sur `<html>`
   (ADR 0002, anti-flash), pas via `prefers-color-scheme` : `globals.css`
   ajoute une règle `[data-theme="dark"] { --shiki-...: var(--shiki-dark) }`
   (et l'inverse pour `light`) plutôt que de dépendre du media query, pour
   rester cohérent avec le mécanisme de thème existant.

6. **Sommaire (« flottant ») en CSS `sticky`, sans mise en évidence de
   section active par JavaScript.** `rehype-slug` (via `github-slugger`,
   utilisé aussi côté serveur pour extraire la liste des titres du Markdown
   brut avant compilation, afin de générer les mêmes ids) pose les ancres ;
   le sommaire est un simple Server Component. Le suivi de la section
   active au scroll (`IntersectionObserver`) est une amélioration
   client-side possible mais hors périmètre de cette passe : le budget JS
   du projet a déjà nécessité un import différé de `zod` pour rester sous
   150 kB (ADR 0006) — ne pas ajouter de coût JS pour une fonctionnalité non
   demandée explicitement au-delà de « flottant » (= sticky).

7. **Temps de lecture calculé à la main (mots ÷ 200 mots/minute), pas via le
   paquet `reading-time`.** Calcul trivial (quelques lignes), n'ajoute pas
   de dépendance pour ce qu'une fonction pure couvre déjà.

8. **Articles liés : même `theme`, à l'exclusion de l'article courant, triés
   par date décroissante, limités à 3.** Heuristique simple suffisante au
   volume actuel (0 article) ; pas de similarité sémantique/embeddings,
   qui serait prématuré sans contenu réel pour la calibrer.

9. **Flux RSS en Route Handler (`app/rss.xml/route.ts`), hors de
   `[locale]`.** Comme `sitemap.ts`/`robots.ts`, un chemin avec extension de
   fichier est déjà exclu du matcher i18n (`.*\..*`, `middleware.ts`) — pas
   besoin d'exclusion supplémentaire (contrairement à `apple-icon`, ADR
   implicite du commit `054b456`). Un flux unique plutôt que par locale : le
   contenu n'est pas traduit (même limite que `profil.json`, voir
   `apps/web/src/lib/content.ts` — aucune variante `en` du corps des
   articles à ce stade).

10. **Pas de lien « Blog » dans `Navigation`/`Footer` cette passe.** Même
    principe que MODULE 10 (témoignages : section masquée tant que vide) et
    que `docs/07-Content/README.md` (sections absentes tant que non
    débloquées) : `/blog` existe et fonctionne (état vide honnête, pas de
    contenu factice), mais n'est pas mis en avant tant qu'aucun article réel
    n'est publié. À ajouter dès le premier article livré.

## Non traité cette passe (hors périmètre)

- Tout article réel — bloqué par l'absence de sujets/brouillons fournis
  (voir `docs/10-Blog/README.md`).
- Mise en évidence de la section active du sommaire au scroll (JS).
- Recherche plein texte, pagination (non pertinentes à 0 article).
- Traduction des articles (`en`) — même limite que le reste du contenu
  éditorial actuel.

## Conséquences

- Publier un article revient à déposer un fichier
  `content/blog/<slug>.mdx` respectant `blogPostFrontmatterSchema`
  (`packages/validations`) : la liste, la page article, le sommaire, la
  coloration syntaxique, les articles liés, le flux RSS et le sitemap se
  mettent à jour automatiquement, sans code supplémentaire.
- Ajouter « Blog » à `Navigation`/`Footer` (et l'entrée `content/blog/`
  correspondante au JSON-LD `Article`) doit se faire au moment du premier
  article publié, pas avant.
