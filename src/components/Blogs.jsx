// import React from 'react';
// import { ThumbsUp, ThumbsDown, Flame, Stethoscope, Car, Shield, Clock, MapPin, AlertCircle } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const iconMap = {
//   'Fire': { icon: Flame, bg: 'bg-orange-500/20', text: 'text-orange-500' },
//   'Medical': { icon: Stethoscope, bg: 'bg-red-500/20', text: 'text-red-500' },
//   'Accident': { icon: Car, bg: 'bg-yellow-500/20', text: 'text-yellow-500' },
//   'Public Safety': { icon: Shield, bg: 'bg-blue-500/20', text: 'text-blue-500' }
// };

// const formatTime = (timestamp) => {
//   if (!timestamp) return 'Just now';
//   const date = new Date(timestamp);
//   return date.toLocaleString('en-US', {
//     month: 'short', day: 'numeric',
//     hour: '2-digit', minute: '2-digit'
//   });
// };

// // 🟢 Corrected Component Props: Ensure onDownvote is received here
// const IncidentCard = ({ incident, onVote, onDownvote }) => {
//   const typeKey = Object.keys(iconMap).find(k => k.toLowerCase() === incident.type?.toLowerCase()) || 'Public Safety';
//   const typeConfig = iconMap[typeKey];
//   const Icon = typeConfig.icon;

//   return (
//     <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow">
//       <div className="flex items-start justify-between mb-4">
//         <div className={`p-3 rounded-xl ${typeConfig.bg}`}>
//           <Icon size={24} className={typeConfig.text} />
//         </div>
//         <div className="flex flex-col items-end gap-1">
//           <span className="text-xs font-medium uppercase tracking-wide px-3 py-1 rounded-full bg-gray-100 text-gray-500">
//             {incident.type}
//           </span>
//           <span className={`text-xs font-bold px-2 py-1 rounded ${
//              incident.severity === 'High' ? 'text-red-600 bg-red-100' : 
//              incident.severity === 'Medium' ? 'text-yellow-600 bg-yellow-100' : 
//              'text-green-600 bg-green-100'
//           }`}>
//             {incident.severity || 'Low'} Priority
//           </span>
//         </div>
//       </div>

//       <p className="text-gray-900 mb-4 line-clamp-3 font-medium">{incident.description}</p>

//       {incident.mediaUrl && (
//         <div className="mb-4">
//           <img src={incident.mediaUrl} alt="Incident" className="w-full h-48 object-cover rounded-xl" />
//         </div>
//       )}

//       <div className="space-y-2 mb-4">
//         <div className="flex items-center gap-2 text-sm text-gray-500">
//           <MapPin size={14} />
//           <span className="truncate">{incident.location?.address || "Unknown Location"}</span>
//         </div>
//         <div className="flex items-center gap-2 text-sm text-gray-500">
//           <Clock size={14} />
//           <span>{formatTime(incident.createdAt)}</span>
//         </div>
//       </div>

//       <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
//         {/* Upvote Button */}
//         <button
//           onClick={() => onVote(incident._id)}
//           className="flex flex-1 items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors justify-center font-bold"
//         >
//           <ThumbsUp size={18} />
//           <span>{incident.upvotes?.length || 0} Verify</span>
//         </button>

//         {/* Downvote Button */}
//         <button
//           onClick={() => onDownvote(incident._id)}
//           className="flex flex-1 items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors justify-center font-bold"
//         >
//           <ThumbsDown size={18} />
//           <span>{incident.downvotes?.length || 0} Reject</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// const Blogs = ({ incidents = [], onRefresh }) => {
  
//   const handleVote = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return alert("Please login to verify incidents!");

//       await axios.post(
//         `http://localhost:5000/api/incidents/${id}/upvote`,
//         {}, 
//         { headers: { token: token } }
//       );
//       onRefresh();
//     } catch (error) {
//       alert(error.response?.data?.message || "Error voting");
//     }
//   };

//   const handleDownvote = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return alert("Please login to reject incidents!");

//       await axios.post(
//         `http://localhost:5000/api/incidents/${id}/downvote`,
//         {}, 
//         { headers: { token: token } }
//       );
//       onRefresh();
//     } catch (error) {
//       alert(error.response?.data?.message || "Error rejecting incident");
//     }
//   };

//   const safeIncidents = Array.isArray(incidents) ? incidents : [];
  
//   // Filter incidents. Note: We keep "Rejected" in data but hide them from the active feed
//   const activeIncidents = safeIncidents.filter((incident) => 
//     incident && incident.status !== 'Resolved' && incident.status !== 'Rejected'
//   );

//   const rawUser = localStorage.getItem("userData");
//   let username = 'Citizen';
//   if (rawUser) {
//     try {
//       const parsed = JSON.parse(rawUser);
//       username = parsed.username || 'Citizen';
//     } catch (e) {
//       username = 'Citizen';
//     }
//   }

//   return (
//     <section id="blogs" className="py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="mb-12">
//           <h1 className="text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
//             Welcome, <span className="text-red-600">{username}</span>
//           </h1>
//           <p className="text-xl text-gray-600 mb-6 font-medium">Stay updated with live community safety reports.</p>
//         </div>

//         <div className="flex items-center justify-between mb-10 border-b pb-4">
//             <h2 className="text-3xl font-bold text-gray-800">Community Reports</h2>
//             <div className="flex items-center gap-2 text-red-500 animate-pulse font-bold">
//                 <span className="w-2 h-2 bg-red-500 rounded-full"></span>
//                 LIVE FEED
//             </div>
//         </div>

