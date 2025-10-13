export interface Match {
  id: string;
  homeTeam: Club;
  awayTeam: Club;
  homeScore: number | null;
  awayScore: number | null;
  date: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  competition: string;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  birthdate: string;
  nationality: string;
  clubId: string;
  image: string;
  height: string;
  weight: string;
  appearances: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
}

export interface Club {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  founded: number | null;
  stadium: string;
  coach: string;
  location: string;
  colors: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: 'news' | 'transfer' | 'interview' | 'analysis' | 'match';
  tags: string[];
  is_published: boolean;
}

export interface StandingEntry {
  id: string;
  club_id: string;
  position: number;
  matches_played: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  goalDifference: number;
  points: number;
  competition: string;
  form: ('W' | 'D' | 'L')[];
  club?: Club;
}

export interface Competition {
  id: string;
  name: string;
  season: string;
  standings: StandingEntry[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}
