import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';

function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className="pt-4 pb-8"> 
      <div className="max-w-4xl mx-auto">
        <button className="header-button">
          <h2>Weather App</h2>
        </button>
        
        <SearchBar 
          setWeatherData={setWeatherData}
          setLoading={setLoading}
          setError={setError}
        />
        
        {loading && (
          <div className="text-center text-white text-xl">Loading weather data...</div>
        )}
        
        {error && <div className="error">{error}</div>}
        
        {weatherData && <WeatherCard weatherData={weatherData} />}
      </div>
    </div>
  );
}

export default Home;