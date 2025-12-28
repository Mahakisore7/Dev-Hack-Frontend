// Temporary data store for incidents
let incidents = [];

export const getIncidents = () => [...incidents];

export const addIncident = (incident) => {
  const newIncident = {
    ...incident,
    id: Date.now(),
    timestamp: new Date().toISOString(),
    upvotes: 0,
    downvotes: 0,
    status: 'unverified',
    // Only add coordinates if latitude and longitude are provided
    coordinates: (incident.latitude && incident.longitude) 
      ? { lat: incident.latitude, lng: incident.longitude }
      : undefined,
  };
  incidents = [newIncident, ...incidents];
  return newIncident;
};

export const updateVote = (id, voteType) => {
  incidents = incidents.map((incident) => {
    if (incident.id === id) {
      return {
        ...incident,
        upvotes: voteType === 'up' ? incident.upvotes + 1 : incident.upvotes,
        downvotes: voteType === 'down' ? incident.downvotes + 1 : incident.downvotes,
      };
    }
    return incident;
  });
  return incidents;
};

export const getIncidentsByStatus = (status) => {
  return incidents.filter((incident) => incident.status === status);
};

export const updateIncidentStatus = (id, newStatus) => {
  incidents = incidents.map((incident) => {
    if (incident.id === id) {
      return {
        ...incident,
        status: newStatus,
      };
    }
    return incident;
  });
  return incidents;
};
