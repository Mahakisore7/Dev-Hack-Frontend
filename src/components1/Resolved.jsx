// src/component1/Resolved.jsx
import React from "react";

export default function Resolved({ incidents }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Resolved Incidents</h2>
      {incidents.map(incident => (
        <div key={incident.id} className="border p-4 mb-2 rounded">
          <div className="font-semibold">{incident.title}</div>
          <div>{incident.description}</div>
          <div className="text-sm text-gray-500">{incident.location}</div>
        </div>
      ))}
    </div>
  );
}