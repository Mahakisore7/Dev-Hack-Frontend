import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserPage from './pages/UserPage';
import ReportPage from './pages/ReportPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

// 🛡️ Robust Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const rawData = localStorage.getItem("userData");
  
  // Safely parse userData
  let userData = null;
  try {
    userData = rawData ? JSON.parse(rawData) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  // 1. If not logged in, go to Login
  if (!token || !userData) {
    return <Navigate to="/" replace />;
  }

  // 2. Check Role (Synchronized with your 'citizen' role in DB)
  if (requiredRole && userData.role !== requiredRole) {
    // If they have the wrong role, send them to their correct dashboard
    // If they are admin, send to /admin. Otherwise (if they are citizen), send to /user
    const fallbackPath = userData.role === 'admin' ? '/admin' : '/user';
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};

const App = () => {
  return (
    <Routes>
      {/* 🟢 Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* 👤 Citizen Routes (Changed 'user' to 'citizen') */}
      <Route path="/user" element={
        <ProtectedRoute requiredRole="citizen">
          <UserPage />
        </ProtectedRoute>
      } />
      
      <Route path="/user/report" element={
        <ProtectedRoute requiredRole="citizen">
          <ReportPage />
        </ProtectedRoute>
      } />
      
      {/* 🛡️ Authority/Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute requiredRole="admin">
          <AdminPage />
        </ProtectedRoute>
      } />

      {/* 🔗 Admin Redirect Helpers */}
      <Route path="/admin/unverified" element={<Navigate to="/admin?tab=Unverified" replace />} />
      <Route path="/admin/verified" element={<Navigate to="/admin?tab=Verified" replace />} />
      <Route path="/admin/resolved" element={<Navigate to="/admin?tab=Resolved" replace />} />
      <Route path="/admin/rejected" element={<Navigate to="/admin?tab=Rejected" replace />} />
      
      {/* 🛑 Catch-all 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;