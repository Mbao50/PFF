import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';
import { StandingEntry } from '../types';

const Rankings: React.FC = () => {
  const [standings, setStandings] = useState<StandingEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStandings = async () => {
      try {
        const standingsData = await ApiService.getStandings();
        setStandings(standingsData);
      } catch (error) {
        console.error('Error loading standings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStandings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }
  
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-900 mb-4">Classements</h1>
        <p className="text-gray-600">
          Consultez les classements des différentes compétitions du football sénégalais.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-green-700 text-white p-4">
          <h2 className="text-xl font-bold">Ligue 1 Sénégalaise - Saison 2023-2024</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Club
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  J
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  G
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  P
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  BP
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  BC
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Diff
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pts
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Forme
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {standings.map((entry: StandingEntry) => (
                <tr key={entry.club?.id || entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {entry.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {entry.club && (
                        <>
                          <img
                            src={entry.club.logo}
                            alt={entry.club.name}
                            className="w-8 h-8 object-contain mr-3"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {entry.club.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {entry.club.stadium}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {entry.matches_played}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {entry.wins}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {entry.draws}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {entry.losses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {entry.goals_for}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {entry.goals_against}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span className={
                      entry.goalDifference > 0
                        ? 'text-green-600'
                        : entry.goalDifference < 0
                        ? 'text-red-600'
                        : 'text-gray-500'
                    }>
                      {entry.goalDifference > 0 ? '+' : ''}{entry.goalDifference}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-center">
                    {entry.points}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center hidden md:table-cell">
                    {renderForm(entry.form)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-green-900 mb-2">Légende</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <span className="w-5 h-5 rounded-full bg-green-500 mr-2 flex items-center justify-center text-xs font-bold text-white">W</span>
            <span className="text-sm text-gray-600">Victoire</span>
          </div>
          <div className="flex items-center">
            <span className="w-5 h-5 rounded-full bg-gray-300 mr-2 flex items-center justify-center text-xs font-bold text-gray-800">D</span>
            <span className="text-sm text-gray-600">Match nul</span>
          </div>
          <div className="flex items-center">
            <span className="w-5 h-5 rounded-full bg-red-500 mr-2 flex items-center justify-center text-xs font-bold text-white">L</span>
            <span className="text-sm text-gray-600">Défaite</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600">J: Matchs joués</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600">G/N/P: Gagnés/Nuls/Perdus</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600">BP/BC: Buts pour/contre</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rankings;