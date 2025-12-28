import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import IncidentCard from './IncidentCard';
import { getIncidentsByStatus, updateIncidentStatus } from '../../data/incidents';

const UnverifiedIncidents = ({ onStatusChange }) => {
  const incidents = getIncidentsByStatus('unverified');

  const handleVerify = (id) => {
    updateIncidentStatus(id, 'verified');
    onStatusChange();
  };

  const handleReject = (id) => {
    updateIncidentStatus(id, 'rejected');
    onStatusChange();
  };

  const actions = [
    {
      label: 'Verify',
      icon: CheckCircle,
      onClick: handleVerify,
      className: 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white',
    },
    {
      label: 'Reject',
      icon: XCircle,
      onClick: handleReject,
      className: 'bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--color-bg-primary))] to-[rgb(var(--color-bg-secondary))] pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 bg-[rgb(var(--color-card-bg))] p-6 rounded-2xl shadow-lg border border-[rgb(var(--color-border))]">
          <div className="p-4 rounded-xl bg-amber-100 dark:bg-amber-900/30">
            <Clock size={32} className="text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[rgb(var(--color-text-primary))]">Unverified Incidents</h2>
            <p className="text-[rgb(var(--color-text-secondary))] mt-1">Review and verify or reject pending incidents</p>
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
            <Clock size={64} className="mx-auto text-[rgb(var(--color-text-tertiary))] mb-4" />
            <h3 className="text-xl font-semibold text-[rgb(var(--color-text-primary))] mb-2">No Unverified Incidents</h3>
            <p className="text-[rgb(var(--color-text-secondary))]">All incidents have been reviewed</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnverifiedIncidents;
