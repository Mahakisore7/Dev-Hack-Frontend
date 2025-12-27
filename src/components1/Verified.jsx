// src/component1/Verified.jsx
import React from "react";

export default function Verified({ incidents, onStatusChange }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Verified Incidents</h2>
      {incidents.map(incident => (
        <div key={incident.id} className="border p-4 mb-2 rounded">
          <div className="font-semibold">{incident.title}</div>
          <div>{incident.description}</div>
          <div className="text-sm text-gray-500">{incident.location}</div>
          <div className="mt-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => onStatusChange(incident.id, "resolved")}
            >
              Move to Resolved
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}