import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import WeatherCard from '../components/WeatherCard'
import Skeleton from '../components/Skeleton'

export default function Home() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  return (
    <div className="max-w-4xl mx-auto px-4 pt-10 pb-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Check the weather
          <span className="block text-lg sm:text-xl font-normal text-white/60 mt-2">
            Any city. Right now. Plus a 7-day outlook.
          </span>
        </h1>
      </div>

      <SearchBar
        onResult={setWeatherData}
        onLoading={setLoading}
        onError={setError}
      />

      <div className="mt-8">
        {loading && <Skeleton />}

        {!loading && error && (
          <div
            role="alert"
            className="max-w-xl mx-auto mt-4 px-4 py-3 rounded-xl bg-red-500/15 border border-red-400/30 text-red-100 text-center"
          >
            {error}
          </div>
        )}

        {!loading && !error && weatherData && (
          <WeatherCard weatherData={weatherData} />
        )}
      </div>
    </div>
  )
}