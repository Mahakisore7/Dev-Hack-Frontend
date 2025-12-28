import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import UserPage from './pages/UserPage';
import ReportPage from './pages/ReportPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Login from './pages/Login.jsx';

const App = () => {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/user/report" element={<ReportPage />} />
        
        {/* Admin routes with query parameter support */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/home" element={<Navigate to="/admin" replace />} />
        <Route path="/admin/unverified" element={<Navigate to="/admin?tab=unverified" replace />} />
        <Route path="/admin/verified" element={<Navigate to="/admin?tab=verified" replace />} />
        <Route path="/admin/resolved" element={<Navigate to="/admin?tab=resolved" replace />} />
        <Route path="/admin/rejected" element={<Navigate to="/admin?tab=rejected" replace />} />
        <Route path="/admin/map" element={<Navigate to="/admin?map=fullscreen" replace />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;