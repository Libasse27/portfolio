# Blog — PHASE 8 (passe 1)

Mécanique complète posée, zéro article publié — voir ADR 0009. Comme pour
`docs/07-Content/README.md` (Phase 3), aucun contenu n'est rédigé tant que
les faits/sujets ne sont pas fournis (règle 0.2.2 du Master Prompt).

## Fait

| Élément                                                            | Fichier(s)                                                       |
| ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Schéma de frontmatter                                              | `packages/validations/src/blogPost.ts`                           |
| Chargement du contenu (liste, article, temps de lecture, sommaire) | `apps/web/src/lib/blog.ts`                                       |
| Liste filtrable par pôle                                           | `apps/web/src/app/[locale]/blog/page.tsx`, `BlogFilter.tsx`      |
| Page article (MDX, sommaire, coloration syntaxique, articles liés) | `apps/web/src/app/[locale]/blog/[slug]/page.tsx`                 |
| Flux RSS                                                           | `apps/web/src/app/rss.xml/route.ts`                              |
| Sitemap                                                            | `apps/web/src/app/sitemap.ts` (inclut `/blog` et chaque article) |

## Bloqué — aucun sujet fourni

| Élément                                    | Bloqué par                                                                                                                 |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Tout article MDX                           | Sujets/brouillons réels non fournis — un article publié est un contenu attribuable (règle 0.2.2), pas un gabarit générique |
| Lien « Blog » dans la navigation/le footer | Même principe que MODULE 10 (témoignages) : section masquée tant qu'elle est vide                                          |

## Publier un article

1. Créer `content/blog/<slug>.mdx` avec un frontmatter YAML respectant
   `blogPostFrontmatterSchema` :

   ```yaml
   ---
   titre: 'Titre de l'article'
   extrait: 'Résumé d'une phrase, affiché dans la liste et les métadonnées.'
   datePublication: '2026-08-07'
   theme: dev # dev | compta | infra
   tags: ['nextjs', 'syscohada']
   ---
   ```

2. Rédiger le corps en Markdown/MDX en dessous (titres `##`/`###` pour le
   sommaire, blocs `code` pour la coloration syntaxique).
3. `pnpm build` régénère automatiquement la liste, la page article, le
   sommaire, les articles liés (même `theme`), le flux RSS et le sitemap —
   aucun code à modifier.
4. Ajouter un lien « Blog » dans `Navigation.tsx`/`Footer.tsx` (voir ADR
   0009, décision 10) au moment du premier article publié.

Prochaine étape pour débloquer : fournir 1 à 3 sujets réels (retour
d'expérience technique vécu — SIH, ERP, mission Centre de Santé Seydina
Issa Laye, ou tout autre sujet défendable en entretien).
