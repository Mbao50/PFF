import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Search, Calendar, MapPin, Users } from 'lucide-react';
import { Club, Player, Match } from '../types';
import { clubs, players, matches } from '../data/mockData';

const SearchScreen: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [localQuery, setLocalQuery] = useState(query);
  const [searchResults, setSearchResults] = useState<{
    clubs: Club[];
    players: Player[];
    matches: Match[];
  }>({
    clubs: [],
    players: [],
    matches: []
  });

  const performSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();

      const filteredClubs = clubs.filter(club =>
        club.name.toLowerCase().includes(lowerQuery) ||
        club.shortName.toLowerCase().includes(lowerQuery) ||
        club.location.toLowerCase().includes(lowerQuery)
      );

      const filteredPlayers = players.filter(player =>
        player.name.toLowerCase().includes(lowerQuery) ||
        player.position.toLowerCase().includes(lowerQuery) ||
        player.nationality.toLowerCase().includes(lowerQuery)
      );

      const filteredMatches = matches.filter(match =>
        match.homeTeam.name.toLowerCase().includes(lowerQuery) ||
        match.awayTeam.name.toLowerCase().includes(lowerQuery) ||
        match.competition.toLowerCase().includes(lowerQuery) ||
        match.venue.toLowerCase().includes(lowerQuery)
      );

      setSearchResults({
        clubs: filteredClubs,
        players: filteredPlayers,
        matches: filteredMatches
      });
    } else {
      setSearchResults({
        clubs: [],
        players: [],
        matches: []
      });
    }
  };

  useEffect(() => {
    performSearch(query);
  }, [query]);

  const handleLocalSearch = () => {
    if (localQuery.trim()) {
      setSearchParams({ q: localQuery.trim() });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLocalSearch();
    }
  };

  const totalResults = searchResults.clubs.length + searchResults.players.length + searchResults.matches.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Résultats de recherche
        </h1>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                value={query}
                placeholder="Rechercher..."
                className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                readOnly
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <span className="text-gray-600">
            {totalResults} résultat{totalResults !== 1 ? 's' : ''} pour "{query}"
          </span>
        </div>

        {/* New search input */}
        <div className="max-w-md">
          <div className="relative">
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Rechercher à nouveau..."
              className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleLocalSearch}
              className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Search results */}
      {totalResults === 0 ? (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun résultat trouvé
          </h3>
          <p className="text-gray-600">
            Essayez avec des termes différents ou vérifiez l'orthographe.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Clubs */}
          {searchResults.clubs.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Clubs ({searchResults.clubs.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.clubs.map(club => (
                  <Link
                    key={club.id}
                    to={`/clubs/${club.id}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={club.logo} alt={club.name} className="w-12 h-12 rounded-full" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{club.name}</h3>
                        <p className="text-sm text-gray-600">{club.location}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Players */}
          {searchResults.players.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Joueurs ({searchResults.players.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.players.map(player => (
                  <Link
                    key={player.id}
                    to={`/players/${player.id}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={player.image} alt={player.name} className="w-12 h-12 rounded-full" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{player.name}</h3>
                        <p className="text-sm text-gray-600">{player.position} • {player.nationality}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Matches */}
          {searchResults.matches.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Matchs ({searchResults.matches.length})
              </h2>
              <div className="space-y-4">
                {searchResults.matches.map(match => (
                  <Link
                    key={match.id}
                    to={`/matches/${match.id}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 block"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-8 h-8 mx-auto mb-1" />
                          <p className="text-xs font-medium text-gray-900">{match.homeTeam.shortName}</p>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">
                            {match.homeScore !== null ? match.homeScore : '-'} - {match.awayScore !== null ? match.awayScore : '-'}
                          </div>
                          <p className="text-xs text-gray-600">{match.status === 'completed' ? 'Terminé' : match.status === 'live' ? 'En cours' : 'À venir'}</p>
                        </div>
                        <div className="text-center">
                          <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-8 h-8 mx-auto mb-1" />
                          <p className="text-xs font-medium text-gray-900">{match.awayTeam.shortName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{match.competition}</p>
                        <p className="text-xs text-gray-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {match.venue}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchScreen;
