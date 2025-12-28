/**
 * Utility functions for managing admin page routing and query parameters
 */

/**
 * Generate admin route with query parameters
 * @param {string} tab - The tab name (home, unverified, verified, resolved, rejected)
 * @param {Object} options - Additional options
 * @param {boolean} options.mapFullscreen - Whether to show map in fullscreen
 * @param {string} options.incidentId - Specific incident ID to highlight
 * @param {Object} options.filters - Filter options
 * @returns {string} The route path with query parameters
 */
export const generateAdminRoute = (tab = 'home', options = {}) => {
  const params = new URLSearchParams();
  
  // Only add tab param if it's not the default 'home'
  if (tab && tab !== 'home') {
    params.set('tab', tab);
  }
  
  // Add map fullscreen parameter if requested
  if (options.mapFullscreen) {
    params.set('map', 'fullscreen');
  }
  
  // Add incident ID for deep linking
  if (options.incidentId) {
    params.set('incident', options.incidentId);
  }
  
  // Add filters
  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (value) {
        params.set(`filter_${key}`, value);
      }
    });
  }
  
  const queryString = params.toString();
  return `/admin${queryString ? `?${queryString}` : ''}`;
};

/**
 * Parse query parameters from current location
 * @param {string} search - The location.search string
 * @returns {Object} Parsed parameters
 */
export const parseAdminQuery = (search) => {
  const params = new URLSearchParams(search);
  
  // Extract filters
  const filters = {};
  params.forEach((value, key) => {
    if (key.startsWith('filter_')) {
      const filterKey = key.replace('filter_', '');
      filters[filterKey] = value;
    }
  });
  
  return {
    tab: params.get('tab') || 'home',
    mapFullscreen: params.get('map') === 'fullscreen',
    incidentId: params.get('incident'),
    filters: Object.keys(filters).length > 0 ? filters : null
  };
};

/**
 * Get tab label for display
 * @param {string} tab - The tab identifier
 * @returns {string} Human readable label
 */
export const getTabLabel = (tab) => {
  const labels = {
    home: 'Dashboard',
    unverified: 'Unverified Incidents',
    verified: 'Verified Incidents', 
    resolved: 'Resolved Incidents',
    rejected: 'Rejected Incidents'
  };
  return labels[tab] || 'Dashboard';
};

/**
 * Check if a tab is valid
 * @param {string} tab - The tab to validate
 * @returns {boolean} True if tab is valid
 */
export const isValidTab = (tab) => {
  const validTabs = ['home', 'unverified', 'verified', 'resolved', 'rejected'];
  return validTabs.includes(tab);
};

/**
 * Navigation helper for admin sections
 */
export class AdminNavigation {
  constructor(navigate, location) {
    this.navigate = navigate;
    this.location = location;
  }

  /**
   * Navigate to a specific admin tab
   * @param {string} tab - The tab to navigate to
   * @param {Object} options - Navigation options
   */
  toTab(tab, options = {}) {
    const route = generateAdminRoute(tab, {
      ...options,
      mapFullscreen: options.preserveMap ? this.getCurrentState().mapFullscreen : false
    });
    this.navigate(route, { replace: options.replace || false }); // Default to push navigation
  }

  /**
   * Navigate to a specific incident
   * @param {string} incidentId - The incident ID
   * @param {string} tab - The tab containing the incident (optional)
   * @param {Object} options - Navigation options
   */
  toIncident(incidentId, tab = null, options = {}) {
    const currentTab = tab || this.getCurrentState().tab;
    const route = generateAdminRoute(currentTab, {
      incidentId,
      ...options
    });
    this.navigate(route, { replace: options.replace || false }); // Default to push navigation
  }

  /**
   * Toggle map fullscreen mode
   * @param {boolean} fullscreen - Whether to show fullscreen
   */
  toggleMapFullscreen(fullscreen = true) {
    const currentQuery = this.getCurrentState();
    const route = generateAdminRoute(currentQuery.tab, {
      mapFullscreen: fullscreen,
      incidentId: currentQuery.incidentId,
      filters: currentQuery.filters
    });
    // Use push for opening fullscreen, replace for closing to avoid cluttering history
    const shouldReplace = !fullscreen || currentQuery.mapFullscreen === fullscreen;
    this.navigate(route, { replace: shouldReplace });
  }

  /**
   * Apply filters to current view
   * @param {Object} filters - Filter object
   * @param {Object} options - Navigation options
   */
  applyFilters(filters, options = {}) {
    const currentQuery = this.getCurrentState();
    const route = generateAdminRoute(currentQuery.tab, {
      filters,
      mapFullscreen: currentQuery.mapFullscreen,
      incidentId: currentQuery.incidentId,
      ...options
    });
    this.navigate(route, { replace: options.replace !== false }); // Default to replace for filters
  }

  /**
   * Clear all query parameters except tab
   * @param {Object} options - Navigation options
   */
  clearQuery(options = {}) {
    const currentQuery = this.getCurrentState();
    const route = generateAdminRoute(currentQuery.tab);
    this.navigate(route, { replace: options.replace || true });
  }

  /**
   * Get current state from URL
   * @returns {Object} Current navigation state
   */
  getCurrentState() {
    return parseAdminQuery(this.location.search);
  }
}