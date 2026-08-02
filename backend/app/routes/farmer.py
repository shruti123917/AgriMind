"""Farmer profile API routes."""

from fastapi import APIRouter, Response, status

from app.models.farmer import FarmerProfileCreate, FarmerProfileResponse, FarmerProfileUpdate
from app.services.farmer_service import (
    create_farmer_profile,
    delete_farmer_profile,
    get_farmer_profile,
    list_farmer_profiles,
    update_farmer_profile,
)

router = APIRouter(prefix="/api/farmer", tags=["Farmer Profile"])


@router.post("/profile", response_model=FarmerProfileResponse, status_code=status.HTTP_201_CREATED)
async def create_farmer_profile_route(profile: FarmerProfileCreate):
    return await create_farmer_profile(profile)


@router.get("/profile/{profile_id}", response_model=FarmerProfileResponse)
async def get_farmer_profile_route(profile_id: str):
    return await get_farmer_profile(profile_id)


@router.get("/profiles", response_model=list[FarmerProfileResponse])
async def list_farmer_profiles_route():
    return await list_farmer_profiles()


@router.put("/profile/{profile_id}", response_model=FarmerProfileResponse)
async def update_farmer_profile_route(profile_id: str, updates: FarmerProfileUpdate):
    return await update_farmer_profile(profile_id, updates)


@router.delete("/profile/{profile_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_farmer_profile_route(profile_id: str):
    await delete_farmer_profile(profile_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
