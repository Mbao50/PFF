import { Match, Player, Club, Article, Competition, StandingEntry } from '../types';

export const clubs: Club[] = [
  {
    id: '1',
    name: 'ASC Jaraaf',
    shortName: 'Jaraaf',
    logo: 'https://images.pexels.com/photos/1667583/pexels-photo-1667583.jpeg?auto=compress&cs=tinysrgb&w=100',
    founded: 1969,
    stadium: 'Stade Demba Diop',
    coach: 'Malick Daf',
    location: 'Dakar',
    colors: 'Green and White'
  },
  {
    id: '2',
    name: 'Casa Sports',
    shortName: 'Casa',
    logo: 'https://images.pexels.com/photos/1005697/pexels-photo-1005697.jpeg?auto=compress&cs=tinysrgb&w=100',
    founded: 1960,
    stadium: 'Stade Aline Sitoe Diatta',
    coach: 'Ansou Diadhiou',
    location: 'Ziguinchor',
    colors: 'Yellow and Green'
  },
  {
    id: '3',
    name: 'AS Douanes',
    shortName: 'Douanes',
    logo: 'https://images.pexels.com/photos/1146278/pexels-photo-1146278.jpeg?auto=compress&cs=tinysrgb&w=100',
    founded: 1980,
    stadium: 'Stade Amadou Barry',
    coach: 'Mamadou Guèye',
    location: 'Dakar',
    colors: 'Blue and White'
  },
  {
    id: '4',
    name: 'Génération Foot',
    shortName: 'GF',
    logo: 'https://images.pexels.com/photos/3775708/pexels-photo-3775708.jpeg?auto=compress&cs=tinysrgb&w=100',
    founded: 2000,
    stadium: 'Stade Déni Biram Ndao',
    coach: 'Balla Djiba',
    location: 'Dakar',
    colors: 'Red and White'
  },
  {
    id: '5',
    name: 'Teungueth FC',
    shortName: 'TFC',
    logo: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=100',
    founded: 2010,
    stadium: 'Stade Ngalandou Diouf',
    coach: 'Ndiambour Pape',
    location: 'Rufisque',
    colors: 'Red and Black'
  },
  {
    id: '6',
    name: 'US Gorée',
    shortName: 'Gorée',
    logo: 'https://images.pexels.com/photos/18685188/pexels-photo-18685188/free-photo-of-circular-emblem-of-a-professional-football-team.jpeg?auto=compress&cs=tinysrgb&w=100',
    founded: 1933,
    stadium: 'Stade Demba Diop',
    coach: 'Mbaye Badji',
    location: 'Gorée Island',
    colors: 'Red and Yellow'
  }
];

