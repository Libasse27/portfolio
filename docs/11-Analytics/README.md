# Analytics — PHASE 7 (passe 1)

MODULE 15 (V1 indispensable) prévoit un « Analytics respectueux de la vie
privée (Plausible / Umami) ». Non câblé à ce jour : l'instance retenue
(Umami self-hosted, décision ci-dessous) demande une installation réelle
que je ne dois pas inventer — même règle que le contenu Phase 3 et les
identifiants de déploiement (ADR 0008).

## Décision (2026-08-08)

**Umami self-hosted**, tranchée avec Libaase : gratuit, pas d'abonnement
récurrent, cohérent avec l'hébergement principal Vercel retenu pour
`apps/web` (docs/14-Deployment) — Umami tournera cependant sur une instance
séparée (Vercel ne fait pas tourner de conteneur long-lived pour la base de
données Umami), typiquement le même VPS/Docker que la voie auto-hébergée
déjà scaffoldée (`docker/`), ou une offre PaaS avec base Postgres/MySQL
managée. Choix précis de l'hébergeur Umami non tranché — **non bloquant**
pour le reste de la Phase 7 (le portfolio se déploie sans lui).

## Prochaine étape pour débloquer

1. Choisir où héberger l'instance Umami (VPS/Docker existant, ou PaaS avec
   base managée).
2. Créer l'instance, obtenir l'URL du script et l'ID de site.
3. Intégrer le script de suivi dans `apps/web/src/app/[locale]/layout.tsx`,
   gardé par une variable d'environnement (absente en dev), et l'ajouter à
   `connect-src`/`script-src` dans `apps/web/next.config.ts` (actuellement
   restreint à `'self'` — voir ADR 0008).

Aucune intégration factice posée en attendant : un script d'analytics sans
destination réelle n'a pas de valeur et ajoute du poids JS pour rien.
