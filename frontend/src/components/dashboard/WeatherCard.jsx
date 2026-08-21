export default function WeatherCard({ weather }) {
  if (!weather) return null

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">
        Current Weather
      </h3>

      <div className="space-y-2">
        <p>🌡 Temperature: {weather.temperature}°C</p>
        <p>💧 Humidity: {weather.humidity}%</p>
        <p>☁ Condition: {weather.condition}</p>
        <p>🌬 Wind Speed: {weather.wind_speed} m/s</p>
      </div>

      <div className="mt-5">
        <h4 className="font-semibold mb-3">
          Smart Alerts
        </h4>

        {weather.alerts?.map((alert, index) => (
          <div
            key={index}
            className="mb-2 rounded-xl border-l-4 border-yellow-500 bg-yellow-50 p-3 text-sm shadow-sm"
          >
            {alert}
          </div>
        ))}
      </div>
    </div>
  )
}