import React, { useState } from 'react';
import { Menu, X, Shield, CheckCircle, XCircle, Clock, Home, LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// 🟢 FIX 1: Capitalize IDs to match Backend Statuses exactly
// (Except 'home' which is our internal Dashboard view)
const navItems = [
  { id: 'home', label: 'Home', icon: Home, color: 'text-blue-600' },
  { id: 'Unverified', label: 'Unverified', icon: Clock, color: 'text-amber-600' },
  { id: 'Verified', label: 'Verified', icon: CheckCircle, color: 'text-green-600' },
  { id: 'Resolved', label: 'Resolved', icon: Shield, color: 'text-blue-600' },
  { id: 'Rejected', label: 'Rejected', icon: XCircle, color: 'text-red-600' },
];

const AdminNavbar = ({ activeTab, onTabChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (tabId) => {
    onTabChange(tabId);
    setIsMenuOpen(false);
  };

  // Get current query parameters for display
  const searchParams = new URLSearchParams(location.search);
  const isMapFullscreen = searchParams.get('map') === 'fullscreen';
  const currentIncident = searchParams.get('incident');
  
  // Generate breadcrumb for current location
  const getBreadcrumb = () => {
    const parts = [];
    
    if (activeTab !== 'home') {
      const tabLabel = navItems.find(item => item.id === activeTab)?.label || activeTab;
      parts.push(tabLabel);
    }
    
    if (isMapFullscreen) {
      parts.push('Map View');
    }
    
    if (currentIncident) {
      parts.push(`Incident #${currentIncident}`);
    }
    
    return parts.length > 0 ? parts.join(' › ') : 'Dashboard';
  };

  const handleLogout = () => {
    // 🟢 FIX 2: Clear Token and User Data on Logout
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    
    navigate('/'); // Redirect to Landing Page/Login
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo and Breadcrumb */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('home')}>
            <Shield className="w-8 h-8 text-blue-500" />
            <div>
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              {(activeTab !== 'home' || isMapFullscreen || currentIncident) && (
                <p className="text-xs text-slate-300">{getBreadcrumb()}</p>
              )}
            </div>
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
            
            {/* Divider */}
            <div className="h-6 w-px bg-slate-700 mx-2"></div>

            <Link
              to="/user"
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            >
              <Home size={18} />
              <span>User View</span>
            </Link>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-red-400 hover:bg-slate-800 hover:text-red-500 transition-all ml-2"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
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
            
            {/* Logout Button for Mobile */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-400 hover:bg-slate-700 hover:text-red-500 transition-all border-t border-slate-600 mt-2 pt-4"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;