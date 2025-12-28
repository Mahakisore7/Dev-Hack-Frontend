import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import apiClient from '../api/axios';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      role: null,
      loading: false,
      error: null,

      // Actions
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user, 
        role: user?.role || null 
      }),

      setLoading: (loading) => set({ loading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),

      // Sign up
      signup: async (userData) => {
        try {
          set({ loading: true, error: null });
          const response = await apiClient.post('/auth/signup', userData);
          const user = response.data.user || response.data;
          set({ 
            user, 
            isAuthenticated: true, 
            role: user.role,
            loading: false 
          });
          return { success: true, user };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Signup failed';
          set({ error: errorMessage, loading: false });
          return { success: false, error: errorMessage };
        }
      },

      // Login
      login: async (credentials) => {
        try {
          set({ loading: true, error: null });
          const response = await apiClient.post('/auth/login', credentials);
          const user = response.data.user || response.data;
          set({ 
            user, 
            isAuthenticated: true, 
            role: user.role,
            loading: false 
          });
          return { success: true, user };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Login failed';
          set({ error: errorMessage, loading: false });
          return { success: false, error: errorMessage };
        }
      },

      // Logout
      logout: async () => {
        try {
          // Optional: Call backend logout endpoint if exists
          // await apiClient.post('/auth/logout');
          set({ 
            user: null, 
            isAuthenticated: false, 
            role: null,
            error: null 
          });
          return { success: true };
        } catch (error) {
          // Even if backend logout fails, clear local state
          set({ 
            user: null, 
            isAuthenticated: false, 
            role: null 
          });
          return { success: true };
        }
      },

      // Fetch current user (for page refresh)
      fetchUser: async () => {
        try {
          set({ loading: true });
          const response = await apiClient.get('/auth/me');
          const user = response.data.user || response.data;
          set({ 
            user, 
            isAuthenticated: true, 
            role: user.role,
            loading: false 
          });
          return { success: true, user };
        } catch (error) {
          set({ 
            user: null, 
            isAuthenticated: false, 
            role: null,
            loading: false 
          });
          return { success: false };
        }
      },

      // Forgot Password - Request Code
      requestPasswordReset: async (email) => {
        try {
          set({ loading: true, error: null });
          await apiClient.post('/auth/forgot-request', { email });
          set({ loading: false });
          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Failed to send reset code';
          set({ error: errorMessage, loading: false });
          return { success: false, error: errorMessage };
        }
      },

      // Forgot Password - Verify Code & Reset
      verifyAndResetPassword: async (data) => {
        try {
          set({ loading: true, error: null });
          await apiClient.post('/auth/reset-verify', data);
          set({ loading: false });
          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Password reset failed';
          set({ error: errorMessage, loading: false });
          return { success: false, error: errorMessage };
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        role: state.role,
      }), // Only persist these fields
    }
  )
);

export default useAuthStore;
