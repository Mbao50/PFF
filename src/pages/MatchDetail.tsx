import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Trophy, Target, Users } from 'lucide-react';
import { matches, players } from '../data/mockData';
import { Match, Player } from '../types';

const MatchDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [homeTeamPlayers, setHomeTeamPlayers] = useState<Player[]>([]);
  const [awayTeamPlayers, setAwayTeamPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      if (!id) {
        setError('ID de match invalide');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // Use mock data from mockData.ts
        const mockMatch = matches.find(m => m.id === id);
        if (!mockMatch) {
          setError('Match non trouvé');
          setLoading(false);
          return;
        }
        setMatch(mockMatch);

        // Use players from mockData.ts
        setHomeTeamPlayers(players.filter(p => p.clubId === mockMatch.homeTeam.id));
        setAwayTeamPlayers(players.filter(p => p.clubId === mockMatch.awayTeam.id));
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des détails du match');
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [id]);

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Simulate match events for completed matches
  const generateMatchEvents = () => {
    if (!match || match.status !== 'completed' || match.homeScore === null || match.awayScore === null) return [];

    // Simple seeded random based on match id for consistent events
    let counter = 0;
    const seed = parseInt(match.id) || 1;
    const seededRandom = (max: number) => {
      counter++;
      return Math.floor(((seed + counter) * 9301 + 49297) % 233280 / 233280 * max);
    };

    const events = [];
    const totalGoals = match.homeScore + match.awayScore;

    // Generate goal events
    for (let i = 0; i < totalGoals; i++) {
      const isHomeGoal = i < match.homeScore;
      const teamPlayers = isHomeGoal ? homeTeamPlayers : awayTeamPlayers;
      const scorer = teamPlayers[seededRandom(teamPlayers.length) % teamPlayers.length];
      const minute = seededRandom(90) + 1;

      if (scorer) {
        events.push({
          type: 'goal',
          minute,
          player: scorer,
          team: isHomeGoal ? match.homeTeam : match.awayTeam,
          isHome: isHomeGoal
        });
      }
    }

    // Add some cards - ensure at least 2 cards for completed matches
    const cardEvents = Math.max(2, seededRandom(4) + 1);
    for (let i = 0; i < cardEvents; i++) {
      const isHome = seededRandom(2) === 0;
      const teamPlayers = isHome ? homeTeamPlayers : awayTeamPlayers;
      const player = teamPlayers[seededRandom(teamPlayers.length) % teamPlayers.length];
      const minute = seededRandom(90) + 1;
      const cardType = seededRandom(5) === 0 ? 'red' : 'yellow'; // 20% chance of red card

      if (player) {
        events.push({
          type: cardType + '_card',
          minute,
          player,
          team: isHome ? match.homeTeam : match.awayTeam,
          isHome
        });
      }
    }

    return events.sort((a, b) => a.minute - b.minute);
  };

  const matchEvents = generateMatchEvents();

  // Generate match statistics
  const generateStats = () => {
    if (!match || match.status !== 'completed') return null;
    
    return {
      possession: {
        home: Math.floor(Math.random() * 30) + 35,
        away: Math.floor(Math.random() * 30) + 35
      },
      shots: {
        home: Math.floor(Math.random() * 10) + 5,
        away: Math.floor(Math.random() * 10) + 5
      },
      shotsOnTarget: {
        home: Math.floor(Math.random() * 5) + 2,
        away: Math.floor(Math.random() * 5) + 2
      },
      corners: {
        home: Math.floor(Math.random() * 8) + 2,
        away: Math.floor(Math.random() * 8) + 2
      },
      fouls: {
        home: Math.floor(Math.random() * 10) + 5,
        away: Math.floor(Math.random() * 10) + 5
      }
    };
  };

  const stats = generateStats();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        Chargement des détails du match...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-red-600">
        {error}
        <div className="mt-4">
          <Link to="/matches" className="text-green-700 hover:text-green-800 transition duration-150">
            Retour aux matchs
          </Link>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        Match non trouvé
        <div className="mt-4">
          <Link to="/matches" className="text-green-700 hover:text-green-800 transition duration-150">
            Retour aux matchs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <div className="mb-6">
        <Link 
          to="/matches" 
          className="inline-flex items-center text-green-700 hover:text-green-800 transition duration-150"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour aux matchs
        </Link>
      </div>
      
      {/* Match header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-green-700 to-green-900 text-white p-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                match.status === 'upcoming' ? 'bg-yellow-400 text-green-900' : 
                match.status === 'live' ? 'bg-red-500 text-white' : 
                'bg-gray-200 text-gray-700'
              }`}>
                {match.status === 'upcoming' ? 'À venir' : 
                 match.status === 'live' ? 'EN DIRECT' : 
                 'Terminé'}
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-2">{match.competition}</h1>
            <p className="text-green-200">{formatDate(match.date)}</p>
          </div>
          
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex flex-col items-center w-5/12">
              {match.homeTeam ? (
                <>
                  <img 
                    src={match.homeTeam.logo} 
                    alt={match.homeTeam.name}
                    className="w-24 h-24 object-contain bg-white rounded-full p-2 mb-4"
                  />
                  <h2 className="text-xl font-bold text-center">{match.homeTeam.name}</h2>
                </>
              ) : (
                <div className="text-red-600 font-bold">Équipe domicile non disponible</div>
              )}
            </div>
            
            {match.status === 'upcoming' ? (
              <div className="flex flex-col items-center justify-center w-2/12">
                <span className="text-3xl font-bold mb-2">VS</span>
                <span className="text-lg">{match.time}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-2/12">
                <div className="flex items-center mb-2">
                  <span className="text-5xl font-bold">{match.homeScore}</span>
                  <span className="mx-4 text-2xl">-</span>
                  <span className="text-5xl font-bold">{match.awayScore}</span>
                </div>
                {match.status === 'live' && (
                  <span className="text-sm font-semibold text-red-400 animate-pulse">EN DIRECT</span>
                )}
              </div>
            )}
            
            <div className="flex flex-col items-center w-5/12">
              {match.awayTeam ? (
                <>
                  <img 
                    src={match.awayTeam.logo} 
                    alt={match.awayTeam.name}
                    className="w-24 h-24 object-contain bg-white rounded-full p-2 mb-4"
                  />
                  <h2 className="text-xl font-bold text-center">{match.awayTeam.name}</h2>
                </>
              ) : (
                <div className="text-red-600 font-bold">Équipe extérieure non disponible</div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center">
              <Calendar size={20} className="text-green-700 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-semibold">{formatDate(match.date)}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <Clock size={20} className="text-green-700 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Heure</p>
                <p className="font-semibold">{match.time}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <MapPin size={20} className="text-green-700 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Stade</p>
                <p className="font-semibold">{match.venue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Match content */}
      {match.status === 'completed' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Match Events */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="bg-green-700 text-white p-4">
                <h2 className="text-xl font-bold flex items-center">
                  <Trophy size={20} className="mr-2" />
                  Événements du match
                </h2>
              </div>
              
              <div className="p-6">
                {matchEvents.length > 0 ? (
                  <div className="space-y-4">
                    {matchEvents.map((event, index) => (
                      <div key={index} className={`flex items-center ${event.isHome ? 'justify-start' : 'justify-end'}`}>
                        <div className={`flex items-center space-x-3 ${!event.isHome ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-green-700">{event.minute}'</span>
                            {event.type === 'goal' && <Target size={16} className="text-green-600" />}
                            {event.type === 'yellow_card' && <div className="w-4 h-5 bg-yellow-400 rounded-sm"></div>}
                            {event.type === 'red_card' && <div className="w-4 h-5 bg-red-500 rounded-sm"></div>}
                          </div>
                          <div className={`text-sm ${event.isHome ? 'text-left' : 'text-right'}`}>
                            <p className="font-medium">{event.player.name}</p>
                            <p className="text-gray-500">
                              {event.type === 'goal' ? 'But' : 
                               event.type === 'yellow_card' ? 'Carton jaune' : 
                               'Carton rouge'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Aucun événement enregistré pour ce match.</p>
                )}
              </div>
            </div>
            
            {/* Match Statistics */}
            {stats && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-green-700 text-white p-4">
                  <h2 className="text-xl font-bold flex items-center">
                    <Users size={20} className="mr-2" />
                    Statistiques du match
                  </h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    {/* Possession */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{stats.possession.home}%</span>
                        <span className="text-sm text-gray-500">Possession</span>
                        <span className="font-medium">{stats.possession.away}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${stats.possession.home}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Shots */}
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{stats.shots.home}</span>
                      <span className="text-sm text-gray-500">Tirs</span>
                      <span className="font-medium">{stats.shots.away}</span>
                    </div>
                    
                    {/* Shots on target */}
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{stats.shotsOnTarget.home}</span>
                      <span className="text-sm text-gray-500">Tirs cadrés</span>
                      <span className="font-medium">{stats.shotsOnTarget.away}</span>
                    </div>
                    
                    {/* Corners */}
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{stats.corners.home}</span>
                      <span className="text-sm text-gray-500">Corners</span>
                      <span className="font-medium">{stats.corners.away}</span>
                    </div>
                    
                    {/* Fouls */}
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{stats.fouls.home}</span>
                      <span className="text-sm text-gray-500">Fautes</span>
                      <span className="font-medium">{stats.fouls.away}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Team lineups */}
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-green-700 text-white p-4">
                <h2 className="text-xl font-bold">Compositions</h2>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {/* Home team */}
                  {match.homeTeam ? (
                    <div>
                      <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                        <img src={match.homeTeam.logo} alt="" className="w-5 h-5 mr-2" />
                        {match.homeTeam.name}
                      </h3>
                      <div className="space-y-2">
                        {homeTeamPlayers.slice(0, 11).map(player => (
                          <div key={player.id} className="flex items-center text-sm">
                            <span className="w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                              {Math.floor(Math.random() * 99) + 1}
                            </span>
                            <Link
                              to={`/players/${player.id}`}
                              className="hover:text-green-700 transition duration-150"
                            >
                              {player.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-red-600 font-bold">Compositions équipe domicile non disponibles</div>
                  )}

                  {/* Away team */}
                  {match.awayTeam ? (
                    <div>
                      <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                        <img src={match.awayTeam.logo} alt="" className="w-5 h-5 mr-2" />
                        {match.awayTeam.name}
                      </h3>
                      <div className="space-y-2">
                        {awayTeamPlayers.slice(0, 11).map(player => (
                          <div key={player.id} className="flex items-center text-sm">
                            <span className="w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                              {Math.floor(Math.random() * 99) + 1}
                            </span>
                            <Link
                              to={`/players/${player.id}`}
                              className="hover:text-green-700 transition duration-150"
                            >
                              {player.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-red-600 font-bold">Compositions équipe extérieure non disponibles</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Upcoming match info */}
      {match.status === 'upcoming' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-green-700 text-white p-4">
            <h2 className="text-xl font-bold">Match à venir</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600">Ce match est prévu pour bientôt. Revenez plus tard pour les détails.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchDetail;
