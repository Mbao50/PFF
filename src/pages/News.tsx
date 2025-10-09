import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import apiService from '../services/ApiService';
import { Article } from '../types';

const News: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const articlesData = await apiService.getArticles();
        setArticles(articlesData);
        setError(null);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Erreur lors du chargement des articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Get category label
  const getCategoryLabel = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      news: 'Actualité',
      transfer: 'Transfert',
      interview: 'Interview',
      analysis: 'Analyse'
    };
    return categoryMap[category] || category;
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      news: 'bg-blue-100 text-blue-800',
      transfer: 'bg-green-100 text-green-800',
      interview: 'bg-purple-100 text-purple-800',
      analysis: 'bg-orange-100 text-orange-800'
    };
    return colorMap[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        Chargement des articles...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-green-900 mb-4">Actualités</h1>
        <p className="text-lg text-gray-600">
          Toutes les dernières nouvelles du football sénégalais
        </p>
      </div>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Article Image */}
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(article.category)}`}>
                  {getCategoryLabel(article.category)}
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-green-900 mb-3 line-clamp-2">
                  {article.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.content.substring(0, 150)}...
                </p>

                {/* Article Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <User size={14} className="mr-1" />
                    <span>{article.author}</span>
                  </div>
                </div>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
                      >
                        <Tag size={10} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{article.tags.length - 3} autres
                      </span>
                    )}
                  </div>
                )}

                {/* Read More Link */}
                <Link
                  to={`/news/${article.id}`}
                  className="inline-flex items-center text-green-700 hover:text-green-800 font-semibold transition duration-150"
                >
                  Lire la suite
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucun article disponible pour le moment.</p>
        </div>
      )}

      {/* Back to Home */}
      <div className="mt-12 text-center">
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-150"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default News;
