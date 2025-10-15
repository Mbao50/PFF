import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import { Club } from '../../types';

interface ClubFormData {
  name: string;
  shortName: string;
  logo: string;
  logo_file?: File;
  founded: number | null;
  stadium: string;
  coach: string;
  location: string;
  colors: string;
}

const ClubManagement: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingClub, setEditingClub] = useState<Club | null>(null);
  const [formData, setFormData] = useState<ClubFormData>({
    name: '',
    shortName: '',
    logo: '',
    founded: null,
    stadium: '',
    coach: '',
    location: '',
    colors: '',
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadClubs();
  }, []);

  const loadClubs = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getClubs();
      setClubs(data);
    } catch (error) {
      console.error('Erreur lors du chargement des clubs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});
    try {
      if (editingClub) {
        await ApiService.updateClub(editingClub.id, formData);
      } else {
        await ApiService.createClub(formData);
      }
      setShowForm(false);
      setEditingClub(null);
      resetForm();
      loadClubs();
    } catch (error: any) {
      console.error('Erreur lors de la sauvegarde:', error);
      if (error.response?.status === 422 && error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert('Une erreur est survenue lors de la sauvegarde.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (club: Club) => {
    setEditingClub(club);
    setFormData({
      name: club.name,
      shortName: club.shortName,
      logo: club.logo,
      founded: club.founded,
      stadium: club.stadium,
      coach: club.coach,
      location: club.location,
      colors: club.colors,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce club ?')) {
      try {
        await ApiService.deleteClub(id);
        loadClubs();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      shortName: '',
      logo: '',
      founded: null,
      stadium: '',
      coach: '',
      location: '',
      colors: '',
    });
    setErrors({});
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Clubs</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingClub(null);
            resetForm();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Ajouter un Club
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingClub ? 'Modifier le Club' : 'Nouveau Club'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(errors).length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <h4 className="text-red-800 font-medium">Erreurs de validation:</h4>
                <ul className="mt-2 text-sm text-red-700">
                  {Object.entries(errors).map(([field, messages]) => (
                    <li key={field}>
                      <strong className="capitalize">{field.replace('_', ' ')}:</strong> {messages.join(', ')}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.join(', ')}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom court</label>
                <input
                  type="text"
                  value={formData.shortName}
                  onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                  className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                    errors.short_name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.short_name && <p className="mt-1 text-sm text-red-600">{errors.short_name.join(', ')}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Logo</label>
                <div className="mt-1 space-y-2">
                  <input
                    type="url"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    className={`block w-full border rounded-md px-3 py-2 ${
                      errors.logo ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="URL du logo"
                  />
                  <div className="text-sm text-gray-500">OU</div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, logo_file: e.target.files?.[0] })}
                    className={`block w-full border rounded-md px-3 py-2 ${
                      errors.logo_file ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.logo && <p className="mt-1 text-sm text-red-600">{errors.logo.join(', ')}</p>}
                {errors.logo_file && <p className="mt-1 text-sm text-red-600">{errors.logo_file.join(', ')}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Année de fondation</label>
                <input
                  type="number"
                  value={formData.founded || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, founded: value === '' ? null : parseInt(value) || null });
                  }}
                  className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                    errors.founded ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="ex: 1950"
                />
                {errors.founded && <p className="mt-1 text-sm text-red-600">{errors.founded.join(', ')}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stade</label>
                <input
                  type="text"
                  value={formData.stadium}
                  onChange={(e) => setFormData({ ...formData, stadium: e.target.value })}
                  className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                    errors.stadium ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.stadium && <p className="mt-1 text-sm text-red-600">{errors.stadium.join(', ')}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Entraîneur</label>
                <input
                  type="text"
                  value={formData.coach}
                  onChange={(e) => setFormData({ ...formData, coach: e.target.value })}
                  className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                    errors.coach ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.coach && <p className="mt-1 text-sm text-red-600">{errors.coach.join(', ')}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Localisation</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                    errors.location ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.join(', ')}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Couleurs</label>
                <input
                  type="text"
                  value={formData.colors}
                  onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                  className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                    errors.colors ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="ex: Rouge et Blanc"
                  required
                />
                {errors.colors && <p className="mt-1 text-sm text-red-600">{errors.colors.join(', ')}</p>}
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingClub(null);
                  resetForm();
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Sauvegarde...' : (editingClub ? 'Mettre à jour' : 'Créer')}
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
                Club
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom court
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entraîneur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clubs.map((club) => (
              <tr key={club.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={club.logo}
                        alt={club.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{club.name}</div>
                      <div className="text-sm text-gray-500">{club.location}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {club.shortName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {club.stadium}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {club.coach}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(club)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(club.id)}
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

export default ClubManagement;










