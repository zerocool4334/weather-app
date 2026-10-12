import { useState } from 'react'
import {
  getWeatherDescription,
  getWeatherIcon,
} from '../services/weatherApi'
import { addFavorite, isFavorite } from '../services/favorites'
import Forecast from './Forecast'

function Detail({ label, value }) {
  return (
    <div className="flex flex-col items-center px-4 py-3 bg-white/5 rounded-xl border border-white/10">
      <span className="text-xs uppercase tracking-wide text-white/60">
        {label}
      </span>
      <span className="text-base font-semibold mt-1">{value}</span>
    </div>
  )
}

export default function WeatherCard({ weatherData }) {
  const [fav, setFav] = useState(
    weatherData ? isFavorite(weatherData.city) : false,
  )

  if (!weatherData) return null
  const { city, country, current, daily } = weatherData

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const handleFavorite = () => {
    if (fav) return
    addFavorite({ name: city, country })
    setFav(true)
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 rounded-2xl p-6 sm:p-8 bg-white/10 backdrop-blur-lg border border-white/15 shadow-2xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            {city}
            <span className="text-white/60 font-medium">, {country}</span>
          </h2>
          <p className="text-sm text-white/60 mt-1">{today}</p>
        </div>
        <button
          type="button"
          onClick={handleFavorite}
          disabled={fav}
          aria-label={fav ? 'Already in favorites' : 'Add to favorites'}
          className={`text-2xl transition ${
            fav
              ? 'opacity-60 cursor-default'
              : 'hover:scale-110 active:scale-95'
          }`}
        >
          {fav ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Current */}
      <div className="mt-6 flex items-center gap-6">
        <span className="text-6xl sm:text-7xl">
          {getWeatherIcon(current.weather_code)}
        </span>
        <div>
          <p className="text-5xl sm:text-6xl font-extrabold leading-none">
            {Math.round(current.temperature_2m)}°C
          </p>
          <p className="text-sm text-white/70 mt-2">
            Feels like {Math.round(current.apparent_temperature)}°C
          </p>
          <p className="text-base font-medium mt-1">
            {getWeatherDescription(current.weather_code)}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <Detail label="Humidity" value={`${current.relative_humidity_2m}%`} />
        <Detail label="Wind" value={`${current.wind_speed_10m} km/h`} />
        <Detail label="Pressure" value={`${current.pressure_msl} hPa`} />
      </div>

      {/* Forecast */}
      <Forecast daily={daily} />
    </div>
  )
}