import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Trophy,
  Calendar,
  FileText,
  BarChart,
  LogOut
} from 'lucide-react';
import AuthService from '../services/AuthService';
import ArticleManagement from '../components/Admin/ArticleManagement';
import ClubManagement from '../components/Admin/ClubManagement';
import MatchManagement from '../components/Admin/MatchManagement';
import PlayerManagement from '../components/Admin/PlayerManagement';
import StandingManagement from '../components/Admin/StandingManagement';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  // State for authentication
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // State for current section
  const [currentSection, setCurrentSection] = useState('dashboard');

  // Get current user
  const currentUser = AuthService.getCurrentUser();

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await AuthService.login({ email, password });
      setIsAuthenticated(true);
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await AuthService.logout();
      setIsAuthenticated(false);
      navigate('/');
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
    }
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-15rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-green-900">
              Espace Administration
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Connectez-vous pour gérer le contenu de SAMAFOOT
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Adresse email</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Mot de passe</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </div>
          </form>

          {/* <div className="mt-4 text-center text-sm text-gray-600">
            <p>Comptes de test :</p>
            <p><strong>Admin:</strong> admin@samafoot.sn / admin123</p>
            <p><strong>Éditeur:</strong> editor@samafoot.sn / editor123</p>
          </div> */}
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 bg-green-800 text-white h-[calc(100vh-4rem)] fixed">
          <div className="p-4 border-b border-green-700">
            <div className="text-lg font-bold">SAMAFOOT Admin</div>
            <div className="text-sm text-green-300">
              Bienvenue, {currentUser?.name}
            </div>
            <div className="text-xs text-green-400 capitalize">
              Rôle: {currentUser?.role?.replace('_', ' ')}
            </div>
          </div>

          <nav className="mt-4">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setCurrentSection('dashboard')}
                  className={`flex items-center w-full px-4 py-3 text-sm transition duration-150 ${
                    currentSection === 'dashboard'
                      ? 'bg-green-700 font-medium'
                      : 'hover:bg-green-700'
                  }`}
                >
                  <LayoutDashboard size={18} className="mr-3" />
                  Tableau de bord
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentSection('players')}
                  className={`flex items-center w-full px-4 py-3 text-sm transition duration-150 ${
                    currentSection === 'players'
                      ? 'bg-green-700 font-medium'
                      : 'hover:bg-green-700'
                  }`}
                >
                  <Users size={18} className="mr-3" />
                  Joueurs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentSection('clubs')}
                  className={`flex items-center w-full px-4 py-3 text-sm transition duration-150 ${
                    currentSection === 'clubs'
                      ? 'bg-green-700 font-medium'
                      : 'hover:bg-green-700'
                  }`}
                >
                  <Trophy size={18} className="mr-3" />
                  Clubs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentSection('matches')}
                  className={`flex items-center w-full px-4 py-3 text-sm transition duration-150 ${
                    currentSection === 'matches'
                      ? 'bg-green-700 font-medium'
                      : 'hover:bg-green-700'
                  }`}
                >
                  <Calendar size={18} className="mr-3" />
                  Matchs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentSection('articles')}
                  className={`flex items-center w-full px-4 py-3 text-sm transition duration-150 ${
                    currentSection === 'articles'
                      ? 'bg-green-700 font-medium'
                      : 'hover:bg-green-700'
                  }`}
                >
                  <FileText size={18} className="mr-3" />
                  Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentSection('standings')}
                  className={`flex items-center w-full px-4 py-3 text-sm transition duration-150 ${
                    currentSection === 'standings'
                      ? 'bg-green-700 font-medium'
                      : 'hover:bg-green-700'
                  }`}
                >
                  <Trophy size={18} className="mr-3" />
                  Classements
                </button>
              </li>
              {/* <li>
                <button
                  onClick={() => setCurrentSection('statistics')}
                  className={`flex items-center w-full px-4 py-3 text-sm transition duration-150 ${
                    currentSection === 'statistics'
                      ? 'bg-green-700 font-medium'
                      : 'hover:bg-green-700'
                  }`}
                >
                  <BarChart size={18} className="mr-3" />
                  Statistiques
                </button>
              </li> */}
            </ul>

            <div className="mt-auto pt-4 border-t border-green-700 absolute bottom-0 w-full">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-sm text-green-300 hover:bg-green-700 transition duration-150"
              >
                <LogOut size={18} className="mr-3" />
                Déconnexion
              </button>
            </div>
          </nav>
        </div>

        {/* Main content */}
        <div className="ml-64 flex-1 p-8">
          {currentSection === 'dashboard' && (
            <div>
              <h1 className="text-2xl font-bold text-green-900 mb-6">Tableau de bord</h1>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Bienvenue, {currentUser?.name} !
                </h3>
                <p className="text-blue-700">
                  Vous êtes connecté en tant que <strong className="capitalize">{currentUser?.role?.replace('_', ' ')}</strong>
                </p>
                {currentUser?.role === 'editor' && (
                  <p className="text-sm text-blue-600 mt-1">
                    Note: En tant qu'éditeur, vous pouvez créer et modifier du contenu, mais pas supprimer.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-full p-3 mr-4">
                      <Users size={24} className="text-green-700" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Joueurs</div>
                      <div className="text-2xl font-bold">7</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 rounded-full p-3 mr-4">
                      <Trophy size={24} className="text-yellow-700" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Clubs</div>
                      <div className="text-2xl font-bold">6</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full p-3 mr-4">
                      <Calendar size={24} className="text-blue-700" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Matchs</div>
                      <div className="text-2xl font-bold">5</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="bg-purple-100 rounded-full p-3 mr-4">
                      <FileText size={24} className="text-purple-700" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Articles</div>
                      <div className="text-2xl font-bold">4</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-lg font-semibold text-green-900 mb-4">Activité récente</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <FileText size={16} className="text-green-700" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Nouvel article ajouté</div>
                      <div className="text-xs text-gray-500">Il y a 2 heures</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-2 mr-3">
                      <Calendar size={16} className="text-blue-700" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Match mis à jour</div>
                      <div className="text-xs text-gray-500">Il y a 5 heures</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-yellow-100 rounded-full p-2 mr-3">
                      <Users size={16} className="text-yellow-700" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Nouveau joueur ajouté</div>
                      <div className="text-xs text-gray-500">Il y a 1 jour</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-green-900 mb-4">Matchs à venir</h2>
                  <div className="space-y-4">
                    <div className="pb-3 border-b border-gray-200">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">ASC Jaraaf vs Teungueth FC</span>
                        <span className="text-xs text-gray-500">10/11/2023</span>
                      </div>
                      <div className="text-xs text-gray-500">Stade Demba Diop, 16:30</div>
                    </div>

                    <div className="pb-3 border-b border-gray-200">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Casa Sports vs Génération Foot</span>
                        <span className="text-xs text-gray-500">05/11/2023</span>
                      </div>
                      <div className="text-xs text-gray-500">Stade Aline Sitoe Diatta, 17:00</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-green-900 mb-4">Articles récents</h2>
                  <div className="space-y-4">
                    <div className="pb-3 border-b border-gray-200">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">ASC Jaraaf remporte le derby contre Casa Sports</span>
                        <span className="text-xs text-gray-500">11/10/2023</span>
                      </div>
                      <div className="text-xs text-gray-500">Par Mamadou Diallo</div>
                    </div>

                    <div className="pb-3 border-b border-gray-200">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Teungueth FC signe un jeune talent de l'académie</span>
                        <span className="text-xs text-gray-500">14/10/2023</span>
                      </div>
                      <div className="text-xs text-gray-500">Par Fatou Sow</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentSection === 'players' && <PlayerManagement />}

          {/* Gestion des clubs */}
          {currentSection === 'clubs' && <ClubManagement />}

          {/* Gestion des matchs */}
          {currentSection === 'matches' && <MatchManagement />}

          {/* Gestion des articles */}
          {currentSection === 'articles' && <ArticleManagement />}

          {/* Gestion des classements */}
          {currentSection === 'standings' && <StandingManagement />}

          {currentSection === 'statistics' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-green-900">Statistiques</h1>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-500">Dashboard des statistiques du championnat.</p>

                {/* Placeholder content */}
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Cette section est en cours de développement.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
