// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// import L from 'leaflet';
// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';
// import { 
//   AlertCircle, MapPin, Clock, User, Minimize2,
//   CheckCircle, XCircle, Shield, ThumbsUp
// } from 'lucide-react';

// // --- 1. LEAFLET ICON FIXES (Prevents marker images from breaking) ---
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// // --- 2. CUSTOM ICONS ---
// const createIncidentIcon = (status) => {
//   const colors = {
//     Unverified: '#f59e0b', // Amber
//     Verified: '#ef4444',   // Red
//     Resolved: '#22c55e',   // Green
//     Rejected: '#64748b'    // Gray
//   };

//   return L.divIcon({
//     className: 'custom-marker',
//     html: `<div style="
//       width: 22px; height: 22px;
//       background-color: ${colors[status] || '#f59e0b'};
//       border: 3px solid white; border-radius: 50%;
//       box-shadow: 0 2px 4px rgba(0,0,0,0.3);
//       ${status === 'Unverified' ? 'animation: pulse 2s infinite;' : ''}
//     "></div>`,
//     iconSize: [22, 22], iconAnchor: [11, 11],
//   });
// };

// const createAdminIcon = () => {
//   return L.divIcon({
//     className: 'custom-marker',
//     html: `<div style="
//       width: 24px; height: 24px;
//       background-color: #3b82f6; border: 3px solid white; border-radius: 50%;
//       box-shadow: 0 2px 4px rgba(0,0,0,0.3); color: white;
//       display: flex; align-items: center; justify-content: center;
//       font-weight: bold; font-size: 14px;
//     ">A</div>`,
//     iconSize: [24, 24], iconAnchor: [12, 12],
//   });
// };

// // --- 3. MAP UTILITIES ---

// // 🟢 NEW: Automatically focus the map on the cluster of incidents
// const AutoFitBounds = ({ incidents }) => {
//   const map = useMap();
//   useEffect(() => {
//     if (incidents && incidents.length > 0) {
//       const points = incidents
//         .filter(i => i.location?.lat && i.location?.lng)
//         .map(i => [parseFloat(i.location.lat), parseFloat(i.location.lng)]);
      
//       if (points.length > 0) {
//         const bounds = L.latLngBounds(points);
//         map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
//       }
//     }
//   }, [incidents, map]);
//   return null;
// };

// const LocationMarker = ({ adminLocation }) => {
//   const map = useMap();
//   useEffect(() => {
//     if (adminLocation) {
//       map.setView([adminLocation.lat, adminLocation.lng], map.getZoom());
//     }
//   }, [adminLocation, map]);

//   return adminLocation ? (
//     <Marker position={[adminLocation.lat, adminLocation.lng]} icon={createAdminIcon()}>
//       <Popup>Your Location</Popup>
//     </Marker>
//   ) : null;
// };

// // --- 4. MAIN COMPONENT ---
// const MapFullscreen = ({ onClose, onTabChange }) => {
//   const [incidents, setIncidents] = useState([]);
//   const [adminLocation, setAdminLocation] = useState(null);
//   const [locationError, setLocationError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch Incidents from Backend
//   useEffect(() => {
//     const fetchIncidents = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const res = await axios.get("https://resq-jg07.onrender.com/api/admin/feed?status=All", {
//                 headers: { token: token }
//             });
//             setIncidents(res.data.data || []);
//         } catch (error) {
//             console.error("Error loading map data:", error);
//         } finally {
//             setLoading(false);
//         }
//     };
//     fetchIncidents();
//   }, []);

//   // Get Admin Location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setAdminLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
//         },
//         (error) => {
//           setLocationError('Using default map center (Location Access Denied)');
//           setAdminLocation({ lat: 12.9716, lng: 77.5946 }); // Default Fallback (India)
//         }
//       );
//     }
//   }, []);

//   const formatTimestamp = (timestamp) => new Date(timestamp).toLocaleString();

//   const getStatusColor = (status) => {
//     const colors = { Unverified: 'text-amber-600', Verified: 'text-red-600', Resolved: 'text-green-600', Rejected: 'text-gray-600' };
//     return colors[status] || 'text-gray-600';
//   };

//   const getStatusBadgeColor = (status) => {
//     const colors = { Unverified: 'bg-amber-100 text-amber-800', Verified: 'bg-red-100 text-red-800', Resolved: 'bg-green-100 text-green-800', Rejected: 'bg-gray-100 text-gray-800' };
//     return colors[status] || 'bg-gray-100 text-gray-800';
//   };

//   const incidentStats = {
//     unverified: incidents.filter(i => i.status === 'Unverified').length,
//     verified: incidents.filter(i => ['Verified', 'Responding', 'On Scene'].includes(i.status)).length,
//     resolved: incidents.filter(i => i.status === 'Resolved').length,
//     rejected: incidents.filter(i => i.status === 'Rejected').length,
//   };

//   const quickNavItems = [
//     { id: 'Unverified', label: 'Unverified', icon: Clock, color: 'bg-amber-600 hover:bg-amber-700', count: incidentStats.unverified },
//     { id: 'Verified', label: 'Verified', icon: CheckCircle, color: 'bg-red-600 hover:bg-red-700', count: incidentStats.verified },
//     { id: 'Resolved', label: 'Resolved', icon: Shield, color: 'bg-blue-600 hover:bg-blue-700', count: incidentStats.resolved },
//     { id: 'Rejected', label: 'Rejected', icon: XCircle, color: 'bg-gray-600 hover:bg-gray-700', count: incidentStats.rejected },
//   ];

//   return (
//     <div className="fixed inset-0 z-50 bg-white flex flex-col">
//       {/* Header Overlay */}
//       <div className="absolute top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <MapPin className="w-6 h-6 text-blue-600" />
//             <div>
//               <h1 className="text-xl font-bold text-gray-900">Incident Real-Time Map</h1>
//               <p className="text-sm text-gray-600">Tracking {incidents.length} total reports</p>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-4">
//             <div className="hidden md:flex items-center gap-2">
//               {quickNavItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => { onTabChange(item.id); onClose(); }}
//                   className={`${item.color} text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all shadow-md`}
//                 >
//                   <item.icon className="w-4 h-4" />
//                   <span>{item.label}</span>
//                   <span className="bg-white/20 px-2 rounded-full text-xs">{item.count}</span>
//                 </button>
//               ))}
//             </div>
            
//             <button onClick={onClose} className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
//               <Minimize2 className="w-4 h-4" />
//               <span className="hidden sm:inline">Close Map</span>
//             </button>
//           </div>
//         </div>

//         <div className="flex items-center gap-6 text-sm mt-3 pt-3 border-t border-gray-200">
//            <div className="flex items-center gap-2 font-semibold"><div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div> Unverified</div>
//            <div className="flex items-center gap-2 font-semibold"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Verified</div>
//            <div className="flex items-center gap-2 font-semibold"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Resolved</div>
//         </div>
//       </div>

//       {/* Map Content */}
//       <div className="flex-1 relative">
//         {loading ? (
//           <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-[1001]">
//              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </div>
//         ) : (
//           <MapContainer
//             center={adminLocation ? [adminLocation.lat, adminLocation.lng] : [12.9716, 77.5946]}
//             zoom={13}
//             style={{ height: '100%', width: '100%' }}
//             className="z-0"
//           >
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
            
//             <AutoFitBounds incidents={incidents} />
//             <LocationMarker adminLocation={adminLocation} />
            
//             {incidents.map((incident) => {
//               const lat = parseFloat(incident.location?.lat);
//               const lng = parseFloat(incident.location?.lng);

//               if (!isNaN(lat) && !isNaN(lng)) {
//                 return (
//                   <Marker key={incident._id} position={[lat, lng]} icon={createIncidentIcon(incident.status)}>
//                     <Popup maxWidth={300}>
//                       <div className="p-2 font-sans">
//                         <div className="flex items-center justify-between mb-2">
//                           <h3 className="font-bold text-gray-900 capitalize">{incident.type}</h3>
//                           <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadgeColor(incident.status)}`}>
//                             {incident.status}
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-700 mb-3 italic">"{incident.description}"</p>
//                         <div className="space-y-1.5 border-t pt-2 text-[11px] text-gray-500">
//                           <div className="flex items-center gap-2"><MapPin size={12} /> {incident.location.address || "Unknown Location"}</div>
//                           <div className="flex items-center gap-2"><Clock size={12} /> {formatTimestamp(incident.createdAt)}</div>
//                           <div className="flex items-center gap-2 font-bold text-green-600"><ThumbsUp size={12} /> Community Score: {incident.voteCount || 0}</div>
//                         </div>
//                         <button onClick={() => { onTabChange(incident.status); onClose(); }} className="mt-3 w-full text-center text-blue-600 hover:underline font-bold text-xs">
//                           Manage Incident →
//                         </button>
//                       </div>
//                     </Popup>
//                   </Marker>
//                 );
//               }
//               return null;
//             })}
//           </MapContainer>
//         )}
//       </div>

