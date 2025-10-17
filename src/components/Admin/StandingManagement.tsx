import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import { StandingEntry, Club } from '../../types';

interface StandingFormData {
  club_id: string;
  position: number;
  matches_played: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  goalDifference: number;
  points: number;
  competition: string;
  form: ('W' | 'D' | 'L')[];
}

const StandingManagement: React.FC = () => {
  const [standings, setStandings] = useState<StandingEntry[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingStanding, setEditingStanding] = useState<StandingEntry | null>(null);
  const [selectedCompetition, setSelectedCompetition] = useState<string>('Ligue 1 Sénégalaise');
  const [availableCompetitions, setAvailableCompetitions] = useState<string[]>([]);
  const [formData, setFormData] = useState<StandingFormData>({
    club_id: '',
    position: 1,
    matches_played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goals_for: 0,
    goals_against: 0,
    goalDifference: 0,
    points: 0,
    competition: 'Ligue 1 Sénégalaise',
    form: [],
  });

  useEffect(() => {
    loadData();
  }, [selectedCompetition]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [standingsData, clubsData] = await Promise.all([
        ApiService.getStandings(),
        ApiService.getClubs()
      ]);

      // Extraire les compétitions disponibles
      const competitions = [...new Set(standingsData.map((standing: StandingEntry) => standing.competition))];
      setAvailableCompetitions(competitions);

      // Filtrer par compétition sélectionnée
      const filteredStandings = standingsData.filter((standing: StandingEntry) => standing.competition === selectedCompetition);
      setStandings(filteredStandings);
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
      if (editingStanding) {
        await ApiService.updateStanding(editingStanding.id, formData);
      } else {
        await ApiService.createStanding(formData);
      }
      setShowForm(false);
      setEditingStanding(null);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleEdit = (standing: StandingEntry) => {
    setEditingStanding(standing);
    setFormData({
      club_id: standing.club_id,
      position: standing.position,
      matches_played: standing.matches_played,
      wins: standing.wins,
      draws: standing.draws,
      losses: standing.losses,
      goals_for: standing.goals_for,
      goals_against: standing.goals_against,
      goalDifference: standing.goalDifference,
      points: standing.points,
      competition: standing.competition,
      form: standing.form,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette entrée de classement ?')) {
      try {
        await ApiService.deleteStanding(id);
        loadData();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const handleUpdateFromMatches = async () => {
    if (window.confirm('Cela va recalculer tous les classements basés sur les matchs terminés. Continuer ?')) {
      try {
        await ApiService.updateStandingsFromMatches(selectedCompetition);
        loadData();
      } catch (error) {
        console.error('Erreur lors de la mise à jour automatique:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      club_id: '',
      position: 1,
      matches_played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goals_for: 0,
      goals_against: 0,
      goalDifference: 0,
      points: 0,
      competition: 'Ligue 1',
      form: [],
    });
  };

  const getGoalDifference = (goalsFor: number, goalsAgainst: number) => {
    return goalsFor - goalsAgainst;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Classements</h2>
        <div className="space-x-2">
          <button
            onClick={handleUpdateFromMatches}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Mettre à jour depuis les matchs
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ajouter une entrée
          </button>
        </div>
      </div>

      {/* Sélecteur de compétition */}
      <div className="mb-6">
        <label htmlFor="competition-select" className="block text-sm font-medium text-gray-700 mb-2">
          Compétition:
        </label>
        <select
          id="competition-select"
          value={selectedCompetition}
          onChange={(e) => setSelectedCompetition(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          {availableCompetitions.map((competition) => (
            <option key={competition} value={competition}>
              {competition}
            </option>
          ))}
        </select>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editingStanding ? 'Modifier l\'entrée' : 'Nouvelle entrée de classement'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Club
                  </label>
                  <select
                    value={formData.club_id}
                    onChange={(e) => setFormData({ ...formData, club_id: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Sélectionner un club</option>
                    {clubs.map((club) => (
                      <option key={club.id} value={club.id}>
                        {club.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    type="number"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: parseInt(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Matchs joués
                  </label>
                  <input
                    type="number"
                    value={formData.matches_played}
                    onChange={(e) => setFormData({ ...formData, matches_played: parseInt(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Victoires
                  </label>
                  <input
                    type="number"
                    value={formData.wins}
                    onChange={(e) => setFormData({ ...formData, wins: parseInt(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nuls
                  </label>
                  <input
                    type="number"
                    value={formData.draws}
                    onChange={(e) => setFormData({ ...formData, draws: parseInt(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Défaites
                  </label>
                  <input
                    type="number"
                    value={formData.losses}
                    onChange={(e) => setFormData({ ...formData, losses: parseInt(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Buts marqués
                  </label>
                  <input
                    type="number"
                    value={formData.goals_for}
                    onChange={(e) => setFormData({ ...formData, goals_for: parseInt(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Buts encaissés
                  </label>
                  <input
                    type="number"
                    value={formData.goals_against}
                    onChange={(e) => setFormData({ ...formData, goals_against: parseInt(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Points
                  </label>
                  <input
                    type="number"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Compétition
                  </label>
                  <input
                    type="text"
                    value={formData.competition}
                    onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingStanding(null);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingStanding ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  MJ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  V
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  D
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  BP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  BC
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Diff
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {standings.map((standing) => (
                <tr key={standing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {standing.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {standing.club?.logo && (
                        <img
                          src={standing.club.logo}
                          alt={standing.club.name}
                          className="h-8 w-8 rounded-full mr-3"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {standing.club?.name || 'Club inconnu'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {standing.club?.shortName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {standing.matches_played}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {standing.wins}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {standing.draws}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {standing.losses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {standing.goals_for}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {standing.goals_against}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getGoalDifference(standing.goals_for, standing.goals_against)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {standing.points}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(standing)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(standing.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StandingManagement;