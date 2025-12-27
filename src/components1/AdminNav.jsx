// src/component1/AdminNav.jsx
import React from "react";

const statuses = ["unverified", "verified", "resolved", "rejected"];

export default function AdminNav({ current, onChange }) {
  return (
    <nav className="flex flex-col md:flex-row gap-2 md:gap-4 mb-4">
      {statuses.map(status => (
        <button
          key={status}
          className={`px-4 py-2 rounded ${current === status ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"} transition`}
          onClick={() => onChange(status)}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </nav>
  );
}