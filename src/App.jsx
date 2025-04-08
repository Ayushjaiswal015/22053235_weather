import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import { getWeatherByCity } from './services/weatherService';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastCity, setLastCity] = useState('');
  const [isDark, setIsDark] = useState(false);

  const handleSearch = async (city) => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null);
    setLastCity(city);
    
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (lastCity) {
      await handleSearch(lastCity);
    }
  };

  return (
    <div className={`min-h-screen mx-auto text-center ${isDark ? 'dark-mode' : 'bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100'}`}>
      <div className="app-container mx-auto text-center">
        <div className="header-container text-center mx-auto text-center relative">
          <button
            onClick={() => setIsDark(!isDark)}
            className="theme-toggle-button"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <h1 className={`text-center align-items-center justify-items-center text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${isDark ? 'dark-title' : 'from-indigo-600 to-purple-600'} mb-2`}>
            Weather Forecast
          </h1>
          <p className={isDark ? 'text-white' : 'text-gray-600'}>
            Check the weather for any city around the world
          </p>
        </div>
        
        <div className="search-container">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {loading && (
          <div className="component-container flex justify-center items-center">
            <Loader />
          </div>
        )}
        
        {error && (
          <div className="component-container">
            <ErrorMessage message={error} />
          </div>
        )}
        
        {weather && (
          <div className="component-container relative">
            <button 
              onClick={handleRefresh}
              className="refresh-button"
              title="Refresh weather data"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-indigo-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                />
              </svg>
            </button>
            <WeatherCard data={weather} />
          </div>
        )}
      </div>
    </div>
  );
}
