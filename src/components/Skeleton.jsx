export default function Skeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 rounded-2xl p-8 bg-white/10 border border-white/15 animate-pulse">
      <div className="h-8 w-48 bg-white/20 rounded" />
      <div className="h-4 w-40 bg-white/10 rounded mt-3" />
      <div className="mt-6 flex items-center gap-6">
        <div className="h-16 w-16 bg-white/20 rounded-full" />
        <div className="flex-1">
          <div className="h-12 w-32 bg-white/20 rounded" />
          <div className="h-4 w-40 bg-white/10 rounded mt-3" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-16 bg-white/10 rounded-xl" />
        ))}
      </div>
    </div>
  )
}