import React from 'react';
import { Link } from 'react-router-dom';
import { StandingEntry } from '../../types';

interface StandingTableProps {
  standings: StandingEntry[];
  competitionName: string;
}

const StandingTable: React.FC<StandingTableProps> = ({ standings, competitionName }) => {
  // Display only top 5 teams in the standings
  const topStandings = standings.slice(0, 5);
  
  // Render form indicators (W/D/L)
  const renderForm = (form: ('W' | 'D' | 'L')[]) => {
    return (
      <div className="flex space-x-1">
        {form.map((result, index) => (
          <span 
            key={index} 
            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
              result === 'W' ? 'bg-green-500 text-white' : 
              result === 'D' ? 'bg-gray-300 text-gray-800' : 
              'bg-red-500 text-white'
            }`}
          >
            {result}
          </span>
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-green-700 text-white p-3">
        <h3 className="font-bold">{competitionName}</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
              <th className="py-3 px-4 w-10">#</th>
              <th className="py-3 px-4">Club</th>
              <th className="py-3 px-4 text-center w-10">J</th>
              <th className="py-3 px-4 text-center w-10">Pts</th>
              <th className="py-3 px-4 text-center w-24 hidden sm:table-cell">Forme</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {topStandings.map((entry) => (
              <tr
                key={entry.club?.id || entry.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition duration-150"
              >
                <td className="py-3 px-4 text-center">{entry.position}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    {entry.club && (
                      <>
                        <img
                          src={entry.club.logo}
                          alt={entry.club.name}
                          className="w-6 h-6 object-contain mr-2"
                        />
                        <Link
                          to={`/clubs/${entry.club.id}`}
                          className="hover:text-green-700 transition duration-150"
                        >
                          {entry.club.name}
                        </Link>
                      </>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-center">{entry.matches_played}</td>
                <td className="py-3 px-4 text-center font-bold">{entry.points}</td>
                <td className="py-3 px-4 hidden sm:table-cell">
                  <div className="flex justify-center">
                    {/* Form data not available in current data structure */}
                    <span className="text-xs text-gray-400">N/A</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-3 border-t border-gray-200">
        <Link 
          to="/rankings" 
          className="text-green-700 hover:text-green-900 text-sm font-medium transition duration-150"
        >
          Voir le classement complet
        </Link>
      </div>
    </div>
  );
};

export default StandingTable;