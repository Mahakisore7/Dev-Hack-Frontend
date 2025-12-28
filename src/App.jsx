import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';

// Layout
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/ErrorBoundary';

// Route Guards
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import Unauthorized from './pages/Unauthorized';

// Store
import useAuthStore from './store/authStore';

// Example Pages (create these based on your needs)
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';

function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  // Fetch user on app mount (to restore session from cookies)
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <ErrorBoundary>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Public Routes - redirect to home if already logged in */}
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <PublicRoute>
                    <ForgotPassword />
                  </PublicRoute>
                }
              />

              {/* Public Home */}
              <Route path="/" element={<Home />} />

              {/* Protected Routes - require authentication */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes - require admin role */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminPanel />
                  </AdminRoute>
                }
              />

              {/* Unauthorized Page */}
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Catch all - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  );
}

export default App;
