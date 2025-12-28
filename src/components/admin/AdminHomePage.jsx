import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios'; // <--- 1. Import Axios
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, Clock, User, AlertCircle, CheckCircle, 
  XCircle, Shield, Expand, ChevronRight 
} from 'lucide-react';

// --- LEAFLET FIXES & ICON LOGIC ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom colored dots for map
const createIncidentIcon = (status) => {
  const colors = {
    Unverified: '#f59e0b', // Amber (Matches Backend "Unverified")
    Verified: '#ef4444',   // Red
    Responding: '#ef4444', // Red (Treat Responding as critical)
    OnScene: '#ef4444',    // Red
    Resolved: '#22c55e',   // Green
    Rejected: '#64748b'    // Gray
  };

  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 16px; height: 16px;
      background-color: ${colors[status] || '#f59e0b'};
      border: 2px solid white; border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [16, 16], iconAnchor: [8, 8],
  });
};

const createAdminIcon = () => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 20px; height: 20px;
      background-color: #3b82f6; border: 2px solid white; border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3); color: white;
      display: flex; align-items: center; justify-content: center;
      font-weight: bold; font-size: 12px;
    ">A</div>`,
    iconSize: [20, 20], iconAnchor: [10, 10],
  });
};

const LocationMarker = ({ adminLocation }) => {
  const map = useMap();
  useEffect(() => {
    if (adminLocation) map.setView([adminLocation.lat, adminLocation.lng], map.getZoom());
  }, [adminLocation, map]);

  return adminLocation ? (
    <Marker position={[adminLocation.lat, adminLocation.lng]} icon={createAdminIcon()}>
      <Popup>Your Location</Popup>
    </Marker>
  ) : null;
};
// ------------------------------------------------

const AdminHomePage = ({ onTabChange, onMapFullscreen }) => {
  const [incidents, setIncidents] = useState([]);
  const [adminLocation, setAdminLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🟢 1. FETCH INCIDENTS FROM BACKEND API
  useEffect(() => {
    const fetchIncidents = async () => {
        try {
            const token = localStorage.getItem("token");
            // Fetch "All" so we can calculate stats correctly
            const res = await axios.get("https://resq-jg07.onrender.com/api/admin/feed?status=All", {
                headers: { token: token }
            });
            setIncidents(res.data.data);
        } catch (error) {
            console.error("Error loading map data:", error);
        }
    };
    fetchIncidents();
  }, []);

  // 🟢 2. GET ADMIN LOCATION (Browser API)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setAdminLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error("Location error:", error);
          setAdminLocation({ lat: 40.7128, lng: -74.0060 }); // Default Fallback
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, []);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  // 🟢 3. CALCULATE STATS (Matches Backend Status Strings)
  const incidentStats = {
    unverified: incidents.filter(i => i.status === 'Unverified').length,
    verified: incidents.filter(i => ['Verified', 'Responding', 'On Scene'].includes(i.status)).length,
    resolved: incidents.filter(i => i.status === 'Resolved').length,
    rejected: incidents.filter(i => i.status === 'Rejected').length,
  };

  const navigationCards = [
    { 
      id: 'Unverified', 
      label: 'Unverified', 
      icon: Clock, 
      count: incidentStats.unverified, 
      color: 'bg-amber-50 border-amber-200 hover:bg-amber-100',
      iconColor: 'text-amber-600',
      description: 'Review new incident reports'
    },
    { 
      id: 'Verified', 
      label: 'Active / Verified', 
      icon: CheckCircle, 
      count: incidentStats.verified, 
      color: 'bg-red-50 border-red-200 hover:bg-red-100',
      iconColor: 'text-red-600',
      description: 'Manage verified incidents'
    },
    { 
      id: 'Resolved', 
      label: 'Resolved', 
      icon: Shield, 
      count: incidentStats.resolved, 
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      iconColor: 'text-green-600',
      description: 'View resolved incidents'
    },
    { 
        id: 'Rejected', 
        label: 'Rejected', 
        icon: XCircle, 
        count: incidentStats.rejected, 
        color: 'bg-gray-50 border-gray-200 hover:bg-gray-100',
        iconColor: 'text-gray-600',
        description: 'Spam or invalid reports'
      },
  ];

  const defaultCenter = [12.9716, 77.5946]; // Default to Bangalore (or your city)
  const mapCenter = adminLocation ? [adminLocation.lat, adminLocation.lng] : defaultCenter;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage incidents and monitor your area</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {navigationCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => onTabChange(card.id)}
                className={`${card.color} border-2 rounded-lg p-6 text-left transition-all hover:shadow-md group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`w-8 h-8 ${card.iconColor}`} />
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
                <div className="mb-2">
                  <p className="text-2xl font-bold text-gray-900">{card.count}</p>
                  <p className="font-medium text-gray-900">{card.label}</p>
                </div>
                <p className="text-sm text-gray-600">{card.description}</p>
              </button>
            );
          })}
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-xl font-bold text-gray-900">Incidents Overview</h2>
                <p className="text-gray-600">Click map to view in fullscreen</p>
              </div>
            </div>
            <button
              onClick={onMapFullscreen}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Expand className="w-4 h-4" />
              <span>Fullscreen</span>
            </button>
          </div>

          {/* Legend */}
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-500 rounded-full border-2 border-white"></div>
                <span>Unverified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                <span>Verified / Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                <span>Resolved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                <span>Your Location</span>
              </div>
            </div>
          </div>

          {locationError && (
            <div className="m-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span className="text-amber-700">{locationError}</span>
              </div>
            </div>
          )}

          {/* Embedded Map */}
          <div className="h-96 relative cursor-pointer" onClick={onMapFullscreen}>
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                  <p className="text-gray-600">Loading map...</p>
                </div>
              </div>
            ) : (
              <MapContainer
                center={mapCenter}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
                zoomControl={false}
                dragging={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
                touchZoom={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* Admin location marker */}
                <LocationMarker adminLocation={adminLocation} />
                
                {/* 🟢 Incident markers (FROM DB) */}
                {incidents.map((incident) => (
                  // Backend uses 'location.lat', not 'coordinates'
                  incident.location && incident.location.lat && (
                    <Marker
                      key={incident._id} // Use MongoDB _id
                      position={[incident.location.lat, incident.location.lng]}
                      icon={createIncidentIcon(incident.status)}
                    >
                      <Popup maxWidth={250}>
                        <div className="p-2">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-gray-700" />
                              <h3 className="font-semibold text-gray-900 capitalize text-sm">
                                {incident.type}
                              </h3>
                            </div>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {incident.status}
                            </span>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-gray-700 text-xs">{incident.description}</p>
                            
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <MapPin className="w-3 h-3" />
                              <span>{incident.location.address || "Unknown"}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Clock className="w-3 h-3" />
                              <span>{formatTimestamp(incident.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  )
                ))}
              </MapContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;