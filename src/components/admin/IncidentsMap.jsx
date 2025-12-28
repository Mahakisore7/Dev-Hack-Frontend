import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios'; // <--- 1. Import Axios
import 'leaflet/dist/leaflet.css';
import { AlertCircle, MapPin, Clock, User } from 'lucide-react';

// --- 1. LEAFLET ICON FIXES ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// --- 2. CUSTOM INCIDENT ICONS ---
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

// --- 3. CUSTOM ADMIN LOCATION ICON ---
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

// --- 4. MAP RE-CENTERING COMPONENT ---
const LocationMarker = ({ adminLocation }) => {
  const map = useMap();
  useEffect(() => {
    if (adminLocation) {
      map.setView([adminLocation.lat, adminLocation.lng], map.getZoom());
    }
  }, [adminLocation, map]);

  return adminLocation ? (
    <Marker position={[adminLocation.lat, adminLocation.lng]} icon={createAdminIcon()}>
      <Popup>
        <div className="p-2">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-blue-600">Your Location</span>
          </div>
          <div className="text-sm text-gray-600">
            <div>Lat: {adminLocation.lat.toFixed(4)}</div>
            <div>Lng: {adminLocation.lng.toFixed(4)}</div>
          </div>
        </div>
      </Popup>
    </Marker>
  ) : null;
};

// --- 5. MAIN COMPONENT ---
const IncidentsMap = () => {
  const [incidents, setIncidents] = useState([]);
  const [adminLocation, setAdminLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🟢 FETCH INCIDENTS FROM BACKEND
  useEffect(() => {
    const fetchIncidents = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/admin/feed?status=All", {
                headers: { token: token }
            });
            // Backend returns data in res.data.data
            setIncidents(res.data.data);
        } catch (error) {
            console.error("Error loading map data:", error);
        }
    };
    fetchIncidents();
  }, []);

  // 🟢 GET USER LOCATION (Restored full error handling)
  useEffect(() => {
    if (navigator.geolocation) {
      console.log('Requesting location access...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location access granted:', position.coords);
          setAdminLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          let errorMessage = 'Unable to get your location. ';
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Location access was denied. Please allow location access.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage += 'Location request timed out.';
              break;
            default:
              errorMessage += 'An unknown error occurred.';
              break;
          }
          
          setLocationError(errorMessage);
          // Fallback to default location so map doesn't crash
          setAdminLocation({ lat: 12.9716, lng: 77.5946 }); 
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser');
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

  const defaultCenter = [40.7580, -73.9855];
  const mapCenter = adminLocation ? [adminLocation.lat, adminLocation.lng] : defaultCenter;

  return (
    <div className="h-screen bg-gray-50 pt-16">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Incidents Map</h1>
                  <p className="text-gray-600">View all reported incidents on the map</p>
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex items-center gap-4 text-sm hidden sm:flex">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-500 rounded-full border-2 border-white"></div>
                  <span>Unverified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                  <span>Verified</span>
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
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-700">{locationError}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
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
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              
              {/* Admin location marker */}
              <LocationMarker adminLocation={adminLocation} />
              
              {/* 🟢 RENDER INCIDENTS FROM DB */}
              {incidents.map((incident) => (
                // Check 'location.lat' (Backend structure) instead of 'coordinates'
                incident.location && incident.location.lat && (
                  <Marker
                    key={incident._id} // Use MongoDB _id
                    position={[incident.location.lat, incident.location.lng]}
                    icon={createIncidentIcon(incident.status)}
                  >
                    <Popup maxWidth={300}>
                      <div className="p-3">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <AlertCircle className={`w-5 h-5 ${getStatusColor(incident.status)}`} />
                            <h3 className="font-semibold text-gray-900 capitalize">
                              {incident.type}
                            </h3>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(incident.status)}`}>
                            {incident.status}
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-gray-700 text-sm">{incident.description}</p>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{incident.location.address || "Unknown Location"}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{formatTimestamp(incident.createdAt)}</span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600 pt-2 border-t">
                            <span className="text-green-600 font-bold">👍 {incident.voteCount || 0}</span>
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
  );
};

export default IncidentsMap;