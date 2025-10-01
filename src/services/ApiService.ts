import axios, { AxiosInstance } from 'axios';
import { Club, Player, Match, Article, StandingEntry } from '../types';
import { matches, clubs, players, generateStandings, articles } from '../data/mockData';
import { getToken } from './AuthService';

const API_BASE_URL = 'http://localhost:8000/api/v1'; // Adjusted to include /v1

class ApiService {
  private api: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add a request interceptor to include Authorization header if token is set
    this.api.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers = config.headers || {};
          config.headers['Authorization'] = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  setToken(token: string | null) {
    this.token = token;
  }

  // Clubs
  async getClubs(): Promise<Club[]> {
    // For now, always return mock data to ensure consistency between admin and user views
    return clubs;
  }

  async createClub(data: Omit<Club, 'id'>): Promise<Club> {
    const response = await this.api.post('/admin/clubs', data);
    return response.data.data;
  }

  async updateClub(id: string, data: Partial<Club>): Promise<Club> {
    const response = await this.api.put(`/admin/clubs/${id}`, data);
    return response.data.data;
  }

  async deleteClub(id: string): Promise<void> {
    await this.api.delete(`/admin/clubs/${id}`);
  }

  // Players
  async getPlayers(): Promise<Player[]> {
    // For now, always return mock data to ensure consistency between admin and user views
    return players;
  }

  async createPlayer(data: Omit<Player, 'id'>): Promise<Player> {
    const response = await this.api.post('/admin/players', data);
    return response.data.data;
  }

  async updatePlayer(id: string, data: Partial<Player>): Promise<Player> {
    const response = await this.api.put(`/admin/players/${id}`, data);
    return response.data.data;
  }

  async deletePlayer(id: string): Promise<void> {
    await this.api.delete(`/admin/players/${id}`);
  }

  // Matches
  async getMatches(): Promise<Match[]> {
    // For now, always return mock data to ensure consistency between admin and user views
    return matches;
  }

  async getMatch(id: string): Promise<Match> {
    // For now, always return mock data to ensure consistency between admin and user views
    const match = matches.find(m => m.id === id);
    if (!match) throw new Error('Match not found in mock data');
    return match;
  }

  async createMatch(data: Omit<Match, 'id'>): Promise<Match> {
    const response = await this.api.post('/admin/matches', data);
    return response.data.data;
  }

  async updateMatch(id: string, data: Partial<Match>): Promise<Match> {
    const response = await this.api.put(`/admin/matches/${id}`, data);
    return response.data.data;
  }

  async deleteMatch(id: string): Promise<void> {
    await this.api.delete(`/admin/matches/${id}`);
  }

  // Articles
  async getArticles(): Promise<Article[]> {
    // For now, always return mock data to ensure consistency between admin and user views
    return articles;
  }

  async createArticle(data: Omit<Article, 'id'>): Promise<Article> {
    const response = await this.api.post('/admin/articles', data,{
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Accept': 'application/json',
      },
    });
    return response.data.data;
  }

  async updateArticle(id: string, data: Partial<Article>): Promise<Article> {
    const response = await this.api.put(`/admin/articles/${id}`, data);
    return response.data.data;
  }

  async deleteArticle(id: string): Promise<void> {
    await this.api.delete(`/admin/articles/${id}`);
  }

  async toggleArticlePublish(id: string): Promise<Article> {
    const response = await this.api.post(`/admin/articles/${id}/toggle-publish`);
    return response.data.data;
  }

  // Standings
  async getStandings(): Promise<StandingEntry[]> {
    // For now, always return mock data to ensure consistency between admin and user views
    const mockData = generateStandings();
    mockData.sort((a: StandingEntry, b: StandingEntry) => a.position - b.position);
    return mockData;
  }

  async createStanding(data: Omit<StandingEntry, 'id'>): Promise<StandingEntry> {
    const response = await this.api.post('/admin/standings', data);
    return response.data.data;
  }

  async updateStanding(id: string, data: Partial<StandingEntry>): Promise<StandingEntry> {
    const response = await this.api.put(`/admin/standings/${id}`, data);
    return response.data.data;
  }

  async deleteStanding(id: string): Promise<void> {
    await this.api.delete(`/admin/standings/${id}`);
  }

  async updateStandingsFromMatches(competition: string): Promise<StandingEntry[]> {
    const response = await this.api.post('/admin/standings/update-from-matches', { competition });
    return response.data.data || [];
  }
}

const apiService = new ApiService();
export default apiService;
