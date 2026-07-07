"""
Farmer Profile API routes.
CRUD operations for storing farmer details in MongoDB.
"""

from datetime import datetime, timezone

from bson import ObjectId
from fastapi import APIRouter, HTTPException

from app.database.mongodb import get_database
from app.models.farmer import (
    FarmerProfileCreate,
    FarmerProfileResponse,
    FarmerProfileUpdate,
)

router = APIRouter(prefix="/api/farmer", tags=["Farmer Profile"])


def _serialize_profile(doc: dict) -> FarmerProfileResponse:
    """Convert MongoDB document to API response model."""
    return FarmerProfileResponse(
        id=str(doc["_id"]),
        name=doc["name"],
        location=doc["location"],
        farm_size=doc["farm_size"],
        soil_type=doc["soil_type"],
        current_crop=doc["current_crop"],
        water_availability=doc["water_availability"],
        created_at=doc["created_at"],
        updated_at=doc["updated_at"],
    )


@router.post("/profile", response_model=FarmerProfileResponse)
async def create_farmer_profile(profile: FarmerProfileCreate):
    """Create a new farmer profile."""
    db = get_database()
    now = datetime.now(timezone.utc)

    doc = {
        **profile.model_dump(),
        "created_at": now,
        "updated_at": now,
    }
    result = await db.farmer_profiles.insert_one(doc)
    doc["_id"] = result.inserted_id
    return _serialize_profile(doc)


@router.get("/profile/{profile_id}", response_model=FarmerProfileResponse)
async def get_farmer_profile(profile_id: str):
    """Get a farmer profile by ID."""
    db = get_database()
    if not ObjectId.is_valid(profile_id):
        raise HTTPException(status_code=400, detail="Invalid profile ID")

    doc = await db.farmer_profiles.find_one({"_id": ObjectId(profile_id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Profile not found")
    return _serialize_profile(doc)


@router.get("/profiles", response_model=list[FarmerProfileResponse])
async def list_farmer_profiles():
    """List all farmer profiles (for dashboard demo)."""
    db = get_database()
    profiles = []
    async for doc in db.farmer_profiles.find().sort("created_at", -1):
        profiles.append(_serialize_profile(doc))
    return profiles


@router.put("/profile/{profile_id}", response_model=FarmerProfileResponse)
async def update_farmer_profile(profile_id: str, updates: FarmerProfileUpdate):
    """Update an existing farmer profile."""
    db = get_database()
    if not ObjectId.is_valid(profile_id):
        raise HTTPException(status_code=400, detail="Invalid profile ID")

    update_data = {
        k: v for k, v in updates.model_dump().items() if v is not None
    }
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")

    update_data["updated_at"] = datetime.now(timezone.utc)
    result = await db.farmer_profiles.update_one(
        {"_id": ObjectId(profile_id)},
        {"$set": update_data},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Profile not found")

    doc = await db.farmer_profiles.find_one({"_id": ObjectId(profile_id)})
    return _serialize_profile(doc)
