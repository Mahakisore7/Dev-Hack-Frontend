import React, { useState } from 'react';
import { Menu, X, Shield, CheckCircle, XCircle, Clock, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  { id: 'unverified', label: 'Unverified', icon: Clock, color: 'text-amber-600' },
  { id: 'verified', label: 'Verified', icon: CheckCircle, color: 'text-green-600' },
  { id: 'resolved', label: 'Resolved', icon: Shield, color: 'text-blue-600' },
  { id: 'rejected', label: 'Rejected', icon: XCircle, color: 'text-red-600' },
];

const AdminNavbar = ({ activeTab, onTabChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (tabId) => {
    onTabChange(tabId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-500" />
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon size={18} className={isActive ? item.color : ''} />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <Link
              to="/user"
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all ml-2"
            >
              <Home size={18} />
              <span>User View</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon size={20} className={isActive ? item.color : ''} />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <Link
              to="/user"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-all border-t border-slate-600 mt-2 pt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={20} />
              <span>User View</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