//       <style>{`
//         @keyframes pulse {
//           0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7); }
//           70% { box-shadow: 0 0 0 10px rgba(245, 158, 11, 0); }
//           100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default MapFullscreen;

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { 
  AlertCircle, MapPin, Clock, User, Minimize2,
  CheckCircle, XCircle, Shield, ThumbsUp
} from 'lucide-react';

// --- 1. LEAFLET ICON FIXES (Prevents marker images from breaking) ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// --- 2. CUSTOM ICONS ---
const createIncidentIcon = (status) => {
  const colors = {
    Unverified: '#f59e0b', // Amber
    Verified: '#ef4444',   // Red
    Resolved: '#22c55e',   // Green
    Rejected: '#64748b'    // Gray
  };

  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 22px; height: 22px;
      background-color: ${colors[status] || '#f59e0b'};
      border: 3px solid white; border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      ${status === 'Unverified' ? 'animation: pulse 2s infinite;' : ''}
    "></div>`,
    iconSize: [22, 22], iconAnchor: [11, 11],
  });
};

const createAdminIcon = () => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 24px; height: 24px;
      background-color: #3b82f6; border: 3px solid white; border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3); color: white;
      display: flex; align-items: center; justify-content: center;
      font-weight: bold; font-size: 14px;
    ">A</div>`,
    iconSize: [24, 24], iconAnchor: [12, 12],
  });
};

// --- 3. MAP UTILITIES ---

// 🟢 FOCUS LOGIC: Automatically zoom out to show ALL pins in the database
const AutoFitBounds = ({ incidents }) => {
  const map = useMap();
  useEffect(() => {
    if (incidents && incidents.length > 0) {
      // Create an array of [lat, lng] pairs for all incidents
      const points = incidents
        .filter(i => i.location?.lat && i.location?.lng)
        .map(i => [parseFloat(i.location.lat), parseFloat(i.location.lng)]);
      
      if (points.length > 0) {
        const bounds = L.latLngBounds(points);
        // Instruct map to fit all points with 50px padding
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      }
    }
  }, [incidents, map]);
  return null;
};

const LocationMarker = ({ adminLocation }) => {
  const map = useMap();
  useEffect(() => {
    if (adminLocation) {
      map.setView([adminLocation.lat, adminLocation.lng], map.getZoom());
    }
  }, [adminLocation, map]);

  return adminLocation ? (
    <Marker position={[adminLocation.lat, adminLocation.lng]} icon={createAdminIcon()}>
      <Popup>Your Location</Popup>
    </Marker>
  ) : null;
};

