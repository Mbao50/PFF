import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../types';

interface NewsCardProps {
  article: Article;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  // Format the date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Truncate the content
  const truncateContent = (content: string, maxLength: number) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full transform transition duration-300 hover:shadow-lg hover:translate-y-[-5px]">
      <div className="relative">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-48 object-cover" 
        />
        <div className="absolute top-0 right-0 bg-yellow-500 text-xs font-semibold px-2 py-1 m-2 rounded text-green-900">
          {article.category === 'news' ? 'Actualité' : 
           article.category === 'transfer' ? 'Transfert' : 
           article.category === 'interview' ? 'Interview' : 'Analyse'}
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-2">{formatDate(article.date)}</div>
        <h3 className="font-bold text-lg mb-2 text-green-900">{article.title}</h3>
        <p className="text-gray-600 text-sm mb-4">
          {truncateContent(article.content, 120)}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Par {article.author}</span>
          <Link 
            to={`/news/${article.id}`}
            className="text-green-700 text-sm font-medium hover:text-green-900 transition duration-150"
          >
            Lire la suite
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;