// LocationIQ API utility
const LOCATIONIQ_API_KEY = 'pk.ecdc1396e32b333a086b9bb4bd337144';
const LOCATIONIQ_BASE_URL = 'https://us1.locationiq.com/v1/search';

export const getLocationName = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${LOCATIONIQ_BASE_URL}?key=${LOCATIONIQ_API_KEY}&q=${latitude}%2C%20${longitude}&format=json`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch location');
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      return data[0].display_name;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching location name:', error);
    return null;
  }
};
