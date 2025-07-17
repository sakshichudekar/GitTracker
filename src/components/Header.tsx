import React from 'react';
import { Github } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Github className="w-8 h-8 text-red-500" />
            <span className="text-xl font-bold text-gray-900">
              Git<span className="text-red-500">Track</span>
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-red-500 transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-gray-700 hover:text-red-500 transition-colors">
              Analytics
            </a>
            <a href="#" className="text-gray-700 hover:text-red-500 transition-colors">
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;