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
        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200 mb-4">
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

      {/* Internal Notes Section */}
      <div className="border-t border-gray-200 pt-4">
        <button
          onClick={() => setShowInternalNotes(!showInternalNotes)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 mb-3"
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
                  <div key={note.id} className="bg-gray-50 rounded-lg p-3">
                    {editingNote === note.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full p-2 text-sm border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows="2"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateNote(note.id)}
                            className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingNote(null)}
                            className="px-3 py-1 text-xs bg-gray-600 text-white rounded-md hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-gray-800 mb-2">{note.text}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>by {note.adminName} • {formatNoteTime(note.timestamp)}</span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleEditNote(note.id)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Edit3 size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteNote(note.id)}
                              className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors"
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
                className="w-full p-3 text-sm border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="2"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleAddNote}
                  disabled={!newNote.trim()}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
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
