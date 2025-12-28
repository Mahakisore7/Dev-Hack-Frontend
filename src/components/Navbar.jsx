import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState('Citizen');

  const navi = useNavigate();

  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? window.localStorage.getItem('username') : null;
      if (stored && stored.trim().length > 0) {
        setUsername(stored);
      }
      // Optional: react to changes from other tabs/windows
      const handler = (e) => {
        if (e.key === 'username') {
          setUsername(e.newValue || 'Citizen');
        }
      };
      window.addEventListener('storage', handler);
      return () => window.removeEventListener('storage', handler);
    } catch {}
  }, []);

  const handleNavClick = (section) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  // Export username via localStorage for other components
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.currentUsername = username;
    }
  }, [username]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">IncidentHub</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => handleNavClick('report')}
                className="px-4 py-2 text-gray-900 font-medium hover:text-blue-600 transition-colors"
              >
                REPORT
              </button>
            <button
              onClick={() => navi('/')}
              className="px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-700 transition-colors rounded-lg"
            >
              LOGOUT
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 right-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <button
            onClick={() => handleNavClick('report')}
            className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-100 transition-colors font-medium"
          >
            REPORT
          </button>
          <button
            onClick={() => navi('/')}
            className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors font-medium border-t border-gray-200"
          >
            LOGOUT
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;