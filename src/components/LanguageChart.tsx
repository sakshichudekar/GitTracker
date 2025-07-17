import React from 'react';
import { Repository } from '../services/github';

interface LanguageChartProps {
  repositories: Repository[];
}

const LanguageChart: React.FC<LanguageChartProps> = ({ repositories }) => {
  const languageCount = repositories.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const languages = Object.entries(languageCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  const total = languages.reduce((sum, [, count]) => sum + count, 0);

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
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Language Breakdown</h3>
      
      <div className="space-y-4">
        {languages.map(([language, count]) => {
          const percentage = (count / total) * 100;
          return (
            <div key={language} className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getLanguageColor(language) }}
                />
                <span className="text-sm font-medium text-gray-900">{language}</span>
              </div>
              
              <div className="flex items-center space-x-2 flex-1">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: getLanguageColor(language)
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">
                  {count}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageChart;