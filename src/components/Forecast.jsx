import { getWeatherDescription, getWeatherIcon } from '../services/weatherApi'

export default function Forecast({ daily }) {
  if (!daily?.time?.length) return null

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-3">7-Day Forecast</h3>
      <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
        {daily.time.map((date, i) => (
          <div
            key={date}
            className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/5 border border-white/10"
          >
            <p className="text-xs text-white/70">
              {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <span className="text-2xl" aria-hidden>
              {getWeatherIcon(daily.weather_code[i])}
            </span>
            <p className="text-xs text-white/60 text-center leading-tight">
              {getWeatherDescription(daily.weather_code[i])}
            </p>
            <p className="text-sm font-semibold mt-1">
              {Math.round(daily.temperature_2m_max[i])}°
              <span className="text-white/50 font-normal">
                {' '}
                / {Math.round(daily.temperature_2m_min[i])}°
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}