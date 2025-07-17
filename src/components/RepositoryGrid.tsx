import React from 'react';
import { Star, GitFork, Eye, Code } from 'lucide-react';
import { Repository } from '../services/github';

interface RepositoryGridProps {
  repositories: Repository[];
}

const RepositoryGrid: React.FC<RepositoryGridProps> = ({ repositories }) => {
  const sortedRepos = repositories
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 12);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: '#f7df1e',
      TypeScript: '#3178c6',
      Python: '#3776ab',
      Java: '#ed8b00',
      'C++': '#00599c',
      C: '#a8b9cc',
      HTML: '#e34c26',
      CSS: '#1572b6',
      Vue: '#4fc08d',
      React: '#61dafb',
      Go: '#00add8',
      Rust: '#ce422b',
      Swift: '#fa7343',
      Kotlin: '#7f52ff',
      PHP: '#777bb4',
      Ruby: '#cc342d',
      Shell: '#89e051',
      Dockerfile: '#0db7ed',
      default: '#6b7280'
    };
    
    return colors[language] || colors.default;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Repositories</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedRepos.map((repo) => (
          <div
            key={repo.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-red-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-red-600 hover:text-red-700 truncate"
              >
                {repo.name}
              </a>
              <span className="text-xs text-gray-500 ml-2">
                {repo.private ? 'Private' : 'Public'}
              </span>
            </div>
            
            {repo.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {repo.description}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {repo.language && (
                  <div className="flex items-center space-x-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getLanguageColor(repo.language) }}
                    />
                    <span>{repo.language}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>{repo.stargazers_count}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <GitFork className="w-4 h-4" />
                  <span>{repo.forks_count}</span>
                </div>
              </div>
              
              <span className="text-xs text-gray-500">
                {formatDate(repo.updated_at)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepositoryGrid;