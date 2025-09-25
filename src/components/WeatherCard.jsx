const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null

  const { city, country, current, daily } = weatherData
  
  const getWeatherDescription = (code) => {
    const weatherCodes = {
      0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
      45: "Fog", 48: "Depositing rime fog", 51: "Light drizzle", 53: "Moderate drizzle",
      55: "Dense drizzle", 56: "Light freezing drizzle", 57: "Dense freezing drizzle",
      61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain", 66: "Light freezing rain",
      67: "Heavy freezing rain", 71: "Slight snow fall", 73: "Moderate snow fall",
      75: "Heavy snow fall", 77: "Snow grains", 80: "Slight rain showers",
      81: "Moderate rain showers", 82: "Violent rain showers", 85: "Slight snow showers",
      86: "Heavy snow showers", 95: "Thunderstorm", 96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail"
    }
    return weatherCodes[code] || "Unknown"
  }

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="weather-card">
      <h2>{city}, {country}</h2>
      <p className="date">{today}</p>
      
      <div className="current-weather">
        <p className="temperature">{Math.round(current.temperature_2m)}°C</p>
        <p className="apparent-temp">Feels like: {Math.round(current.apparent_temperature)}°C</p>
        <p className="description">{getWeatherDescription(current.weather_code)}</p>
      </div>
      
      <div className="weather-details">
        <div className="detail">
          <span className="label">Humidity:</span>
          <span className="value">{current.relative_humidity_2m}%</span>
        </div>
        <div className="detail">
          <span className="label">Wind:</span>
          <span className="value">{current.wind_speed_10m} km/h</span>
        </div>
        <div className="detail">
          <span className="label">Pressure:</span>
          <span className="value">{current.pressure_msl} hPa</span>
        </div>
      </div>
      
      <div className="forecast">
        <h3>7-Day Forecast</h3>
        <div className="forecast-days">
          {daily.time.map((date, index) => (
            <div key={index} className="forecast-day">
              <p>{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
              <p>{getWeatherDescription(daily.weather_code[index])}</p>
              <p>{Math.round(daily.temperature_2m_min[index])}° / {Math.round(daily.temperature_2m_max[index])}°</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WeatherCard