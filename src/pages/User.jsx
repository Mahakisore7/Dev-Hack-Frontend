import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx'
import HeroPart from '../components/HeroPart.jsx';
import Blogs from '../components/Blogs.jsx';
import Footer from '../components/Footer.jsx';
import { getIncidents } from '../data/incidents.js';

const App = () => {
  const [incidents, setIncidents] = useState([]);

  const refreshIncidents = () => {
    setIncidents(getIncidents());
  };

  useEffect(() => {
    refreshIncidents();
  }, []);

  const handleNavigate = (section) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onNavigate={handleNavigate} />
      <main className="pt-16">
        <HeroPart onIncidentAdded={refreshIncidents} />
        <Blogs incidents={incidents} onRefresh={refreshIncidents} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
