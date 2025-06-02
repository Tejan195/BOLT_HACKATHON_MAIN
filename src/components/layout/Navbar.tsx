import React, { useState, useEffect } from 'react';
import { Eye, Menu, X, User, ChevronDown, Download } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAuthStore();

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    navigate(path);

    if (path.includes('#')) {
      setTimeout(() => {
        const element = document.getElementById(path.split('#')[1]);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const scrollToExtension = () => {
    const extensionSection = document.querySelector('#browser-extension');
    if (extensionSection) {
      extensionSection.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      navigate('/', { state: { scrollToExtension: true } });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (location.state?.scrollToExtension) {
      setTimeout(() => {
        const extensionSection = document.querySelector('#browser-extension');
        if (extensionSection) {
          extensionSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const mainLinks = [
    { path: '/', label: 'Home' },
    { path: '/#about', label: 'About' },
  ];

  const featureLinks = [
    { path: '/color-vision', label: 'Color Vision' },
    { path: '/dyslexia', label: 'Dyslexia Support' },
    { path: '/exercise', label: 'Vision Exercises' },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center group" onClick={() => setIsMenuOpen(false)}>
            <Eye className="h-8 w-8 text-primary-400 transition-transform duration-300 group-hover:scale-110" />
            <span className="ml-2 text-xl font-bold text-white transition-colors duration-300">
              VisionAid
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {/* Desktop navigation */}
            <nav className="hidden md:flex md:space-x-4">
              {mainLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`nav-link rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'text-primary-400 bg-white/5'
                      : 'text-gray-300 hover:text-primary-400 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              
              {/* Features Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  className="nav-link rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-primary-400 hover:bg-white/5 flex items-center"
                >
                  Features
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-500 ease-in-out ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div
                  className={`absolute top-full left-0 mt-1 w-48 rounded-md bg-black/90 backdrop-blur-xl border border-white/10 shadow-lg overflow-hidden transition-all duration-500 ease-in-out transform origin-top ${
                    isDropdownOpen 
                      ? 'opacity-100 scale-y-100 translate-y-0' 
                      : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
                  }`}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  {featureLinks.map((link) => (
                    <button
                      key={link.path}
                      onClick={() => handleNavClick(link.path)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-primary-400 hover:bg-white/5 transition-colors duration-200"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            </nav>

            {/* Download Button */}
            <button
              onClick={scrollToExtension}
              className="hidden md:flex items-center space-x-2 rounded-full bg-white/5 px-4 py-2 text-primary-400 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <Download className="h-5 w-5" />
              <span className="text-sm font-medium">Download</span>
            </button>

            {/* Account button */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => navigate('/account')}
                  className="flex items-center space-x-2 rounded-full bg-white/5 p-2 text-primary-400 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden rounded-md p-2 text-gray-300 hover:bg-white/5 hover:text-primary-400 transition-all duration-300"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <div className="relative w-6 h-6">
                <div className={`absolute inset-0 transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'rotate-180' : ''}`}>
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        <div
          className={`md:hidden fixed inset-x-0 bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-500 ease-in-out transform ${
            isMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
          style={{
            top: '64px',
            transformOrigin: 'top',
          }}
        >
          <nav className="flex flex-col p-4 space-y-1">
            {mainLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`nav-link text-left rounded-md px-3 py-2 text-sm font-medium transition-transform duration-500 ease-in-out ${
                  location.pathname === link.path
                    ? 'text-primary-400 bg-white/5 translate-x-2'
                    : 'text-gray-300 hover:text-primary-400 hover:bg-white/5 hover:translate-x-2'
                }`}
              >
                {link.label}
              </button>
            ))}
            {featureLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`nav-link text-left rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 transform ${
                  location.pathname === link.path
                    ? 'text-primary-400 bg-white/5 translate-x-2'
                    : 'text-gray-300 hover:text-primary-400 hover:bg-white/5 hover:translate-x-2'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={scrollToExtension}
              className="nav-link text-left rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-primary-400 hover:bg-white/5 flex items-center transition-all duration-300 transform hover:translate-x-2"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Extension
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;