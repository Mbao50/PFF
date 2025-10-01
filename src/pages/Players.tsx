import React, { useState, useEffect } from 'react';
import { clubs } from '../data/mockData';
import ApiService from '../services/ApiService';
import PlayerCard from '../components/Players/PlayerCard';
import { Player } from '../types';

const Players: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  // State for filtering players by club
  const [clubFilter, setClubFilter] = useState<string | null>(null);

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const playersData = await ApiService.getPlayers();
        setPlayers(playersData);
      } catch (error) {
        console.error('Error loading players:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, []);

  // Filter players by selected club
  const filteredPlayers = clubFilter
    ? players.filter(player => player.clubId === clubFilter)
    : players;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-900 mb-4">Joueurs</h1>
        <p className="text-gray-600">
          Découvrez tous les joueurs du championnat sénégalais, leurs profils et leurs statistiques.
        </p>
      </div>
      
      {/* Filter options */}
      <div className="mb-8">
        <label htmlFor="club-filter" className="block text-sm font-medium text-gray-700 mb-2">
          Filtrer par club:
        </label>
        <select
          id="club-filter"
          value={clubFilter || ''}
          onChange={(e) => setClubFilter(e.target.value || null)}
          className="block w-full sm:w-64 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="">Tous les clubs</option>
          {clubs.map(club => (
            <option key={club.id} value={club.id}>
              {club.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Players grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlayers.map(player => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};

export default Players;