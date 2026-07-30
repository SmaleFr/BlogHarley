# BlogHarley 🏍️

Blog communautaire dédié à l'univers **Harley-Davidson**. Articles techniques, forum Q&A, articles soumis par la communauté, et offres d'emploi/prestations.

## Stack technique

| Technologie | Usage |
|-------------|-------|
| **Nuxt 4** + **Vue 3** | Framework frontend & backend |
| **Drizzle ORM** + **Turso/SQLite** | Base de données |
| **Nitro** (built-in) | Sessions & auth (JWT + cookies) |
| **Tailwind CSS v3** | Styling, thème Harley-Davidson |
| **Lucide** | Icônes |
| **Zod** | Validation |

## Contenu de démonstration

Le seed (`pnpm db:seed`) génère automatiquement **87 éléments de contenu** variés :

| Type | Quantité | Détail |
|------|----------|--------|
| Articles blog | 23 | Histoire HD, fiches techniques, tutoriels, culture, événements |
| Questions forum | 16 | Entretien, mécanique, choix moto, assurance, road trip... |
| Réponses forum | 33 | 2-3 réponses par question avec votes et réponses acceptées |
| Articles communauté | 10 | 6 approuvés, 2 en attente, 2 rejetés |
| Offres emploi | 10 | 7 approuvées, 2 en attente, 1 refusée |
| Catégories | 8 | Fiches Techniques, Histoire, Tutoriels, Personnalisation, etc. |
| Tags | 38 | Knucklehead, Panhead, Evolution, Milwaukee-Eight, etc. |
| Utilisateurs | 7 | 1 admin, 1 modérateur, 5 utilisateurs |

## Fonctionnalités

### 📝 Blog
Articles officiels regroupés par catégories Harley-Davidson :
| Catégorie | Description |
|-----------|-------------|
| **Fiches Techniques** | Spécifications, motorisations, performances |
| **Histoire** | L'histoire HD, modèles iconiques |
| **Tutoriels Mécanique** | Guides d'entretien, réparation |
| **Personnalisation** | Customisation, pièces aftermarket |
| **Culture & Lifestyle** | L'esprit Harley, communauté |
| **Événements** | Sturgis, Bike Week, rassemblements |
| **Nouveautés** | Nouveaux modèles, innovations |
| **Road Trips** | Itinéraires, récits de voyage |

- Filtre par catégorie
- Recherche full-text
- Interface admin d'ajout de catégories (sans code)

### 💬 Forum Q&A
Questions/réponses type Stack Overflow :
- Création de questions avec contenu riche
- Réponses avec votes up/down
- Acceptation de la meilleure réponse
- Tri : Récentes / Populaires / Non résolues
- Système de réputation

### 👥 Communauté
- Soumission d'articles par les utilisateurs
- File de modération (approbation/refus avec motif)
- Section distincte "Articles de la communauté"
- Badge "Soumis par [utilisateur]"

### 💼 Emplois & Prestations
- Types : CDI, CDD, Freelance, Stage, Prestation
- Dépôt d'offres avec modération anti-spam
- Filtres par type
- Page détail avec contact

### 🔐 Authentification
- Inscription / Connexion
- Sessions persistantes (cookies chiffrés)
- Rôles : admin, moderator, user
- Middleware de protection des routes

### ⚙️ Administration
- Dashboard avec statistiques
- CRUD articles et catégories
- Modération des articles communauté
- Gestion des offres d'emploi
- Gestion des utilisateurs et rôles

## Installation

```bash
# Cloner
git clone <url>
cd BlogHarley

# Installer les dépendances
pnpm install

# Configurer l'environnement
cp .env.example .env
# Éditer .env si nécessaire

# Créer la base de données et les tables
pnpm db:push

# Données de démo
pnpm db:seed

# Lancer le serveur de développement
pnpm dev
```

### Identifiants de démonstration

| Rôle | Email | Mot de passe |
|------|-------|-------------|
| **Admin** | `admin@blogharley.com` | `admin123` |
| **Modérateur** | `iron@eagle.com` | `password123` |
| **Utilisateur** | `road@king.com` | `password123` |
| **Utilisateur** | `chopper@fan.com` | `password123` |
| **Utilisateur** | `sturgis@veteran.com` | `password123` |
| **Utilisateur** | `twincam@tom.com` | `password123` |
| **Utilisateur** | `biker@girl66.com` | `password123` |

