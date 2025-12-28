import React, { useState, useEffect } from 'react';
import { Flame, Stethoscope, Car, Shield, Upload, Send, X } from 'lucide-react';
import { addIncident } from '../data/incidents.jsx';

const incidentTypes = [
  { id: 'fire', label: 'Fire', icon: Flame, color: 'bg-orange-500 hover:bg-orange-600' },
  { id: 'medical', label: 'Medical', icon: Stethoscope, color: 'bg-red-500 hover:bg-red-600' },
  { id: 'road accident', label: 'Road Accident', icon: Car, color: 'bg-yellow-500 hover:bg-yellow-600' },
  { id: 'public safety', label: 'Public Safety', icon: Shield, color: 'bg-blue-500 hover:bg-blue-600' }
];

const HeroReport = ({ onIncidentAdded }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  useEffect(() => {
    // Request GPS permission automatically when component loads
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          setLatitude(lat);
          setLongitude(lng);
        },
        (error) => {
          console.log('Location access: ', error.message);
        }
      );
    }
  }, []);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const handleClearMedia = () => {
    setMedia(null);
    setMediaPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedType ) {
      alert('Please fill the Type');
      return;
    }

    const finalLocation = location || (latitude && longitude ? `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` : '');

    const newIncident = {
      type: selectedType,
      description,
      location: finalLocation,
      latitude,
      longitude,
      media: mediaPreview,
      status: 'unverified'
    };

    addIncident(newIncident);
    onIncidentAdded();

    // Reset form
    setSelectedType(null);
    setDescription('');
    setLocation('');
    handleClearMedia();
  };

  return (
    <section id="report" className="min-h-screen pt-20 pb-16 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Report an Incident</h2>
          <p className="text-muted-foreground">Help your community by reporting incidents in your area</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 shadow-lg">
          {/* Incident Type Buttons */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-3">Select Incident Type *</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {incidentTypes.map(({ id, label, icon: Icon, color }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedType(id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                    selectedType === id
                      ? `${color} text-white ring-2 ring-offset-2 ring-offset-background ring-primary`
                      : 'bg-muted hover:bg-muted/80 text-foreground'
                  }`}
                >
                  <Icon size={24} className="mb-2" />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">Location (Optional)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter the incident location"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            {latitude && longitude && !location && (
              <p className="text-xs text-blue-600 mt-2">📍 GPS coordinates saved: {latitude.toFixed(6)}, {longitude.toFixed(6)}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">Description (Optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the incident in detail..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
            />
          </div>

          {/* Media Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">Add Media (Optional)</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaChange}
                className="hidden"
                id="media-upload"
              />
              <label
                htmlFor="media-upload"
                className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-900 hover:bg-gray-100 transition-colors"
              >
                <Upload size={20} className="text-muted-foreground" />
                <span className="text-gray-500">
                  {media ? media.name : 'Click to upload image or video'}
                </span>
              </label>
            </div>
            {mediaPreview && (
              <div className="mt-3">
                <div className="relative">
                  <img src={mediaPreview} alt="Preview" className="w-full max-h-48 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={handleClearMedia}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
          >
            <Send size={20} />
            Submit Report
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroReport;
