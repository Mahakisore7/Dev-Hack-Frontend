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
    if (!isValidTab(activeTab)) {
      adminNav.toTab('home', { replace: true }); // Only use replace for error corrections
    }
  }, [activeTab]);
  
  // Check if map should be in fullscreen mode
  useEffect(() => {
    setShowFullscreenMap(isMapFullscreen);
  }, [isMapFullscreen]);

  const handleStatusChange = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Update URL when tab changes - use push navigation for history
  const handleTabChange = (tabId) => {
    adminNav.toTab(tabId); // Remove replace: true to allow back button
  };

  const handleMapFullscreen = () => {
    adminNav.toggleMapFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    adminNav.toggleMapFullscreen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <AdminHomePage 
            onTabChange={handleTabChange} 
            onMapFullscreen={handleMapFullscreen}
          />
        );
      case 'unverified':
        return <UnverifiedIncidents key={refreshKey} onStatusChange={handleStatusChange} />;
      case 'verified':
        return <VerifiedIncidents key={refreshKey} onStatusChange={handleStatusChange} />;
      case 'resolved':
        return <ResolvedIncidents key={refreshKey} onStatusChange={handleStatusChange} />;
      case 'rejected':
        return <RejectedIncidents key={refreshKey} onStatusChange={handleStatusChange} />;
      default:
        return (
          <AdminHomePage 
            onTabChange={handleTabChange} 
            onMapFullscreen={handleMapFullscreen}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--color-bg-secondary))]">
      <AdminNavbar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className={activeTab === 'home' ? '' : ''}>
        {renderContent()}
      </main>
      {activeTab !== 'home' && <Footer />}
      
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
