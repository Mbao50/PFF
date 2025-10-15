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

    // Add a response interceptor to handle 401 errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token is invalid or expired, logout user
          this.setToken(null);
          // Redirect to admin login if in admin context
          if (window.location.pathname.startsWith('/admin')) {
            window.location.href = '/admin';
          }
        }
        return Promise.reject(error);
      }
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
      const endpoint = this.token ? '/admin/clubs' : '/clubs';
      const response = await this.api.get(endpoint);
      // Transform snake_case to camelCase
      const clubs = response.data.data || [];
      return clubs.map((club: any) => ({
        id: club.id,
        name: club.name,
        shortName: club.short_name,
        logo: club.logo,
        founded: club.founded,
        stadium: club.stadium,
        coach: club.coach,
        location: club.location,
        colors: club.colors,
      }));
    } catch (error) {
      console.warn('Failed to fetch clubs from API:', error);
      // Always fallback to mock data to ensure clubs display
      return clubs;
    }
  }

  async createClub(data: Omit<Club, 'id'> & { logo_file?: File }): Promise<Club> {
    let response;

    // Check if file upload is needed
    if ((data as any).logo_file) {
      // Use FormData for file upload
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('short_name', data.shortName);
      formData.append('logo', data.logo);
      formData.append('logo_file', (data as any).logo_file);
      if (data.founded !== null) formData.append('founded', data.founded.toString());
      formData.append('stadium', data.stadium);
      formData.append('coach', data.coach);
      formData.append('location', data.location);
      formData.append('colors', data.colors);

      response = await this.api.post('/admin/clubs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      // Use JSON for regular data
      const backendData = {
        name: data.name,
        short_name: data.shortName,
        logo: data.logo,
        founded: data.founded,
        stadium: data.stadium,
        coach: data.coach,
        location: data.location,
        colors: data.colors,
      };
      response = await this.api.post('/admin/clubs', backendData);
    }

    // Transform response back to camelCase
    const club = response.data.data;
    return {
      id: club.id,
      name: club.name,
      shortName: club.short_name,
      logo: club.logo,
      founded: club.founded,
      stadium: club.stadium,
      coach: club.coach,
      location: club.location,
      colors: club.colors,
    };
  }

  async updateClub(id: string, data: Partial<Club> & { logo_file?: File }): Promise<Club> {
    let response;

    // Check if file upload is needed
    if ((data as any).logo_file) {
      // Use FormData for file upload
      const formData = new FormData();
      if (data.name !== undefined) formData.append('name', data.name);
      if (data.shortName !== undefined) formData.append('short_name', data.shortName);
      if (data.logo !== undefined) formData.append('logo', data.logo);
      formData.append('logo_file', (data as any).logo_file);
      if (data.founded !== undefined && data.founded !== null) formData.append('founded', data.founded.toString());
      if (data.stadium !== undefined) formData.append('stadium', data.stadium);
      if (data.coach !== undefined) formData.append('coach', data.coach);
      if (data.location !== undefined) formData.append('location', data.location);
      if (data.colors !== undefined) formData.append('colors', data.colors);

      response = await this.api.put(`/admin/clubs/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      // Use JSON for regular data
      const backendData: any = {};
      if (data.name !== undefined) backendData.name = data.name;
      if (data.shortName !== undefined) backendData.short_name = data.shortName;
      if (data.logo !== undefined) backendData.logo = data.logo;
      if (data.founded !== undefined) backendData.founded = data.founded;
      if (data.stadium !== undefined) backendData.stadium = data.stadium;
      if (data.coach !== undefined) backendData.coach = data.coach;
      if (data.location !== undefined) backendData.location = data.location;
      if (data.colors !== undefined) backendData.colors = data.colors;

      response = await this.api.put(`/admin/clubs/${id}`, backendData);
    }

    // Transform response back to camelCase
    const club = response.data.data;
    return {
      id: club.id,
      name: club.name,
      shortName: club.short_name,
      logo: club.logo,
      founded: club.founded,
      stadium: club.stadium,
      coach: club.coach,
      location: club.location,
      colors: club.colors,
    };
  }

  async deleteClub(id: string): Promise<void> {
    await this.api.delete(`/admin/clubs/${id}`);
  }

  async getClub(id: string): Promise<Club> {
    try {
      const endpoint = this.token ? `/admin/clubs/${id}` : `/clubs/${id}`;
      const response = await this.api.get(endpoint);
      const club = response.data.data;
      return {
        id: club.id,
        name: club.name,
        shortName: club.short_name,
        logo: club.logo,
        founded: club.founded,
        stadium: club.stadium,
        coach: club.coach,
        location: club.location,
        colors: club.colors,
      };
    } catch (error) {
      console.warn('Failed to fetch club from API:', error);
      // Fallback to mock data
      const clubsData = clubs;
      const club = clubsData.find((c: any) => c.id === id);
      if (!club) throw new Error('Club not found');
      return club;
    }
  }

  // Players
  async getPlayers(): Promise<Player[]> {
    try {
      const endpoint = this.token ? '/admin/players' : '/players';
      const response = await this.api.get(endpoint);
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
      // Always fallback to mock data to ensure players display
      return players;
    }
  }

  async createPlayer(data: Omit<Player, 'id'> & { image_file?: File }): Promise<Player> {
    let response;

    // Check if file upload is needed
    if ((data as any).image_file) {
      // Use FormData for file upload
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('position', data.position);
      formData.append('birthdate', data.birthdate);
      formData.append('nationality', data.nationality);
      formData.append('club_id', data.clubId);
      formData.append('image', data.image);
      formData.append('image_file', (data as any).image_file);
      formData.append('height', data.height);
      formData.append('weight', data.weight);
      formData.append('appearances', data.appearances.toString());
      formData.append('goals', data.goals.toString());
      formData.append('assists', data.assists.toString());
      formData.append('yellow_cards', data.yellowCards.toString());
      formData.append('red_cards', data.redCards.toString());

      response = await this.api.post('/admin/players', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      // Use JSON for regular data
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
      response = await this.api.post('/admin/players', backendData);
    }

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

  async updatePlayer(id: string, data: Partial<Player> & { image_file?: File }): Promise<Player> {
    let response;

    // Check if file upload is needed
    if ((data as any).image_file) {
      // Use FormData for file upload
      const formData = new FormData();
      if (data.name !== undefined) formData.append('name', data.name);
      if (data.position !== undefined) formData.append('position', data.position);
      if (data.birthdate !== undefined) formData.append('birthdate', data.birthdate);
      if (data.nationality !== undefined) formData.append('nationality', data.nationality);
      if (data.clubId !== undefined) formData.append('club_id', data.clubId);
      if (data.image !== undefined) formData.append('image', data.image);
      formData.append('image_file', (data as any).image_file);
      if (data.height !== undefined) formData.append('height', data.height);
      if (data.weight !== undefined) formData.append('weight', data.weight);
      if (data.appearances !== undefined) formData.append('appearances', data.appearances.toString());
      if (data.goals !== undefined) formData.append('goals', data.goals.toString());
      if (data.assists !== undefined) formData.append('assists', data.assists.toString());
      if (data.yellowCards !== undefined) formData.append('yellow_cards', data.yellowCards.toString());
      if (data.redCards !== undefined) formData.append('red_cards', data.redCards.toString());

      response = await this.api.put(`/admin/players/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      // Use JSON for regular data
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

      response = await this.api.put(`/admin/players/${id}`, backendData);
    }

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
      const endpoint = this.token ? '/admin/matches' : '/matches';
      const response = await this.api.get(endpoint);
      // Transform snake_case to camelCase for public responses
      const matchesData = response.data.data || [];
      return matchesData.map((match: any) => ({
        id: match.id,
        homeTeam: {
          id: match.home_team.id,
          name: match.home_team.name,
          shortName: match.home_team.short_name,
          logo: match.home_team.logo,
          founded: match.home_team.founded,
          stadium: match.home_team.stadium,
          coach: match.home_team.coach,
          location: match.home_team.location,
          colors: match.home_team.colors,
        },
        awayTeam: {
          id: match.away_team.id,
          name: match.away_team.name,
          shortName: match.away_team.short_name,
          logo: match.away_team.logo,
          founded: match.away_team.founded,
          stadium: match.away_team.stadium,
          coach: match.away_team.coach,
          location: match.away_team.location,
          colors: match.away_team.colors,
        },
        homeScore: match.home_score,
        awayScore: match.away_score,
        date: match.date,
        time: match.time,
        venue: match.venue,
        status: match.status,
        competition: match.competition,
      }));
    } catch (error) {
      console.warn('Failed to fetch matches from API:', error);
      // Always fallback to mock data to ensure matches display
      return matches;
    }
  }

  async getMatch(id: string): Promise<Match> {
    try {
      const endpoint = this.token ? `/admin/matches/${id}` : `/matches/${id}`;
      const response = await this.api.get(endpoint);
      const matchData = response.data.data;
      // Transform snake_case to camelCase
      return {
        id: matchData.id,
        homeTeam: {
          id: matchData.home_team.id,
          name: matchData.home_team.name,
          shortName: matchData.home_team.short_name,
          logo: matchData.home_team.logo,
          founded: matchData.home_team.founded,
          stadium: matchData.home_team.stadium,
          coach: matchData.home_team.coach,
          location: matchData.home_team.location,
          colors: matchData.home_team.colors,
        },
        awayTeam: {
          id: matchData.away_team.id,
          name: matchData.away_team.name,
          shortName: matchData.away_team.short_name,
          logo: matchData.away_team.logo,
          founded: matchData.away_team.founded,
          stadium: matchData.away_team.stadium,
          coach: matchData.away_team.coach,
          location: matchData.away_team.location,
          colors: matchData.away_team.colors,
        },
        homeScore: matchData.home_score,
        awayScore: matchData.away_score,
        date: matchData.date,
        time: matchData.time,
        venue: matchData.venue,
        status: matchData.status,
        competition: matchData.competition,
      };
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

  async createMatch(data: any): Promise<Match> {
    const response = await this.api.post('/admin/matches', data);
    return response.data.data;
  }

  async updateMatch(id: string, data: any): Promise<Match> {
    const response = await this.api.put(`/admin/matches/${id}`, data);
    return response.data.data;
  }

  async deleteMatch(id: string): Promise<void> {
    await this.api.delete(`/admin/matches/${id}`);
  }

  // Articles
  async getArticles(): Promise<Article[]> {
    try {
      const endpoint = this.token ? '/admin/articles' : '/articles';
      const response = await this.api.get(endpoint);
      // Transform snake_case to camelCase
      const articlesData = response.data.data || [];
      return articlesData.map((article: any) => ({
        id: article.id,
        title: article.title,
        content: article.content,
        image: article.image,
        author: article.author,
        date: article.date,
        category: article.category,
        tags: article.tags,
        is_published: article.is_published,
      }));
    } catch (error) {
      console.warn('Failed to fetch articles from API:', error);
      // Always fallback to mock data to ensure articles display
      return articles;
    }
  }

  async getArticle(id: string): Promise<Article> {
    try {
      const endpoint = this.token ? `/admin/articles/${id}` : `/articles/${id}`;
      const response = await this.api.get(endpoint);
      const articleData = response.data.data;
      // Transform snake_case to camelCase
      return {
        id: articleData.id,
        title: articleData.title,
        content: articleData.content,
        image: articleData.image,
        author: articleData.author,
        date: articleData.date,
        category: articleData.category,
        tags: articleData.tags,
        is_published: articleData.is_published,
      };
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
    try {
      const endpoint = this.token ? '/admin/standings' : '/standings';
      const response = await this.api.get(endpoint);
      // Transform snake_case to camelCase
      const standings = response.data.data || [];
      return standings.map((standing: any) => ({
        id: standing.id,
        club_id: standing.club_id,
        position: standing.position,
        matches_played: standing.matches_played,
        wins: standing.wins,
        draws: standing.draws,
        losses: standing.losses,
        goals_for: standing.goals_for,
        goals_against: standing.goals_against,
        goalDifference: standing.goals_for - standing.goals_against,
        points: standing.points,
        competition: standing.competition,
        form: [], // Not stored in backend yet
        club: standing.club ? {
          id: standing.club.id,
          name: standing.club.name,
          shortName: standing.club.short_name,
          logo: standing.club.logo,
          founded: standing.club.founded,
          stadium: standing.club.stadium,
          coach: standing.club.coach,
          location: standing.club.location,
          colors: standing.club.colors,
        } : undefined,
      }));
    } catch (error) {
      console.warn('Failed to fetch standings from API:', error);
      // Fallback to mock data to ensure standings display
      const mockData = generateStandings();
      mockData.sort((a: StandingEntry, b: StandingEntry) => a.position - b.position);
      return mockData;
    }
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
