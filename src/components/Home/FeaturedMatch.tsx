import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Match } from '../../types';

interface FeaturedMatchProps {
  match: Match;
}

const FeaturedMatch: React.FC<FeaturedMatchProps> = ({ match }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg">
      <div className="bg-green-700 text-white py-2 px-4 flex justify-between items-center">
        <span className="font-medium text-sm">{match.competition}</span>
        <span className="flex items-center text-sm">
          <Clock size={14} className="mr-1" />
          {match.status === 'upcoming' ? `${match.date} - ${match.time}` : match.status === 'live' ? 'En direct' : match.status === 'cancelled' ? 'Annulé' : 'Terminé'}
        </span>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col items-center w-5/12">
            <img 
              src={match.homeTeam.logo} 
              alt={match.homeTeam.name}
              className="w-12 h-12 object-contain mb-2"
            />
            <span className="font-medium text-center">{match.homeTeam.name}</span>
          </div>
          
          {match.status === 'upcoming' ? (
            <div className="flex flex-col items-center justify-center w-2/12">
              <span className="text-sm text-gray-500 mb-1">VS</span>
              <span className="text-xs text-gray-400">{match.time}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-2/12">
              <div className="flex items-center">
                <span className="text-xl font-bold">{match.homeScore}</span>
                <span className="mx-2 text-gray-400">-</span>
                <span className="text-xl font-bold">{match.awayScore}</span>
              </div>
              {match.status === 'live' && (
                <span className="text-xs font-semibold text-red-500 mt-1">LIVE</span>
              )}
            </div>
          )}
          
          <div className="flex flex-col items-center w-5/12">
            <img 
              src={match.awayTeam.logo} 
              alt={match.awayTeam.name}
              className="w-12 h-12 object-contain mb-2" 
            />
            <span className="font-medium text-center">{match.awayTeam.name}</span>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mb-2">
          <span>{match.venue}</span>
        </div>
        
        <Link 
          to={`/matches/${match.id}`} 
          className="block w-full text-center text-green-700 border border-green-700 rounded py-2 font-medium text-sm hover:bg-green-700 hover:text-white transition duration-300"
        >
          {match.status === 'completed' ? 'Voir le résumé' : match.status === 'live' ? 'Suivre en direct' : match.status === 'cancelled' ? 'Match annulé' : 'Plus d\'informations'}
        </Link>
      </div>
    </div>
  );
};

export default FeaturedMatch;