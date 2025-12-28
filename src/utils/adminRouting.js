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
/**
 * Utility functions for managing admin page routing and query parameters
 * Updated to match Backend Status Enums (Capitalized)
 */

/**
 * Generate admin route with query parameters
 */
export const generateAdminRoute = (tab = 'home', options = {}) => {
  const params = new URLSearchParams();
  
  // 🟢 CHANGE: Match capitalized tab names
  if (tab && tab !== 'home') {
    params.set('tab', tab);
  }
  
  if (options.mapFullscreen) {
    params.set('map', 'fullscreen');
  }
  
  if (options.incidentId) {
    params.set('incident', options.incidentId);
  }
  
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
 */
export const parseAdminQuery = (search) => {
  const params = new URLSearchParams(search);
  
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
 * 🟢 CHANGE: Keys updated to match Backend strings
 */
export const getTabLabel = (tab) => {
  const labels = {
    home: 'Dashboard',
    Unverified: 'Unverified Incidents',
    Verified: 'Verified Incidents', 
    Resolved: 'Resolved Incidents',
    Rejected: 'Rejected Incidents'
  };
  return labels[tab] || 'Dashboard';
};

/**
 * Check if a tab is valid
 * 🟢 CHANGE: Valid tabs now match Backend capitalization
 */
export const isValidTab = (tab) => {
  const validTabs = ['home', 'Unverified', 'Verified', 'Resolved', 'Rejected'];
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

  toTab(tab, options = {}) {
    const route = generateAdminRoute(tab, {
      ...options,
      mapFullscreen: options.preserveMap ? this.getCurrentState().mapFullscreen : false
    });
    this.navigate(route, { replace: options.replace || false });
  }

  toIncident(incidentId, tab = null, options = {}) {
    const currentTab = tab || this.getCurrentState().tab;
    const route = generateAdminRoute(currentTab, {
      incidentId,
      ...options
    });
    this.navigate(route, { replace: options.replace || false });
  }

  toggleMapFullscreen(fullscreen = true) {
    const currentQuery = this.getCurrentState();
    const route = generateAdminRoute(currentQuery.tab, {
      mapFullscreen: fullscreen,
      incidentId: currentQuery.incidentId,
      filters: currentQuery.filters
    });
    const shouldReplace = !fullscreen || currentQuery.mapFullscreen === fullscreen;
    this.navigate(route, { replace: shouldReplace });
  }

  applyFilters(filters, options = {}) {
    const currentQuery = this.getCurrentState();
    const route = generateAdminRoute(currentQuery.tab, {
      filters,
      mapFullscreen: currentQuery.mapFullscreen,
      incidentId: currentQuery.incidentId,
      ...options
    });
    this.navigate(route, { replace: options.replace !== false });
  }

  clearQuery(options = {}) {
    const currentQuery = this.getCurrentState();
    const route = generateAdminRoute(currentQuery.tab);
    this.navigate(route, { replace: options.replace || true });
  }

  getCurrentState() {
    return parseAdminQuery(this.location.search);
  }
}