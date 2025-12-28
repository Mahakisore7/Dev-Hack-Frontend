import axios from 'axios';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add any auth headers if needed
apiClient.interceptors.request.use(
  (config) => {
    console.log('📤 Request:', config.method.toUpperCase(), config.url, config.data);
    // Get token from localStorage
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      try {
        const parsedStorage = JSON.parse(authStorage);
        const token = parsedStorage.state?.token;
        if (token) {
          config.headers.token = token;
          console.log('🔑 Token added to request');
        }
      } catch (error) {
        console.error('Error parsing auth storage:', error);
      }
    }
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle common error responses
apiClient.interceptors.response.use(
  (response) => {
    console.log('📥 Response:', response.status, response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error.response?.status, error.response?.data || error.message);
    if (error.response?.status === 401) {
      // Token expired or unauthorized - clear storage and redirect to login
      localStorage.removeItem('auth-storage');
      console.log('Unauthorized access - redirecting to login');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;