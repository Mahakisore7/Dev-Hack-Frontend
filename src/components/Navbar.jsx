import React, { useState, useEffect } from 'react';
import { Menu, X, User, Home, AlertTriangle, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState('Citizen');
  const navigate = useNavigate();

  useEffect(() => {
    // 🟢 FETCH USERNAME FROM LOCAL STORAGE
    // Recall: In Login, we saved: localStorage.setItem("userData", JSON.stringify(user));
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        if (parsed.username) {
          setUsername(parsed.username);
        }
      } catch (e) {
        console.error("Error parsing user data");
      }
    }
  }, []);

  const handleLogout = () => {
    // 🔴 CLEAR EVERYTHING ON LOGOUT
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    
    navigate('/', { replace: true }); // Go back to Login
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/user')}>
            <AlertTriangle className="text-red-600 h-8 w-8" />
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">IncidentHub</h1>
          </div>
          
          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6">
            <span className="text-gray-500 text-sm font-medium flex items-center gap-2">
                <User size={16} /> Hello, {username}
            </span>

            <Link
              to="/user"
              className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors flex items-center gap-2"
            >
              <Home size={18} /> HOME
            </Link>

            {/* <Link
              to="/user/report"
              className="px-4 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors rounded-lg flex items-center gap-2"
            >
              <AlertTriangle size={18} /> REPORT
            </Link> */}

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-red-600 font-medium hover:bg-red-50 transition-colors rounded-lg flex items-center gap-2 border border-red-100"
            >
              <LogOut size={18} /> LOGOUT
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center gap-3">
             <span className="text-sm font-semibold text-gray-700 mr-2">{username}</span>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-xl p-4 flex flex-col gap-2">
           <Link
            to="/user"
            className="w-full px-4 py-3 flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            <Home size={20} /> HOME
          </Link>
          
          {/* <Link
            to="/user/report"
            className="w-full px-4 py-3 flex items-center gap-3 bg-gray-900 text-white hover:bg-gray-800 rounded-lg font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            <AlertTriangle size={20} /> REPORT INCIDENT
          </Link> */}

          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 rounded-lg font-medium"
          >
            <LogOut size={20} /> LOGOUT
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;