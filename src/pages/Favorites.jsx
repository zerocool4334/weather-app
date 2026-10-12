import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFavorites, removeFavorite } from '../services/favorites'

export default function Favorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    setFavorites(getFavorites())
  }, [])

  const handleRemove = (name) => {
    setFavorites(removeFavorite(name))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-10 pb-16">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center">
        ❤️ Your Favorites
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-white/60">
            You haven't added any cities yet.
          </p>
          <Link
            to="/"
            className="inline-block mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 font-semibold hover:from-sky-400 hover:to-indigo-400 transition"
          >
            Search a city
          </Link>
        </div>
      ) : (
        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {favorites.map((fav) => (
            <li
              key={fav.name}
              className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10"
            >
              <Link
                to={`/city/${encodeURIComponent(fav.name)}`}
                className="flex-1 hover:text-sky-300 transition"
              >
                <p className="font-semibold">{fav.name}</p>
                <p className="text-xs text-white/50">{fav.country}</p>
              </Link>
              <button
                type="button"
                onClick={() => handleRemove(fav.name)}
                className="text-sm text-red-300 hover:text-red-200 px-3 py-1 rounded-lg hover:bg-red-500/10 transition"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}