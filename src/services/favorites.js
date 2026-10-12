const KEY = 'weather-app:favorites'

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

export function addFavorite(city) {
  const list = getFavorites()
  if (!list.find((c) => c.name.toLowerCase() === city.name.toLowerCase())) {
    list.push(city)
    localStorage.setItem(KEY, JSON.stringify(list))
  }
  return list
}

export function removeFavorite(name) {
  const list = getFavorites().filter(
    (c) => c.name.toLowerCase() !== name.toLowerCase(),
  )
  localStorage.setItem(KEY, JSON.stringify(list))
  return list
}

export function isFavorite(name) {
  return getFavorites().some(
    (c) => c.name.toLowerCase() === name.toLowerCase(),
  )
}