// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // <--- 1. Import Axios
// import { Shield } from 'lucide-react';
// import IncidentCard from './IncidentCard';

// const ResolvedIncidents = ({ onStatusChange }) => {
//   const [incidents, setIncidents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🟢 1. FETCH RESOLVED INCIDENTS FROM BACKEND
//   const fetchIncidents = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("https://resq-jg07.onrender.com/api/admin/feed?status=Resolved", {
//         headers: { token: token }
//       });
//       setIncidents(res.data.data);
//     } catch (error) {
//       console.error("Error fetching resolved incidents:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchIncidents();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center gap-3 mb-6">
//           <div className="p-3 rounded-xl bg-green-100"> {/* Changed to Green for Resolved */}
//             <Shield size={28} className="text-green-600" />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Resolved Incidents</h2>
//             <p className="text-gray-500">Successfully resolved and closed cases</p>
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading ? (
//           <div className="text-center py-16">
//             <p className="text-gray-500">Loading resolved archive...</p>
//           </div>
//         ) : (
//           /* Incidents Grid */
//           incidents.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {incidents.map((incident) => (
//                 <IncidentCard 
//                   key={incident._id} // Use MongoDB _id
//                   incident={incident} 
//                   // No specific actions needed for Resolved, but we allow note updates
//                   onNotesUpdate={fetchIncidents} 
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
//               <Shield size={48} className="mx-auto text-gray-300 mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No Resolved Incidents</h3>
//               <p className="text-gray-500">No cases have been closed yet.</p>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResolvedIncidents;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Shield } from 'lucide-react';
import IncidentCard from './IncidentCard';

const ResolvedIncidents = ({ onStatusChange }) => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🟢 1. FETCH RESOLVED INCIDENTS FROM BACKEND
  const fetchIncidents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://resq-jg07.onrender.com/api/admin/feed?status=Resolved", {
        headers: { token: token }
      });
      // The backend res.data.data already contains upvoteCount and downvoteCount
      setIncidents(res.data.data || []);
    } catch (error) {
      console.error("Error fetching resolved incidents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-green-100">
            <Shield size={28} className="text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Resolved Incidents</h2>
            <p className="text-gray-500">Successfully resolved and closed cases</p>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Loading resolved archive...</p>
          </div>
        ) : (
          /* Incidents Grid */
          incidents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {incidents.map((incident) => (
                <IncidentCard 
                  key={incident._id}
                  incident={incident} 
                  // 🟢 CHANGE: Pass an empty array so no action buttons show for resolved cases
                  actions={[]} 
                  onNotesUpdate={fetchIncidents} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <Shield size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Resolved Incidents</h3>
              <p className="text-gray-500">No cases have been closed yet.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ResolvedIncidents;