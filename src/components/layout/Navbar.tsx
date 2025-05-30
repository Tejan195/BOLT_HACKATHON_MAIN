import React, { useState } from 'react';
import { Eye, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/color-vision', label: 'Color Vision' },
    { path: '/dyslexia', label: 'Dyslexia Support' },
  ];

  const NavLink = ({ path, label }: { path: string; label: string }) => (
    <Link
      to={path}
      onClick={() => setIsMenuOpen(false)}
      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        location.pathname === path
          ? 'text-primary-600 bg-primary-50 md:bg-transparent'
          : 'text-gray-500 hover:text-primary-600 hover:bg-primary-50 md:hover:bg-transparent'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center">
            <Eye className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">VisionAid AI</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:space-x-4">
            {navLinks.map((link) => (
              <NavLink key={link.path} {...link} />
            ))}
          </nav>
        </div>

        {/* Mobile navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? 'max-h-48 opacity-100 visible'
              : 'max-h-0 opacity-0 invisible'
          }`}
        >
          <nav className="flex flex-col space-y-1 pb-3">
            {navLinks.map((link) => (
              <NavLink key={link.path} {...link} />
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;