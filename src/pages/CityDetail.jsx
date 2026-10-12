import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchWeatherByCity } from '../services/weatherApi'
import WeatherCard from '../components/WeatherCard'
import Skeleton from '../components/Skeleton'

export default function CityDetail() {
  const { cityName } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    setData(null)

    fetchWeatherByCity(cityName)
      .then((res) => {
        if (!cancelled) setData(res)
      })
      .catch(() => {
        if (!cancelled) setError('Could not load weather for this city.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [cityName])

  return (
    <div className="max-w-4xl mx-auto px-4 pt-8 pb-16">
      <Link
        to="/cities"
        className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white transition"
      >
        ← Back to cities
      </Link>

      {loading && <Skeleton />}

      {!loading && error && (
        <div
          role="alert"
          className="max-w-xl mx-auto mt-8 px-4 py-3 rounded-xl bg-red-500/15 border border-red-400/30 text-red-100 text-center"
        >
          {error}
        </div>
      )}

      {!loading && !error && data && <WeatherCard weatherData={data} />}
    </div>
  )
}