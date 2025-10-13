import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, User, Trophy, Users } from 'lucide-react';
import ApiService from '../services/ApiService';
import { Club, Player, Match } from '../types';

const ClubDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [club, setClub] = useState<Club | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClubData();
  }, [id]);

  const loadClubData = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const [clubData, playersData, matchesData] = await Promise.all([
        ApiService.getClub(id),
        ApiService.getPlayers(),
        ApiService.getMatches()
      ]);

      setClub(clubData);
      setPlayers(playersData.filter(p => p.clubId === id));
      setMatches(matchesData.filter(m =>
        m.homeTeam.id === id || m.awayTeam.id === id
      ).slice(0, 5));
    } catch (error) {
      console.error('Erreur lors du chargement des données du club:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du club...</p>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Club non trouvé
        </div>
        <Link
          to="/clubs"
          className="text-green-700 hover:text-green-800 transition duration-150"
        >
          Retour aux clubs
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <div className="mb-6">
        <Link 
          to="/clubs" 
          className="inline-flex items-center text-green-700 hover:text-green-800 transition duration-150"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour aux clubs
        </Link>
      </div>
      
      {/* Club header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-green-700 to-green-900 text-white p-8">
          <div className="flex items-center">
            <img 
              src={club.logo} 
              alt={club.name} 
              className="w-24 h-24 object-contain bg-white rounded-full p-2 mr-6"
            />
            <div>
              <h1 className="text-4xl font-bold mb-2">{club.name}</h1>
              <p className="text-xl text-green-200">{club.shortName}</p>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center">
              <Calendar size={20} className="text-green-700 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Fondé en</p>
                <p className="font-semibold">{club.founded || 'Non spécifié'}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <MapPin size={20} className="text-green-700 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Localisation</p>
                <p className="font-semibold">{club.location}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <User size={20} className="text-green-700 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Entraîneur</p>
                <p className="font-semibold">{club.coach}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Trophy size={20} className="text-green-700 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Stade</p>
                <p className="font-semibold">{club.stadium}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Players */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-700 text-white p-4">
              <h2 className="text-xl font-bold flex items-center">
                <Users size={20} className="mr-2" />
                Effectif ({players.length} joueurs)
              </h2>
            </div>
            
            <div className="p-6">
              {players.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {players.map((player: Player) => (
                    <Link
                      key={player.id}
                      to={`/players/${player.id}`}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150"
                    >
                      <img
                        src={player.image}
                        alt={player.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{player.name}</h3>
                        <p className="text-sm text-gray-500">{player.position}</p>
                        <p className="text-xs text-gray-400">{player.goals} buts cette saison</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Aucun joueur enregistré pour ce club.</p>
              )}
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

export default ClubDetail;