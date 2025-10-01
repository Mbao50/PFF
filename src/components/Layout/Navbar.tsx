import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="bg-green-700 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-white font-bold text-xl">SAMA<span className="text-yellow-400">FOOT</span></span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150">
              Accueil
            </Link>
            <Link to="/matches" className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150">
              Matchs
            </Link>
            <Link to="/clubs" className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150">
              Clubs
            </Link>
            <Link to="/players" className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150">
              Joueurs
            </Link>
            <Link to="/rankings" className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150">
              Classements
            </Link>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:bg-green-600 p-2 rounded-md transition duration-150"
            >
              <Search size={20} />
            </button>
            <Link to="/admin" className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-medium px-3 py-2 rounded-md text-sm transition duration-150 ml-4 flex items-center">
              <User size={16} className="mr-1" />
              Admin
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:bg-green-600 p-2 rounded-md transition duration-150 mr-2"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-green-600 p-2 rounded-md transition duration-150"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/matches" 
              className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Matchs
            </Link>
            <Link 
              to="/clubs" 
              className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Clubs
            </Link>
            <Link 
              to="/players" 
              className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Joueurs
            </Link>
            <Link 
              to="/rankings" 
              className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Classements
            </Link>
            <Link 
              to="/admin" 
              className="bg-yellow-500 hover:bg-yellow-600 text-green-900 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
      
      {/* Search bar */}
      {isSearchOpen && (
        <div className="bg-green-800 py-2 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Rechercher un club, un joueur, un match..."
                className="w-full rounded-md bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                onClick={handleSearch}
                className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
              >
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;