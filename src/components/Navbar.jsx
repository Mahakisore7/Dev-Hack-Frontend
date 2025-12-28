import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState('Citizen');
  const navigate = useNavigate();

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

  const handleLogout = () => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('username');
      }
    } catch {}
    navigate('/', { replace: true });
    setIsMenuOpen(false);
  };

  // Export username via localStorage for other components
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.currentUsername = username;
    }
  }, [username]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgb(var(--color-card-bg))]/95 backdrop-blur-sm border-b border-[rgb(var(--color-border))] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-[rgb(var(--color-text-primary))]">IncidentHub</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/user/report"
              className="px-4 py-2 text-[rgb(var(--color-text-primary))] font-medium hover:text-[rgb(var(--color-accent))] transition-colors"
            >
              REPORT
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white font-medium bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 transition-colors rounded-lg shadow-md hover:shadow-lg"
            >
              LOGOUT
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-bg-tertiary))] transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 right-4 w-48 bg-[rgb(var(--color-card-bg))] border border-[rgb(var(--color-border))] rounded-lg shadow-lg overflow-hidden">
          <Link
            to="/user/report"
            className="w-full px-4 py-3 block text-left text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-bg-tertiary))] transition-colors font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            REPORT
          </Link>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors font-medium border-t border-[rgb(var(--color-border))]"
          >
            LOGOUT
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
