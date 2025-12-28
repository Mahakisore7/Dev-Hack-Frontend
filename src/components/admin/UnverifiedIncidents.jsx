import React, { useState, useEffect } from 'react';
import axios from 'axios'; // <--- 1. Import Axios
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import IncidentCard from './IncidentCard';

const UnverifiedIncidents = ({ onStatusChange }) => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🟢 1. FETCH UNVERIFIED INCIDENTS
  const fetchIncidents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/feed?status=Unverified", {
        headers: { token: token }
      });
      setIncidents(res.data.data);
    } catch (error) {
      console.error("Error fetching unverified incidents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  // 🟢 2. HANDLE ACTIONS (Verify / Reject)
  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/update-status/${id}`,
        { status: newStatus },
        { headers: { token: token } }
      );
      
      // Refresh list (item will disappear from this list)
      fetchIncidents();
      // Notify parent (AdminDashboard) to update stats
      if (onStatusChange) onStatusChange();

    } catch (error) {
      alert(`Failed to update status to ${newStatus}`);
      console.error(error);
    }
  };

  const actions = [
    {
      label: 'Verify',
      icon: CheckCircle,
      onClick: (id) => updateStatus(id, 'Verified'), // Matches Backend Enum
      className: 'bg-green-500 hover:bg-green-600 text-white',
    },
    {
      label: 'Reject',
      icon: XCircle,
      onClick: (id) => updateStatus(id, 'Rejected'), // Matches Backend Enum
      className: 'bg-red-500 hover:bg-red-600 text-white',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-amber-100">
            <Clock size={28} className="text-amber-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Unverified Incidents</h2>
            <p className="text-gray-500">Review pending reports from the community</p>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Loading pending reports...</p>
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
              <Clock size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Unverified Incidents</h3>
              <p className="text-gray-500">All caught up! No pending reports.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UnverifiedIncidents;