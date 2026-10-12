import { Link } from 'react-router-dom'

const POPULAR = [
  { name: 'Damascus', country: 'Syria', icon: '🇸🇾' },
  { name: 'Istanbul', country: 'Türkiye', icon: '🇹🇷' },
  { name: 'London', country: 'United Kingdom', icon: '🇬🇧' },
  { name: 'Paris', country: 'France', icon: '🇫🇷' },
  { name: 'New York', country: 'United States', icon: '🇺🇸' },
  { name: 'Tokyo', country: 'Japan', icon: '🇯🇵' },
  { name: 'Dubai', country: 'UAE', icon: '🇦🇪' },
  { name: 'Cairo', country: 'Egypt', icon: '🇪🇬' },
  { name: 'Berlin', country: 'Germany', icon: '🇩🇪' },
  { name: 'Sydney', country: 'Australia', icon: '🇦🇺' },
  { name: 'Toronto', country: 'Canada', icon: '🇨🇦' },
  { name: 'Moscow', country: 'Russia', icon: '🇷🇺' },
]

export default function Cities() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-10 pb-16">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center">
        Popular Cities
      </h1>
      <p className="text-center text-white/60 mt-2">
        Tap any city to see its forecast.
      </p>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {POPULAR.map((city) => (
          <Link
            key={city.name}
            to={`/city/${encodeURIComponent(city.name)}`}
            className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition text-center"
          >
            <div className="text-3xl mb-2" aria-hidden>
              {city.icon}
            </div>
            <p className="font-semibold group-hover:text-sky-300 transition">
              {city.name}
            </p>
            <p className="text-xs text-white/50">{city.country}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}