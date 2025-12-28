// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // <--- 1. Import Axios
// import { XCircle, RotateCcw } from 'lucide-react';
// import IncidentCard from './IncidentCard';

// const RejectedIncidents = ({ onStatusChange }) => {
//   const [incidents, setIncidents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🟢 1. FETCH REJECTED INCIDENTS
//   const fetchIncidents = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("https://resq-jg07.onrender.com/api/admin/feed?status=Rejected", {
//         headers: { token: token }
//       });
//       setIncidents(res.data.data);
//     } catch (error) {
//       console.error("Error fetching rejected incidents:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchIncidents();
//   }, []);

//   // 🟢 2. HANDLE MOVE BACK TO UNVERIFIED (RE-OPEN TICKET)
//   const handleMoveToUnverified = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `https://resq-jg07.onrender.com/api/admin/update-status/${id}`,
//         { status: "Unverified" }, // Matches Backend Enum
//         { headers: { token: token } }
//       );
      
//       // Refresh list (item will disappear) and notify parent
//       fetchIncidents();
//       if (onStatusChange) onStatusChange();
      
//     } catch (error) {
//       alert("Failed to update status");
//     }
//   };

//   const actions = [
//     {
//       label: 'Move to Unverified',
//       icon: RotateCcw,
//       onClick: handleMoveToUnverified,
//       className: 'bg-amber-500 hover:bg-amber-600 text-white',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center gap-3 mb-6">
//           <div className="p-3 rounded-xl bg-red-100">
//             <XCircle size={28} className="text-red-600" />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Rejected Incidents</h2>
//             <p className="text-gray-500">Incidents marked as spam or invalid</p>
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading ? (
//           <div className="text-center py-16">
//             <p className="text-gray-500">Loading rejected items...</p>
//           </div>
//         ) : (
//           /* Incidents Grid */
//           incidents.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {incidents.map((incident) => (
//                 <IncidentCard 
//                   key={incident._id} // Use MongoDB _id
//                   incident={incident} 
//                   actions={actions} 
//                   onNotesUpdate={fetchIncidents} // Refresh if note added
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
//               <XCircle size={48} className="mx-auto text-gray-300 mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No Rejected Incidents</h3>
//               <p className="text-gray-500">Clean record! No spam or invalid reports found.</p>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default RejectedIncidents;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { XCircle, RotateCcw } from 'lucide-react';
import IncidentCard from './IncidentCard';

const RejectedIncidents = ({ onStatusChange }) => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🟢 1. FETCH REJECTED INCIDENTS
  const fetchIncidents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://resq-jg07.onrender.com/api/admin/feed?status=Rejected", {
        headers: { token: token }
      });
      // Backend now sends pre-calculated upvoteCount and downvoteCount
      setIncidents(res.data.data || []);
    } catch (error) {
      console.error("Error fetching rejected incidents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  // 🟢 2. HANDLE MOVE BACK TO UNVERIFIED
  const handleMoveToUnverified = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://resq-jg07.onrender.com/api/admin/update-status/${id}`,
        { status: "Unverified" },
        { headers: { token: token } }
      );
      
      fetchIncidents();
      if (onStatusChange) onStatusChange();
      
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const actions = [
    {
      label: 'Move to Unverified',
      icon: RotateCcw,
      // 🟢 CHANGE: Ensure the ID is captured correctly from the IncidentCard
      onClick: (id) => handleMoveToUnverified(id), 
      className: 'bg-amber-500 hover:bg-amber-600 text-white',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-red-100">
            <XCircle size={28} className="text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Rejected Incidents</h2>
            <p className="text-gray-500">Incidents marked as spam or invalid</p>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Loading rejected items...</p>
          </div>
        ) : (
          /* Incidents Grid */
          incidents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {incidents.map((incident) => (
                <IncidentCard 
                  key={incident._id}
                  incident={incident} 
                  actions={actions} 
                  onNotesUpdate={fetchIncidents} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <XCircle size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Rejected Incidents</h3>
              <p className="text-gray-500">Clean record! No spam or invalid reports found.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RejectedIncidents;