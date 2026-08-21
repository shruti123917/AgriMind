from fastapi import APIRouter

from app.services.history_service import (
    get_disease_history
)

router = APIRouter(
    prefix="/history",
    tags=["History"]
)


@router.get("/disease")
async def disease_history():

    return await get_disease_history()