import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { matches, articles, competitions } from '../data/mockData';
import FeaturedMatch from '../components/Home/FeaturedMatch';
import NewsCard from '../components/Home/NewsCard';
import StandingTable from '../components/Home/StandingTable';

const Home: React.FC = () => {
  // Get upcoming and recent matches
  const upcomingMatches = matches.filter(match => match.status === 'upcoming').slice(0, 3);
  const recentMatches = matches.filter(match => match.status === 'completed').slice(0, 3);
  
  // Get latest news
  const latestNews = [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
  
  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Bienvenue sur <span className="text-yellow-400">SAMAFOOT</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Le portail de référence pour suivre les actualités, les résultats et les statistiques du football sénégalais.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/matches" 
                className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold py-3 px-6 rounded-md transition duration-300 text-center"
              >
                Voir les matchs
              </Link>
              <Link 
                to="/rankings" 
                className="border-2 border-white hover:bg-white hover:text-green-900 text-white font-bold py-3 px-6 rounded-md transition duration-300 text-center"
              >
                Classements
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Upcoming Matches */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-green-900">Prochains Matchs</h2>
            <Link 
              to="/matches" 
              className="flex items-center text-green-700 hover:text-green-800 transition duration-150"
            >
              Voir tous les matchs
              <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.map(match => (
              <FeaturedMatch key={match.id} match={match} />
            ))}
          </div>
        </div>
        
        {/* Latest News */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-green-900">Actualités Récentes</h2>
            <Link 
              to="/news" 
              className="flex items-center text-green-700 hover:text-green-800 transition duration-150"
            >
              Toutes les actualités
              <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map(article => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </div>
        
        {/* Recent Results & Standings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-green-900">Résultats Récents</h2>
              <Link 
                to="/matches" 
                className="flex items-center text-green-700 hover:text-green-800 transition duration-150"
              >
                Tous les résultats
                <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentMatches.map(match => (
                <div key={match.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="mb-2">
                    <span className="text-sm text-gray-500">{match.competition} - {match.date}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex items-center w-5/12">
                      <img 
                        src={match.homeTeam.logo} 
                        alt={match.homeTeam.name} 
                        className="w-8 h-8 object-contain mr-2"
                      />
                      <span className="font-medium">{match.homeTeam.name}</span>
                    </div>
                    
                    <div className="flex items-center justify-center w-2/12">
                      <span className="font-bold">{match.homeScore}</span>
                      <span className="mx-2">-</span>
                      <span className="font-bold">{match.awayScore}</span>
                    </div>
                    
                    <div className="flex items-center w-5/12 justify-end">
                      <span className="font-medium">{match.awayTeam.name}</span>
                      <img 
                        src={match.awayTeam.logo} 
                        alt={match.awayTeam.name} 
                        className="w-8 h-8 object-contain ml-2"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-2 text-right">
                    <Link 
                      to={`/matches/${match.id}`} 
                      className="text-green-700 text-sm hover:text-green-800 transition duration-150"
                    >
                      Détails
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-green-900">Classement</h2>
              <Link 
                to="/rankings" 
                className="flex items-center text-green-700 hover:text-green-800 transition duration-150"
              >
                Tous les classements
                <ChevronRight size={16} />
              </Link>
            </div>
            
            <StandingTable 
              standings={competitions[0].standings} 
              competitionName={competitions[0].name}
            />
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-900 mb-4">
              Restez informé du football sénégalais
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Ne manquez aucun match, aucun transfert, aucune actualité du football sénégalais. Rejoignez la communauté SAMAFOOT dès maintenant.
            </p>
            <Link 
              to="/admin"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300"
            >
              Accéder à l'espace admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;