// Application constants

export const APP_NAME = 'Dev Hack Frontend';

// API Configuration
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    GOOGLE: '/auth/google',
    FORGOT_REQUEST: '/auth/forgot-request',
    RESET_VERIFY: '/auth/reset-verify',
    ME: '/auth/me',
  },
  
  // Add more endpoints as you build new features
  USERS: {
    LIST: '/users',
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
  },
  
  // Example endpoints for future features
  POSTS: {
    LIST: '/posts',
    CREATE: '/posts',
    UPDATE: '/posts',
    DELETE: '/posts',
  }
};

// User Roles
export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
  UNAUTHORIZED: '/unauthorized',
  
  // Add more routes as you build new features
  PROFILE: '/profile',
  SETTINGS: '/settings',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth-token',
  USER_PREFERENCES: 'user-preferences',
  THEME: 'theme',
};

// Form Validation
export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
  },
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
  },
  EMAIL: {
    MAX_LENGTH: 255,
  },
};

// UI Constants
export const THEME = {
  COLORS: {
    PRIMARY: 'indigo',
    SUCCESS: 'green',
    WARNING: 'yellow',
    ERROR: 'red',
    INFO: 'blue',
  },
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
  },
};

// Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

// Loading states
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};