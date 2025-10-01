import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import { Match, Club } from '../../types';

interface MatchFormData {
  home_team_id: string;
  away_team_id: string;
  homeScore: number | null;
  awayScore: number | null;
  date: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  competition: string;
}

const MatchManagement: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [formData, setFormData] = useState<MatchFormData>({
    home_team_id: '',
    away_team_id: '',
    homeScore: null,
    awayScore: null,
    date: '',
    time: '',
    venue: '',
    status: 'upcoming',
    competition: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [matchesData, clubsData] = await Promise.all([
        ApiService.getMatches(),
        ApiService.getClubs(),
      ]);
      setMatches(matchesData);
      setClubs(clubsData);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Find the Club objects from IDs
      const homeTeam = clubs.find(c => c.id === formData.home_team_id);
      const awayTeam = clubs.find(c => c.id === formData.away_team_id);

      if (!homeTeam || !awayTeam) {
        console.error('Équipes non trouvées');
        return;
      }

      // Prepare data to match expected API format
      const matchData = {
        homeTeam,
        awayTeam,
        homeScore: formData.homeScore,
        awayScore: formData.awayScore,
        date: formData.date,
        time: formData.time,
        venue: formData.venue,
        status: formData.status,
        competition: formData.competition,
      };
      if (editingMatch) {
        await ApiService.updateMatch(editingMatch.id, matchData);
      } else {
        await ApiService.createMatch(matchData);
      }
      setShowForm(false);
      setEditingMatch(null);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleEdit = (match: Match) => {
    setEditingMatch(match);
    setFormData({
      home_team_id: match.homeTeam.id,
      away_team_id: match.awayTeam.id,
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      date: match.date,
      time: match.time,
      venue: match.venue,
      status: match.status,
      competition: match.competition,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce match ?')) {
      try {
        await ApiService.deleteMatch(id);
        loadData();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      home_team_id: '',
      away_team_id: '',
      homeScore: null,
      awayScore: null,
      date: '',
      time: '',
      venue: '',
      status: 'upcoming',
      competition: '',
    });
  };

  const getClubName = (clubId: string) => {
    const club = clubs.find(c => c.id === clubId);
    return club ? club.name : 'Club inconnu';
  };

  const getMatchClubName = (match: Match, isHome: boolean) => {
    const team = isHome ? match.homeTeam : match.awayTeam;
    return team ? team.name : 'Équipe inconnue';
  };

  const getStatusLabel = (status: string) => {
    const statusMap: { [key: string]: string } = {
      upcoming: 'À venir',
      live: 'En direct',
      completed: 'Terminé',
      cancelled: 'Annulé',
    };
    return statusMap[status] || status;
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Matchs</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingMatch(null);
            resetForm();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Ajouter un Match
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingMatch ? 'Modifier le Match' : 'Nouveau Match'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Équipe domicile</label>
                <select
                  value={formData.home_team_id}
                  onChange={(e) => setFormData({ ...formData, home_team_id: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="">Sélectionner une équipe</option>
                  {clubs.map((club) => (
                    <option key={club.id} value={club.id}>
                      {club.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Équipe extérieur</label>
                <select
                  value={formData.away_team_id}
                  onChange={(e) => setFormData({ ...formData, away_team_id: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="">Sélectionner une équipe</option>
                  {clubs.map((club) => (
                    <option key={club.id} value={club.id}>
                      {club.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Score domicile</label>
                <input
                  type="number"
                  value={formData.homeScore || ''}
                  onChange={(e) => setFormData({ ...formData, homeScore: e.target.value ? parseInt(e.target.value) : null })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  min="0"
                  placeholder="Laissez vide si pas encore joué"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Score extérieur</label>
                <input
                  type="number"
                  value={formData.awayScore || ''}
                  onChange={(e) => setFormData({ ...formData, awayScore: e.target.value ? parseInt(e.target.value) : null })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  min="0"
                  placeholder="Laissez vide si pas encore joué"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Heure</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Lieu</label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Statut</label>
                <select
                  value={formData.status}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === 'upcoming' || value === 'live' || value === 'completed' || value === 'cancelled') {
                      setFormData({ ...formData, status: value });
                    }
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="upcoming">À venir</option>
                  <option value="live">En direct</option>
                  <option value="completed">Terminé</option>
                  <option value="cancelled">Annulé</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Compétition</label>
                <input
                  type="text"
                  value={formData.competition}
                  onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                  placeholder="ex: Ligue 1, Coupe du Sénégal"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingMatch(null);
                  resetForm();
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingMatch ? 'Mettre à jour' : 'Créer'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Match
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Heure
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lieu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Compétition
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {matches.map((match) => (
              <tr key={match.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {getMatchClubName(match, true)} vs {getMatchClubName(match, false)}
                  </div>
                  {match.homeScore !== null && match.awayScore !== null && (
                    <div className="text-sm text-gray-500">
                      {match.homeScore} - {match.awayScore}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>{new Date(match.date).toLocaleDateString('fr-FR')}</div>
                  <div className="text-gray-500">{match.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {match.venue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {match.competition}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    match.status === 'completed' ? 'bg-green-100 text-green-800' :
                    match.status === 'live' ? 'bg-red-100 text-red-800' :
                    match.status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {getStatusLabel(match.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(match)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(match.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatchManagement;










