// Incidents data store with status management
// Status options: 'unverified', 'verified', 'resolved', 'rejected'
// Type options: 'fire', 'medical', 'road', 'safety'

let incidents = [
  {
    id: 1,
    type: 'fire',
    title: 'Small fire reported near the park area',
    description: 'Smoke was seen coming from the bushes near the playground. Fire department has been notified.',
    location: 'Central Park, Block A',
    date: '2024-12-27T10:30:00',
    status: 'unverified',
    upvotes: 10,
    downvotes: 6,
    media: null,
    reportedBy: 'Anonymous'
  },
  {
    id: 2,
    type: 'road',
    title: 'Two vehicles collision at the intersection',
    description: 'Minor collision between a sedan and SUV. No serious injuries reported. Traffic is being redirected.',
    location: 'Main Street & 5th Avenue',
    date: '2024-12-27T09:15:00',
    status: 'verified',
    upvotes: 13,
    downvotes: 4,
    media: null,
    reportedBy: 'John D.'
  },
  {
    id: 3,
    type: 'medical',
    title: 'Person fainted at the bus stop, ambulance called',
    description: 'An elderly person collapsed at the bus stop. Bystanders provided first aid until ambulance arrived.',
    location: 'Bus Stop, Sector 12',
    date: '2024-12-27T08:00:00',
    status: 'resolved',
    upvotes: 7,
    downvotes: 1,
    media: null,
    reportedBy: 'Sarah M.'
  },
  {
    id: 4,
    type: 'safety',
    title: 'Suspicious package found, police notified',
    description: 'Unattended bag found near the mall entrance. Security has cordoned off the area.',
    location: 'Mall Entrance',
    date: '2024-12-27T07:45:00',
    status: 'unverified',
    upvotes: 2,
    downvotes: 8,
    media: null,
    reportedBy: 'Security Team'
  },
  {
    id: 5,
    type: 'fire',
    title: 'Kitchen fire in apartment building',
    description: 'Small kitchen fire reported on the 3rd floor. Residents evacuated safely.',
    location: 'Sunset Apartments, Building C',
    date: '2024-12-26T18:20:00',
    status: 'verified',
    upvotes: 15,
    downvotes: 2,
    media: null,
    reportedBy: 'Building Manager'
  },
  {
    id: 6,
    type: 'medical',
    title: 'Child injured at playground',
    description: 'A child fell from the swing and sustained minor injuries. Parents are on the scene.',
    location: 'Community Playground, Zone 3',
    date: '2024-12-26T16:00:00',
    status: 'rejected',
    upvotes: 5,
    downvotes: 12,
    media: null,
    reportedBy: 'Parent'
  },
  {
    id: 7,
    type: 'road',
    title: 'Pothole causing traffic disruption',
    description: 'Large pothole on the main road is causing vehicles to slow down significantly.',
    location: 'Highway 101, Mile 45',
    date: '2024-12-26T14:30:00',
    status: 'unverified',
    upvotes: 20,
    downvotes: 3,
    media: null,
    reportedBy: 'Commuter'
  },
  {
    id: 8,
    type: 'safety',
    title: 'Street lights not working in residential area',
    description: 'Multiple street lights are out in the neighborhood, creating safety concerns at night.',
    location: 'Maple Street, Sector 7',
    date: '2024-12-26T19:00:00',
    status: 'verified',
    upvotes: 18,
    downvotes: 1,
    media: null,
    reportedBy: 'Resident'
  }
];

// Listeners for state changes
let listeners = [];

// Subscribe to incident changes
export const subscribe = (listener) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
};

// Notify all listeners
const notifyListeners = () => {
  listeners.forEach(listener => listener([...incidents]));
};

// Get all incidents
export const getAllIncidents = () => [...incidents];

// Get incidents by status
export const getIncidentsByStatus = (status) => {
  return incidents.filter(incident => incident.status === status);
};

// Get a single incident by ID
export const getIncidentById = (id) => {
  return incidents.find(incident => incident.id === id);
};

// Add a new incident
export const addIncident = (incident) => {
  const newIncident = {
    ...incident,
    id: Math.max(...incidents.map(i => i.id), 0) + 1,
    date: new Date().toISOString(),
    status: 'unverified',
    upvotes: 0,
    downvotes: 0,
    media: incident.media || null,
    reportedBy: incident.reportedBy || 'Anonymous'
  };
  incidents = [...incidents, newIncident];
  notifyListeners();
  return newIncident;
};

// Update incident status
export const updateIncidentStatus = (id, newStatus) => {
  incidents = incidents.map(incident => 
    incident.id === id ? { ...incident, status: newStatus } : incident
  );
  notifyListeners();
};

// Move to verified
export const moveToVerified = (id) => {
  updateIncidentStatus(id, 'verified');
};

// Move to rejected
export const moveToRejected = (id) => {
  updateIncidentStatus(id, 'rejected');
};

// Move to resolved
export const moveToResolved = (id) => {
  updateIncidentStatus(id, 'resolved');
};

// Move to unverified (for rejected items that need review)
export const moveToUnverified = (id) => {
  updateIncidentStatus(id, 'unverified');
};

// Upvote an incident
export const upvoteIncident = (id) => {
  incidents = incidents.map(incident => 
    incident.id === id ? { ...incident, upvotes: incident.upvotes + 1 } : incident
  );
  notifyListeners();
};

// Downvote an incident
export const downvoteIncident = (id) => {
  incidents = incidents.map(incident => 
    incident.id === id ? { ...incident, downvotes: incident.downvotes + 1 } : incident
  );
  notifyListeners();
};

// Format date helper
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Get incident type config
export const getIncidentTypeConfig = (type) => {
  const configs = {
    fire: {
      label: 'Fire',
      bgColor: 'bg-fire-bg',
      textColor: 'text-fire',
      borderColor: 'border-fire/30'
    },
    medical: {
      label: 'Medical',
      bgColor: 'bg-medical-bg',
      textColor: 'text-medical',
      borderColor: 'border-medical/30'
    },
    road: {
      label: 'Road Accident',
      bgColor: 'bg-road-bg',
      textColor: 'text-road',
      borderColor: 'border-road/30'
    },
    safety: {
      label: 'Public Safety',
      bgColor: 'bg-safety-bg',
      textColor: 'text-safety',
      borderColor: 'border-safety/30'
    }
  };
  return configs[type] || configs.safety;
};

// Get status config
export const getStatusConfig = (status) => {
  const configs = {
    unverified: {
      label: 'Unverified',
      bgColor: 'bg-warning/10',
      textColor: 'text-status-unverified',
      borderColor: 'border-warning/30'
    },
    verified: {
      label: 'Verified',
      bgColor: 'bg-road-bg',
      textColor: 'text-status-verified',
      borderColor: 'border-road/30'
    },
    resolved: {
      label: 'Resolved',
      bgColor: 'bg-success/10',
      textColor: 'text-status-resolved',
      borderColor: 'border-success/30'
    },
    rejected: {
      label: 'Rejected',
      bgColor: 'bg-destructive/10',
      textColor: 'text-status-rejected',
      borderColor: 'border-destructive/30'
    }
  };
  return configs[status] || configs.unverified;
};

export default incidents;
