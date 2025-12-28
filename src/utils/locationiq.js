// LocationIQ API utility
const LOCATIONIQ_API_KEY = 'pk.ecdc1396e32b333a086b9bb4bd337144';

// 🟢 CHANGE: Switched to 'reverse' endpoint for coordinates -> address
const LOCATIONIQ_REVERSE_URL = 'https://us1.locationiq.com/v1/reverse';

export const getLocationName = async (latitude, longitude) => {
  if (!latitude || !longitude) return null;

  try {
    // 🟢 CHANGE: Updated parameters for reverse geocoding
    const response = await fetch(
      `${LOCATIONIQ_REVERSE_URL}?key=${LOCATIONIQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=json`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch location');
    }
    
    const data = await response.json();
    
    // 🟢 LocationIQ returns an object with 'display_name' for reverse geocoding
    if (data && data.display_name) {
      return data.display_name;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching location name:', error);
    return null;
  }
};