import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserPage from './pages/UserPage';
import ReportPage from './pages/ReportPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Login from './pages/Login.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/user/report" element={<ReportPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;