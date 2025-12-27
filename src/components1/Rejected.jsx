// src/component1/Rejected.jsx
import React from "react";

export default function Rejected({ incidents, onStatusChange }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Rejected Incidents</h2>
      {incidents.map(incident => (
        <div key={incident.id} className="border p-4 mb-2 rounded">
          <div className="font-semibold">{incident.title}</div>
          <div>{incident.description}</div>
          <div className="text-sm text-gray-500">{incident.location}</div>
          <div className="mt-2">
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded"
              onClick={() => onStatusChange(incident.id, "unverified")}
            >
              Move to Unverified
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}