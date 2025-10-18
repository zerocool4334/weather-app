import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import Cities from './pages/Cities'
import CityDetail from './pages/CityDetail'
import Favorites from './pages/Favorites'
import NotFound from './pages/NotFound'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const HomeContent = () => (
    <>
      <SearchBar 
        setWeatherData={setWeatherData} 
        setLoading={setLoading} 
        setError={setError}
      />
      
      <div className="content-container">
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {weatherData && <WeatherCard weatherData={weatherData} />}
      </div>
    </>
  )

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/city/:cityName" element={<CityDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App