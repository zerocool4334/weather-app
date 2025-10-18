import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CityDetail = () => {
  const { cityName } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCityWeather = async () => {
      try {
        setLoading(true);
        const decodedCityName = cityName.replace(/-/g, ' ');
        
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${decodedCityName}&count=1`;
        const geoResponse = await axios.get(geoUrl);
        
        if (!geoResponse.data.results?.[0]) {
          throw new Error('City not found');
        }
        
        const { latitude, longitude } = geoResponse.data.results[0];
        
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
        const weatherResponse = await axios.get(weatherUrl);
        
        setWeatherData({
          ...weatherResponse.data,
          city: decodedCityName
        });
      } catch (err) {
        setError('Failed to load city data');
      } finally {
        setLoading(false);
      }
    };

    fetchCityWeather();
  }, [cityName]);

  if (loading) return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 text-center text-white">Loading...</div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 text-center text-red-300">{error}</div>
    </div>
  );

  return (
    <div className="pt-4 pb-8"> 
      <div className="container mx-auto px-4">
        <Link to="/cities" className="text-blue-300 hover:underline mb-4 inline-block">
          ← Back to Cities
        </Link>
        
        <div className="weather-card max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 capitalize">{weatherData.city}</h1>
          
          {weatherData.current && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-6xl font-bold">{Math.round(weatherData.current.temperature_2m)}°C</p>
                <p className="text-gray-200 mt-2">Current Temperature</p>
              </div>
              
              <div className="space-y-2">
                <p><strong>Humidity:</strong> {weatherData.current.relative_humidity_2m}%</p>
                <p><strong>Wind Speed:</strong> {weatherData.current.wind_speed_10m} km/h</p>
              </div>
            </div>
          )}
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">7-Day Forecast</h2>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
              {weatherData.daily.time.map((date, index) => (
                <div key={index} className="forecast-day text-center">
                  <p className="font-semibold">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                  <p>H: {Math.round(weatherData.daily.temperature_2m_max[index])}°</p>
                  <p>L: {Math.round(weatherData.daily.temperature_2m_min[index])}°</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDetail;