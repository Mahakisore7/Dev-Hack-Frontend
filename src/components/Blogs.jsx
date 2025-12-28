// import React from 'react';
// import { ThumbsUp, ThumbsDown, Flame, Stethoscope, Car, Shield, Clock, MapPin } from 'lucide-react';
// import { updateVote } from '../data/incidents.js';

// const iconMap = {
//   fire: { icon: Flame, bg: 'bg-orange-500/20', text: 'text-orange-500' },
//   medical: { icon: Stethoscope, bg: 'bg-red-500/20', text: 'text-red-500' },
//   'road accident': { icon: Car, bg: 'bg-yellow-500/20', text: 'text-yellow-500' },
//   'public safety': { icon: Shield, bg: 'bg-blue-500/20', text: 'text-blue-500' }
// };

// const formatTime = (timestamp) => {
//   const date = new Date(timestamp);
//   return date.toLocaleString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   });
// };

// const IncidentCard = ({ incident, onVote }) => {
//   const typeConfig = iconMap[incident.type] || iconMap['public safety'];
//   const Icon = typeConfig.icon;

//   return (
//     <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow">
//       {/* Header */}
//       <div className="flex items-start justify-between mb-4">
//         <div className={`p-3 rounded-xl ${typeConfig.bg}`}>
//           <Icon size={24} className={typeConfig.text} />
//         </div>
//         <span className="text-xs font-medium uppercase tracking-wide px-3 py-1 rounded-full bg-gray-100 text-gray-500">
//           {incident.type}
//         </span>
//       </div>

//       {/* Content */}
//       <p className="text-gray-900 mb-4 line-clamp-3">{incident.description}</p>

//       {/* Media */}
//       {incident.media && (
//         <div className="mb-4">
//           <img src={incident.media} alt="Incident" className="w-full h-40 object-cover rounded-lg" />
//         </div>
//       )}

//       {/* Meta Info */}
//       <div className="space-y-2 mb-4">
//         <div className="flex items-center gap-2 text-sm text-gray-500">
//           <MapPin size={14} />
//           <span>{incident.location}</span>
//         </div>
//         <div className="flex items-center gap-2 text-sm text-gray-500">
//           <Clock size={14} />
//           <span>{formatTime(incident.timestamp)}</span>
//         </div>
//       </div>

//       {/* Vote Buttons */}
//       <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
//         <button
//           onClick={() => onVote(incident.id, 'up')}
//           className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors"
//         >
//           <ThumbsUp size={18} />
//           <span className="font-medium">{incident.upvotes}</span>
//         </button>
//         <button
//           onClick={() => onVote(incident.id, 'down')}
//           className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
//         >
//           <ThumbsDown size={18} />
//           <span className="font-medium">{incident.downvotes}</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// const Blogs = ({ incidents, onRefresh }) => {
//   const handleVote = (id, voteType) => {
//     updateVote(id, voteType);
//     onRefresh();
//   };

//   return (
//     <section id="blogs" className="min-h-screen py-16 px-4 bg-gray-100">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-10">
//           <h2 className="text-4xl font-bold text-gray-900 mb-2">Community Reports</h2>
//           <p className="text-gray-500">Recent incidents reported by the community</p>
//         </div>

//         {incidents.length === 0 ? (
//           <div className="text-center py-16">
//             <p className="text-muted-foreground text-lg">No incidents reported yet.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {incidents.map((incident) => (
//               <IncidentCard key={incident.id} incident={incident} onVote={handleVote} />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Blogs;


import React from 'react';
import { ThumbsUp, ThumbsDown, Flame, Stethoscope, Car, Shield, Clock, MapPin } from 'lucide-react';
import { upvoteIncident, downvoteIncident } from '../data/incidents.js';

const iconMap = {
  fire: { icon: Flame, bg: 'bg-orange-500/20', text: 'text-orange-500' },
  medical: { icon: Stethoscope, bg: 'bg-red-500/20', text: 'text-red-500' },
  'road accident': { icon: Car, bg: 'bg-yellow-500/20', text: 'text-yellow-500' },
  'public safety': { icon: Shield, bg: 'bg-blue-500/20', text: 'text-blue-500' }
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const IncidentCard = ({ incident, onVote }) => {
  const typeConfig = iconMap[incident.type] || iconMap['public safety'];
  const Icon = typeConfig.icon;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${typeConfig.bg}`}>
          <Icon size={24} className={typeConfig.text} />
        </div>
        <span className="text-xs font-medium uppercase tracking-wide px-3 py-1 rounded-full bg-gray-100 text-gray-500">
          {incident.type}
        </span>
      </div>

      {/* Content */}
      <p className="text-gray-900 mb-4 line-clamp-3">{incident.description}</p>

      {/* Media */}
      {incident.media && (
        <div className="mb-4">
          <img src={incident.media} alt="Incident" className="w-full h-40 object-cover rounded-lg" />
        </div>
      )}

      {/* Meta Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin size={14} />
          <span>{incident.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock size={14} />
          <span>{formatTime(incident.timestamp)}</span>
        </div>
      </div>

      {/* Vote Buttons */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={() => onVote(incident.id, 'up')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors"
        >
          <ThumbsUp size={18} />
          <span className="font-medium">{incident.upvotes}</span>
        </button>
        <button
          onClick={() => onVote(incident.id, 'down')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
        >
          <ThumbsDown size={18} />
          <span className="font-medium">{incident.downvotes}</span>
        </button>
      </div>
    </div>
  );
};

const Blogs = ({ incidents, onRefresh }) => {
  const handleVote = (id, voteType) => {
    if (voteType === 'up') {
      upvoteIncident(id);
    } else if (voteType === 'down') {
      downvoteIncident(id);
    }
    onRefresh();
  };

  return (
    <section id="blogs" className="min-h-screen py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Community Reports</h2>
          <p className="text-gray-500">Recent incidents reported by the community</p>
        </div>

        {incidents.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No incidents reported yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {incidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} onVote={handleVote} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;