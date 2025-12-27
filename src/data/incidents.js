// // Temporary data store for incidents
// let incidents = [
//   {
//     id: 1,
//     type: 'fire',
//     description: 'Small fire reported near the park area',
//     location: 'Central Park, Block A',
//     timestamp: new Date('2024-12-27T10:30:00').toISOString(),
//     media: null,
//     upvotes: 10,
//     downvotes: 6,
//   },
//   {
//     id: 2,
//     type: 'road accident',
//     description: 'Two vehicles collision at the intersection',
//     location: 'Main Street & 5th Avenue',
//     timestamp: new Date('2024-12-27T09:15:00').toISOString(),
//     media: null,
//     upvotes: 13,
//     downvotes: 4,
//   },
// ];

// export const getIncidents = () => [...incidents];

// export const addIncident = (incident) => {
//   const newIncident = {
//     ...incident,
//     id: Date.now(),
//     timestamp: new Date().toISOString(),
//     upvotes: 0,
//     downvotes: 0,
//   };
//   incidents = [newIncident, ...incidents];
//   return newIncident;
// };

// export const updateVote = (id, voteType) => {
//   incidents = incidents.map((incident) => {
//     if (incident.id === id) {
//       return {
//         ...incident,
//         upvotes: voteType === 'up' ? incident.upvotes + 1 : incident.upvotes,
//         downvotes: voteType === 'down' ? incident.downvotes + 1 : incident.downvotes,
//       };
//     }
//     return incident;
//   });



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
    status: 'unverified', // new field
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
    status: 'verified', // new field
  },
  {
    id: 3,
    type: 'medical',
    description: 'Person fainted at the bus stop, ambulance called',
    location: 'Bus Stop, Sector 12',
    timestamp: new Date('2024-12-27T08:00:00').toISOString(),
    media: null,
    upvotes: 7,
    downvotes: 1,
    status: 'resolved',
  },
  {
    id: 4,
    type: 'public safety',
    description: 'Suspicious package found, police notified',
    location: 'Mall Entrance',
    timestamp: new Date('2024-12-27T07:45:00').toISOString(),
    media: null,
    upvotes: 2,
    downvotes: 8,
    status: 'rejected',
  },
];

// Get all incidents
export const getIncidents = () => [...incidents];

// Add new incident
export const addIncident = (incident) => {
  const newIncident = {
    ...incident,
    id: Date.now(),
    timestamp: new Date().toISOString(),
    upvotes: 0,
    downvotes: 0,
    status: 'unverified', // default status
  };
  incidents = [newIncident, ...incidents];
  return newIncident;
};

// Update upvotes/downvotes
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

// Update status (for admin actions)
export const updateIncidentStatus = (id, newStatus) => {
  incidents = incidents.map((incident) =>
    incident.id === id ? { ...incident, status: newStatus } : incident
  );
  return incidents;
};