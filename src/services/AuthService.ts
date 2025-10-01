interface LoginCredentials {
  email: string;
  password: string;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor';
  is_active: boolean;
}

interface AuthResponse {
  success: boolean;
  data: {
    admin: AdminUser;
    token: string;
  };
  message: string;
}

import apiService from './ApiService';

class AuthService {
  private baseURL = 'http://127.0.0.1:8000/api/v1/auth/admin';
  private tokenKey = 'samafoot_admin_token';
  private userKey = 'samafoot_admin_user';

  // Connexion
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    console.log(data);
    

    if (!response.ok) {
      throw new Error(data.message || 'Erreur de connexion');
    }

    // Stocker le token et les infos utilisateur en session (non persistant)
    sessionStorage.setItem(this.tokenKey, data.token);
    sessionStorage.setItem(this.userKey, JSON.stringify(data.admin));

    // Mettre à jour le token dans ApiService
    apiService.setToken(data.token);

    return {
      success: true,
      data: {
        admin: data.admin,
        token: data.token,
      },
      message: data.message || 'Connexion réussie',
    } as AuthResponse;
  }

  // Déconnexion
  async logout(): Promise<void> {
    const token = this.getToken();
    
    if (token) {
      try {
        await fetch(`${this.baseURL}/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
      }
    }

    // Supprimer les données locales
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);

    // Supprimer le token d'ApiService
    apiService.setToken(null);
  }

  // Obtenir le token
  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  // Obtenir l'utilisateur connecté
  getCurrentUser(): AdminUser | null {
    const userStr = sessionStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getCurrentUser();
  }

  // Vérifier si l'utilisateur est admin
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user ? ['super_admin', 'admin'].includes(user.role) : false;
  }

  // Vérifier si l'utilisateur est super admin
  isSuperAdmin(): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === 'super_admin' : false;
  }

  // Obtenir les informations de l'utilisateur depuis l'API
  async me(): Promise<AdminUser> {
    const token = this.getToken();
    
    if (!token) {
      throw new Error('Non authentifié');
    }

    const response = await fetch(`${this.baseURL}/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la récupération des informations');
    }

    // Mettre à jour les infos utilisateur
    sessionStorage.setItem(this.userKey, JSON.stringify(data.data));

    return data.data;
  }

  // Changer le mot de passe
  async changePassword(currentPassword: string, newPassword: string, confirmPassword: string): Promise<void> {
    const token = this.getToken();
    
    if (!token) {
      throw new Error('Non authentifié');
    }

    const response = await fetch(`${this.baseURL}/change-password`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors du changement de mot de passe');
    }
  }
}

export default new AuthService();
