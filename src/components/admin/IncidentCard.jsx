import React, { useState } from 'react';
import { Flame, Stethoscope, Car, Shield, Clock, MapPin, ThumbsUp, ThumbsDown, MessageCircle, Send, Edit3, Trash2, X } from 'lucide-react';
import { addInternalNote, updateInternalNote, deleteInternalNote } from '../../data/incidents';

const iconMap = {
  fire: { icon: Flame, bg: 'bg-orange-500/20', text: 'text-orange-500' },
  medical: { icon: Stethoscope, bg: 'bg-red-500/20', text: 'text-red-500' },
  'road accident': { icon: Car, bg: 'bg-yellow-500/20', text: 'text-yellow-500' },
  'public safety': { icon: Shield, bg: 'bg-blue-500/20', text: 'text-blue-500' },
};

const statusStyles = {
  unverified: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700',
  verified: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700',
  resolved: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700',
  rejected: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700',
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

const IncidentCard = ({ incident, actions, onNotesUpdate }) => {
  const [showInternalNotes, setShowInternalNotes] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [editText, setEditText] = useState('');
  
  const typeConfig = iconMap[incident.type] || iconMap['public safety'];
  const Icon = typeConfig.icon;

  const handleAddNote = () => {
    if (newNote.trim()) {
      addInternalNote(incident.id, newNote.trim(), 'Admin'); // You can make adminName dynamic
      setNewNote('');
      if (onNotesUpdate) onNotesUpdate();
    }
  };

  const handleEditNote = (noteId) => {
    const note = incident.internalNotes?.find(n => n.id === noteId);
    if (note) {
      setEditingNote(noteId);
      setEditText(note.text);
    }
  };

  const handleUpdateNote = (noteId) => {
    if (editText.trim()) {
      updateInternalNote(incident.id, noteId, editText.trim());
      setEditingNote(null);
      setEditText('');
      if (onNotesUpdate) onNotesUpdate();
    }
  };

  const handleDeleteNote = (noteId) => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteInternalNote(incident.id, noteId);
      if (onNotesUpdate) onNotesUpdate();
    }
  };

  const formatNoteTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-[rgb(var(--color-card-bg))] border border-[rgb(var(--color-border))] rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02]">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${typeConfig.bg}`}>
          <Icon size={24} className={typeConfig.text} />
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs font-medium uppercase tracking-wide px-3 py-1 rounded-full bg-[rgb(var(--color-bg-tertiary))] text-[rgb(var(--color-text-secondary))]">
            {incident.type}
          </span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusStyles[incident.status]}`}>
            {incident.status.toUpperCase()}
          </span>
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

      {/* Vote Display */}
      <div className="flex items-center gap-4 pt-3 border-t border-[rgb(var(--color-border))] mb-4">
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <ThumbsUp size={16} />
          <span className="font-medium">{incident.upvotes}</span>
        </div>
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <ThumbsDown size={16} />
          <span className="font-medium">{incident.downvotes}</span>
        </div>
      </div>

      {/* Action Buttons */}
      {actions && actions.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-3 border-t border-[rgb(var(--color-border))] mb-4">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => action.onClick(incident.id)}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all shadow-sm hover:shadow-md ${action.className}`}
            >
              {action.icon && <action.icon size={16} />}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Internal Notes Section */}
      <div className="border-t border-[rgb(var(--color-border))] pt-4">
        <button
          onClick={() => setShowInternalNotes(!showInternalNotes)}
          className="flex items-center gap-2 text-sm font-medium text-[rgb(var(--color-text-primary))] hover:text-[rgb(var(--color-accent))] mb-3 transition-colors"
        >
          <MessageCircle size={16} />
          <span>Internal Notes ({incident.internalNotes?.length || 0})</span>
        </button>

        {showInternalNotes && (
          <div className="space-y-3">
            {/* Existing Notes */}
            {incident.internalNotes?.length > 0 && (
              <div className="space-y-2 mb-3">
                {incident.internalNotes.map((note) => (
                  <div key={note.id} className="bg-[rgb(var(--color-bg-tertiary))] rounded-lg p-3">
                    {editingNote === note.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full p-2 text-sm border border-[rgb(var(--color-border))] bg-[rgb(var(--color-input-bg))] text-[rgb(var(--color-text-primary))] rounded-md resize-none focus:ring-2 focus:ring-[rgb(var(--color-accent))] focus:border-transparent transition-all"
                          rows="2"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateNote(note.id)}
                            className="px-3 py-1 text-xs bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingNote(null)}
                            className="px-3 py-1 text-xs bg-gray-600 dark:bg-gray-700 text-white rounded-md hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-[rgb(var(--color-text-primary))] mb-2">{note.text}</p>
                        <div className="flex items-center justify-between text-xs text-[rgb(var(--color-text-secondary))]">
                          <span>by {note.adminName} • {formatNoteTime(note.timestamp)}</span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleEditNote(note.id)}
                              className="p-1 hover:bg-[rgb(var(--color-border))] rounded transition-colors"
                            >
                              <Edit3 size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteNote(note.id)}
                              className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded transition-colors"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Add New Note */}
            <div className="space-y-2">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add internal note for other admins..."
                className="w-full p-3 text-sm border border-[rgb(var(--color-border))] bg-[rgb(var(--color-input-bg))] text-[rgb(var(--color-text-primary))] placeholder:text-[rgb(var(--color-text-tertiary))] rounded-lg resize-none focus:ring-2 focus:ring-[rgb(var(--color-accent))] focus:border-transparent transition-all"
                rows="2"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleAddNote}
                  disabled={!newNote.trim()}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                >
                  <Send size={14} />
                  Add Note
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
