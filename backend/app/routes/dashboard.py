"""Dashboard API - crop lifecycle overview for a farmer profile."""

from datetime import date

from bson import ObjectId
from fastapi import APIRouter, HTTPException

from app.database.mongodb import get_database
from app.models.dashboard import (
    CropStatusResponse,
    DashboardResponse,
    InsightsResponse,
    TimelineStage,
)
from app.utils.crop_lifecycle import (
    days_since_sowing,
    derive_insights,
    get_crop_stage,
    get_lifecycle_timeline,
)

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


@router.get("/{profile_id}", response_model=DashboardResponse)
async def get_dashboard(profile_id: str):
    """
    Return farm overview, crop status, insights, and lifecycle timeline
    computed from the stored farmer profile.
    """
    if not ObjectId.is_valid(profile_id):
        raise HTTPException(status_code=400, detail="Invalid profile ID")

    db = get_database()
    doc = await db.farmer_profiles.find_one({"_id": ObjectId(profile_id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Profile not found")

    sowing: date | str = doc["sowing_date"]
    days = days_since_sowing(sowing)
    stage_info = get_crop_stage(days)
    insights = derive_insights(doc)
    timeline = get_lifecycle_timeline(sowing)

    return DashboardResponse(
        profile_id=str(doc["_id"]),
        name=doc["name"],
        location=doc.get("location") or ", ".join(
            part for part in [doc.get("village"), doc.get("district"), doc.get("state")] if part
        ),
        farm_size=doc["farm_size"],
        soil_type=doc["soil_type"],
        current_crop=doc.get("current_crop", ""),
        water_availability=doc.get("water_availability", ""),
        sowing_date=sowing,
        crop_status=CropStatusResponse(**stage_info),
        insights=InsightsResponse(**insights),
        timeline=[TimelineStage(**t) for t in timeline],
    )
