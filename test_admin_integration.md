# Test d'intégration Admin - SAMAFOOT

## Résumé des fonctionnalités implémentées

### Backend (Laravel)
✅ **Authentification Admin**
- Route de connexion: `POST /api/v1/auth/admin/login`
- Middleware d'authentification: `AdminAuth`
- Gestion des rôles: super_admin, admin, editor

✅ **Contrôleurs CRUD complets**
- `ArticleController`: Gestion des articles (créer, lire, modifier, supprimer, publier/dépublier)
- `ClubController`: Gestion des clubs
- `PlayerController`: Gestion des joueurs
- `MatchController`: Gestion des matchs
- `StandingController`: Gestion des classements (nouveau)

✅ **Routes API**
- Routes publiques: lecture seule pour tous les contenus
- Routes admin protégées: CRUD complet pour tous les contenus
- Route spéciale: mise à jour automatique des classements depuis les matchs

### Frontend (React + TypeScript)
✅ **Service d'authentification**
- `AuthService`: Connexion/déconnexion admin
- Gestion des tokens en sessionStorage
- Vérification des rôles

✅ **Service API**
- `ApiService`: Communication avec le backend
- Méthodes CRUD pour tous les contenus
- Gestion des erreurs

✅ **Composants Admin**
- `ArticleManagement`: Gestion complète des articles
- `ClubManagement`: Gestion des clubs
- `PlayerManagement`: Gestion des joueurs
- `MatchManagement`: Gestion des matchs
- `StandingManagement`: Gestion des classements (nouveau)

✅ **Page Admin**
- Interface unifiée avec navigation
- Authentification intégrée
- Rendu conditionnel des composants

## Instructions de test

### 1. Démarrer le backend
```bash
cd backend
php artisan serve --host=127.0.0.1 --port=8000
```

### 2. Démarrer le frontend
```bash
npm run dev
```

### 3. Tester l'authentification admin
1. Aller sur `/admin`
2. Se connecter avec:
   - Email: `admin@samafoot.sn`
   - Mot de passe: `admin123`

### 4. Tester les fonctionnalités CRUD

#### Articles
- Créer un nouvel article
- Modifier un article existant
- Publier/dépublier un article
- Supprimer un article

#### Clubs
- Créer un nouveau club
- Modifier les informations d'un club
- Supprimer un club

#### Joueurs
- Créer un nouveau joueur
- Modifier les informations d'un joueur
- Supprimer un joueur

#### Matchs
- Créer un nouveau match
- Modifier les scores et statuts
- Supprimer un match

#### Classements
- Créer une entrée de classement manuellement
- Mettre à jour automatiquement depuis les matchs
- Modifier les statistiques
- Supprimer une entrée

### 5. Vérifier la synchronisation
- Les modifications admin doivent se refléter immédiatement dans le frontend public
- Les articles publiés apparaissent sur la page d'accueil
- Les classements mis à jour apparaissent sur la page des classements
- Les nouveaux clubs/joueurs apparaissent dans les listes

## Comptes de test

### Admin
- Email: `admin@samafoot.sn`
- Mot de passe: `admin123`
- Rôle: `super_admin`

### Éditeur
- Email: `editor@samafoot.sn`
- Mot de passe: `editor123`
- Rôle: `editor`

## Endpoints API principaux

### Authentification
- `POST /api/v1/auth/admin/login` - Connexion admin
- `POST /api/v1/auth/admin/logout` - Déconnexion
- `GET /api/v1/auth/admin/me` - Informations utilisateur

### Contenu (lecture seule)
- `GET /api/v1/articles` - Liste des articles publiés
- `GET /api/v1/clubs` - Liste des clubs
- `GET /api/v1/players` - Liste des joueurs
- `GET /api/v1/matches` - Liste des matchs
- `GET /api/v1/standings` - Classements

### Administration (authentification requise)
- `POST /api/v1/admin/articles` - Créer un article
- `PUT /api/v1/admin/articles/{id}` - Modifier un article
- `DELETE /api/v1/admin/articles/{id}` - Supprimer un article
- `POST /api/v1/admin/articles/{id}/toggle-publish` - Publier/dépublier

- `POST /api/v1/admin/clubs` - Créer un club
- `PUT /api/v1/admin/clubs/{id}` - Modifier un club
- `DELETE /api/v1/admin/clubs/{id}` - Supprimer un club

- `POST /api/v1/admin/players` - Créer un joueur
- `PUT /api/v1/admin/players/{id}` - Modifier un joueur
- `DELETE /api/v1/admin/players/{id}` - Supprimer un joueur

- `POST /api/v1/admin/matches` - Créer un match
- `PUT /api/v1/admin/matches/{id}` - Modifier un match
- `DELETE /api/v1/admin/matches/{id}` - Supprimer un match

- `POST /api/v1/admin/standings` - Créer une entrée de classement
- `PUT /api/v1/admin/standings/{id}` - Modifier une entrée
- `DELETE /api/v1/admin/standings/{id}` - Supprimer une entrée
- `POST /api/v1/admin/standings/update-from-matches` - Mise à jour automatique

## Fonctionnalités avancées

### Mise à jour automatique des classements
Le système peut recalculer automatiquement les classements basés sur les matchs terminés:
1. Aller dans la section "Classements"
2. Cliquer sur "Mettre à jour depuis les matchs"
3. Le système calcule automatiquement les points, victoires, défaites, etc.

### Gestion des rôles
- **Super Admin**: Accès complet à toutes les fonctionnalités
- **Admin**: Accès à la gestion du contenu
- **Editor**: Accès limité à la création/modification de contenu

## Notes techniques

- L'authentification utilise Laravel Sanctum
- Les tokens sont stockés en sessionStorage (non persistants)
- Toutes les suppressions sont des "soft deletes" (marquage comme inactif)
- Les articles non publiés n'apparaissent pas dans l'API publique
- Les classements sont triés automatiquement par points puis différence de buts