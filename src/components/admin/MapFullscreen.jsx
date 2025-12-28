import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios'; // <--- 1. Import Axios
import 'leaflet/dist/leaflet.css';
import { 
  AlertCircle, MapPin, Clock, User, X, Minimize2,
  CheckCircle, XCircle, Shield
} from 'lucide-react';

// --- LEAFLET FIXES ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// --- CUSTOM ICONS ---
const createIncidentIcon = (status) => {
  const colors = {
    Unverified: '#f59e0b', // Matches Backend Case
    Verified: '#ef4444',
    Resolved: '#22c55e',
    Rejected: '#64748b'
  };

  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 20px; height: 20px;
      background-color: ${colors[status] || '#f59e0b'};
      border: 3px solid white; border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [20, 20], iconAnchor: [10, 10],
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

// --- MAIN COMPONENT ---
const MapFullscreen = ({ onClose, onTabChange }) => {
  const [incidents, setIncidents] = useState([]);
  const [adminLocation, setAdminLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🟢 1. FETCH INCIDENTS FROM BACKEND
  useEffect(() => {
    const fetchIncidents = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/admin/feed?status=All", {
                headers: { token: token }
            });
            setIncidents(res.data.data);
        } catch (error) {
            console.error("Error loading map data:", error);
        }
    };
    fetchIncidents();
  }, []);

  // 🟢 2. GET USER LOCATION
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
          console.error("Geolocation error:", error);
          let errorMessage = 'Unable to get your location.';
          if (error.code === error.PERMISSION_DENIED) errorMessage = 'Location access denied.';
          
          setLocationError(errorMessage);
          setAdminLocation({ lat: 12.9716, lng: 77.5946 }); // Default Fallback
          setLoading(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLoading(false);
    }
  }, []);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getStatusColor = (status) => {
    const colors = {
      Unverified: 'text-amber-600',
      Verified: 'text-red-600',
      Resolved: 'text-green-600',
      Rejected: 'text-gray-600'
    };
    return colors[status] || 'text-gray-600';
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      Unverified: 'bg-amber-100 text-amber-800',
      Verified: 'bg-red-100 text-red-800',
      Resolved: 'bg-green-100 text-green-800',
      Rejected: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // 🟢 3. CALCULATE STATS (Matches Backend Statuses)
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

  const defaultCenter = [40.7580, -73.9855];
  const mapCenter = adminLocation ? [adminLocation.lat, adminLocation.lng] : defaultCenter;

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Full Screen Map View</h1>
              <p className="text-sm text-gray-600">All incidents in your area</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Quick Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {quickNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id);
                      onClose();
                    }}
                    className={`${item.color} text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
              <span className="hidden sm:inline">Exit Fullscreen</span>
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 text-sm mt-3 pt-3 border-t border-gray-200">
           <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-500 rounded-full"></div> Unverified ({incidentStats.unverified})</div>
           <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Verified ({incidentStats.verified})</div>
           <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Resolved ({incidentStats.resolved})</div>
        </div>

        {locationError && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span className="text-amber-700">{locationError}</span>
            </div>
          </div>
        )}
      </div>

      {/* Map */}
      <div className="absolute inset-0 pt-32">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
             <div className="text-center">Loading Map Data...</div>
          </div>
        ) : (
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            
            <LocationMarker adminLocation={adminLocation} />
            
            {/* 🟢 RENDER MARKERS FROM DB */}
            {incidents.map((incident) => (
              // Check backend location structure
              incident.location && incident.location.lat && (
                <Marker
                  key={incident._id} // Use _id
                  position={[incident.location.lat, incident.location.lng]}
                  icon={createIncidentIcon(incident.status)}
                >
                  <Popup maxWidth={300}>
                    <div className="p-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <AlertCircle className={`w-5 h-5 ${getStatusColor(incident.status)}`} />
                          <h3 className="font-semibold text-gray-900 capitalize">{incident.type}</h3>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(incident.status)}`}>
                          {incident.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-gray-700 text-sm">{incident.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{incident.location.address || "Unknown"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{formatTimestamp(incident.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 pt-2 border-t">
                          <span className="text-green-600">👍 {incident.voteCount}</span>
                        </div>
                        
                        {/* Quick Action Button */}
                        <div className="pt-2 border-t">
                          <button
                            onClick={() => {
                              onTabChange(incident.status);
                              onClose();
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Manage in {incident.status} tab →
                          </button>
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

      {/* Mobile Quick Nav */}
      <div className="md:hidden absolute bottom-6 left-6 right-6 z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200 p-4 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {quickNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    onClose();
                  }}
                  className={`${item.color} text-white p-3 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    {item.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapFullscreen;