import React from 'react';
import { MapPin, Link, Building, Calendar, Users, UserPlus } from 'lucide-react';
import { GitHubUser } from '../services/github';

interface UserProfileProps {
  user: GitHubUser;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <img
          src={user.avatar_url}
          alt={user.name || user.login}
          className="w-24 h-24 rounded-full border-4 border-red-100"
        />
        
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {user.name || user.login}
              </h2>
              <p className="text-gray-600 mb-2">@{user.login}</p>
              {user.bio && (
                <p className="text-gray-700 mb-4">{user.bio}</p>
              )}
            </div>
            
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="flex items-center space-x-1 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span className="font-semibold text-gray-900">{user.followers}</span>
                </div>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center space-x-1 text-gray-600">
                  <UserPlus className="w-4 h-4" />
                  <span className="font-semibold text-gray-900">{user.following}</span>
                </div>
                <p className="text-sm text-gray-500">Following</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
            {user.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{user.location}</span>
              </div>
            )}
            
            {user.company && (
              <div className="flex items-center space-x-1">
                <Building className="w-4 h-4" />
                <span>{user.company}</span>
              </div>
            )}
            
            {user.blog && (
              <div className="flex items-center space-x-1">
                <Link className="w-4 h-4" />
                <a 
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-600"
                >
                  {user.blog}
                </a>
              </div>
            )}
            
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Joined {formatDate(user.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;