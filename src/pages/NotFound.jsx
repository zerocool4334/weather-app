import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <p className="text-7xl font-extrabold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
        404
      </p>
      <h1 className="text-2xl font-bold mt-4">Page not found</h1>
      <p className="text-white/60 mt-2">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-block mt-6 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 font-semibold hover:from-sky-400 hover:to-indigo-400 transition"
      >
        Back home
      </Link>
    </div>
  )
}