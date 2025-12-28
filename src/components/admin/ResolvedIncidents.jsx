import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import IncidentCard from './IncidentCard';
import { getIncidentsByStatus } from '../../data/incidents';

const ResolvedIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      setLoading(true);
      const data = await getIncidentsByStatus('resolved');
      setIncidents(data);
      setLoading(false);
    };
    fetchIncidents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-blue-100">
            <Shield size={28} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Resolved Incidents</h2>
            <p className="text-gray-500">Successfully resolved incidents archive</p>
          </div>
        </div>

        {/* Incidents Grid */}
        {incidents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {incidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} actions={[]} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <Shield size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Resolved Incidents</h3>
            <p className="text-gray-500">No incidents have been resolved yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResolvedIncidents;
