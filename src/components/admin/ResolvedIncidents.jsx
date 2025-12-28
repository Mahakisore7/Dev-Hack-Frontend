import React from 'react';
import { Shield } from 'lucide-react';
import IncidentCard from './IncidentCard';
import { getIncidentsByStatus } from '../../data/incidents';

const ResolvedIncidents = ({ onStatusChange }) => {
  const incidents = getIncidentsByStatus('resolved');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--color-bg-primary))] to-[rgb(var(--color-bg-secondary))] pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 bg-[rgb(var(--color-card-bg))] p-6 rounded-2xl shadow-lg border border-[rgb(var(--color-border))]">
          <div className="p-4 rounded-xl bg-blue-100 dark:bg-blue-900/30">
            <Shield size={32} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[rgb(var(--color-text-primary))]">Resolved Incidents</h2>
            <p className="text-[rgb(var(--color-text-secondary))] mt-1">Successfully resolved incidents archive</p>
          </div>
        </div>

        {/* Incidents Grid */}
        {incidents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {incidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} onNotesUpdate={onStatusChange} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[rgb(var(--color-card-bg))] rounded-2xl border border-[rgb(var(--color-border))] shadow-lg">
            <Shield size={64} className="mx-auto text-[rgb(var(--color-text-tertiary))] mb-4" />
            <h3 className="text-xl font-semibold text-[rgb(var(--color-text-primary))] mb-2">No Resolved Incidents</h3>
            <p className="text-[rgb(var(--color-text-secondary))]">No incidents have been resolved yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResolvedIncidents;
