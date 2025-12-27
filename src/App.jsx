import React from 'react';
import { Routes, Route } from 'react-router-dom';

import First from './pages/First.jsx';
import User from './pages/User.jsx';
import Admin from './pages/Admin.jsx';

function App() {


  return (
    <Routes>
      <Route path="/" element={<First />} />
      <Route path="/user" element={<User />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;