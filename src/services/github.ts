const GITHUB_API_BASE = 'https://api.github.com';

export interface GitHubUser {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  company: string;
  blog: string;
  email: string;
  hireable: boolean;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  size: number;
  private: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export const fetchGitHubUser = async (username: string): Promise<GitHubUser> => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found');
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch user data');
  }
};

export const fetchUserRepositories = async (username: string): Promise<Repository[]> => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch repositories');
  }
};