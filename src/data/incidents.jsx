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
    internalNotes: [], // Array of admin notes
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

export const addInternalNote = (incidentId, note, adminName) => {
  incidents = incidents.map((incident) => {
    if (incident.id === incidentId) {
      const newNote = {
        id: Date.now(),
        text: note,
        adminName: adminName,
        timestamp: new Date().toISOString(),
      };
      return {
        ...incident,
        internalNotes: [...(incident.internalNotes || []), newNote],
      };
    }
    return incident;
  });
  return incidents;
};

export const updateInternalNote = (incidentId, noteId, newText) => {
  incidents = incidents.map((incident) => {
    if (incident.id === incidentId) {
      return {
        ...incident,
        internalNotes: incident.internalNotes.map((note) =>
          note.id === noteId 
            ? { ...note, text: newText, lastModified: new Date().toISOString() }
            : note
        ),
      };
    }
    return incident;
  });
  return incidents;
};

export const deleteInternalNote = (incidentId, noteId) => {
  incidents = incidents.map((incident) => {
    if (incident.id === incidentId) {
      return {
        ...incident,
        internalNotes: incident.internalNotes.filter((note) => note.id !== noteId),
      };
    }
    return incident;
  });
  return incidents;
};