//         {activeIncidents.length === 0 ? (
//           <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
//             <AlertCircle className="mx-auto text-gray-300 mb-4" size={48} />
//             <p className="text-gray-500 text-xl font-semibold">No active incidents reported in this area.</p>
//             <p className="text-gray-400">Everything looks safe!</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {activeIncidents.map((incident) => (
//               <IncidentCard 
//                 key={incident._id} 
//                 incident={incident} 
//                 onVote={handleVote} 
//                 onDownvote={handleDownvote} 
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Blogs;

import React from 'react';
import { ThumbsUp, ThumbsDown, Flame, Stethoscope, Car, Shield, Clock, MapPin, AlertCircle } from 'lucide-react';
import axios from 'axios';

const iconMap = {
  'Fire': { icon: Flame, bg: 'bg-orange-500/20', text: 'text-orange-500' },
  'Medical': { icon: Stethoscope, bg: 'bg-red-500/20', text: 'text-red-500' },
  'Accident': { icon: Car, bg: 'bg-yellow-500/20', text: 'text-yellow-500' },
  'Public Safety': { icon: Shield, bg: 'bg-blue-500/20', text: 'text-blue-500' }
};

const formatTime = (timestamp) => {
  if (!timestamp) return 'Just now';
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};

const IncidentCard = ({ incident, onVote, onDownvote }) => {
  const typeKey = Object.keys(iconMap).find(k => k.toLowerCase() === incident.type?.toLowerCase()) || 'Public Safety';
  const typeConfig = iconMap[typeKey];
  const Icon = typeConfig.icon;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${typeConfig.bg}`}>
          <Icon size={24} className={typeConfig.text} />
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs font-medium uppercase tracking-wide px-3 py-1 rounded-full bg-gray-100 text-gray-500">
            {incident.type}
          </span>
          <span className={`text-xs font-bold px-2 py-1 rounded ${
             incident.severity === 'High' ? 'text-red-600 bg-red-100' : 
             incident.severity === 'Medium' ? 'text-yellow-600 bg-yellow-100' : 
             'text-green-600 bg-green-100'
          }`}>
            {incident.severity || 'Low'} Priority
          </span>
        </div>
      </div>

      <p className="text-gray-900 mb-4 line-clamp-3 font-medium">{incident.description}</p>

      {incident.mediaUrl && (
        <div className="mb-4">
          <img src={incident.mediaUrl} alt="Incident" className="w-full h-48 object-cover rounded-xl border border-gray-100" />
        </div>
      )}

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin size={14} />
          <span className="truncate">{incident.location?.address || "Unknown Location"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock size={14} />
          <span>{formatTime(incident.createdAt)}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={() => onVote(incident._id)}
          className="flex flex-1 items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors justify-center font-bold"
        >
          <ThumbsUp size={18} />
          <span>{incident.upvotes?.length || 0} Verify</span>
        </button>

        <button
          onClick={() => onDownvote(incident._id)}
          className="flex flex-1 items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors justify-center font-bold"
        >
          <ThumbsDown size={18} />
          <span>{incident.downvotes?.length || 0} Reject</span>
        </button>
      </div>
    </div>
  );
};

const Blogs = ({ incidents = [], onRefresh }) => {
  
  const handleVote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login to verify incidents!");

      await axios.post(
        `http://localhost:5000/api/incidents/${id}/upvote`,
        {}, 
        { headers: { token: token } }
      );
      
      // 🟢 CRITICAL: This triggers the parent's re-fetch logic
      if (onRefresh) onRefresh(); 
    } catch (error) {
      alert(error.response?.data?.message || "Error voting");
    }
  };

  const handleDownvote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login to reject incidents!");

      await axios.post(
        `http://localhost:5000/api/incidents/${id}/downvote`,
        {}, 
        { headers: { token: token } }
      );
      
      // 🟢 CRITICAL: This triggers the parent's re-fetch logic
      if (onRefresh) onRefresh();
    } catch (error) {
      alert(error.response?.data?.message || "Error rejecting incident");
    }
  };

  const safeIncidents = Array.isArray(incidents) ? incidents : [];
  
  const activeIncidents = safeIncidents.filter((incident) => 
    incident && incident.status !== 'Resolved' && incident.status !== 'Rejected'
  );

  const rawUser = localStorage.getItem("userData");
  let username = 'Citizen';
  if (rawUser) {
    try {
      const parsed = JSON.parse(rawUser);
      username = parsed.username || 'Citizen';
    } catch (e) {
      username = 'Citizen';
    }
  }

  return (
    <section id="blogs" className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Welcome, <span className="text-red-600">{username}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6 font-medium">Stay updated with live community safety reports.</p>
        </div>

        <div className="flex items-center justify-between mb-10 border-b pb-4">
            <h2 className="text-3xl font-bold text-gray-800">Community Reports</h2>
            <div className="flex items-center gap-2 text-red-500 animate-pulse font-bold">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                LIVE FEED
            </div>
        </div>

        {activeIncidents.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200 shadow-sm">
            <AlertCircle className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500 text-xl font-semibold">No active incidents reported in this area.</p>
            <p className="text-gray-400">Everything looks safe!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeIncidents.map((incident) => (
              <IncidentCard 
                key={incident._id} 
                incident={incident} 
                onVote={handleVote} 
                onDownvote={handleDownvote} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;