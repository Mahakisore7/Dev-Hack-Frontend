import React, { useState, useEffect } from 'react';
import { Flame, Stethoscope, Car, Shield, Upload, Send, X, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getLocationName } from '../utils/locationiq.js';

const incidentTypes = [
  { id: 'Fire', label: 'Fire', icon: Flame, color: 'bg-orange-500 hover:bg-orange-600' },
  { id: 'Medical', label: 'Medical', icon: Stethoscope, color: 'bg-red-500 hover:bg-red-600' },
  { id: 'Accident', label: 'Road Accident', icon: Car, color: 'bg-yellow-500 hover:bg-yellow-600' },
  { id: 'Public Safety', label: 'Public Safety', icon: Shield, color: 'bg-blue-500 hover:bg-blue-600' }
];

const HeroPart = ({ onIncidentAdded }) => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [description, setDescription] = useState('');
  const [addressText, setAddressText] = useState(''); // Renamed for clarity
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // New Loading State

  useEffect(() => {
    // Request GPS permission automatically
    if (navigator.geolocation) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          setLatitude(lat);
          setLongitude(lng);
          fetchLocationName(lat, lng);
        },
        (error) => {
          console.log('Location access denied/error: ', error.message);
          setLoadingLocation(false);
          // Fallback default (optional)
          setLatitude(12.9716); 
          setLongitude(77.5946);
        }
      );
    }
  }, []);

  const fetchLocationName = async (lat, lng) => {
    try {
      const locationName = await getLocationName(lat, lng);
      if (locationName) {
        setAddressText(locationName);
      }
    } catch (err) {
      console.error("Error fetching location name");
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result); // This Base64 string goes to backend
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const handleClearMedia = () => {
    setMedia(null);
    setMediaPreview(null);
  };

  // 🟢 MAIN SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedType) {
      alert('Please select an Incident Type');
      return;
    }
    if (!description.trim()) {
      alert('Please fill the Description');
      return;
    }

    setIsSubmitting(true);

    // 1. Get Token (CRITICAL FIX)
    const token = localStorage.getItem("token");
    if (!token) {
        alert("You must be logged in to report!");
        setIsSubmitting(false);
        navigate('/login'); // Redirect to login if no token
        return;
    }

    // 2. Prepare Data (Matching Backend Structure)
    const newIncident = {
      type: selectedType,
      description: description.trim(),
      location: {
        lat: latitude || 0,
        lng: longitude || 0,
        address: addressText || "Unknown Location"
      },
      image: mediaPreview // Backend expects "image", not "media"
    };

    try {
      const res = await fetch('http://localhost:5000/api/incidents', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'token': token // <--- HEADERS FIX
        },
        body: JSON.stringify(newIncident),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit incident');
      }

      // Success!
      alert("Incident Reported Successfully!");
      setSelectedType(null);
      setDescription('');
      setAddressText('');
      handleClearMedia();
      
      // Go back to feed
      navigate('/user', { replace: true });

    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <section id="report" className="min-h-screen pt-20 pb-16 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Report an Incident</h2>
          <p className="text-gray-500">Help your community by reporting incidents in your area</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
          {/* Incident Type Buttons */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-3">Select Incident Type *</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {incidentTypes.map(({ id, label, icon: Icon, color }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedType(id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                    selectedType === id
                      ? `${color} text-white shadow-lg scale-105`
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
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
            <label className="block text-sm font-medium text-gray-900 mb-2">Location </label>
            <div className="relative">
              <input
                type="text"
                value={addressText}
                onChange={(e) => setAddressText(e.target.value)}
                placeholder="Enter the incident location"
                disabled={loadingLocation}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
              />
              {loadingLocation && (
                <Loader size={18} className="absolute right-3 top-3 text-blue-600 animate-spin" />
              )}
            </div>
            {latitude && longitude && (
              <p className="text-xs text-green-600 mt-2">
                 ✓ GPS Active: {latitude.toFixed(4)}, {longitude.toFixed(4)}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the incident in detail..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
          </div>

          {/* Media Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">Add Photo (Optional)</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleMediaChange}
                className="hidden"
                id="media-upload"
              />
              <label
                htmlFor="media-upload"
                className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-black hover:bg-gray-50 transition-colors"
              >
                <Upload size={20} className="text-gray-400" />
                <span className="text-gray-500">
                  {media ? media.name : 'Click to upload image'}
                </span>
              </label>
            </div>
            {mediaPreview && (
              <div className="mt-3 relative">
                <img src={mediaPreview} alt="Preview" className="w-full max-h-48 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={handleClearMedia}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white transition-colors ${
                isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
            }`}
          >
            {isSubmitting ? <Loader className="animate-spin" /> : <Send size={20} />}
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroPart;