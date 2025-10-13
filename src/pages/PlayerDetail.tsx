import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Flag, Users, Trophy, Target, Clock } from 'lucide-react';
import ApiService from '../services/ApiService';
import { Player, Club, Match } from '../types';

const PlayerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [player, setPlayer] = useState<Player | null>(null);
  const [club, setClub] = useState<Club | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlayerData();
  }, [id]);

  const loadPlayerData = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const [playerData, clubsData, matchesData] = await Promise.all([
        ApiService.getPlayers().then(players => players.find(p => p.id === id)),
        ApiService.getClubs(),
        ApiService.getMatches()
      ]);

      if (playerData) {
        setPlayer(playerData);
        const playerClub = clubsData.find(c => c.id === playerData.clubId);
        setClub(playerClub || null);
        setMatches(matchesData.filter(m =>
          m.homeTeam.id === playerData.clubId || m.awayTeam.id === playerData.clubId
        ).slice(0, 5));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données du joueur:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du joueur...</p>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Joueur non trouvé</h1>
          <Link
            to="/players"
            className="text-green-700 hover:text-green-800 transition duration-150"
          >
            Retour aux joueurs
          </Link>
        </div>
      </div>
    );
  }
  
  // Calculate age
  const calculateAge = (birthdate: string) => {
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <div className="mb-6">
        <Link 
          to="/players" 
          className="inline-flex items-center text-green-700 hover:text-green-800 transition duration-150"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour aux joueurs
        </Link>
      </div>
      
      {/* Player header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-green-700 to-green-900 text-white p-8">
          <div className="flex items-center">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white mr-8">
              <img 
                src={player.image} 
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{player.name}</h1>
              <div className="flex items-center space-x-4 text-green-200">
                <span className="bg-green-600 px-3 py-1 rounded-full text-sm font-medium">
                  {player.position}
                </span>
                <span>{calculateAge(player.birthdate)} ans</span>
                {club && (
                  <Link 
                    to={`/clubs/${club.id}`}
                    className="hover:text-white transition duration-150"
                  >
                    {club.name}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center">
              <Calendar size={20} className="text-green-700 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Date de naissance</p>
                <p className="font-semibold">{formatDate(player.birthdate)}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Flag size={20} className="text-green-700 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Nationalité</p>
                <p className="font-semibold">{player.nationality}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Users size={20} className="text-green-700 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Taille / Poids</p>
                <p className="font-semibold">{player.height} / {player.weight}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Trophy size={20} className="text-green-700 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Club actuel</p>
                <p className="font-semibold">{club?.name || 'Non défini'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Statistics */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-green-700 text-white p-4">
              <h2 className="text-xl font-bold">Statistiques de la saison</h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                    <Clock size={24} className="text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{player.appearances}</div>
                  <div className="text-sm text-gray-500">Matchs joués</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                    <Target size={24} className="text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{player.goals}</div>
                  <div className="text-sm text-gray-500">Buts marqués</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                    <Users size={24} className="text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{player.assists}</div>
                  <div className="text-sm text-gray-500">Passes décisives</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-4 bg-yellow-500 rounded-sm"></div>
                      <div className="w-3 h-4 bg-red-500 rounded-sm"></div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {player.yellowCards}/{player.redCards}
                  </div>
                  <div className="text-sm text-gray-500">Cartons J/R</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Performance chart */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-700 text-white p-4">
              <h2 className="text-xl font-bold">Évolution des performances</h2>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {/* Goals chart */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Buts marqués par match</h3>
                  <div className="flex items-end space-x-2 h-24">
                    {Array.from({ length: 10 }, (_, i) => {
                      const goals = Math.floor(Math.random() * 3); // 0-2 goals per match
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center">
                          <span className="text-xs font-bold text-gray-700 mb-1">{goals}</span>
                          <div
                            className="bg-green-500 w-full rounded-t"
                            style={{ height: `${goals * 20}px`, minHeight: '4px' }}
                          ></div>
                          <span className="text-xs text-gray-500 mt-1">M{i + 1}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Assists chart */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Passes décisives par match</h3>
                  <div className="flex items-end space-x-2 h-24">
                    {Array.from({ length: 10 }, (_, i) => {
                      const assists = Math.floor(Math.random() * 3); // 0-2 assists per match
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center">
                          <span className="text-xs font-bold text-gray-700 mb-1">{assists}</span>
                          <div
                            className="bg-blue-500 w-full rounded-t"
                            style={{ height: `${assists * 20}px`, minHeight: '4px' }}
                          ></div>
                          <span className="text-xs text-gray-500 mt-1">M{i + 1}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent matches */}
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-700 text-white p-4">
              <h2 className="text-xl font-bold">Derniers matchs</h2>
            </div>
            
            <div className="p-6">
              {matches.length > 0 ? (
                <div className="space-y-4">
                  {matches.map((match: Match) => (
                    <div key={match.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="text-xs text-gray-500 mb-2">{match.date}</div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={match.homeTeam.logo}
                            alt={match.homeTeam.name}
                            className="w-6 h-6 object-contain mr-2"
                          />
                          <span className="text-sm font-medium">{match.homeTeam.shortName}</span>
                        </div>

                        {match.status === 'completed' ? (
                          <div className="flex items-center">
                            <span className="font-bold">{match.homeScore}</span>
                            <span className="mx-2">-</span>
                            <span className="font-bold">{match.awayScore}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-500">{match.time}</span>
                        )}

                        <div className="flex items-center">
                          <span className="text-sm font-medium">{match.awayTeam.shortName}</span>
                          <img
                            src={match.awayTeam.logo}
                            alt={match.awayTeam.name}
                            className="w-6 h-6 object-contain ml-2"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Aucun match récent.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetail;