import { useState } from 'react'
import axios from 'axios'

const SearchBar = ({ setWeatherData, setLoading, setError }) => {
  const [city, setCity] = useState('')

  const fetchWeather = async (e) => {
    e.preventDefault()
    if (!city.trim()) return
    
    setLoading(true)
    setError('')
    
    try {
      const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      const geoResponse = await axios.get(geocodingUrl)
      
      if (!geoResponse.data.results?.[0]) {
        throw new Error('City not found')
      }
      
      const { latitude, longitude, name, country } = geoResponse.data.results[0]
      
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
      const weatherResponse = await axios.get(weatherUrl)
      
      setWeatherData({
        city: name,
        country: country,
        latitude: latitude,
        longitude: longitude,
        current: weatherResponse.data.current,
        daily: weatherResponse.data.daily
      })
    } catch (err) {
      setError('City not found. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={fetchWeather} className="search-bar">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar