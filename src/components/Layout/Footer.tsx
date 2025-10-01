import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-white font-bold text-xl">SAMA<span className="text-yellow-400">FOOT</span></span>
            </div>
            <p className="text-gray-300 text-sm">
              Le portail de référence du football sénégalais. Suivez tous les matchs, les résultats et les actualités du foot au Sénégal.
            </p>
          </div>
          
          <div className="col-span-1">
            <h2 className="text-lg font-semibold mb-4 text-yellow-400">Navigation</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition duration-150">Accueil</Link>
              </li>
              <li>
                <Link to="/matches" className="text-gray-300 hover:text-white transition duration-150">Matchs</Link>
              </li>
              <li>
                <Link to="/clubs" className="text-gray-300 hover:text-white transition duration-150">Clubs</Link>
              </li>
              <li>
                <Link to="/players" className="text-gray-300 hover:text-white transition duration-150">Joueurs</Link>
              </li>
              <li>
                <Link to="/rankings" className="text-gray-300 hover:text-white transition duration-150">Classements</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h2 className="text-lg font-semibold mb-4 text-yellow-400">Liens utiles</h2>
            <ul className="space-y-2">
              <li>
                <a href="https://fsfoot.sn/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-150">
                  Fédération Sénégalaise de Football
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/lsfpro/?locale=fr_FR" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-150">
                  Ligue Professionnelle de Football
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/groups/leslionsdelateranga/?locale=fr_FR" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-150">
                  Lions de la Teranga
                </a>
              </li>
              <li>
                <a href="https://www.cafonline.com/fr/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-150">
                  Confédération Africaine de Football
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h2 className="text-lg font-semibold mb-4 text-yellow-400">Contact</h2>
            <p className="text-gray-300 text-sm mb-4">
              Vous avez des questions ou des suggestions ? N'hésitez pas à nous contacter.
            </p>
            <a 
              href="mailto:contact@samafoot.sn" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-green-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition duration-150"
            >
              Nous contacter
            </a>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} SAMAFOOT. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;