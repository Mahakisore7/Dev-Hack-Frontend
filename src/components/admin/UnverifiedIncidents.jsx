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
      className: 'bg-green-500 hover:bg-green-600 text-white',
    },
    {
      label: 'Reject',
      icon: XCircle,
      onClick: handleReject,
      className: 'bg-red-500 hover:bg-red-600 text-white',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-amber-100">
            <Clock size={28} className="text-amber-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Unverified Incidents</h2>
            <p className="text-gray-500">Review and verify or reject pending incidents</p>
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
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <Clock size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Unverified Incidents</h3>
            <p className="text-gray-500">All incidents have been reviewed</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnverifiedIncidents;
