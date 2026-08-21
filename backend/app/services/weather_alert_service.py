def generate_weather_alerts(weather):
    
    alerts = []

    temp = weather["temperature"]
    humidity = weather["humidity"]
    wind = weather["wind_speed"]
    condition = weather["condition"].lower()

    if "rain" in condition:
        alerts.append(
            "🌧 Rain expected. Avoid pesticide spraying."
        )

    if temp > 35:
        alerts.append(
            "🌡 High temperature. Increase irrigation frequency."
        )

    if humidity < 40:
        alerts.append(
            "💧 Low humidity. Monitor soil moisture carefully."
        )

    if wind > 8:
        alerts.append(
            "🌬 Strong winds. Delay fertilizer application."
        )

    if not alerts:
        alerts.append(
            "✅ Weather conditions are currently favorable."
        )

    return alerts