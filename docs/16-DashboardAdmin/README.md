# Tableau de bord admin — PHASE 9 (passes 1 et 2)

`apps/api` (NestJS, passe 1, ADR 0010) et `apps/admin` (Next.js, passe 2,
ADR 0011) posés. Une seule entité gérée en base : les articles de blog
(`BlogPost`). Comme pour les Phases 7 et 8, aucun compte/identifiant réel
n'est inventé (règle 0.2.2) : la mécanique est vérifiée par ses tests, pas
par une base de données réelle.

## Fait

| Élément                                                                  | Fichier(s)                                                                           |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Schéma Prisma (`BlogPost`, `AdminUser`)                                  | `database/prisma/schema.prisma`                                                      |
| API NestJS (santé, connexion JWT, CRUD blog)                             | `apps/api/src/`                                                                      |
| Validation par les schémas Zod partagés (API + admin)                    | `packages/validations/src/blogPost.ts`, `apps/api/src/common/zod-validation.pipe.ts` |
| Admin Next.js (connexion, liste/création/édition/suppression d'articles) | `apps/admin/src/`                                                                    |
| Tests unitaires (Prisma/fetch/cookies mockés, sans base réelle)          | `apps/api/src/**/*.spec.ts`, `apps/admin/src/**/*.test.{ts,tsx}`                     |

## Bloqué — aucune infrastructure réelle acquise

| Élément                             | Bloqué par                                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------------------------- |
| Instance PostgreSQL                 | Aucun hébergeur choisi (Railway/Fly.io/VPS/Neon/Supabase — décision à prendre avec Libaase) |
| Première migration Prisma           | Dépend de la ligne précédente (`prisma migrate dev` exige une connexion réelle)             |
| `JWT_SECRET`/`API_URL` réels        | Doivent être générés et gardés hors dépôt, pas inventés ici (voir les `.env.example`)       |
| Premier compte admin réel           | Aucun utilisateur fourni — pas de seed, à créer à la main contre une base réelle (ADR 0011) |
| Hébergement `apps/api`/`apps/admin` | Aucun compte Railway/Fly.io/VPS/Vercel créé pour ces deux apps (MODULE 16.1)                |

## Prochaine étape pour débloquer

1. Choisir l'hébergeur PostgreSQL (Railway/Fly.io/VPS/Neon/Supabase) avec
   Libaase — même type de décision que le domaine/l'hébergement web
   (Phase 7).
2. Créer l'instance, poser `DATABASE_URL` réel dans l'environnement de
   `apps/api` (jamais commité).
3. `pnpm --filter @portfolio/api exec prisma migrate dev --name init`
   pour générer la première migration contre la base réelle.
4. Générer un `JWT_SECRET` réel (`openssl rand -base64 48`), le poser en
   variable d'environnement (`apps/api` ET `apps/admin`, même valeur).
5. Créer le premier compte admin à la main (`prisma studio` ou script à
   exécuter une fois) — jamais par un endpoint d'inscription public
   (ADR 0011).
6. Choisir l'hébergeur de `apps/api` (Railway/Fly.io/VPS) et d'`apps/admin`
   (Vercel possible, même stack qu'`apps/web`), les déployer — ni l'un ni
   l'autre n'est encore câblé à `.github/workflows/deploy.yml`.
