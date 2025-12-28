import React from 'react';
import { XCircle, RotateCcw } from 'lucide-react';
import IncidentCard from './IncidentCard';
import { getIncidentsByStatus, updateIncidentStatus } from '../../data/incidents';

const RejectedIncidents = ({ onStatusChange }) => {
  const incidents = getIncidentsByStatus('rejected');

  const handleMoveToUnverified = (id) => {
    updateIncidentStatus(id, 'unverified');
    onStatusChange();
  };

  const actions = [
    {
      label: 'Move to Unverified',
      icon: RotateCcw,
      onClick: handleMoveToUnverified,
      className: 'bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800 text-white',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--color-bg-primary))] to-[rgb(var(--color-bg-secondary))] pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 bg-[rgb(var(--color-card-bg))] p-6 rounded-2xl shadow-lg border border-[rgb(var(--color-border))]">
          <div className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30">
            <XCircle size={32} className="text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[rgb(var(--color-text-primary))]">Rejected Incidents</h2>
            <p className="text-[rgb(var(--color-text-secondary))] mt-1">Incidents that were rejected by admin</p>
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
            <XCircle size={64} className="mx-auto text-[rgb(var(--color-text-tertiary))] mb-4" />
            <h3 className="text-xl font-semibold text-[rgb(var(--color-text-primary))] mb-2">No Rejected Incidents</h3>
            <p className="text-[rgb(var(--color-text-secondary))]">No incidents have been rejected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RejectedIncidents;
