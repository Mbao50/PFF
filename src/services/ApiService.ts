import axios, { AxiosInstance } from 'axios';
import { Club, Player, Match, Article, StandingEntry } from '../types';
import { matches, clubs, players, generateStandings, articles } from '../data/mockData';

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

    // Get token from sessionStorage if available
    this.token = sessionStorage.getItem('samafoot_admin_token');

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
    if (token) {
      sessionStorage.setItem('samafoot_admin_token', token);
    } else {
      sessionStorage.removeItem('samafoot_admin_token');
    }
  }

  // Clubs
  async getClubs(): Promise<Club[]> {
    try {
      const response = await this.api.get('/admin/clubs');
      return response.data.data || [];
    } catch (error) {
      console.warn('Failed to fetch clubs from API:', error);
      // Only fallback to mock data if not authenticated (for public views)
      // For admin interface, return empty array to avoid confusion with mock data
      if (!this.token) {
        return clubs;
      }
      // If authenticated but API fails, return empty array instead of mock data
      return [];
    }
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
    try {
      const response = await this.api.get('/admin/players');
      // Transform snake_case to camelCase
      const players = response.data.data || [];
      return players.map((player: any) => ({
        id: player.id,
        name: player.name,
        position: player.position,
        birthdate: player.birthdate,
        nationality: player.nationality,
        clubId: player.club_id,
        image: player.image,
        height: player.height,
        weight: player.weight,
        appearances: player.appearances,
        goals: player.goals,
        assists: player.assists,
        yellowCards: player.yellow_cards,
        redCards: player.red_cards,
      }));
    } catch (error) {
      console.warn('Failed to fetch players from API:', error);
      // Only fallback to mock data if not authenticated (for public views)
      // For admin interface, return empty array to avoid confusion with mock data
      if (!this.token) {
        return players;
      }
      // If authenticated but API fails, return empty array instead of mock data
      return [];
    }
  }

  async createPlayer(data: Omit<Player, 'id'>): Promise<Player> {
    // Convert camelCase to snake_case for backend
    const backendData = {
      name: data.name,
      position: data.position,
      birthdate: data.birthdate,
      nationality: data.nationality,
      club_id: data.clubId,
      image: data.image,
      height: data.height,
      weight: data.weight,
      appearances: data.appearances,
      goals: data.goals,
      assists: data.assists,
      yellow_cards: data.yellowCards,
      red_cards: data.redCards,
    };
    const response = await this.api.post('/admin/players', backendData);
    // Transform response back to camelCase
    const player = response.data.data;
    return {
      id: player.id,
      name: player.name,
      position: player.position,
      birthdate: player.birthdate,
      nationality: player.nationality,
      clubId: player.club_id,
      image: player.image,
      height: player.height,
      weight: player.weight,
      appearances: player.appearances,
      goals: player.goals,
      assists: player.assists,
      yellowCards: player.yellow_cards,
      redCards: player.red_cards,
    };
  }

  async updatePlayer(id: string, data: Partial<Player>): Promise<Player> {
    // Convert camelCase to snake_case for backend
    const backendData: any = {};
    if (data.name !== undefined) backendData.name = data.name;
    if (data.position !== undefined) backendData.position = data.position;
    if (data.birthdate !== undefined) backendData.birthdate = data.birthdate;
    if (data.nationality !== undefined) backendData.nationality = data.nationality;
    if (data.clubId !== undefined) backendData.club_id = data.clubId;
    if (data.image !== undefined) backendData.image = data.image;
    if (data.height !== undefined) backendData.height = data.height;
    if (data.weight !== undefined) backendData.weight = data.weight;
    if (data.appearances !== undefined) backendData.appearances = data.appearances;
    if (data.goals !== undefined) backendData.goals = data.goals;
    if (data.assists !== undefined) backendData.assists = data.assists;
    if (data.yellowCards !== undefined) backendData.yellow_cards = data.yellowCards;
    if (data.redCards !== undefined) backendData.red_cards = data.redCards;

    const response = await this.api.put(`/admin/players/${id}`, backendData);
    // Transform response back to camelCase
    const player = response.data.data;
    return {
      id: player.id,
      name: player.name,
      position: player.position,
      birthdate: player.birthdate,
      nationality: player.nationality,
      clubId: player.club_id,
      image: player.image,
      height: player.height,
      weight: player.weight,
      appearances: player.appearances,
      goals: player.goals,
      assists: player.assists,
      yellowCards: player.yellow_cards,
      redCards: player.red_cards,
    };
  }

  async deletePlayer(id: string): Promise<void> {
    await this.api.delete(`/admin/players/${id}`);
  }

  // Matches
  async getMatches(): Promise<Match[]> {
    try {
      const response = await this.api.get('/admin/matches');
      return response.data.data || [];
    } catch (error) {
      console.warn('Failed to fetch matches from API:', error);
      // Only fallback to mock data if not authenticated (for public views)
      // For admin interface, return empty array to avoid confusion with mock data
      if (!this.token) {
        return matches;
      }
      // If authenticated but API fails, return empty array instead of mock data
      return [];
    }
  }

  async getMatch(id: string): Promise<Match> {
    try {
      const response = await this.api.get(`/matches/${id}`);
      return response.data.data;
    } catch (error) {
      console.warn('Failed to fetch match from API:', error);
      // Fallback to mock data if not authenticated
      if (!this.token) {
        const match = matches.find(m => m.id === id);
        if (!match) throw new Error('Match not found in mock data');
        return match;
      }
      throw error;
    }
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
    try {
      const response = await this.api.get('/admin/articles');
      return response.data.data || [];
    } catch (error) {
      console.warn('Failed to fetch articles from API:', error);
      // Only fallback to mock data if not authenticated (for public views)
      // For admin interface, return empty array to avoid confusion with mock data
      if (!this.token) {
        return articles;
      }
      // If authenticated but API fails, return empty array instead of mock data
      return [];
    }
  }

  async getArticle(id: string): Promise<Article> {
    try {
      const response = await this.api.get(`/admin/articles/${id}`);
      return response.data.data;
    } catch (error) {
      console.warn('Failed to fetch article from API:', error);
      // Fallback to mock data if not authenticated
      if (!this.token) {
        const article = articles.find(a => a.id === id);
        if (!article) throw new Error('Article not found in mock data');
        return article;
      }
      throw error;
    }
  }

  async createArticle(data: Omit<Article, 'id'>): Promise<Article> {
    const response = await this.api.post('/admin/articles', data);
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
