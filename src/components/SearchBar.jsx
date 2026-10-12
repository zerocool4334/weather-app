import { useState } from 'react'
import { fetchWeatherByCity } from '../services/weatherApi'

export default function SearchBar({ onResult, onLoading, onError }) {
  const [city, setCity] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const query = city.trim()
    if (!query) return

    onLoading?.(true)
    onError?.('')

    try {
      const data = await fetchWeatherByCity(query)
      onResult?.(data)
    } catch {
      onError?.('City not found. Please try another name.')
    } finally {
      onLoading?.(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 w-full max-w-xl mx-auto"
      role="search"
    >
      <input
        type="text"
        aria-label="City name"
        placeholder="Search a city… e.g. Damascus, Paris, Tokyo"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-sky-400/60 focus:border-transparent transition"
      />
      <button
        type="submit"
        className="px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 font-semibold text-white shadow-lg shadow-sky-500/20 hover:from-sky-400 hover:to-indigo-400 active:scale-[0.98] transition"
      >
        Search
      </button>
    </form>
  )
}