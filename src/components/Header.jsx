import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold gradient-text">
            🌤️ WeatherApp
          </Link>
          
          <div className="flex space-x-6">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              <span className="text-white">Home</span>
            </Link>
            
            <Link 
              to="/cities" 
              className={`nav-link ${isActive('/cities') ? 'active' : ''}`}
            >
              <span className="text-white">Cities</span>
            </Link>
            
            <Link 
              to="/favorites" 
              className={`nav-link ${isActive('/favorites') ? 'active' : ''}`}
            >
              <span className="text-white">❤️ Favorites</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;