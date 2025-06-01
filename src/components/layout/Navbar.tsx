import React, { useState, useEffect } from 'react';
import { Eye, Menu, X, User, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const handleNavClick = (path: string) => {
    if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path === '/#about') {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const mainLinks = [
    { path: '/', label: 'Home' },
    { path: '/#about', label: 'About' },
  ];

  const featureLinks = [
    { path: '/color-vision', label: 'Color Vision' },
    { path: '/dyslexia', label: 'Dyslexia Support' },
    { path: '/low-vision', label: 'Low Vision' },
    { path: '/refractive', label: 'Refractive Support' },
    { path: '/exercise', label: 'Vision Exercises' },
  ];

  const NavLink = ({ path, label }: { path: string; label: string }) => (
    <button
      onClick={() => handleNavClick(path)}
      className={`nav-link rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ${
        location.pathname === path
          ? 'text-primary-400 bg-white/5'
          : 'text-gray-300 hover:text-primary-400 hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  );

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center group">
            <Eye className="h-8 w-8 text-primary-400 transition-transform duration-300 group-hover:scale-110" />
            <span className="ml-2 text-xl font-bold text-white transition-colors duration-300">
              VisionAid
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {/* Desktop navigation */}
            <nav className="hidden md:flex md:space-x-4">
              {mainLinks.map((link) => (
                <NavLink key={link.path} {...link} />
              ))}
              
              {/* Features Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  className="nav-link rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-primary-400 hover:bg-white/5 flex items-center"
                >
                  Features
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div
                    onMouseLeave={() => setIsDropdownOpen(false)}
                    className="absolute top-full left-0 mt-1 w-48 rounded-md bg-black/90 backdrop-blur-xl border border-white/10 shadow-lg py-2"
                  >
                    {featureLinks.map((link) => (
                      <button
                        key={link.path}
                        onClick={() => handleNavClick(link.path)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-primary-400 hover:bg-white/5"
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Account button */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => navigate('/account')}
                  className="flex items-center space-x-2 rounded-full bg-white/5 p-2 text-primary-400 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="h-8 w-8 rounded-full ring-2 ring-primary-400"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </button>
              ) : (
                <button
                  onClick={() => navigate('/auth')}
                  className="group relative rounded-full px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-primary-600 transition-transform duration-300 group-hover:scale-105"></div>
                  <span className="relative">Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden rounded-md p-2 text-gray-300 hover:bg-white/5 hover:text-primary-400"
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
              ? 'max-h-96 opacity-100 visible'
              : 'max-h-0 opacity-0 invisible'
          }`}
        >
          <nav className="flex flex-col space-y-1 pb-3">
            {mainLinks.map((link) => (
              <NavLink key={link.path} {...link} />
            ))}
            {featureLinks.map((link) => (
              <NavLink key={link.path} {...link} />
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;