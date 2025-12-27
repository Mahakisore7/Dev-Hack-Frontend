// src/pages/Admin.jsx
import React, { useState } from "react";
import { getIncidents, updateIncidentStatus } from "../data/incidents";
import AdminNav from "../components1/AdminNav.jsx"
import Unverified from "../components1/Unverified.jsx";
import Verified from "../components1/Verified.jsx";
import Resolved from "../components1/Resolved.jsx";
import Rejected from "../components1/Rejected.jsx";

const statusComponents = {
  unverified: Unverified,
  verified: Verified,
  resolved: Resolved,
  rejected: Rejected,
};

export default function Admin() {
  const [status, setStatus] = useState("unverified");
  const [_, forceUpdate] = useState(0); // for re-render

  const incidents = getIncidents().filter(i => i.status === status);
  const Component = statusComponents[status];

  // Handler to update status and re-render
  const handleStatusChange = (id, newStatus) => {
    updateIncidentStatus(id, newStatus);
    forceUpdate(n => n + 1);
  };

  return (
    <div>
      <AdminNav current={status} onChange={setStatus} />
      <Component incidents={incidents} onStatusChange={handleStatusChange} />
    </div>
  );
}