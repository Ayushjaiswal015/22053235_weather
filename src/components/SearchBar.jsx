import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center">
      <div className={`flex w-full max-w-md gap-2 transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for a city..."
          className="search-input flex-grow px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300 shadow-lg"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Search
        </button>
      </div>
    </form>
  );
}
