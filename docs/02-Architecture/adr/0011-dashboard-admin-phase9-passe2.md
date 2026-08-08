# ADR 0011 — Tableau de bord admin (Phase 9, passe 2)

**Statut** : Acceptée
**Date** : 2026-08-08

## Contexte

ADR 0010 (passe 1) a posé `apps/api` (NestJS) et `database/prisma/
schema.prisma` (`BlogPost` uniquement), et reporté explicitement
`apps/admin` à une passe 2 — MODULE 16.3 impose que l'admin dépende d'une
API existante, pas l'inverse. `apps/api` est fonctionnel (testé, buildé)
mais tourne sans base de données réelle : cette passe construit l'UI
d'administration en cohérence avec ce même principe (règle 0.2.2 : aucun
compte/identifiant réel inventé).

Un manque de la passe 1 apparaît ici : `JwtStrategy`/`JwtAuthGuard`
valident un JWT déjà émis, mais rien n'émettait de JWT — il manquait
l'endpoint de connexion. Cette passe le comble.

## Décisions

1. **`apps/admin` : Next.js 15 App Router, sans internationalisation, sans
   `@portfolio/ui`.** Outil interne à usage exclusif de Libaase (pas de
   public visé) : `next-intl`/routing localisé (utilisés par `apps/web`)
   n'apportent aucune valeur ici. Français uniquement, même conventions
   TypeScript strict que `apps/web` (`tsconfig.base.json`). `@portfolio/ui`
   n'est pas réutilisé : ses composants (`Button`, `Badge`) sont couplés
   aux classes Tailwind de marque (`bg-primary-fill`, `text-app-text`…,
   définies dans le `tailwind.config.ts`/`globals.css` d'`apps/web`) —
   les réutiliser sans porter tout le système de tokens produirait des
   classes non générées (boutons non stylés). Palette Tailwind par
   défaut, composants de formulaire simples écrits localement.

2. **Ajout à `apps/api` : modèle `AdminUser` (Prisma) + `POST /auth/login`.**
   Comble le manque décrit ci-dessus. `AdminUser` (`email` unique,
   `passwordHash`) est un modèle, pas une donnée : **aucun seed, aucun
   compte inséré** (même règle que ADR 0010, décision 6) — le premier
   compte admin réel sera créé à la main (`prisma studio` ou script à
   exécuter une fois) une fois une base réelle disponible, jamais par un
   endpoint d'inscription public (surface d'attaque inutile pour un outil
   à un seul utilisateur). `AuthController.login` compare le mot de passe
   via `bcrypt.compare`, signe un JWT (`JwtService` déjà scaffoldé,
   passe 1) si valide.

3. **Flux d'auth par cookie `httpOnly`, pas de JWT exposé au JavaScript
   client.** Une Server Action (`app/login/actions.ts`) appelle
   `POST {API_URL}/auth/login` côté serveur, reçoit le JWT, le pose dans
   un cookie `httpOnly; secure; sameSite=lax`. Toute lecture ultérieure
   (Server Components, Server Actions) relit ce cookie et l'attache en
   `Authorization: Bearer` pour appeler `apps/api` — jamais transmis au
   bundle client. `middleware.ts` protège toutes les routes sauf
   `/login` en vérifiant la seule _présence_ du cookie (garde-fou UX) :
   la vérification de signature/expiration reste la responsabilité de
   `JwtAuthGuard` côté `apps/api`, seule frontière de sécurité réelle.

4. **Lecture par Server Components + mutations par Server Actions, pas
   TanStack Query.** MODULE 16.1 prévoit TanStack Query/Zustand pour
   l'état/données, pensé pour l'interactivité client du site public
   (filtres, recherche). Un outil CRUD interne à faible trafic n'a besoin
   ni de cache client, ni de mise à jour optimiste : Server Components
   (lecture) + Server Actions (`revalidatePath` après mutation) couvrent
   le besoin avec moins de code et zéro JS de fetch client. TanStack
   Query reste la solution prévue le jour où `apps/web` a besoin de
   données client avec cache (aucun cas aujourd'hui) — pas d'abstraction
   avant le besoin, même principe que ADR 0010 décision 7 (pas de
   Redis/BullMQ sans besoin identifié).

5. **`apps/admin` appelle `apps/api` uniquement serveur-à-serveur, jamais
   depuis le navigateur.** Conséquence directe de la décision 4 (pas de
   fetch client) : aucun CORS à ouvrir sur `apps/api`, qui reste
   `'self'`-only par défaut — surface d'attaque réduite au minimum pour
   une API dont le seul consommateur est `apps/admin`.

6. **Périmètre CRUD : `BlogPost` uniquement**, même limite que la passe 1
   (ADR 0010, décision 2) — liste, création, édition, suppression. Pas de
   gestion des autres types de contenu (toujours fichiers), pas de RBAC
   multi-rôles (un seul rôle admin), pas de gestion des comptes
   utilisateurs (aucun compte à gérer tant qu'aucun n'existe).

## Bloqué — comptes/infrastructure réels non acquis

| Élément                        | Bloqué par                                                                    |
| ------------------------------ | ----------------------------------------------------------------------------- |
| Instance PostgreSQL            | Même blocage que ADR 0010 — aucun hébergeur choisi                            |
| Premier compte admin réel      | Doit être créé à la main contre une base réelle, jamais inventé/seedé ici     |
| `JWT_SECRET` / `API_URL` réels | `apps/admin` ne peut pas appeler `apps/api` sans une instance réelle déployée |
| Hébergement `apps/admin`       | Aucun compte choisi (Vercel possible, même stack que `apps/web`, à confirmer) |

## Non traité cette passe (hors périmètre)

- Réinitialisation de mot de passe (aucun compte à réinitialiser).
- Gestion multi-utilisateurs / RBAC granulaire (un seul rôle).
- Upload de médias pour les articles (ADR 0010 — aucun article n'en a
  besoin à ce stade).
- Déploiement réel d'`apps/admin`/`apps/api` (blocages ci-dessus).

## Conséquences

- `apps/admin` ne peut fonctionner de bout en bout qu'une fois une
  instance PostgreSQL réelle disponible et un premier compte admin créé
  à la main — vérifié cette passe par ses tests unitaires (auth,
  helpers de session), pas par un flux réel.
- Toute nouvelle mutation sur `BlogPost` doit passer par `apps/api`
  (validée par `blogPostFrontmatterSchema`/`createBlogPostSchema`) : ni
  `apps/web` ni `apps/admin` ne doivent dupliquer cette validation.
