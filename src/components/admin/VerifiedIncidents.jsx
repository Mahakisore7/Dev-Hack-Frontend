import React from 'react';
import { CheckCircle, Shield } from 'lucide-react';
import IncidentCard from './IncidentCard';
import { getIncidentsByStatus, updateIncidentStatus } from '../../data/incidents';

const VerifiedIncidents = ({ onStatusChange }) => {
  const incidents = getIncidentsByStatus('verified');

  const handleResolve = (id) => {
    updateIncidentStatus(id, 'resolved');
    onStatusChange();
  };

  const actions = [
    {
      label: 'Mark as Resolved',
      icon: Shield,
      onClick: handleResolve,
      className: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--color-bg-primary))] to-[rgb(var(--color-bg-secondary))] pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 bg-[rgb(var(--color-card-bg))] p-6 rounded-2xl shadow-lg border border-[rgb(var(--color-border))]">
          <div className="p-4 rounded-xl bg-green-100 dark:bg-green-900/30">
            <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[rgb(var(--color-text-primary))]">Verified Incidents</h2>
            <p className="text-[rgb(var(--color-text-secondary))] mt-1">Confirmed incidents awaiting resolution</p>
          </div>
        </div>

        {/* Incidents Grid */}
        {incidents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {incidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} actions={actions} onNotesUpdate={onStatusChange} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[rgb(var(--color-card-bg))] rounded-2xl border border-[rgb(var(--color-border))] shadow-lg">
            <CheckCircle size={64} className="mx-auto text-[rgb(var(--color-text-tertiary))] mb-4" />
            <h3 className="text-xl font-semibold text-[rgb(var(--color-text-primary))] mb-2">No Verified Incidents</h3>
            <p className="text-[rgb(var(--color-text-secondary))]">No incidents are currently verified</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifiedIncidents;
