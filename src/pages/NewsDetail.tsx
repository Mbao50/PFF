import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import apiService from '../services/ApiService';
import { Article } from '../types';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticleDetails = async () => {
      if (!id) {
        setError('ID d\'article invalide');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        console.log('Fetching article details for id:', id);
        const articleData = await apiService.getArticle(id);
        console.log('Article data received:', articleData);
        setArticle(articleData);
        setError(null);
      } catch (err) {
        console.error('Error fetching article details:', err);
        setError('Erreur lors du chargement de l\'article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetails();
  }, [id]);

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        Chargement de l'article...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-red-600">
        {error}
        <div className="mt-4">
          <Link to="/" className="text-green-700 hover:text-green-800 transition duration-150">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        Article non trouvé
        <div className="mt-4">
          <Link to="/" className="text-green-700 hover:text-green-800 transition duration-150">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-green-700 hover:text-green-800 transition duration-150"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour à l'accueil
        </Link>
      </div>

      {/* Article header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute top-0 right-0 bg-yellow-500 text-sm font-semibold px-3 py-2 m-4 rounded text-green-900">
            {getCategoryLabel(article.category)}
          </div>
        </div>

        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>{formatDate(article.date)}</span>
            </div>
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span>Par {article.author}</span>
            </div>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                >
                  <Tag size={12} className="mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Article content */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {article.content}
            </div>
          </div>
        </div>
      </div>

      {/* Related articles or navigation */}
      <div className="mt-8 text-center">
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-150"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour aux actualités
        </Link>
      </div>
    </div>
  );
};

export default NewsDetail;
