# Déploiement — PHASE 7 (passe 1)

Deux voies sont scaffoldées ; aucune n'est encore activée en production
faute de comptes/domaine réels (règle 0.2.2 étendue à l'infrastructure —
voir ADR 0008 : pas d'identifiant fictif, comme pour le contenu Phase 3).

## Voie principale — Vercel

Stack imposée (MODULE 16.1). C'est la cible par défaut : zéro conteneur à
gérer, intégration native à Next.js (image OG dynamique, ISR, edge
middleware déjà utilisés par `apps/web`).

### Prérequis (non acquis à ce jour)

- Nom de domaine (`SITE_URL` reste sur sa valeur par défaut
  `http://localhost:3000`, voir `apps/web/.env.example` — **jamais**
  déployer tel quel en production, cf. commentaire du fichier).
- Compte Vercel, projet lié au dépôt GitHub.
- Trois secrets GitHub (Settings → Secrets and variables → Actions) :
  `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

### Obtenir les identifiants Vercel

```bash
npm install --global vercel
vercel login
vercel link          # depuis apps/web/ — crée .vercel/project.json
cat apps/web/.vercel/project.json   # orgId et projectId
```

Le token se génère depuis le tableau de bord Vercel (Account Settings →
Tokens). Poser les trois valeurs comme secrets GitHub du dépôt.

### Pipeline

`.github/workflows/deploy.yml` se déclenche par `workflow_run` une fois
`.github/workflows/ci.yml` terminé avec succès sur `master` (pas en push
direct : on ne déploie que ce qui a passé lint/types/tests/build/
Lighthouse). Chaque étape est gardée par `env.VERCEL_TOKEN != ''` — tant
que le secret n'existe pas, le job se termine vert sans rien faire (voir le
commentaire en tête du fichier pour la raison technique : le contexte
`secrets` n'est pas lisible dans un `if`, seul `env` l'est au niveau d'une
étape).

Alternative plus simple une fois le projet Vercel créé : relier le dépôt
GitHub directement dans le tableau de bord Vercel (déploiement automatique
sans passer par ce workflow). `deploy.yml` reste utile si on veut garder le
succès de la CI comme condition explicite de déploiement plutôt que de
laisser Vercel déployer indépendamment de son résultat.

### Rollback

Tableau de bord Vercel → Deployments → sélectionner un déploiement
antérieur → « Promote to Production ». Instantané, sans rebuild.

## Voie alternative — Docker auto-hébergé

Utile si Vercel n'est pas retenu, ou pour reproduire l'environnement de
production en local. Voir `docs/12-DevOps/README.md` pour le détail des
images (`docker/development/`, `docker/production/`) et `docker/nginx/
nginx.conf` pour le proxy.

```bash
# Depuis la racine du monorepo
SITE_URL=https://votre-domaine.example \
  docker compose -f docker/compose/docker-compose.prod.yml up --build -d
```

**Non traité cette passe** : TLS (pas de certificat réel — voir le
commentaire en tête de `docker/nginx/nginx.conf`), sauvegarde/restauration
(pas de base de données à ce stade, `apps/web` est statique/SSG), scaling
horizontal (un seul conteneur `web`, suffisant pour un portfolio).

### Rollback

`git revert` du commit fautif puis `docker compose ... up --build -d` ;
ou conserver le tag d'image précédent (`docker tag`/`docker push` vers un
registre — non mis en place cette passe, un seul hôte suffit pour l'instant)
et `docker compose up -d` sans rebuild pour revenir dessus instantanément.

## État

| Élément                              | Statut                               |
| ------------------------------------ | ------------------------------------ |
| Dockerfiles dev/prod, compose, nginx | Fait — voir `docker/`                |
| `next.config.ts` : headers sécurité  | Fait — voir ADR 0008                 |
| Workflow de déploiement Vercel       | Scaffoldé, inactif (secrets absents) |
| Compte Vercel + domaine              | Non acquis                           |
| Déploiement testé de bout en bout    | Non — bloqué par la ligne précédente |

Prochaine étape pour débloquer : acquérir le domaine (voir
`docs/01-Business/PersonalBrand.md`), créer le compte Vercel, poser les
trois secrets GitHub, positionner `SITE_URL` réel sur Vercel.
