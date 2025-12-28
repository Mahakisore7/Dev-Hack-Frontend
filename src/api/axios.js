import axios from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true, // Enable sending HttpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (optional - for adding tokens, logging, etc.)
apiClient.interceptors.request.use(
  (config) => {
    // You can add custom headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional - for handling errors globally)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors globally
    if (error.response?.status === 401) {
      // Unauthorized - could trigger logout
      console.error('Unauthorized access - please login again');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
