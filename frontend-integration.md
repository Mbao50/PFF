# Intégration Frontend React avec Backend Laravel

## Configuration du Frontend

### 1. Modifier le service pour utiliser Laravel API

```typescript
// src/services/ApiService.ts
const API_BASE_URL = 'http://localhost:8000/api/v1';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async get(endpoint: string) {
    const response = await fetch(`${this.baseURL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async post(endpoint: string, data: any) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // Teams
  async getTeams() {
    return this.get('/teams');
  }

  async getTeam(id: string) {
    return this.get(`/teams/${id}`);
  }

  // Players
  async getPlayers(teamId?: string) {
    const query = teamId ? `?team_id=${teamId}` : '';
    return this.get(`/players${query}`);
  }

  async getPlayer(id: string) {
    return this.get(`/players/${id}`);
  }

  // Matches
  async getMatches(status?: string) {
    const query = status ? `?status=${status}` : '';
    return this.get(`/matches${query}`);
  }

  async getMatch(id: string) {
    return this.get(`/matches/${id}`);
  }
}

export default new ApiService();
```

### 2. Modifier les composants pour utiliser la nouvelle API

```typescript
// src/pages/Clubs.tsx
import { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';

const Clubs: React.FC = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await ApiService.getTeams();
        setClubs(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des clubs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      {/* Votre composant clubs */}
    </div>
  );
};
```

## Commandes pour démarrer le backend

```bash
# Dans le dossier backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```

## CORS Configuration

Ajouter dans `config/cors.php` :

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_methods' => ['*'],
'allowed_origins' => ['http://localhost:3000'],
'allowed_origins_patterns' => [],
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => false,
```