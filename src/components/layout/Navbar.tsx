import React from 'react';
import { Eye } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center">
            <Eye className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">VisionAid AI</span>
          </Link>
          <nav className="flex space-x-4">
            <Link
              to="/"
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-primary-600'
                  : 'text-gray-500 hover:text-primary-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/color-vision"
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === '/color-vision'
                  ? 'text-primary-600'
                  : 'text-gray-500 hover:text-primary-600'
              }`}
            >
              Color Vision
            </Link>
            <Link
              to="/dyslexia"
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === '/dyslexia'
                  ? 'text-primary-600'
                  : 'text-gray-500 hover:text-primary-600'
              }`}
            >
              Dyslexia Support
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;