import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import { Player, Club } from '../../types';

interface PlayerFormData {
  name: string;
  position: string;
  birthdate: string;
  nationality: string;
  clubId: string;
  image: string;
  image_file?: File;
  height: string;
  weight: string;
  appearances: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
}

const PlayerManagement: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | null>(null);
  const [formData, setFormData] = useState<PlayerFormData>({
    name: '',
    position: '',
    birthdate: '',
    nationality: '',
    clubId: '',
    image: '',
    height: '',
    weight: '',
    appearances: 0,
    goals: 0,
    assists: 0,
    yellowCards: 0,
    redCards: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [playersData, clubsData] = await Promise.all([
        ApiService.getPlayers(),
        ApiService.getClubs(),
      ]);
      setPlayers(playersData);
      setClubs(clubsData);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setValidationErrors(null);

    try {
      if (editingPlayer) {
        await ApiService.updatePlayer(editingPlayer.id, formData);
      } else {
        await ApiService.createPlayer(formData);
      }
      setShowForm(false);
      setEditingPlayer(null);
      resetForm();
      loadData();
    } catch (error: any) {
      console.error('Erreur lors de la sauvegarde:', error);

      // Handle validation errors
      if (error.response?.status === 422 && error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
        setError('Erreurs de validation. Veuillez corriger les champs ci-dessous.');
      } else {
        setError('Erreur lors de la sauvegarde. Veuillez réessayer.');
      }
    }
  };

  const handleEdit = (player: Player) => {
    setEditingPlayer(player);
    setFormData({
      name: player.name,
      position: player.position,
      birthdate: player.birthdate,
      nationality: player.nationality,
      clubId: player.clubId,
      image: player.image,
      height: player.height,
      weight: player.weight,
      appearances: player.appearances,
      goals: player.goals,
      assists: player.assists,
      yellowCards: player.yellowCards,
      redCards: player.redCards,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce joueur ?')) {
      try {
        await ApiService.deletePlayer(id);
        loadData();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      birthdate: '',
      nationality: '',
      clubId: '',
      image: '',
      height: '',
      weight: '',
      appearances: 0,
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
    });
    setError(null);
    setValidationErrors(null);
  };

  const getClubName = (clubId: string) => {
    const club = clubs.find(c => c.id === clubId);
    return club ? club.name : 'Club inconnu';
  };

  const getFieldError = (field: string) => {
    return validationErrors?.[field]?.[0] || null;
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Joueurs</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingPlayer(null);
            resetForm();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Ajouter un Joueur
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingPlayer ? 'Modifier le Joueur' : 'Nouveau Joueur'}
          </h3>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`mt-1 block w-full border rounded-md px-3 py-2 ${getFieldError('name') ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {getFieldError('name') && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className={`mt-1 block w-full border rounded-md px-3 py-2 ${getFieldError('position') ? 'border-red-500' : 'border-gray-300'}`}
                  required
                >
                  <option value="">Sélectionner une position</option>
                  <option value="Goalkeeper">Gardien</option>
                  <option value="Defender">Défenseur</option>
                  <option value="Midfielder">Milieu</option>
                  <option value="Forward">Attaquant</option>
                </select>
                {getFieldError('position') && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError('position')}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date de naissance</label>
                <input
                  type="date"
                  value={formData.birthdate}
                  onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                  className={`mt-1 block w-full border rounded-md px-3 py-2 ${getFieldError('birthdate') ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {getFieldError('birthdate') && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError('birthdate')}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nationalité</label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  className={`mt-1 block w-full border rounded-md px-3 py-2 ${getFieldError('nationality') ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {getFieldError('nationality') && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError('nationality')}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Club</label>
                <select
                  value={formData.clubId}
                  onChange={(e) => setFormData({ ...formData, clubId: e.target.value })}
                  className={`mt-1 block w-full border rounded-md px-3 py-2 ${getFieldError('club_id') ? 'border-red-500' : 'border-gray-300'}`}
                  required
                >
                  <option value="">Sélectionner un club</option>
                  {clubs.map((club) => (
                    <option key={club.id} value={club.id}>
                      {club.name}
                    </option>
                  ))}
                </select>
                {getFieldError('club_id') && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError('club_id')}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <div className="mt-1 space-y-2">
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className={`block w-full border rounded-md px-3 py-2 ${getFieldError('image') ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="URL de l'image"
                  />
                  <div className="text-sm text-gray-500">OU</div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, image_file: e.target.files?.[0] })}
                    className={`block w-full border rounded-md px-3 py-2 ${getFieldError('image_file') ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </div>
                {getFieldError('image') && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError('image')}</p>
                )}
                {getFieldError('image_file') && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError('image_file')}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Taille</label>
                <input
                  type="text"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className={`mt-1 block w-full border rounded-md px-3 py-2 ${getFieldError('height') ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="ex: 1.80m"
                />
                {getFieldError('height') && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError('height')}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Poids</label>
                <input
                  type="text"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className={`mt-1 block w-full border rounded-md px-3 py-2 ${getFieldError('weight') ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="ex: 75kg"
                />
                {getFieldError('weight') && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError('weight')}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Matchs joués</label>
                <input
                  type="number"
                  value={formData.appearances}
                  onChange={(e) => setFormData({ ...formData, appearances: parseInt(e.target.value) || 0 })}
                  className={`mt-1 block w-full border rounded-md px-3 py-2 ${getFieldError('appearances') ? 'border-red-500' : 'border-gray-300'}`}
                  min="0"
                />
                {getFieldError('appearances') && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError('appearances')}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Buts</label>
                <input
                  type="number"
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: parseInt(e.target.value) || 0 })}
                  className={`mt-1 block w-full border rounded-md px-3 py-2 ${getFieldError('goals') ? 'border-red-500' : 'border-gray-300'}`}
                  min="0"
                />
                {getFieldError('goals') && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError('goals')}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Passes décisives</label>
                <input
                  type="number"
                  value={formData.assists}
                  onChange={(e) => setFormData({ ...formData, assists: parseInt(e.target.value) || 0 })}
                  className={`mt-1 block w-full border rounded-md px-3 py-2 ${getFieldError('assists') ? 'border-red-500' : 'border-gray-300'}`}
                  min="0"
                />
                {getFieldError('assists') && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError('assists')}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cartons jaunes</label>
                <input
                  type="number"
                  value={formData.yellowCards}
                  onChange={(e) => setFormData({ ...formData, yellowCards: parseInt(e.target.value) || 0 })}
                  className={`mt-1 block w-full border rounded-md px-3 py-2 ${getFieldError('yellow_cards') ? 'border-red-500' : 'border-gray-300'}`}
                  min="0"
                />
                {getFieldError('yellow_cards') && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError('yellow_cards')}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cartons rouges</label>
                <input
                  type="number"
                  value={formData.redCards}
                  onChange={(e) => setFormData({ ...formData, redCards: parseInt(e.target.value) || 0 })}
                  className={`mt-1 block w-full border rounded-md px-3 py-2 ${getFieldError('red_cards') ? 'border-red-500' : 'border-gray-300'}`}
                  min="0"
                />
                {getFieldError('red_cards') && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError('red_cards')}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingPlayer(null);
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
                {editingPlayer ? 'Mettre à jour' : 'Créer'}
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
                Joueur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Club
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statistiques
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {players.map((player) => (
              <tr key={player.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={player.image}
                        alt={player.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{player.name}</div>
                      <div className="text-sm text-gray-500">{player.nationality}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {player.position}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getClubName(player.clubId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>Matchs: {player.appearances}</div>
                  <div>Buts: {player.goals} | Passes: {player.assists}</div>
                  <div>Cartons: {player.yellowCards}J/{player.redCards}R</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(player)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(player.id)}
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

export default PlayerManagement;
