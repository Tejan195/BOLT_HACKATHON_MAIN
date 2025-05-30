import React, { useState, useEffect } from 'react';
import { Eye, Menu, X, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      className={`nav-link rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ${
        location.pathname === path
          ? 'text-primary-600 bg-primary-50/50 md:bg-transparent'
          : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50/50 md:hover:bg-transparent'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center group">
            <Eye className="h-8 w-8 text-primary-600 transition-transform duration-300 group-hover:scale-110" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 text-gradient animate-text-gradient">
              VisionAid AI
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {/* Desktop navigation */}
            <nav className="hidden md:flex md:space-x-4">
              {navLinks.map((link) => (
                <NavLink key={link.path} {...link} />
              ))}
            </nav>

            {/* Account button */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => navigate('/account')}
                  className="flex items-center space-x-2 rounded-full bg-primary-50/50 p-2 text-primary-600 hover:bg-primary-100 transition-all duration-300 hover:scale-105 focus-ring"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="h-8 w-8 rounded-full ring-2 ring-white"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </button>
              ) : (
                <button
                  onClick={() => navigate('/auth')}
                  className="btn-hover-effect rounded-full bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-all duration-300 focus-ring"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-600 focus-ring"
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