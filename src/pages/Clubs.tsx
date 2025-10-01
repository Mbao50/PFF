import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';
import ClubCard from '../components/Clubs/ClubCard';
import { Club } from '../types';

const Clubs: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClubs = async () => {
      try {
        const clubsData = await ApiService.getClubs();
        setClubs(clubsData);
      } catch (error) {
        console.error('Error loading clubs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadClubs();
  }, []);

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
        <h1 className="text-3xl font-bold text-green-900 mb-4">Clubs</h1>
        <p className="text-gray-600">
          Découvrez tous les clubs du championnat sénégalais, leurs informations et leurs statistiques.
        </p>
      </div>

      {/* Clubs grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map(club => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </div>
  );
};

export default Clubs;