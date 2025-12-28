// API Configuration
const API_URL = 'http://localhost:5000/api';

// Temporary data store for incidents (fallback when backend is down)
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

// Fetch all incidents from backend
export const getIncidents = async () => {
  try {
    const response = await fetch(`${API_URL}/incidents`);
    if (!response.ok) throw new Error('Failed to fetch incidents');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching incidents:', error);
    // Fallback to local data if backend is down
    return [...incidents];
  }
};

// Add new incident (not used in HeroPart anymore, but keeping for compatibility)
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

// Update vote for an incident
export const updateVote = async (id, voteType) => {
  try {
    const response = await fetch(`${API_URL}/incidents/${id}/vote`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ voteType }),
    });
    if (!response.ok) throw new Error('Failed to update vote');
    return await response.json();
  } catch (error) {
    console.error('Error updating vote:', error);
    // Fallback to local update
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
  }
};

// Get incidents by status
export const getIncidentsByStatus = async (status) => {
  try {
    const response = await fetch(`${API_URL}/incidents?status=${status}`);
    if (!response.ok) throw new Error('Failed to fetch incidents by status');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching incidents by status:', error);
    // Fallback to local filtering
    return incidents.filter((incident) => incident.status === status);
  }
};

// Update incident status
export const updateIncidentStatus = async (id, newStatus) => {
  try {
    const response = await fetch(`${API_URL}/incidents/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    if (!response.ok) throw new Error('Failed to update status');
    return await response.json();
  } catch (error) {
    console.error('Error updating incident status:', error);
    // Fallback to local update
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
  }
};
