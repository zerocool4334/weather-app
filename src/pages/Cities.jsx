import { useState, useEffect } from 'react';
import { getWeather } from '../services/weatherApi';
import WeatherCard from '../components/WeatherCard';

const Cities = () => {
  const [cities] = useState([
    'New York', 'London', 'Tokyo', 'Paris', 'Sydney',
    'Dubai', 'Moscow', 'Berlin', 'Rome', 'Madrid',
    'Toronto', 'Singapore', 'Seoul', 'Mumbai', 'Cairo'
  ]);
  
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [detailedWeather, setDetailedWeather] = useState(null);

  const toggleFavorite = (city) => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteCities') || '[]');
    const isFavorite = savedFavorites.includes(city);
    
    const updatedFavorites = isFavorite 
      ? savedFavorites.filter(fav => fav !== city)
      : [...savedFavorites, city];
    
    localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const fetchDetailedWeather = async (city) => {
    try {
      setSelectedCity(city);
      
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();
      
      if (!geoData.results?.[0]) {
        throw new Error('City not found');
      }
      
      const { latitude, longitude, name, country } = geoData.results[0];
      
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();
      
      setDetailedWeather({
        city: name,
        country: country,
        latitude: latitude,
        longitude: longitude,
        current: weatherData.current,
        daily: weatherData.daily
      });
    } catch (error) {
      console.error('Error fetching detailed weather:', error);
    }
  };

  const closeDetailedView = () => {
    setSelectedCity(null);
    setDetailedWeather(null);
  };

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteCities') || '[]');
    setFavorites(savedFavorites);

    const fetchAllCitiesWeather = async () => {
      setLoading(true);
      const data = {};
      
      for (const city of cities) {
        try {
          const weather = await getWeather(city);
          data[city] = weather;
        } catch (error) {
          console.error(`Error fetching weather for ${city}:`, error);
          data[city] = { temperature: 'N/A', condition: 'Unknown', icon: '❓' };
        }
      }
      
      setWeatherData(data);
      setLoading(false);
    };

    fetchAllCitiesWeather();
  }, [cities]);

  if (loading) {
    return (
      <div className="pt-4 pb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-white">World Cities Weather</h1>
          <div className="loading-container">
            <div className="loader">Loading<span></span></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4 pb-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">World Cities Weather</h1>
        
        {selectedCity && (
          <button 
            onClick={closeDetailedView}
            className="mb-6 px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition duration-200 text-white"
          >
            ← Back to Cities List
          </button>
        )}
        
        {selectedCity && detailedWeather && (
          <div className="max-w-4xl mx-auto mb-8">
            <WeatherCard weatherData={detailedWeather} />
          </div>
        )}
        
        {!selectedCity && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {cities.map((city) => {
              const isFavorite = favorites.includes(city);
              
              return (
                <div 
                  key={city} 
                  className="city-card cursor-pointer h-full flex flex-col transform hover:scale-105 transition-transform duration-200"
                  onClick={() => fetchDetailedWeather(city)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-white flex-1 truncate mr-2" title={city}>
                      {city}
                    </h3>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(city);
                      }}
                      className="text-2xl z-10 like-button flex-shrink-0"
                    >
                      {isFavorite ? '❤️' : '🤍'}
                    </button>
                  </div>
                  
                  {weatherData[city] && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl font-bold text-white">
                        {weatherData[city].temperature}°C
                      </span>
                      <span className="text-3xl">{weatherData[city].icon}</span>
                    </div>
                  )}
                  
                  <p className="text-gray-200 mt-2 text-sm flex-1">
                    {weatherData[city]?.condition || 'Weather unavailable'}
                  </p>
                  
                  <div className="mt-3 text-center pt-2 border-t border-white border-opacity-20">
                    <span className="text-blue-300 text-sm">Click for details →</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cities;