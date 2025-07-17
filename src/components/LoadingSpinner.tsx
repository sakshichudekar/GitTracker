import React from 'react';
import { Github } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="animate-spin mb-4">
        <Github className="w-8 h-8 text-red-500" />
      </div>
      <p className="text-gray-600">Loading GitHub data...</p>
    </div>
  );
};

export default LoadingSpinner;