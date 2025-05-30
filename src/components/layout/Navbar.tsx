import React, { useState } from 'react';
import { Eye, Menu, X, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthStore();

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

          <div className="flex items-center">
            {/* Desktop navigation */}
            <nav className="hidden md:flex md:space-x-4">
              {navLinks.map((link) => (
                <NavLink key={link.path} {...link} />
              ))}
            </nav>

            {/* Account button */}
            <div className="ml-4">
              {user ? (
                <button
                  onClick={() => navigate('/account')}
                  className="flex items-center space-x-2 rounded-full bg-primary-50 p-2 text-primary-600 hover:bg-primary-100"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </button>
              ) : (
                <button
                  onClick={() => navigate('/auth')}
                  className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="ml-4 md:hidden rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
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