## Scripts

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Lancement serveur de développement |
| `pnpm build` | Build de production |
| `pnpm preview` | Preview du build |
| `pnpm db:push` | Push schéma Drizzle vers la DB |
| `pnpm db:studio` | Drizzle Studio (interface DB) |
| `pnpm db:seed` | Données de démonstration |
| `pnpm db:migrate` | Exécuter les migrations |

## Structure du projet

```
BlogHarley/
├── app/
│   ├── assets/css/          # Styles Tailwind
│   ├── components/
│   │   └── ui/              # Composants réutilisables
│   ├── composables/         # Hooks Vue (useUserSession)
│   ├── layouts/
│   │   ├── default.vue      # Layout principal
│   │   └── admin.vue        # Layout admin
│   ├── middleware/           # Guards de route
│   ├── pages/
│   │   ├── index.vue        # Accueil
│   │   ├── blog/            # Articles
│   │   ├── forum/           # Q&A
│   │   ├── communaute/      # Articles communauté
│   │   ├── emplois/         # Offres d'emploi
│   │   ├── admin/           # Administration
│   │   ├── connexion.vue
│   │   ├── inscription.vue
│   │   └── recherche/       # Recherche
│   ├── utils/
│   └── app.vue
├── server/
│   ├── api/
│   │   ├── auth/            # Login, register, logout
│   │   ├── blog/            # CRUD articles
│   │   ├── forum/           # Questions & réponses
│   │   ├── community/       # Articles communauté
│   │   ├── jobs/            # Offres d'emploi
│   │   ├── admin/           # Admin endpoints
│   │   ├── search/          # Recherche
│   │   ├── vote.post.ts     # Vote system
│   │   └── categories.get.ts
│   ├── middleware/
│   │   └── 0-session.ts    # Injection session h3 → event.context
│   └── utils/
│       ├── db.ts            # Connexion Drizzle
│       ├── schema.ts        # Schéma de la base
│       ├── session.ts       # Gestion des sessions h3
│       └── seed.ts          # Données de démonstration
├── drizzle.config.ts
├── nuxt.config.ts
├── tailwind.config.ts
├── .env.example
└── package.json
```

## Déploiement (Vercel + Turso)

1. Créer une base Turso : `turso db create blog-harley`
2. Obtenir l'URL et le token : `turso db show blog-harley --url`
3. Configurer les variables d'environnement sur Vercel :
   - `TURSO_DB_URL`
   - `TURSO_DB_TOKEN`
   - `NUXT_SESSION_SECRET`
4. Déployer : `vercel`

## API Endpoints

### Auth
- `POST /api/auth/register` — Inscription
- `POST /api/auth/login` — Connexion
- `POST /api/auth/logout` — Déconnexion
- `GET /api/auth/me` — Utilisateur courant

### Blog
- `GET /api/blog` — Liste articles (filtre `?categorie=slug`)
- `GET /api/blog/by/slug/:slug` — Détail article
- `POST /api/blog` — Créer (admin)
- `PUT /api/blog/:id` — Modifier (admin)
- `DELETE /api/blog/:id` — Supprimer (admin)

### Forum
- `GET /api/forum` — Questions (tri `?sort=recent|votes|unanswered`)
- `POST /api/forum` — Nouvelle question
- `GET /api/forum/:slug` — Question + réponses
- `POST /api/forum/:id/answers` — Répondre
- `PUT /api/forum/answers/:id/accept` — Accepter réponse

### Communauté
- `GET /api/community` — Articles approuvés
- `POST /api/community` — Soumettre article
- `GET /api/community/:slug` — Détail

### Emplois
- `GET /api/jobs` — Offres (filtre `?type=CDI|CDD|...`)
- `POST /api/jobs` — Déposer offre
- `GET /api/jobs/:id` — Détail

### Autres
- `GET /api/categories` — Toutes catégories
- `POST /api/vote` — Voter (+1/-1)
- `GET /api/search?q=` — Recherche
- `GET /api/admin` — Dashboard stats
- `GET /api/admin/moderation` — File modération
- `PUT /api/admin/moderation/:id` — Approuver/rejeter
- `GET /api/admin/jobs` — Offres à modérer
- `PUT /api/admin/jobs/:id` — Approuver/désactiver
- `GET /api/admin/users` — Liste utilisateurs
- `PUT /api/admin/users/:id` — Changer rôle
- `POST /api/admin/categories` — Créer catégorie
- `DELETE /api/admin/categories/:id` — Supprimer catégorie

## Licence

MIT
