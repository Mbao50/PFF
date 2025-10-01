import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Flag, Calendar } from 'lucide-react';
import { Player } from '../../types';
import { clubs } from '../../data/mockData';

interface PlayerCardProps {
  player: Player;
}

const positionTranslations: { [key: string]: string } = {
  'Goalkeeper': 'Gardien',
  'Defender': 'Défenseur',
  'Midfielder': 'Milieu',
  'Forward': 'Attaquant',
};

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  // Find the player's club
  const club = clubs.find(c => c.id === player.clubId);

  // Format the date
  const formatBirthdate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

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

  const translatedPosition = positionTranslations[player.position] || player.position;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="bg-gradient-to-b from-green-700 to-green-900 h-32 relative">
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white">
          <img
            src={player.image}
            alt={player.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="pt-16 p-4">
        <h3 className="text-xl font-bold text-center text-green-900 mb-1">{player.name}</h3>

        <div className="flex justify-center items-center space-x-2 mb-4">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {translatedPosition}
          </span>
          <span className="text-gray-400">|</span>
          <span className="text-sm text-gray-500">{calculateAge(player.birthdate)} ans</span>
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Users size={16} className="mr-2 text-green-700" />
            <span>Club: {club?.name || 'Non défini'}</span>
          </div>
          <div className="flex items-center">
            <Flag size={16} className="mr-2 text-green-700" />
            <span>Nationalité: {player.nationality}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={16} className="mr-2 text-green-700" />
            <span>Né le {formatBirthdate(player.birthdate)}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4 text-center">
          <div className="bg-gray-50 p-2 rounded">
            <span className="block text-lg font-bold text-green-700">{player.appearances}</span>
            <span className="text-xs text-gray-500">Matchs</span>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="block text-lg font-bold text-green-700">{player.goals}</span>
            <span className="text-xs text-gray-500">Buts</span>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="block text-lg font-bold text-green-700">{player.assists}</span>
            <span className="text-xs text-gray-500">Passes D.</span>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="block text-lg font-bold text-yellow-500">{player.yellowCards}</span>
            <span className="block text-lg font-bold text-red-500">{player.redCards}</span>
            <span className="text-xs text-gray-500">Cartons</span>
          </div>
        </div>

        <Link
          to={`/players/${player.id}`}
          className="block w-full text-center bg-green-700 text-white rounded py-2 font-medium hover:bg-green-800 transition duration-300"
        >
          Voir le profil
        </Link>
      </div>
    </div>
  );
};

export default PlayerCard;
