import React from 'react';
import { GitCommit, GitBranch, Star, GitFork } from 'lucide-react';
import { Repository } from '../services/github';

interface RecentActivityProps {
  repositories: Repository[];
  username: string;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ repositories, username }) => {
  // Get the most recently updated repositories
  const recentRepos = repositories
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 6);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const getActivityIcon = (repo: Repository) => {
    if (repo.stargazers_count > 10) return Star;
    if (repo.forks_count > 5) return GitFork;
    return GitCommit;
  };

  const getActivityColor = (repo: Repository) => {
    if (repo.stargazers_count > 10) return 'text-yellow-500';
    if (repo.forks_count > 5) return 'text-green-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
      
      <div className="space-y-4">
        {recentRepos.map((repo) => {
          const ActivityIcon = getActivityIcon(repo);
          const iconColor = getActivityColor(repo);
          
          return (
            <div key={repo.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`p-2 rounded-full bg-gray-100 ${iconColor}`}>
                <ActivityIcon className="w-4 h-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-red-600 hover:text-red-700 truncate"
                  >
                    {repo.name}
                  </a>
                  <span className="text-xs text-gray-500 ml-2">
                    {formatDate(repo.updated_at)}
                  </span>
                </div>
                
                <p className="text-xs text-gray-600 mt-1">
                  Updated repository
                  {repo.language && (
                    <span className="ml-1">
                      • <span className="font-medium">{repo.language}</span>
                    </span>
                  )}
                </p>
                
                <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitFork className="w-3 h-3" />
                    <span>{repo.forks_count}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          View all activity on GitHub →
        </a>
      </div>
    </div>
  );
};

export default RecentActivity;