import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const AdminNavbar = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (section) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">IncidentHub</h1>
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 right-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <button
            onClick={() => handleNavClick('report')}
            className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-100 transition-colors font-medium"
          >
            REPORT
          </button>
          <button
            onClick={() => handleNavClick('blogs')}
            className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-100 transition-colors font-medium border-t border-gray-200"
          >
            BLOGS
          </button>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
