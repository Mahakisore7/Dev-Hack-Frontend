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
      className: 'bg-blue-500 hover:bg-blue-600 text-white',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-green-100">
            <CheckCircle size={28} className="text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Verified Incidents</h2>
            <p className="text-gray-500">Confirmed incidents awaiting resolution</p>
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
            <CheckCircle size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Verified Incidents</h3>
            <p className="text-gray-500">No incidents are currently verified</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifiedIncidents;
