// Create this as a NEW file
import axios from 'axios';

export const getWeather = async (city) => {
  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    const geoResponse = await axios.get(geoUrl);
    
    if (!geoResponse.data.results?.[0]) {
      throw new Error('City not found');
    }
    
    const { latitude, longitude } = geoResponse.data.results[0];
    
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`;
    const weatherResponse = await axios.get(weatherUrl);
    
    // Weather code to icon mapping
    const getWeatherIcon = (code) => {
      if (code === 0) return '☀️';
      if (code <= 3) return '🌤️';
      if (code <= 67) return '🌧️';
      if (code <= 86) return '🌨️';
      return '⛈️';
    };
    
    return {
      temperature: Math.round(weatherResponse.data.current.temperature_2m),
      condition: weatherResponse.data.current.weather_code,
      icon: getWeatherIcon(weatherResponse.data.current.weather_code)
    };
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};