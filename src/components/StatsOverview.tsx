import React from 'react';
import { GitBranch, Star, Eye, Code } from 'lucide-react';
import { GitHubUser, Repository } from '../services/github';

interface StatsOverviewProps {
  user: GitHubUser;
  repositories: Repository[];
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ user, repositories }) => {
  const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0);
  const totalWatchers = repositories.reduce((sum, repo) => sum + repo.watchers_count, 0);

  const stats = [
    {
      label: 'Public Repositories',
      value: user.public_repos,
      icon: GitBranch,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      label: 'Total Stars',
      value: totalStars,
      icon: Star,
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      label: 'Total Forks',
      value: totalForks,
      icon: Code,
      color: 'bg-green-50 text-green-600'
    },
    {
      label: 'Total Watchers',
      value: totalWatchers,
      icon: Eye,
      color: 'bg-red-50 text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
            </div>
            <div className={`p-3 rounded-full ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;