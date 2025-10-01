# API d'Administration SAMAFOOT

Ce document décrit comment utiliser l'API d'administration de la plateforme SAMAFOOT.

## Authentification

### Connexion d'un administrateur

**Endpoint:** `POST /v1/auth/admin/login`

**Body:**
```json
{
    "email": "admin@samafoot.sn",
    "password": "admin123"
}
```

**Réponse:**
```json
{
    "message": "Connexion réussie",
    "admin": {
        "id": "uuid",
        "name": "Super Admin",
        "email": "admin@samafoot.sn",
        "role": "super_admin"
    },
    "token": "token_jwt"
}
```

### Déconnexion

**Endpoint:** `POST /v1/auth/admin/logout`

**Headers:**
```
Authorization: Bearer {token}
```

### Informations du profil

**Endpoint:** `GET /v1/auth/admin/me`

**Headers:**
```
Authorization: Bearer {token}
```

## Comptes Administrateurs par Défaut

- **Super Admin:** admin@samafoot.sn / admin123
- **Editor:** editor@samafoot.sn / editor123  
- **Manager:** manager@samafoot.sn / manager123

## Rôles et Permissions

- **super_admin:** Accès complet à toutes les fonctionnalités
- **admin:** Peut gérer le contenu mais pas les autres administrateurs
- **editor:** Peut éditer le contenu mais pas créer/supprimer

## Gestion des Administrateurs (Super Admin uniquement)

### Créer un administrateur
**Endpoint:** `POST /v1/auth/admin/create`

**Body:**
```json
{
    "name": "Nouvel Admin",
    "email": "nouveau@samafoot.sn",
    "password": "motdepasse",
    "password_confirmation": "motdepasse",
    "role": "admin"
}
```

### Lister les administrateurs
**Endpoint:** `GET /v1/auth/admin/list`

### Modifier le statut d'un administrateur
**Endpoint:** `POST /v1/auth/admin/{id}/toggle-status`

### Supprimer un administrateur
**Endpoint:** `DELETE /v1/auth/admin/{id}`

## Fonctionnalités Implémentées

✅ **Authentification des administrateurs**
- Connexion/déconnexion
- Récupération du profil
- Changement de mot de passe

✅ **Gestion des utilisateurs administrateurs**
- Création de comptes administrateurs
- Suspension/réactivation des comptes
- Suppression des comptes
- Gestion des rôles et permissions

✅ **Sécurité**
- Middleware de vérification des rôles
- Tokens d'authentification avec Laravel Sanctum
- Validation des données d'entrée

## Prochaines Étapes

Les fonctionnalités suivantes seront implémentées prochainement :

1. **Gestion des équipes** - Ajouter/modifier/supprimer des clubs
2. **Gestion des joueurs** - Gérer les fiches des joueurs
3. **Gestion des matchs** - Programmer et mettre à jour les matchs
4. **Gestion des actualités** - Publier des articles sportifs
5. **Modération des commentaires** - Modérer le contenu utilisateur
6. **Statistiques** - Suivi de l'utilisation de la plateforme
7. **Notifications** - Envoi de notifications globales

## Démarrage

1. Installer les dépendances: `composer install`
2. Configurer la base de données dans `.env`
3. Exécuter les migrations: `php artisan migrate`
4. Peupler la base: `php artisan db:seed`
5. Démarrer le serveur: `php artisan serve`

L'API sera disponible sur `http://localhost:8000/api/v1/`
