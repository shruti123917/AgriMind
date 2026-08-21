export default function WeatherCard({ weather }) {
  if (!weather) return null

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">
        Current Weather
      </h3>

      <div className="space-y-2">
        <p>
          🌡 Temperature: {weather.temperature}°C
        </p>

        <p>
          💧 Humidity: {weather.humidity}%
        </p>

        <p>
          ☁ Condition: {weather.condition}
        </p>

        <p>
          🌬 Wind Speed: {weather.wind_speed} m/s
        </p>
      </div>
    </div>
  )
}