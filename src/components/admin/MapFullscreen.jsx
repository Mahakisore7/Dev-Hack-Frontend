import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getIncidents } from '../../data/incidents';
import { 
  AlertCircle, 
  MapPin, 
  Clock, 
  User, 
  X, 
  Minimize2,
  CheckCircle,
  XCircle,
  Shield
} from 'lucide-react';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom red icon for incidents
const createIncidentIcon = (status) => {
  const colors = {
    unverified: '#f59e0b', // amber
    verified: '#ef4444',   // red
    resolved: '#22c55e',   // green
    rejected: '#64748b'    // gray
  };

  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 20px;
      height: 20px;
      background-color: ${colors[status] || colors.verified};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Create custom blue icon for admin location
const createAdminIcon = () => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 24px;
      height: 24px;
      background-color: #3b82f6;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 14px;
    ">A</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
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

const MapFullscreen = ({ onClose, onTabChange }) => {
  const [incidents, setIncidents] = useState([]);
  const [adminLocation, setAdminLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load incidents
    const incidentData = getIncidents();
    setIncidents(incidentData);

    // Get admin's current location
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
          let errorMessage = 'Unable to get your location. ';
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Location access was denied. Please allow location access and refresh the page.';
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
      unverified: 'text-amber-600',
      verified: 'text-red-600',
      resolved: 'text-green-600',
      rejected: 'text-gray-600'
    };
    return colors[status] || 'text-gray-600';
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      unverified: 'bg-amber-100 text-amber-800',
      verified: 'bg-red-100 text-red-800',
      resolved: 'bg-green-100 text-green-800',
      rejected: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Count incidents by status
  const incidentStats = {
    unverified: incidents.filter(i => i.status === 'unverified').length,
    verified: incidents.filter(i => i.status === 'verified').length,
    resolved: incidents.filter(i => i.status === 'resolved').length,
    rejected: incidents.filter(i => i.status === 'rejected').length,
  };

  // Navigation items for quick access in fullscreen
  const quickNavItems = [
    { 
      id: 'unverified', 
      label: 'Unverified', 
      icon: Clock, 
      color: 'bg-amber-600 hover:bg-amber-700',
      count: incidentStats.unverified
    },
    { 
      id: 'verified', 
      label: 'Verified', 
      icon: CheckCircle, 
      color: 'bg-green-600 hover:bg-green-700',
      count: incidentStats.verified
    },
    { 
      id: 'resolved', 
      label: 'Resolved', 
      icon: Shield, 
      color: 'bg-blue-600 hover:bg-blue-700',
      count: incidentStats.resolved
    },
    { 
      id: 'rejected', 
      label: 'Rejected', 
      icon: XCircle, 
      color: 'bg-gray-600 hover:bg-gray-700',
      count: incidentStats.rejected
    },
  ];

  // Default center (New York City)
  const defaultCenter = [40.7580, -73.9855];
  const mapCenter = adminLocation ? [adminLocation.lat, adminLocation.lng] : defaultCenter;

  // Handle escape key to close fullscreen
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-[rgb(var(--color-bg-primary))]">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-[rgb(var(--color-card-bg))]/95 backdrop-blur-sm border-b border-[rgb(var(--color-border))] p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[rgb(var(--color-text-primary))]">Full Screen Map View</h1>
              <p className="text-sm text-[rgb(var(--color-text-secondary))]">All incidents in your area</p>
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
                    className={`${item.id === 'unverified' ? 'bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800' : item.id === 'verified' ? 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800' : item.id === 'resolved' ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800' : 'bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800'} text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all hover:scale-105 shadow-md`}
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
              className="flex items-center gap-2 px-4 py-2 bg-[rgb(var(--color-bg-secondary))] text-[rgb(var(--color-text-primary))] rounded-lg hover:bg-[rgb(var(--color-border))] transition-all hover:scale-105 shadow-md"
            >
              <Minimize2 className="w-4 h-4" />
              <span className="hidden sm:inline">Exit Fullscreen</span>
            </button>
            
            <button
              onClick={onClose}
              className="p-2 text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-bg-secondary))] rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 text-sm mt-3 pt-3 border-t border-[rgb(var(--color-border))] text-[rgb(var(--color-text-primary))]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow-sm"></div>
            <span>Unverified ({incidentStats.unverified})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
            <span>Verified ({incidentStats.verified})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            <span>Resolved ({incidentStats.resolved})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
            <span>Your Location</span>
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

      {/* Map */}
      <div className="absolute inset-0 pt-32">
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
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Admin location marker */}
            <LocationMarker adminLocation={adminLocation} />
            
            {/* Incident markers */}
            {incidents.map((incident) => (
              incident.coordinates && (
                <Marker
                  key={incident.id}
                  position={[incident.coordinates.lat, incident.coordinates.lng]}
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
                          <span>{incident.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{formatTimestamp(incident.timestamp)}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 pt-2 border-t">
                          <span className="text-green-600">👍 {incident.upvotes}</span>
                          <span className="text-red-600">👎 {incident.downvotes}</span>
                        </div>

                        <div className="pt-2 border-t">
                          <button
                            onClick={() => {
                              onTabChange(incident.status);
                              onClose();
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View in {incident.status} section →
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

      {/* Mobile Quick Navigation */}
      <div className="md:hidden absolute bottom-6 left-6 right-6 z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200 p-4">
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