export const players: Player[] = [
  {
    id: '1',
    name: 'Moussa Ndiaye',
    position: 'Defender',
    birthdate: '1998-06-15',
    nationality: 'Senegalese',
    clubId: '1',
    image: 'https://images.pexels.com/photos/3641600/pexels-photo-3641600.jpeg?auto=compress&cs=tinysrgb&w=150',
    height: '1.80m',
    weight: '75kg',
    appearances: 25,
    goals: 2,
    assists: 4,
    yellowCards: 5,
    redCards: 0
  },
  {
    id: '2',
    name: 'Abdou Aziz Ndiaye',
    position: 'Midfielder',
    birthdate: '1999-08-20',
    nationality: 'Senegalese',
    clubId: '1',
    image: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=150',
    height: '1.77m',
    weight: '72kg',
    appearances: 28,
    goals: 6,
    assists: 8,
    yellowCards: 3,
    redCards: 1
  },
  {
    id: '3',
    name: 'Mamadou Lamine Diallo',
    position: 'Forward',
    birthdate: '2001-04-12',
    nationality: 'Senegalese',
    clubId: '2',
    image: 'https://images.pexels.com/photos/2859616/pexels-photo-2859616.jpeg?auto=compress&cs=tinysrgb&w=150',
    height: '1.82m',
    weight: '76kg',
    appearances: 30,
    goals: 14,
    assists: 5,
    yellowCards: 2,
    redCards: 0
  },
  {
    id: '4',
    name: 'Cheikh Tidiane Diop',
    position: 'Goalkeeper',
    birthdate: '1996-11-05',
    nationality: 'Senegalese',
    clubId: '3',
    image: 'https://images.pexels.com/photos/3755440/pexels-photo-3755440.jpeg?auto=compress&cs=tinysrgb&w=150',
    height: '1.90m',
    weight: '85kg',
    appearances: 26,
    goals: 0,
    assists: 0,
    yellowCards: 1,
    redCards: 0
  },
  {
    id: '5',
    name: 'Pape Demba Diop',
    position: 'Midfielder',
    birthdate: '2000-01-29',
    nationality: 'Senegalese',
    clubId: '4',
    image: 'https://images.pexels.com/photos/3760822/pexels-photo-3760822.jpeg?auto=compress&cs=tinysrgb&w=150',
    height: '1.76m',
    weight: '70kg',
    appearances: 22,
    goals: 3,
    assists: 2,
    yellowCards: 4,
    redCards: 0
  },
  {
    id: '6',
    name: 'Babacar Niang',
    position: 'Forward',
    birthdate: '1994-03-15',
    nationality: 'Senegalese',
    clubId: '5',
    image: 'https://images.pexels.com/photos/3775540/pexels-photo-3775540.jpeg?auto=compress&cs=tinysrgb&w=150',
    height: '1.85m',
    weight: '78kg',
    appearances: 25,
    goals: 8,
    assists: 3,
    yellowCards: 3,
    redCards: 0
  },
  {
    id: '7',
    name: 'Mouhamed Diop',
    position: 'Defender',
    birthdate: '1996-07-22',
    nationality: 'Senegalese',
    clubId: '6',
    image: 'https://images.pexels.com/photos/3772511/pexels-photo-3772511.jpeg?auto=compress&cs=tinysrgb&w=150',
    height: '1.82m',
    weight: '76kg',
    appearances: 20,
    goals: 1,
    assists: 1,
    yellowCards: 5,
    redCards: 1
  }
];

export const matches: Match[] = [
  {
    id: '1',
    homeTeam: clubs[0],
    awayTeam: clubs[1],
    homeScore: 2,
    awayScore: 1,
    date: '2023-10-10',
    time: '16:00',
    venue: 'Stade Demba Diop',
    status: 'completed',
    competition: 'Ligue 1 Sénégalaise'
  },
  {
    id: '2',
    homeTeam: clubs[2],
    awayTeam: clubs[3],
    homeScore: 0,
    awayScore: 0,
    date: '2023-10-15',
    time: '17:30',
    venue: 'Stade Amadou Barry',
    status: 'completed',
    competition: 'Ligue 1 Sénégalaise'
  },
  {
    id: '3',
    homeTeam: clubs[4],
    awayTeam: clubs[5],
    homeScore: 3,
    awayScore: 1,
    date: '2023-10-18',
    time: '16:00',
    venue: 'Stade Ngalandou Diouf',
    status: 'completed',
    competition: 'Ligue 1 Sénégalaise'
  },
  {
    id: '4',
    homeTeam: clubs[1],
    awayTeam: clubs[3],
    homeScore: null,
    awayScore: null,
    date: '2023-11-05',
    time: '17:00',
    venue: 'Stade Aline Sitoe Diatta',
    status: 'upcoming',
    competition: 'Ligue 1 Sénégalaise'
  },
  {
    id: '5',
    homeTeam: clubs[0],
    awayTeam: clubs[4],
    homeScore: null,
    awayScore: null,
    date: '2023-11-10',
    time: '16:30',
    venue: 'Stade Demba Diop',
    status: 'upcoming',
    competition: 'Coupe du Sénégal'
  }
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'ASC Jaraaf remporte le derby contre Casa Sports',
    content: 'Dans un match serré, ASC Jaraaf a réussi à s\'imposer face à Casa Sports grâce à un doublé de leur attaquant vedette. Ce résultat permet à l\'équipe dakaroise de consolider sa position en tête du championnat.',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=500',
    author: 'Mamadou Diallo',
    date: '2023-10-11',
    category: 'news',
    tags: ['ASC Jaraaf', 'Casa Sports', 'Ligue 1']
  },
  {
    id: '2',
    title: 'Teungueth FC signe un jeune talent de l\'académie',
    content: 'Le club de Rufisque vient d\'annoncer la signature d\'un jeune prodige de 18 ans issu de son académie. Ce milieu offensif est considéré comme l\'un des espoirs du football sénégalais.',
    image: 'https://images.pexels.com/photos/937475/pexels-photo-937475.jpeg?auto=compress&cs=tinysrgb&w=500',
    author: 'Fatou Sow',
    date: '2023-10-14',
    category: 'transfer',
    tags: ['Teungueth FC', 'Transfert', 'Académie']
  },
  {
    id: '3',
    title: 'Interview exclusive avec le coach de l\'AS Douanes',
    content: 'Après le match nul contre Génération Foot, l\'entraîneur de l\'AS Douanes revient sur les performances de son équipe et ses ambitions pour la saison en cours.',
    image: 'https://images.pexels.com/photos/8849287/pexels-photo-8849287.jpeg?auto=compress&cs=tinysrgb&w=500',
    author: 'Omar Diop',
    date: '2023-10-16',
    category: 'interview',
    tags: ['AS Douanes', 'Coach', 'Interview']
  },
  {
    id: '4',
    title: 'Analyse tactique: comment Teungueth FC a dominé US Gorée',
    content: 'Retour sur les choix tactiques qui ont permis à Teungueth FC de s\'imposer largement face à US Gorée lors de la dernière journée de championnat.',
    image: 'https://images.pexels.com/photos/5836927/pexels-photo-5836927.jpeg?auto=compress&cs=tinysrgb&w=500',
    author: 'Abdoulaye Ndiaye',
    date: '2023-10-19',
    category: 'analysis',
    tags: ['Teungueth FC', 'US Gorée', 'Tactique']
  }
];

export const generateStandings = (): StandingEntry[] => {
  // Use deterministic values based on club index for consistent results
  const standings = clubs.map((club, index) => {
    // Create consistent but varied stats based on club index
    const baseMatches = 25;
    const matches_played = baseMatches - index; // Vary matches played

    // Create a pattern where higher indexed clubs have better stats
    const winRate = 0.3 + (index * 0.1); // 30% to 80% win rate
    const wins = Math.floor(matches_played * winRate);
    const drawRate = 0.2 + (index * 0.05); // 20% to 45% draw rate for remaining games
    const draws = Math.floor((matches_played - wins) * drawRate);
    const losses = matches_played - wins - draws;

    const goals_for = wins * 2 + draws + Math.floor(index * 0.5); // Consistent goals
    const goals_against = losses * 2 + Math.floor((matches_played - wins - draws) * 0.5) - index;
    const goalDifference = goals_for - goals_against;
    const points = wins * 3 + draws;

    // Generate consistent form based on club performance
    const form: ('W' | 'D' | 'L')[] = [];
    const formPattern: ('W' | 'D' | 'L')[] = ['W', 'W', 'D', 'W', 'L']; // Consistent pattern
    for (let i = 0; i < 5; i++) {
      form.push(formPattern[(index + i) % formPattern.length]);
    }

    return {
      id: (index + 1).toString(),
      club_id: club.id,
      position: 0, // Will be set after sorting
      matches_played,
      wins,
      draws,
      losses,
      goals_for,
      goals_against,
      goalDifference,
      points,
      competition: 'Ligue 1 Sénégalaise',
      form,
      club
    };
  }).sort((a, b) => b.points - a.points || b.goalDifference - a.goalDifference); // Sort by points, then goal difference

  // Set positions after sorting
  standings.forEach((entry, index) => {
    entry.position = index + 1;
  });

  return standings;
};

export const competitions: Competition[] = [
  {
    id: '1',
    name: 'Ligue 1 Sénégalaise',
    season: '2023-2024',
    standings: generateStandings()
  }
];