// --- 4. MAIN COMPONENT ---
const MapFullscreen = ({ onClose, onTabChange }) => {
  const [incidents, setIncidents] = useState([]);
  const [adminLocation, setAdminLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch ALL Incidents from Backend
  useEffect(() => {
    const fetchIncidents = async () => {
        try {
            const token = localStorage.getItem("token");
            // Ensure status=All is passed to get every record
            const res = await axios.get("https://resq-jg07.onrender.com/api/admin/feed?status=All", {
                headers: { token: token }
            });
            setIncidents(res.data.data || []);
        } catch (error) {
            console.error("Error loading map data:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchIncidents();
  }, []);

  // Get Admin Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setAdminLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
          setLoading(false);
        },
        (error) => {
          setLocationError('Location Access Denied - Using Default Center');
          setAdminLocation({ lat: 12.9716, lng: 77.5946 }); 
          setLoading(false);
        }
      );
    }
  }, []);

  const formatTimestamp = (timestamp) => new Date(timestamp).toLocaleString();

  const getStatusBadgeColor = (status) => {
    const colors = { Unverified: 'bg-amber-100 text-amber-800', Verified: 'bg-red-100 text-red-800', Resolved: 'bg-green-100 text-green-800', Rejected: 'bg-gray-100 text-gray-800' };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const incidentStats = {
    unverified: incidents.filter(i => i.status === 'Unverified').length,
    verified: incidents.filter(i => ['Verified', 'Responding', 'On Scene'].includes(i.status)).length,
    resolved: incidents.filter(i => i.status === 'Resolved').length,
    rejected: incidents.filter(i => i.status === 'Rejected').length,
  };

  const quickNavItems = [
    { id: 'Unverified', label: 'Unverified', icon: Clock, color: 'bg-amber-600 hover:bg-amber-700', count: incidentStats.unverified },
    { id: 'Verified', label: 'Verified', icon: CheckCircle, color: 'bg-red-600 hover:bg-red-700', count: incidentStats.verified },
    { id: 'Resolved', label: 'Resolved', icon: Shield, color: 'bg-blue-600 hover:bg-blue-700', count: incidentStats.resolved },
    { id: 'Rejected', label: 'Rejected', icon: XCircle, color: 'bg-gray-600 hover:bg-gray-700', count: incidentStats.rejected },
  ];

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Incident Real-Time Map</h1>
              <p className="text-sm text-gray-600 font-medium">Monitoring {incidents.length} active reports</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2">
              {quickNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onTabChange(item.id); onClose(); }}
                  className={`${item.color} text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all shadow-md active:scale-95`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  <span className="bg-white/20 px-2 rounded-full text-xs font-mono">{item.count}</span>
                </button>
              ))}
            </div>
            
            <button onClick={onClose} className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors">
              <Minimize2 className="w-4 h-4" />
              <span className="hidden sm:inline font-bold">Close Map</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm mt-3 pt-3 border-t border-gray-200">
           <div className="flex items-center gap-2 font-bold text-slate-700"><div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div> Unverified ({incidentStats.unverified})</div>
           <div className="flex items-center gap-2 font-bold text-slate-700"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Verified ({incidentStats.verified})</div>
           <div className="flex items-center gap-2 font-bold text-slate-700"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Resolved ({incidentStats.resolved})</div>
        </div>
      </div>

      {/* Map Content Area */}
      <div className="flex-1 relative mt-32">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-[1001]">
             <div className="flex flex-col items-center gap-3">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
               <p className="font-bold text-blue-600 animate-pulse">Syncing Database Pins...</p>
             </div>
          </div>
        ) : (
          <MapContainer
            center={adminLocation ? [adminLocation.lat, adminLocation.lng] : [12.9716, 77.5946]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
            
            {/* 🟢 Focus Logic: Flies the camera to show all incidents automatically */}
            <AutoFitBounds incidents={incidents} />
            
            <LocationMarker adminLocation={adminLocation} />
            
            {incidents.map((incident) => {
              const lat = parseFloat(incident.location?.lat);
              const lng = parseFloat(incident.location?.lng);

              if (!isNaN(lat) && !isNaN(lng)) {
                return (
                  <Marker key={incident._id} position={[lat, lng]} icon={createIncidentIcon(incident.status)}>
                    <Popup maxWidth={300}>
                      <div className="p-2 font-sans">
                        <div className="flex items-center justify-between mb-2 border-b pb-1">
                          <h3 className="font-bold text-gray-900 capitalize text-lg">{incident.type}</h3>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${getStatusBadgeColor(incident.status)}`}>
                            {incident.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-3 italic leading-tight">"{incident.description}"</p>
                        <div className="space-y-1.5 pt-2 text-[11px] text-gray-500">
                          <div className="flex items-center gap-2 font-medium text-slate-600"><MapPin size={12} className="text-blue-500"/> {incident.location.address || "Fetching address..."}</div>
                          <div className="flex items-center gap-2 font-medium text-slate-600"><Clock size={12} className="text-blue-500"/> {formatTimestamp(incident.createdAt)}</div>
                          <div className="flex items-center gap-2 font-black text-green-600 pt-1"><ThumbsUp size={12} /> Community Votes: {incident.voteCount || 0}</div>
                        </div>
                        <button 
                          onClick={() => { onTabChange(incident.status); onClose(); }} 
                          className="mt-4 w-full bg-blue-50 text-blue-600 py-2 rounded-lg font-bold text-xs hover:bg-blue-100 transition-colors"
                        >
                          View In Feed →
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                );
              }
              return null;
            })}
          </MapContainer>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7); }
          70% { box-shadow: 0 0 0 12px rgba(245, 158, 11, 0); }
          100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
        }
        .leaflet-container { font-family: inherit !important; }
      `}</style>
    </div>
  );
};

export default MapFullscreen;