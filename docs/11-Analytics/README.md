# Analytics — PHASE 7 (passe 1)

MODULE 15 (V1 indispensable) prévoit un « Analytics respectueux de la vie
privée (Plausible / Umami) ». Non câblé à ce jour : les deux options
demandent un compte (et, pour Plausible cloud, un abonnement) que je ne
dois pas inventer — même règle que le contenu Phase 3 et les identifiants
de déploiement (ADR 0008).

## Choix à faire avant de câbler quoi que ce soit

- **Plausible** (cloud payant ou self-hosted) vs **Umami** (self-hosted
  gratuit, ou cloud) — arbitrage coût/hébergement à trancher avec
  Libaase, pas une décision technique à prendre seule.
- Si self-hosted : où l'héberger (le VPS/Docker déjà prévu pour la voie
  auto-hébergée de `apps/web`, docs/14-Deployment, pourrait convenir).

## Prochaine étape pour débloquer

1. Choisir Plausible ou Umami (et cloud vs self-hosted).
2. Créer le compte / instance, obtenir le domaine de tracking et, pour
   Umami self-hosted, l'URL du script et l'ID de site.
3. Intégrer le script de suivi dans `apps/web/src/app/[locale]/layout.tsx`,
   gardé par une variable d'environnement (absente en dev), et l'ajouter à
   `connect-src`/`script-src` dans `apps/web/next.config.ts` (actuellement
   restreint à `'self'` — voir ADR 0008).

Aucune intégration factice posée en attendant : un script d'analytics sans
destination réelle n'a pas de valeur et ajoute du poids JS pour rien.
