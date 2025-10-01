import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';
import MatchCard from '../components/Matches/MatchCard';
import { Match } from '../types';

const Matches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  // State for filtering matches
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const matchesData = await ApiService.getMatches();
        setMatches(matchesData);
      } catch (error) {
        console.error('Error loading matches:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, []);

  // Filter matches based on selection
  const filteredMatches = filter === 'all'
    ? matches
    : matches.filter(match => match.status === filter);

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
        <h1 className="text-3xl font-bold text-green-900 mb-4">Matchs</h1>
        <p className="text-gray-600">
          Retrouvez tous les matchs du championnat sénégalais, les résultats et les rencontres à venir.
        </p>
      </div>
      
      {/* Filter options */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition duration-150 ${
              filter === 'all' 
                ? 'bg-green-700 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tous les matchs
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition duration-150 ${
              filter === 'upcoming' 
                ? 'bg-green-700 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            À venir
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition duration-150 ${
              filter === 'completed' 
                ? 'bg-green-700 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Terminés
          </button>
        </div>
      </div>
      
      {/* Matches grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMatches.map(match => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};

export default Matches;