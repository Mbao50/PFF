import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Match } from '../../types';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
      <div className="bg-green-700 text-white p-3 flex justify-between items-center">
        <span className="font-medium">{match.competition}</span>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          match.status === 'upcoming' ? 'bg-yellow-400 text-green-900' : 
          match.status === 'live' ? 'bg-red-500 text-white animate-pulse' : 
          'bg-gray-200 text-gray-700'
        }`}>
          {match.status === 'upcoming' ? 'À venir' : 
           match.status === 'live' ? 'EN DIRECT' : 
           'Terminé'}
        </span>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col items-center w-5/12">
            <img 
              src={match.homeTeam.logo} 
              alt={match.homeTeam.name} 
              className="w-16 h-16 object-contain mb-2"
            />
            <span className="font-medium text-center">{match.homeTeam.name}</span>
          </div>
          
          {match.status === 'upcoming' ? (
            <div className="flex flex-col items-center justify-center w-2/12">
              <span className="text-lg font-semibold text-gray-500 mb-1">VS</span>
              <span className="text-sm text-gray-400">{match.time}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-2/12">
              <div className="flex items-center">
                <span className="text-3xl font-bold">{match.homeScore}</span>
                <span className="mx-2 text-gray-400">-</span>
                <span className="text-3xl font-bold">{match.awayScore}</span>
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
              className="w-16 h-16 object-contain mb-2"
            />
            <span className="font-medium text-center">{match.awayTeam.name}</span>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Calendar size={16} className="mr-2 text-green-700" />
            <span>{formatDate(match.date)}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-2 text-green-700" />
            <span>{match.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin size={16} className="mr-2 text-green-700" />
            <span>{match.venue}</span>
          </div>
        </div>
        
        <Link 
          to={`/matches/${match.id}`}
          className="block w-full text-center bg-green-700 text-white rounded py-2 font-medium hover:bg-green-800 transition duration-300"
        >
          {match.status === 'completed' ? 'Voir le résumé' : 
           match.status === 'live' ? 'Suivre en direct' : 
           'Plus d\'informations'}
        </Link>
      </div>
    </div>
  );
};

export default MatchCard;