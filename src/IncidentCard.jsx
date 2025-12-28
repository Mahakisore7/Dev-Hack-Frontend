import React from 'react';
import { Flame, Stethoscope, Car, ShieldAlert, MapPin, Clock, ThumbsUp, ThumbsDown } from 'lucide-react';
import { getIncidentTypeConfig, formatDate, upvoteIncident, downvoteIncident } from './data/incidents';

const IncidentCard = ({ incident, showActions = false, actions = [] }) => {
  const typeConfig = getIncidentTypeConfig(incident.type);

  const getTypeIcon = (type) => {
    const iconProps = { size: 24 };
    switch (type) {
      case 'fire':
        return <Flame {...iconProps} />;
      case 'medical':
        return <Stethoscope {...iconProps} />;
      case 'road':
        return <Car {...iconProps} />;
      case 'safety':
        return <ShieldAlert {...iconProps} />;
      default:
        return <ShieldAlert {...iconProps} />;
    }
  };

  const handleUpvote = () => {
    upvoteIncident(incident.id);
  };

  const handleDownvote = () => {
    downvoteIncident(incident.id);
  };

  return (
    <div className="incident-card animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${typeConfig.bgColor}`}>
          <span className={typeConfig.textColor}>
            {getTypeIcon(incident.type)}
          </span>
        </div>
        <span className={`type-badge ${typeConfig.bgColor} ${typeConfig.textColor} ${typeConfig.borderColor}`}>
          {typeConfig.label}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-foreground font-semibold text-base mb-3 leading-snug">
        {incident.title}
      </h3>

      {/* Meta Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <MapPin size={14} />
          <span>{incident.location}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Clock size={14} />
          <span>{formatDate(incident.date)}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border my-4" />

      {/* Votes */}
      <div className="flex items-center gap-3">
        <button 
          onClick={handleUpvote}
          className="vote-btn border-success/30 text-success hover:bg-success/10"
        >
          <ThumbsUp size={16} />
          <span>{incident.upvotes}</span>
        </button>
        <button 
          onClick={handleDownvote}
          className="vote-btn border-destructive/30 text-destructive hover:bg-destructive/10"
        >
          <ThumbsDown size={16} />
          <span>{incident.downvotes}</span>
        </button>
      </div>

      {/* Action Buttons */}
      {showActions && actions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`action-btn ${action.className}`}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default IncidentCard;