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
      className: 'bg-amber-500 hover:bg-amber-600 text-white',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-red-100">
            <XCircle size={28} className="text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Rejected Incidents</h2>
            <p className="text-gray-500">Incidents that were rejected by admin</p>
          </div>
        </div>

        {/* Incidents Grid */}
        {incidents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {incidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} actions={actions} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <XCircle size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Rejected Incidents</h3>
            <p className="text-gray-500">No incidents have been rejected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RejectedIncidents;
