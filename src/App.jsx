import { useState } from 'react';
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
    <div
      className={`min-h-screen w-full px-4 py-8 ${
        isDark
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-800'
      } transition-all duration-300`}
    >
      <div className="max-w-3xl mx-auto text-center space-y-6">
        {/* Theme toggle */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-white shadow-md hover:scale-105 transition-transform duration-200"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Weather Forecast
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Check the weather for any city around the world
          </p>
        </div>

        {/* Search */}
        <div className="w-full">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center">
            <Loader />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="max-w-md mx-auto">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Weather Card */}
        {weather && (
          <div className="relative max-w-xl mx-auto">
            <button
              onClick={handleRefresh}
              title="Refresh weather data"
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:rotate-90 transition-transform duration-300"
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
