"""Farmer profile service functions."""

from datetime import date, datetime, timezone

from bson import ObjectId
from fastapi import HTTPException, status

from app.database.mongodb import get_database
from app.models.farmer import (
    FarmerProfileCreate,
    FarmerProfileResponse,
    FarmerProfileUpdate,
)

COLLECTION_NAME = "farmer_profiles"


def _collection():
    return get_database()[COLLECTION_NAME]


def _build_location(profile: FarmerProfileCreate | FarmerProfileUpdate) -> str | None:
    if getattr(profile, "location", None):
        return profile.location

    parts = [
        getattr(profile, "village", None),
        getattr(profile, "district", None),
        getattr(profile, "state", None),
    ]
    cleaned = [part for part in parts if part]
    if not cleaned:
        return None
    return ", ".join(cleaned)


def _serialize_document(document: dict) -> FarmerProfileResponse:
    return FarmerProfileResponse(
        id=str(document["_id"]),
        name=document["name"],
        age=document["age"],
        gender=document["gender"],
        village=document["village"],
        district=document["district"],
        state=document["state"],
        farm_size=document["farm_size"],
        soil_type=document["soil_type"],
        location=document.get("location"),
        current_crop=document.get("current_crop"),
        water_availability=document.get("water_availability"),
        sowing_date=document.get("sowing_date"),
        created_at=document["created_at"],
        updated_at=document["updated_at"],
    )


def _normalize_payload(
    profile: FarmerProfileCreate | FarmerProfileUpdate,
    *,
    fill_defaults: bool,
) -> dict:
    payload = profile.model_dump(exclude_none=True)
    payload["location"] = _build_location(profile)

    if fill_defaults:
        payload["current_crop"] = payload.get("current_crop") or ""
        payload["water_availability"] = payload.get("water_availability") or ""
        payload["sowing_date"] = (
            payload["sowing_date"].isoformat()
            if isinstance(payload.get("sowing_date"), date)
            else payload.get("sowing_date") or date.today().isoformat()
        )
    elif isinstance(payload.get("sowing_date"), date):
        payload["sowing_date"] = payload["sowing_date"].isoformat()

    return payload


async def create_farmer_profile(profile: FarmerProfileCreate) -> FarmerProfileResponse:
    document = _normalize_payload(profile, fill_defaults=True)
    now = datetime.now(timezone.utc)
    document["created_at"] = now
    document["updated_at"] = now

    result = await _collection().insert_one(document)
    document["_id"] = result.inserted_id
    return _serialize_document(document)


async def get_farmer_profile(profile_id: str) -> FarmerProfileResponse:
    if not ObjectId.is_valid(profile_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid profile ID")

    document = await _collection().find_one({"_id": ObjectId(profile_id)})
    if document is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")
    return _serialize_document(document)


async def list_farmer_profiles() -> list[FarmerProfileResponse]:
    profiles: list[FarmerProfileResponse] = []
    async for document in _collection().find().sort("created_at", -1):
        profiles.append(_serialize_document(document))
    return profiles


async def update_farmer_profile(
    profile_id: str,
    updates: FarmerProfileUpdate,
) -> FarmerProfileResponse:
    if not ObjectId.is_valid(profile_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid profile ID")

    payload = _normalize_payload(updates, fill_defaults=False)
    update_data = {key: value for key, value in payload.items() if value is not None}

    if not update_data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields to update")

    update_data["updated_at"] = datetime.now(timezone.utc)
    result = await _collection().update_one(
        {"_id": ObjectId(profile_id)},
        {"$set": update_data},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")

    document = await _collection().find_one({"_id": ObjectId(profile_id)})
    if document is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")
    return _serialize_document(document)


async def delete_farmer_profile(profile_id: str) -> None:
    if not ObjectId.is_valid(profile_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid profile ID")

    result = await _collection().delete_one({"_id": ObjectId(profile_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")
