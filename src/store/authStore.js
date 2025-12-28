import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import apiClient from '../api/axios';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      role: null,
      isLoading: false,
      error: null,

      // Actions
      clearError: () => set({ error: null }),

      // Set loading state
      setLoading: (loading) => set({ isLoading: loading }),

      // Set user data
      setUser: (user, token = null) =>
        set({
          user,
          token,
          isAuthenticated: !!user,
          role: user?.role || null,
        }),

      // Signup
      signup: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          console.log('🚀 Attempting signup with data:', userData);
          const response = await apiClient.post('/auth/signup', userData);
          console.log('✅ Signup response:', response.data);
          const { userData: user, token } = response.data;
          
          if (!user || !token) {
            console.error('❌ Missing user or token in response:', response.data);
            throw new Error('Invalid response from server');
          }
          
          get().setUser(user, token);
          console.log('✅ User set successfully:', user);
          return { success: true, user };
        } catch (error) {
          console.error('❌ Signup error:', error.response?.data || error.message);
          const errorMessage = error.response?.data?.message || error.message || 'Signup failed';
          set({ error: errorMessage });
          return { success: false, error: errorMessage };
        } finally {
          set({ isLoading: false });
        }
      },

      // Login
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          console.log('🔐 Attempting login with:', credentials);
          const response = await apiClient.post('/auth/login', credentials);
          console.log('✅ Login response:', response.data);
          const { userData: user, token } = response.data;
          
          if (!user || !token) {
            console.error('❌ Missing user or token in response:', response.data);
            throw new Error('Invalid response from server');
          }
          
          get().setUser(user, token);
          console.log('✅ User set successfully:', user);
          return { success: true, user };
        } catch (error) {
          console.error('❌ Login error:', error.response?.data || error.message);
          const errorMessage = error.response?.data?.message || error.message || 'Login failed';
          set({ error: errorMessage });
          return { success: false, error: errorMessage };
        } finally {
          set({ isLoading: false });
        }
      },

      // Google Auth
      googleLogin: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiClient.post('/auth/google', { token });
          const user = response.data.user;
          
          get().setUser(user);
          return { success: true, user };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Google login failed';
          set({ error: errorMessage });
          return { success: false, error: errorMessage };
        } finally {
          set({ isLoading: false });
        }
      },

      // Forgot Password - Request Code
      requestPasswordReset: async (email) => {
        set({ isLoading: true, error: null });
        try {
          await apiClient.post('/auth/forgot-request', { email });
          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Failed to send reset code';
          set({ error: errorMessage });
          return { success: false, error: errorMessage };
        } finally {
          set({ isLoading: false });
        }
      },

      // Forgot Password - Verify Code and Reset
      resetPassword: async (resetData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiClient.post('/auth/reset-verify', resetData);
          const user = response.data.user;
          
          get().setUser(user);
          return { success: true, user };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Password reset failed';
          set({ error: errorMessage });
          return { success: false, error: errorMessage };
        } finally {
          set({ isLoading: false });
        }
      },

      // Fetch current user (for app refresh)
      fetchUser: async () => {
        set({ isLoading: true });
        try {
          const response = await apiClient.get('/auth/check');
          const user = response.data.user;
          
          get().setUser(user, get().token);
          return { success: true, user };
        } catch (error) {
          // If no user or token expired, clear auth state
          get().logout(false); // Don't call API logout
          return { success: false };
        } finally {
          set({ isLoading: false });
        }
      },

      // Logout
      logout: async (callApi = true) => {
        set({ isLoading: true });
        try {
          if (callApi) {
            await apiClient.post('/auth/logout');
          }
        } catch (error) {
          console.log('Logout error:', error);
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            role: null,
            isLoading: false,
            error: null,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        role: state.role,
      }),
    }
  )
);

export default useAuthStore;
