from fastapi import APIRouter

from app.services.weather_service import get_weather
from app.services.weather_alert_service import (
    generate_weather_alerts,
)

router = APIRouter(
    prefix="/api/weather",
    tags=["Weather"]
)

@router.get("/{city}")
async def weather(city: str):

    weather_data = await get_weather(city)

    alerts = generate_weather_alerts(
        weather_data
    )

    weather_data["alerts"] = alerts

    return weather_data