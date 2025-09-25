import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WeatherCard from '../components/WeatherCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteCities') || '[]');
    setFavorites(savedFavorites);

    const fetchFavoritesWeather = async () => {
      setLoading(true);
      const data = {};
      
      for (const city of savedFavorites) {
        try {
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
          
          data[city] = {
            city: name,
            country: country,
            latitude: latitude,
            longitude: longitude,
            current: weatherData.current,
            daily: weatherData.daily
          };
        } catch (error) {
          console.error(`Error fetching weather for ${city}:`, error);
          data[city] = null;
        }
      }
      
      setWeatherData(data);
      setLoading(false);
    };

    if (savedFavorites.length > 0) {
      fetchFavoritesWeather();
    } else {
      setLoading(false);
    }
  }, []);

  const removeFavorite = (cityName) => {
    const updatedFavorites = favorites.filter(city => city !== cityName);
    setFavorites(updatedFavorites);
    setWeatherData(prev => {
      const newData = { ...prev };
      delete newData[cityName];
      return newData;
    });
    localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
  };

  if (loading) {
    return (
      <div className="pt-4 pb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">Favorite Cities</h1>
          <div className="text-white">Loading weather data...</div>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="pt-4 pb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">Favorite Cities</h1>
          <p className="text-gray-200">No favorite cities yet. Add some from the Cities page!</p>
          <Link to="/cities" className="text-blue-300 hover:underline mt-4 inline-block">
            Browse Cities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-8 md:pt-4">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Favorite Cities</h1>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          {favorites.map((city) => (
            <div key={city} className="relative">
              <button
                onClick={() => removeFavorite(city)}
                className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center"
                style={{ transform: 'translate(50%, -50%)' }}
              >
                ✕
              </button>
              
              <div className="weather-card-wrapper">
                {weatherData[city] ? (
                  <WeatherCard weatherData={weatherData[city]} />
                ) : (
                  <div className="weather-card">
                    <h2 className="text-xl font-semibold text-white capitalize">{city}</h2>
                    <p className="text-gray-200 mt-2">Weather data unavailable</p>
                    <Link 
                      to={`/city/${city.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-blue-300 hover:underline mt-4 inline-block"
                    >
                      View details anyway →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;