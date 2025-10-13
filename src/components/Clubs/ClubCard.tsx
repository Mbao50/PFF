import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, User } from 'lucide-react';
import { Club } from '../../types';

interface ClubCardProps {
  club: Club;
}

const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-center mb-4">
          <img 
            src={club.logo} 
            alt={club.name} 
            className="w-24 h-24 object-contain"
          />
        </div>
        <h3 className="text-xl font-bold text-center text-green-900 mb-1">{club.name}</h3>
        <p className="text-sm text-gray-500 text-center">{club.shortName}</p>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={16} className="mr-2 text-green-700" />
          <span>Fondé en {club.founded || 'Non spécifié'}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin size={16} className="mr-2 text-green-700" />
          <span>{club.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <User size={16} className="mr-2 text-green-700" />
          <span>Coach: {club.coach}</span>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50">
        <Link 
          to={`/clubs/${club.id}`}
          className="block w-full text-center bg-green-700 text-white rounded py-2 font-medium hover:bg-green-800 transition duration-300"
        >
          Voir le profil
        </Link>
      </div>
    </div>
  );
};

export default ClubCard;