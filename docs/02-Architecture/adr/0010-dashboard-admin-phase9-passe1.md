# ADR 0010 — Tableau de bord admin (Phase 9, passe 1)

**Statut** : Acceptée
**Date** : 2026-08-08

## Contexte

MODULE 15 classe le « Tableau de bord d'administration (gestion du contenu
sans redéploiement) » en palier **V3 — Plateforme**, le plus avancé (après
V1 indispensable et V2 différenciant). MODULE 16.2 impose son découpage
(`apps/admin`, `apps/api` NestJS, `database/` PostgreSQL/Prisma, Redis/
BullMQ, auth NextAuth/JWT + RBAC) et MODULE 16.3 impose un **démarrage
progressif explicite** :

```
Étape 3 : ajout de apps/api + database/ (quand le CMS devient nécessaire)
Étape 4 : ajout de apps/admin, puis apps/mobile
```

Comme pour les Phases 7 et 8 (ADR 0008, ADR 0009), cette passe applique la
règle 0.2.2 : aucun compte ni identifiant réel n'est inventé (hébergement
PostgreSQL, Redis, secret JWT réel). Elle pose la mécanique qui ne dépend
d'aucun compte externe, et documente précisément ce qui reste bloqué.

## Décisions

1. **Passe 1 = `apps/api` + `database/` uniquement, pas `apps/admin`.**
   Applique littéralement MODULE 16.3 : l'admin (étape 4) dépend de l'API
   (étape 3), pas l'inverse. Construire une UI d'administration avant que
   l'API qu'elle consomme existe produirait du code non testable contre
   un vrai contrat — `apps/admin` est reporté à une passe 2, une fois
   `apps/api` fonctionnel et déployé (même s'il ne l'est que localement,
   faute d'hébergement réel — voir « Bloqué » ci-dessous).

2. **Une seule entité gérée cette passe : `BlogPost`.** Modéliser les dix
   types de contenu (`content/about`, `experience`, `skills`,
   `testimonials`, `services`, `faq`…) sans besoin exprimé serait
   sur-ingénierie prématurée (cf. principe du projet : pas d'abstraction
   avant le besoin). Le blog (Phase 8, ADR 0009) est le seul contenu conçu
   pour changer après le lancement sans redéploiement de code — c'est
   précisément le problème que « gestion du contenu sans redéploiement »
   résout. Les autres types de contenu restent fichiers (JSON/MDX)
   jusqu'à preuve d'un besoin de mise à jour fréquente équivalent.

3. **`Prisma` schema posé (`database/prisma/schema.prisma`), aucune
   migration exécutée.** `prisma migrate dev` exige une connexion réelle à
   PostgreSQL — inexistante (aucun hébergeur choisi, voir « Bloqué »).
   Le schéma est écrit et versionné (relit et validé par
   `prisma validate`, qui n'a besoin d'aucune connexion), la première
   migration sera générée dès qu'une instance réelle existera.

4. **Modèle Prisma `BlogPost` en miroir de `blogPostFrontmatterSchema`**
   (`packages/validations/src/blogPost.ts`), pas un schéma redéfini de
   zéro. Mêmes champs (`titre`, `extrait`, `datePublication`,
   `dateMiseAJour`, `theme`, `tags`) plus `slug` (unique, généré par
   l'API à la création — même règle que le loader fichier actuel, ADR
   0009 décision 4 : jamais désynchronisé d'un champ frontmatter séparé)
   et `corps` (le Markdown/MDX, `String` Postgres `text`). Migrer du
   fichier vers la base est un chantier à part (hors périmètre, voir
   plus bas) : cette passe modélise le futur stockage, ne migre rien.

5. **Validation par les schémas Zod partagés (`@portfolio/validations`),
   pas `class-validator`.** MODULE 16.1 précise « Validation : Zod
   (schémas partagés client/serveur) ». Un `ZodValidationPipe` NestJS
   minimal (quelques lignes, `apps/api/src/common/zod-validation.pipe.ts`)
   enveloppe `blogPostFrontmatterSchema` plutôt que dupliquer les règles
   de validation avec des décorateurs `class-validator` — même logique
   que ADR 0009 décision 7 (pas de dépendance pour ce qu'une fonction
   courte couvre déjà), et garantit que l'API et le site public
   n'valident jamais un article différemment.

6. **Auth : module JWT scaffoldé (`@nestjs/passport` + `passport-jwt`),
   aucun secret réel posé.** `JWT_SECRET` est lu via `@nestjs/config`
   (`ConfigModule.forRoot({ validate })`), validé au _bootstrap_ de
   l'application (`main.ts`), jamais à l'import d'un module — les tests
   unitaires (qui instancient un contrôleur/service isolément, pas
   l'`AppModule` complet) n'ont donc pas besoin d'un secret pour passer en
   CI. Aucun utilisateur admin réel n'existe : pas de seed
   `database/seed/` avec un compte/mot de passe, même de test — un compte
   admin est une donnée d'accès réelle, pas un gabarit (règle 0.2.2).

7. **Pas de Redis/BullMQ cette passe.** MODULE 16.1 les prévoit pour le
   cache/les files d'attente, mais rien dans le périmètre actuel
   (CRUD `BlogPost` synchrone) n'en a besoin — même principe que la
   décision 1 : pas de brique posée avant un besoin réel identifié.

8. **`apps/api` non ajouté à `deploy.yml` ni à `docker-compose.prod.yml`
   cette passe.** Aucun hébergement API choisi (Railway/Fly.io/VPS,
   MODULE 16.1) : le déployer maintenant reviendrait à improviser une
   cible d'hébergement. `apps/api` se lance et se teste en local
   (`pnpm --filter @portfolio/api dev`), câblé au CI existant (lint/
   types/tests/build, `turbo.json` couvre déjà `apps/*` sans
   modification) mais pas au pipeline de déploiement.

## Bloqué — comptes/infrastructure réels non acquis

| Élément                   | Bloqué par                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| Instance PostgreSQL       | Aucun hébergeur choisi (Railway/Fly.io/VPS/Neon/Supabase — décision à prendre avec Libaase) |
| Première migration Prisma | Dépend de la ligne précédente (`prisma migrate dev` a besoin d'une connexion réelle)        |
| `JWT_SECRET` réel         | Doit être un secret généré et gardé hors dépôt (variable d'environnement), pas inventé ici  |
| Compte(s) admin           | Aucun utilisateur réel fourni — pas de seed avec identifiants, mêmes de test                |
| Hébergement `apps/api`    | Aucun compte Railway/Fly.io/VPS créé (MODULE 16.1)                                          |
| `apps/admin`              | Reporté à la passe 2 (décision 1)                                                           |

## Non traité cette passe (hors périmètre)

- `apps/admin` (voir décision 1).
- Redis/BullMQ (voir décision 7).
- Migration du contenu blog existant fichier → base (aucun article publié
  à ce jour, ADR 0009 — rien à migrer).
- RBAC multi-rôles : un seul rôle admin envisagé, pas de granularité de
  permissions tant qu'aucun second utilisateur n'est identifié.
- Upload de médias (Cloudinary/S3, MODULE 16.1) : aucun article n'a
  d'image à gérer à ce stade.

## Conséquences

- `pnpm build`/`pnpm test`/`pnpm lint`/`pnpm type-check` à la racine
  couvrent désormais aussi `apps/api` (glob `apps/*` de
  `pnpm-workspace.yaml`, tâches génériques de `turbo.json`) — la CI
  continue de passer sans configuration supplémentaire.
- Le site public (`apps/web`) n'est pas modifié par cette passe : le blog
  reste servi par `apps/web/src/lib/blog.ts` (fichiers), pas par l'API.
  Faire lire `apps/web` depuis l'API est un chantier explicitement futur
  (une fois `apps/admin` et une instance Postgres réelles en place).
- `database/prisma/schema.prisma` devient la source de vérité du futur
  modèle `BlogPost` en base ; toute évolution de
  `blogPostFrontmatterSchema` (packages/validations) doit être répercutée
  manuellement ici tant qu'aucune génération automatique n'est mise en
  place (hors périmètre : le schéma actuel ne justifie pas cet outillage).
