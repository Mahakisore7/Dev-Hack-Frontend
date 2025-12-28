// import React, { useState, useEffect } from 'react';
// import { CheckCheck } from 'lucide-react';
// import { getIncidentsByStatus, subscribe, moveToResolved } from '../../data/incidents';
// import IncidentCard from '../../IncidentCard.jsx'

// const VerifiedIncidents = () => {
//   const [incidents, setIncidents] = useState(getIncidentsByStatus('verified'));

//   useEffect(() => {
//     const unsubscribe = subscribe(() => {
//       setIncidents(getIncidentsByStatus('verified'));
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleResolve = (id) => {
//     moveToResolved(id);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-foreground mb-2">Verified Incidents</h2>
//         <p className="text-muted-foreground">Incidents that have been verified and are being addressed</p>
//       </div>

//       {incidents.length === 0 ? (
//         <div className="text-center py-16 bg-card rounded-xl border border-border">
//           <p className="text-muted-foreground text-lg">No verified incidents</p>
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {incidents.map(incident => (
//             <IncidentCard 
//               key={incident.id} 
//               incident={incident}
//               showActions={true}
//               actions={[
//                 {
//                   label: 'Mark Resolved',
//                   onClick: () => handleResolve(incident.id),
//                   className: 'bg-success text-success-foreground hover:bg-success/90',
//                   icon: <CheckCheck size={16} />
//                 }
//               ]}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default VerifiedIncidents;


import React, { useState, useEffect } from 'react';
import { CheckCheck, MapPin, Clock, ThumbsUp, ThumbsDown } from 'lucide-react';
import { getIncidentsByStatus, subscribe, moveToResolved } from '../../data/incidents';

const VerifiedIncidents = () => {
  const [incidents, setIncidents] = useState(getIncidentsByStatus('verified'));

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setIncidents(getIncidentsByStatus('verified'));
    });
    return () => unsubscribe();
  }, []);

  const handleResolve = (id) => {
    moveToResolved(id);
  };

  const getIncidentIcon = (type) => {
    const icons = {
      fire: '🔥',
      safety: '🛡️',
      accident: '🚗'
    };
    return icons[type] || '📍';
  };

  const getIncidentBadgeColor = (type) => {
    const colors = {
      fire: 'bg-orange-100 text-orange-600 border-orange-200',
      safety: 'bg-cyan-100 text-cyan-600 border-cyan-200',
      accident: 'bg-blue-100 text-blue-600 border-blue-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Verified Incidents</h2>
          <p className="text-gray-600 text-base">Incidents that have been verified and are being addressed</p>
        </div>

        {incidents.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-500 text-lg">No verified incidents</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {incidents.map(incident => (
              <div key={incident.id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
                {/* Icon and Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center text-2xl">
                    {getIncidentIcon(incident.type)}
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide border ${getIncidentBadgeColor(incident.type)}`}>
                    {incident.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2">
                  {incident.title}
                </h3>

                {/* Location */}
                <div className="flex items-start gap-2 mb-2 text-gray-600">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{incident.location}</span>
                </div>

                {/* Time */}
                <div className="flex items-center gap-2 mb-6 text-gray-600">
                  <Clock size={16} className="flex-shrink-0" />
                  <span className="text-sm">{incident.time}</span>
                </div>

                {/* Votes */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-green-200 bg-green-50">
                    <ThumbsUp size={16} className="text-green-600" />
                    <span className="text-sm font-semibold text-green-700">{incident.upvotes || 0}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 bg-red-50">
                    <ThumbsDown size={16} className="text-red-600" />
                    <span className="text-sm font-semibold text-red-700">{incident.downvotes || 0}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleResolve(incident.id)}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
                >
                  <CheckCheck size={18} />
                  <span>Mark Resolved</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifiedIncidents;