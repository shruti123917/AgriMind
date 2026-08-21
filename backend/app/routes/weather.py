from fastapi import APIRouter

from app.services.weather_service import get_weather

router = APIRouter(
    prefix="/api/weather",
    tags=["Weather"]
)


@router.get("/{city}")
async def weather(city: str):

    return await get_weather(city)