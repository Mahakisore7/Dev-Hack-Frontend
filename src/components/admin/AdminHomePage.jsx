import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, 
  Clock, 
  User, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Shield,
  Expand,
  ChevronRight
} from 'lucide-react';
import { getIncidents } from '../../data/incidents';

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
      width: 16px;
      height: 16px;
      background-color: ${colors[status] || colors.verified};
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

// Create custom blue icon for admin location
const createAdminIcon = () => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 20px;
      height: 20px;
      background-color: #3b82f6;
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 12px;
    ">A</div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
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

const AdminHomePage = ({ onTabChange, onMapFullscreen }) => {
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
              errorMessage += 'Location access was denied.';
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

  // Navigation items for quick access
  const navigationCards = [
    { 
      id: 'unverified', 
      label: 'Unverified Incidents', 
      icon: Clock, 
      color: 'bg-amber-50 border-amber-200 hover:bg-amber-100',
      iconColor: 'text-amber-600',
      count: incidentStats.unverified,
      description: 'Review new incident reports'
    },
    { 
      id: 'verified', 
      label: 'Verified Incidents', 
      icon: CheckCircle, 
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      iconColor: 'text-green-600',
      count: incidentStats.verified,
      description: 'Manage verified incidents'
    },
    { 
      id: 'resolved', 
      label: 'Resolved Incidents', 
      icon: Shield, 
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      iconColor: 'text-blue-600',
      count: incidentStats.resolved,
      description: 'View resolved incidents'
    },
    { 
      id: 'rejected', 
      label: 'Rejected Incidents', 
      icon: XCircle, 
      color: 'bg-gray-50 border-gray-200 hover:bg-gray-100',
      iconColor: 'text-gray-600',
      count: incidentStats.rejected,
      description: 'Review rejected reports'
    },
  ];

  // Default center (New York City)
  const defaultCenter = [40.7580, -73.9855];
  const mapCenter = adminLocation ? [adminLocation.lat, adminLocation.lng] : defaultCenter;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--color-bg-primary))] to-[rgb(var(--color-bg-secondary))] pt-16">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8 bg-[rgb(var(--color-card-bg))] p-6 rounded-2xl shadow-lg border border-[rgb(var(--color-border))]">
          <h1 className="text-4xl font-bold text-[rgb(var(--color-text-primary))] mb-2">Admin Dashboard</h1>
          <p className="text-[rgb(var(--color-text-secondary))] text-lg">Manage incidents and monitor your area</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {navigationCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => onTabChange(card.id)}
                className="bg-[rgb(var(--color-card-bg))] border-2 border-[rgb(var(--color-border))] rounded-2xl p-6 text-left transition-all hover:shadow-xl hover:scale-105 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-3 rounded-xl ${card.id === 'unverified' ? 'bg-amber-100 dark:bg-amber-900/30' : card.id === 'verified' ? 'bg-green-100 dark:bg-green-900/30' : card.id === 'resolved' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                    <Icon className={`w-6 h-6 ${card.id === 'unverified' ? 'text-amber-600 dark:text-amber-400' : card.id === 'verified' ? 'text-green-600 dark:text-green-400' : card.id === 'resolved' ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`} />
                  </div>
                  <ChevronRight className="w-5 h-5 text-[rgb(var(--color-text-tertiary))] group-hover:text-[rgb(var(--color-text-secondary))] transition-colors" />
                </div>
                <div className="mb-2">
                  <p className="text-2xl font-bold text-[rgb(var(--color-text-primary))]">{card.count}</p>
                  <p className="font-semibold text-[rgb(var(--color-text-primary))]">{card.label}</p>
                </div>
                <p className="text-sm text-[rgb(var(--color-text-secondary))]">{card.description}</p>
              </button>
            );
          })}
        </div>

        {/* Map Section */}
        <div className="bg-[rgb(var(--color-card-bg))] rounded-2xl shadow-xl border border-[rgb(var(--color-border))] overflow-hidden">
          <div className="p-4 border-b border-[rgb(var(--color-border))] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[rgb(var(--color-text-primary))]">Incidents Overview</h2>
                <p className="text-[rgb(var(--color-text-secondary))]">Click map to view in fullscreen</p>
              </div>
            </div>
            <button
              onClick={onMapFullscreen}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-all hover:scale-105 shadow-md"
            >
              <Expand className="w-4 h-4" />
              <span>Fullscreen</span>
            </button>
          </div>

          {/* Legend */}
          <div className="px-4 py-3 bg-[rgb(var(--color-bg-secondary))] border-b border-[rgb(var(--color-border))]">
            <div className="flex items-center gap-6 text-sm text-[rgb(var(--color-text-primary))]">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow-sm"></div>
                <span>Unverified ({incidentStats.unverified})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
                <span>Verified ({incidentStats.verified})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                <span>Resolved ({incidentStats.resolved})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
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
                
                {/* Incident markers */}
                {incidents.map((incident) => (
                  incident.coordinates && (
                    <Marker
                      key={incident.id}
                      position={[incident.coordinates.lat, incident.coordinates.lng]}
                      icon={createIncidentIcon(incident.status)}
                    >
                      <Popup maxWidth={250}>
                        <div className="p-2">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <AlertCircle className={`w-4 h-4 ${getStatusColor(incident.status)}`} />
                              <h3 className="font-semibold text-gray-900 capitalize text-sm">
                                {incident.type}
                              </h3>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(incident.status)}`}>
                              {incident.status}
                            </span>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-gray-700 text-xs">{incident.description}</p>
                            
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <MapPin className="w-3 h-3" />
                              <span>{incident.location}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Clock className="w-3 h-3" />
                              <span>{formatTimestamp(incident.timestamp)}</span>
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