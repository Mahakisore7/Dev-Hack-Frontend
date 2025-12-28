import React from 'react';
import { ThumbsUp, ThumbsDown, Flame, Stethoscope, Car, Shield, Clock, MapPin, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { updateVote } from '../data/incidents.jsx';

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
  const status = incident.status || 'unverified';
  const statusStyles =
    status === 'verified'
      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
      : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300';

  return (
    <div className="bg-[rgb(var(--color-card-bg))] border border-[rgb(var(--color-border))] rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02]">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${typeConfig.bg}`}>
          <Icon size={24} className={typeConfig.text} />
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs font-medium uppercase tracking-wide px-3 py-1 rounded-full bg-[rgb(var(--color-bg-tertiary))] text-[rgb(var(--color-text-secondary))]">
            {incident.type}
          </span>
          {/* <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles}`}>
            {status}
          </span> */}
        </div>
      </div>

      {/* Content */}
      <p className="text-[rgb(var(--color-text-primary))] mb-4 line-clamp-3">{incident.description}</p>

      {/* Media */}
      {incident.media && (
        <div className="mb-4">
          <img src={incident.media} alt="Incident" className="w-full h-40 object-cover rounded-lg" />
        </div>
      )}

      {/* Meta Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-[rgb(var(--color-text-secondary))]">
          <MapPin size={14} />
          <span>{incident.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[rgb(var(--color-text-secondary))]">
          <Clock size={14} />
          <span>{formatTime(incident.timestamp)}</span>
        </div>
      </div>

      {/* Vote Buttons */}
      <div className="flex items-center gap-3 pt-4 border-t border-[rgb(var(--color-border))]">
        <button
          onClick={() => onVote(incident.id, 'up')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/20 dark:hover:bg-green-500/30 transition-all shadow-sm hover:shadow-md"
        >
          <ThumbsUp size={18} />
          <span className="font-medium">{incident.upvotes}</span>
        </button>
        <button
          onClick={() => onVote(incident.id, 'down')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/20 dark:hover:bg-red-500/30 transition-all shadow-sm hover:shadow-md"
        >
          <ThumbsDown size={18} />
          <span className="font-medium">{incident.downvotes}</span>
        </button>
      </div>
    </div>
  );
};

const Blogs = ({ incidents, onRefresh }) => {
  const handleVote = async (id, voteType) => {
    await updateVote(id, voteType);
    onRefresh();
  };

  const unverifiedIncidents = incidents.filter((incident) => incident.status === 'unverified');
  const username = typeof window !== 'undefined' ? window.currentUsername || 'Citizen' : 'Citizen';

  return (
    <section id="blogs" className="min-h-screen py-16 px-4 bg-gradient-to-b from-[rgb(var(--color-bg-primary))] to-[rgb(var(--color-bg-secondary))]">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-12 bg-[rgb(var(--color-card-bg))] p-8 rounded-2xl shadow-xl border border-[rgb(var(--color-border))]">
          <h1 className="text-5xl font-bold text-[rgb(var(--color-text-primary))] mb-3">Welcome, {username}</h1>
          <p className="text-xl text-[rgb(var(--color-text-secondary))] mb-6">Report incidents instantly. Help save lives in real time.</p>
          <Link
            to="/user/report"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <AlertCircle size={20} />
            Report an Incident
          </Link>
        </div>

        {/* Community Reports Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-[rgb(var(--color-text-primary))] mb-2">Community Reports</h2>
          <p className="text-[rgb(var(--color-text-secondary))]">Recent incidents reported by the community</p>
        </div>

        {unverifiedIncidents.length === 0 ? (
          <div className="text-center py-16 bg-[rgb(var(--color-card-bg))] rounded-2xl shadow-lg border border-[rgb(var(--color-border))]">
            <p className="text-[rgb(var(--color-text-secondary))] text-lg">No incidents reported yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unverifiedIncidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} onVote={handleVote} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
