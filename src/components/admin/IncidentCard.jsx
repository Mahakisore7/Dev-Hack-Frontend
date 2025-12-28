import React, { useState } from 'react';
import axios from 'axios'; // <--- 1. Import Axios
import { 
  Flame, Stethoscope, Car, Shield, Clock, MapPin, 
  ThumbsUp, ThumbsDown, MessageCircle, Send 
} from 'lucide-react';

const iconMap = {
  Fire: { icon: Flame, bg: 'bg-orange-500/20', text: 'text-orange-500' },
  Medical: { icon: Stethoscope, bg: 'bg-red-500/20', text: 'text-red-500' },
  Accident: { icon: Car, bg: 'bg-yellow-500/20', text: 'text-yellow-500' },
  'Public Safety': { icon: Shield, bg: 'bg-blue-500/20', text: 'text-blue-500' },
};

const statusStyles = {
  Unverified: 'bg-amber-100 text-amber-700 border-amber-200',
  Verified: 'bg-green-100 text-green-700 border-green-200',
  Resolved: 'bg-blue-100 text-blue-700 border-blue-200',
  Rejected: 'bg-red-100 text-red-700 border-red-200',
};

const formatTime = (timestamp) => {
  if (!timestamp) return 'Just now';
  return new Date(timestamp).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
};

const IncidentCard = ({ incident, actions, onNotesUpdate }) => {
  const [showInternalNotes, setShowInternalNotes] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle case sensitivity for icon mapping
  const typeKey = Object.keys(iconMap).find(k => k.toLowerCase() === incident.type?.toLowerCase()) || 'Public Safety';
  const typeConfig = iconMap[typeKey];
  const Icon = typeConfig.icon;

  // 🟢 CONNECT TO BACKEND: ADD NOTE
  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // Call Backend API
      await axios.put(
        `http://localhost:5000/api/admin/add-note/${incident._id}`, 
        { adminNotes: newNote.trim() }, 
        { headers: { token: token } }
      );

      setNewNote('');
      // Refresh the parent list to see the new note
      if (onNotesUpdate) onNotesUpdate(); 
      alert("Note added successfully!");

    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note.");
    } finally {
      setLoading(false);
    }
  };

  // 🟢 HANDLE BACKEND DATA: Your backend sends 'adminNotes' as a single string currently
  // We wrap it in an array to fit your UI layout
  const displayNotes = incident.adminNotes 
    ? [{ id: 1, text: incident.adminNotes, adminName: 'Admin', timestamp: incident.updatedAt }] 
    : [];

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
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusStyles[incident.status] || statusStyles.Unverified}`}>
            {incident.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-900 mb-4 line-clamp-3">{incident.description}</p>

      {/* Media (Backend sends 'mediaUrl', not 'media') */}
      {incident.mediaUrl && (
        <div className="mb-4">
          <img src={incident.mediaUrl} alt="Incident" className="w-full h-40 object-cover rounded-lg" />
        </div>
      )}

      {/* Meta Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin size={14} />
          {/* Use optional chaining for location */}
          <span>{incident.location?.address || "Unknown Location"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock size={14} />
          <span>{formatTime(incident.createdAt)}</span>
        </div>
      </div>

      {/* Vote Display */}
      <div className="flex items-center gap-4 pt-3 border-t border-gray-100 mb-4">
        <div className="flex items-center gap-2 text-green-600">
          <ThumbsUp size={16} />
          <span className="font-medium">{incident.voteCount || 0}</span>
        </div>
        {/* Backend currently doesn't track downvotes explicitly, so we hide or show 0 */}
        <div className="flex items-center gap-2 text-red-600">
          <ThumbsDown size={16} />
          <span className="font-medium">0</span>
        </div>
      </div>

      {/* Action Buttons (Passed from Dashboard) */}
      {actions && actions.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200 mb-4">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => action.onClick(incident._id)} // Use _id
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${action.className}`}
            >
              {action.icon && <action.icon size={16} />}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Internal Notes Section */}
      <div className="border-t border-gray-200 pt-4">
        <button
          onClick={() => setShowInternalNotes(!showInternalNotes)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 mb-3"
        >
          <MessageCircle size={16} />
          <span>Internal Notes ({displayNotes.length})</span>
        </button>

        {showInternalNotes && (
          <div className="space-y-3">
            {/* Notes List */}
            {displayNotes.length > 0 ? (
              <div className="space-y-2 mb-3">
                {displayNotes.map((note) => (
                  <div key={note.id} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-800 mb-2">{note.text}</p>
                    <div className="text-xs text-gray-500">
                      <span>Updated {formatTime(note.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
                <p className="text-sm text-gray-400 italic">No notes added yet.</p>
            )}

            {/* Add New Note */}
            <div className="space-y-2">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Update admin note..."
                className="w-full p-3 text-sm border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="2"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleAddNote}
                  disabled={!newNote.trim() || loading}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={14} />
                  {loading ? "Saving..." : "Save Note"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentCard;