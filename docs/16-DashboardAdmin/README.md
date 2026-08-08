# Tableau de bord admin — PHASE 9 (passe 1)

`apps/api` (NestJS) posé, `apps/admin` reporté à la passe 2 — voir ADR 0010. Une seule entité gérée en base cette passe : les articles de blog
(`BlogPost`). Comme pour les Phases 7 et 8, aucun compte/identifiant réel
n'est inventé (règle 0.2.2) : la mécanique est vérifiée par ses tests, pas
par une base de données réelle.

## Fait

| Élément                                            | Fichier(s)                                                                        |
| -------------------------------------------------- | --------------------------------------------------------------------------------- |
| Schéma Prisma (`BlogPost`, miroir du frontmatter)  | `database/prisma/schema.prisma`                                                   |
| API NestJS (santé, auth JWT scaffoldée, CRUD blog) | `apps/api/src/`                                                                   |
| Validation par les schémas Zod partagés            | `apps/api/src/blog/blog.schemas.ts`, `apps/api/src/common/zod-validation.pipe.ts` |
| Tests unitaires (Prisma mocké, sans base réelle)   | `apps/api/src/**/*.spec.ts`                                                       |

## Bloqué — aucune infrastructure réelle acquise

| Élément                   | Bloqué par                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| Instance PostgreSQL       | Aucun hébergeur choisi (Railway/Fly.io/VPS/Neon/Supabase — décision à prendre avec Libaase) |
| Première migration Prisma | Dépend de la ligne précédente (`prisma migrate dev` exige une connexion réelle)             |
| `JWT_SECRET` réel         | Doit être généré et gardé hors dépôt, pas inventé ici (voir `apps/api/.env.example`)        |
| Compte(s) admin           | Aucun utilisateur réel fourni — pas de seed avec identifiants                               |
| Hébergement `apps/api`    | Aucun compte Railway/Fly.io/VPS créé (MODULE 16.1)                                          |
| `apps/admin`              | Reporté à la passe 2 (ADR 0010, décision 1) — dépend d'une API fonctionnelle, pas l'inverse |

## Prochaine étape pour débloquer

1. Choisir l'hébergeur PostgreSQL (Railway/Fly.io/VPS/Neon/Supabase) avec
   Libaase — même type de décision que le domaine/l'hébergement web
   (Phase 7).
2. Créer l'instance, poser `DATABASE_URL` réel dans l'environnement de
   `apps/api` (jamais commité).
3. `pnpm --filter @portfolio/api exec prisma migrate dev --name init`
   pour générer la première migration contre la base réelle.
4. Générer un `JWT_SECRET` réel (`openssl rand -base64 48`), le poser en
   variable d'environnement.
5. Choisir l'hébergeur de `apps/api` (Railway/Fly.io/VPS) et le déployer —
   `apps/api` n'est pas encore câblé à `.github/workflows/deploy.yml`
   (ADR 0010, décision 8).
6. Une fois l'API fonctionnelle en production, ouvrir la passe 2 :
   `apps/admin` (Next.js, authentification, formulaires de gestion des
   articles).
