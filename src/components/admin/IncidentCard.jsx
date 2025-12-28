import React from 'react';
import { Flame, Stethoscope, Car, Shield, Clock, MapPin, ThumbsUp, ThumbsDown } from 'lucide-react';

const iconMap = {
  fire: { icon: Flame, bg: 'bg-orange-500/20', text: 'text-orange-500' },
  medical: { icon: Stethoscope, bg: 'bg-red-500/20', text: 'text-red-500' },
  'road accident': { icon: Car, bg: 'bg-yellow-500/20', text: 'text-yellow-500' },
  'public safety': { icon: Shield, bg: 'bg-blue-500/20', text: 'text-blue-500' },
};

const statusStyles = {
  unverified: 'bg-amber-100 text-amber-700 border-amber-200',
  verified: 'bg-green-100 text-green-700 border-green-200',
  resolved: 'bg-blue-100 text-blue-700 border-blue-200',
  rejected: 'bg-red-100 text-red-700 border-red-200',
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const IncidentCard = ({ incident, actions }) => {
  const typeConfig = iconMap[incident.type] || iconMap['public safety'];
  const Icon = typeConfig.icon;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${typeConfig.bg}`}>
          <Icon size={24} className={typeConfig.text} />
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs font-medium uppercase tracking-wide px-3 py-1 rounded-full bg-gray-100 text-gray-600">
            {incident.type}
          </span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusStyles[incident.status]}`}>
            {incident.status.toUpperCase()}
          </span>
        </div>
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

      {/* Vote Display */}
      <div className="flex items-center gap-4 pt-3 border-t border-gray-100 mb-4">
        <div className="flex items-center gap-2 text-green-600">
          <ThumbsUp size={16} />
          <span className="font-medium">{incident.upvotes}</span>
        </div>
        <div className="flex items-center gap-2 text-red-600">
          <ThumbsDown size={16} />
          <span className="font-medium">{incident.downvotes}</span>
        </div>
      </div>

      {/* Action Buttons */}
      {actions && actions.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => action.onClick(incident.id)}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${action.className}`}
            >
              {action.icon && <action.icon size={16} />}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default IncidentCard;
