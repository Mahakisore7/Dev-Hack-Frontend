import { useLocation, useNavigate } from 'react-router-dom';
import { parseAdminQuery, AdminNavigation } from '../utils/adminRouting';

/**
 * Custom hook for admin page navigation
 * @returns {Object} Navigation utilities and current state
 */
export const useAdminNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse current state
  const currentState = parseAdminQuery(location.search);
  
  // Create navigation helper
  const adminNav = new AdminNavigation(navigate, location);
  
  return {
    // Current state
    activeTab: currentState.tab,
    isMapFullscreen: currentState.mapFullscreen,
    
    // Navigation functions - default to push navigation for better back button behavior
    navigateToTab: (tab, options = {}) => adminNav.toTab(tab, options),
    toggleMapFullscreen: (fullscreen = true) => adminNav.toggleMapFullscreen(fullscreen),
    
    // Utilities
    currentState,
    location,
    navigate
  };
};