import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import HeroPart from '../components/HeroPart';
import Blogs from '../components/Blogs';
import Footer from '../components/Footer';

const UserPage = () => {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshIncidents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); 
      
      const res = await axios.get("https://resq-jg07.onrender.com/api/incidents", {
        headers: { token: token } 
      });

      // 🟢 CHANGE: Ensure we are accessing res.data.data and default to []
      const incidentData = res.data.data || res.data || [];
      setIncidents(Array.isArray(incidentData) ? incidentData : []); 
      
    } catch (error) {
      console.error("Error fetching incidents:", error);
      setIncidents([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshIncidents();
  }, []);

  const handleNavigate = (section) => {
    if (section === 'report') {
      return navigate('/user/report');
    }
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar onNavigate={handleNavigate} />
      
      <main className="pt-16">
        <HeroPart onIncidentAdded={refreshIncidents} />

        <div id="feed" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              <p className="mt-4 text-gray-500 font-medium">Loading incidents...</p>
            </div>
          ) : (
            /* 🟢 Pass incidents only after loading is complete */
            <Blogs incidents={incidents} onRefresh={refreshIncidents} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserPage;