import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import Login from './pages/Login';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<div>Route not found</div>} />
    </Routes>
  );
};

export default App;
