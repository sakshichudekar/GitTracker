import React, { useState, useEffect } from 'react';
import { Github, Search, Users, GitBranch, Star, Eye, Calendar, Code, Activity } from 'lucide-react';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import RepositoryGrid from './components/RepositoryGrid';
import StatsOverview from './components/StatsOverview';
import LanguageChart from './components/LanguageChart';
import RecentActivity from './components/RecentActivity';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { fetchGitHubUser, fetchUserRepositories, GitHubUser, Repository } from './services/github';

function App() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (username: string) => {
    if (!username.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const userData = await fetchGitHubUser(username);
      const reposData = await fetchUserRepositories(username);
      
      setUser(userData);
      setRepositories(reposData);
      setSearchTerm(username);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user data');
      setUser(null);
      setRepositories([]);
    } finally {
      setLoading(false);
    }
  };

  // Load default user on mount
  useEffect(() => {
    handleSearch('octocat');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Git<span className="text-red-500">Track</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover and analyze GitHub profiles with beautiful visualizations
          </p>
          
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading && <LoadingSpinner />}
        
        {error && <ErrorMessage message={error} />}
        
        {user && !loading && (
          <div className="space-y-8">
            <UserProfile user={user} />
            
            <StatsOverview user={user} repositories={repositories} />
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <RepositoryGrid repositories={repositories} />
              </div>
              
              <div className="space-y-6">
                <LanguageChart repositories={repositories} />
                <RecentActivity repositories={repositories} username={searchTerm} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;