import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/admin/AdminNavbar';
import AdminHomePage from '../components/admin/AdminHomePage';
import MapFullscreen from '../components/admin/MapFullscreen';
import UnverifiedIncidents from '../components/admin/UnverifiedIncidents';
import VerifiedIncidents from '../components/admin/VerifiedIncidents';
import ResolvedIncidents from '../components/admin/ResolvedIncidents';
import RejectedIncidents from '../components/admin/RejectedIncidents';
import Footer from '../components/Footer';
import { parseAdminQuery, AdminNavigation, isValidTab } from '../utils/adminRouting';

const AdminPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showFullscreenMap, setShowFullscreenMap] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Parse current state from URL
  const { tab: activeTab, mapFullscreen: isMapFullscreen } = parseAdminQuery(location.search);
  
  // Create navigation helper
  const adminNav = new AdminNavigation(navigate, location);
  
  // Validate tab and redirect if invalid
  useEffect(() => {
    // Note: ensure isValidTab in your utils handles the Capitalized strings if you validate strictly
    if (!isValidTab(activeTab)) {
      adminNav.toTab('home', { replace: true });
    }
  }, [activeTab]);
  
  // Check if map should be in fullscreen mode
  useEffect(() => {
    setShowFullscreenMap(isMapFullscreen);
  }, [isMapFullscreen]);

  const handleStatusChange = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleTabChange = (tabId) => {
    adminNav.toTab(tabId);
  };

  const handleMapFullscreen = () => {
    adminNav.toggleMapFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    adminNav.toggleMapFullscreen(false);
  };

  // 🟢 CRITICAL FIX: Match the Capitalized IDs from AdminNavbar
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <AdminHomePage 
            onTabChange={handleTabChange} 
            onMapFullscreen={handleMapFullscreen}
          />
        );
      case 'Unverified': // <--- Capitalized to match Navbar & Backend
        return <UnverifiedIncidents key={refreshKey} onStatusChange={handleStatusChange} />;
      case 'Verified':   // <--- Capitalized
        return <VerifiedIncidents key={refreshKey} onStatusChange={handleStatusChange} />;
      case 'Resolved':   // <--- Capitalized
        return <ResolvedIncidents key={refreshKey} onStatusChange={handleStatusChange} />;
      case 'Rejected':   // <--- Capitalized
        return <RejectedIncidents key={refreshKey} onStatusChange={handleStatusChange} />;
      default:
        // Fallback to home if no match found
        return (
          <AdminHomePage 
            onTabChange={handleTabChange} 
            onMapFullscreen={handleMapFullscreen}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar activeTab={activeTab} onTabChange={handleTabChange} />
      <main>
        {renderContent()}
      </main>
      {activeTab === 'home' && <Footer />} 
      
      {/* Fullscreen Map Modal */}
      {showFullscreenMap && (
        <MapFullscreen 
          onClose={handleCloseFullscreen} 
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
};

export default AdminPage;