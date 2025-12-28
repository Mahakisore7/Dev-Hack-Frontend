import React, { useState, useEffect } from 'react';
import axios from 'axios'; // <--- 1. Import Axios
import { CheckCircle, Shield } from 'lucide-react';
import IncidentCard from './IncidentCard';

const VerifiedIncidents = ({ onStatusChange }) => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🟢 1. FETCH VERIFIED INCIDENTS
  const fetchIncidents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://resq-jg07.onrender.com/api/admin/feed?status=Verified", {
        headers: { token: token }
      });
      setIncidents(res.data.data);
    } catch (error) {
      console.error("Error fetching verified incidents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  // 🟢 2. HANDLE RESOLVE (Mark as Resolved)
  const handleResolve = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://resq-jg07.onrender.com/api/admin/update-status/${id}`,
        { status: 'Resolved' }, // Matches Backend Enum
        { headers: { token: token } }
      );  
      
      // Refresh list (item will disappear)
      fetchIncidents();
      // Notify parent to update dashboard stats
      if (onStatusChange) onStatusChange();

    } catch (error) {
      alert("Failed to resolve incident");
      console.error(error);
    }
  };
  // 🟢 Update the actions array like this:
  const actions = [
    {
      label: 'Mark as Resolved',
      icon: Shield,
      // Change this line to ensure the ID is passed correctly
      onClick: (id) => handleResolve(id), 
      className: 'bg-blue-500 hover:bg-blue-600 text-white',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-green-100">
            <CheckCircle size={28} className="text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Verified Incidents</h2>
            <p className="text-gray-500">Confirmed incidents awaiting resolution</p>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Loading active incidents...</p>
          </div>
        ) : (
          /* Incidents Grid */
          incidents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {incidents.map((incident) => (
                <IncidentCard 
                  key={incident._id} // Use MongoDB _id
                  incident={incident} 
                  actions={actions} 
                  onNotesUpdate={fetchIncidents} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <CheckCircle size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Verified Incidents</h3>
              <p className="text-gray-500">Good news! No active emergencies at the moment.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default VerifiedIncidents;