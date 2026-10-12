import { Link, NavLink } from 'react-router-dom'

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? 'bg-white/15 text-white'
      : 'text-white/70 hover:text-white hover:bg-white/10'
  }`

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-slate-900/60 border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-extrabold tracking-tight"
        >
          <span className="text-2xl">🌤️</span>
          <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            WeatherApp
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/cities" className={navLinkClass}>
            Cities
          </NavLink>
          <NavLink to="/favorites" className={navLinkClass}>
            <span aria-hidden>❤️</span>
            <span className="hidden sm:inline ml-1">Favorites</span>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}