const API_KEY = '6d3120ef96036f432a2c32ff2d16e41a'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function getWeatherByCity(city) {
  if (!city || typeof city !== 'string') {
    throw new Error('Please enter a valid city name');
  }

  try {
    const response = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please contact the administrator.');
      } else {
        throw new Error('Failed to fetch weather data. Please try again later.');
      }
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
} 