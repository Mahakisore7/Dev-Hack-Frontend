// Temporary data store for incidents
let incidents = [
  {
    id: 1,
    type: 'fire',
    description: 'Small fire reported near the park area',
    location: 'Central Park, Block A',
    timestamp: new Date('2024-12-27T10:30:00').toISOString(),
    media: null,
    upvotes: 10,
    downvotes: 6,
    status: 'verified',
  },
  {
    id: 2,
    type: 'road accident',
    description: 'Two vehicles collision at the intersection',
    location: 'Main Street & 5th Avenue',
    timestamp: new Date('2024-12-27T09:15:00').toISOString(),
    media: null,
    upvotes: 13,
    downvotes: 4,
    status: 'unverified',
  }
];

export const getIncidents = () => [...incidents];

export const addIncident = (incident) => {
  const newIncident = {
    ...incident,
    id: Date.now(),
    timestamp: new Date().toISOString(),
    upvotes: 0,
    downvotes: 0,
    status: 'unverified',
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
