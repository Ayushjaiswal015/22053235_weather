export default function WeatherCard({ data }) {
  if (!data || !data.main || !data.weather || !data.wind) {
    return null;
  }

  const { name, main, weather, wind } = data;
  const weatherIcon = weather[0]?.icon || '';
  const temperature = Math.round(main.temp);
  const feelsLike = Math.round(main.feels_like);
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const description = weather[0]?.description || '';

  return (
    <div className="weather-card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
            <p className="text-gray-500 capitalize">{description}</p>
          </div>
          {weatherIcon && (
            <div className="weather-icon bg-gradient-to-br from-indigo-100 to-purple-100 p-3 rounded-full">
              <img
                src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                alt={description}
                className="w-16 h-16"
              />
            </div>
          )}
        </div>

        <div className="text-center mb-8">
          <p className="temperature-display text-6xl font-bold">
            {temperature}°C
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="weather-detail-card p-4 rounded-xl text-center">
            <p className="text-sm text-gray-500 mb-1">Feels Like</p>
            <p className="text-xl font-semibold text-indigo-600">{feelsLike}°C</p>
          </div>
          <div className="weather-detail-card p-4 rounded-xl text-center">
            <p className="text-sm text-gray-500 mb-1">Humidity</p>
            <p className="text-xl font-semibold text-indigo-600">{humidity}%</p>
          </div>
          <div className="weather-detail-card p-4 rounded-xl text-center">
            <p className="text-sm text-gray-500 mb-1">Wind</p>
            <p className="text-xl font-semibold text-indigo-600">{windSpeed} km/hr</p>
          </div>
        </div>
      </div>
    </div>
  );
} 