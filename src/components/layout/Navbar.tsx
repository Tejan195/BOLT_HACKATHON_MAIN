import React from 'react';
import { Eye } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Eye className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">VisionAid AI</span>
          </div>
          <nav className="flex space-x-4">
            <a
              href="#"
              className="text-gray-500 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Features
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;