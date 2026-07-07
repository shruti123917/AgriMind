"""
Farmer profile data models.
Used for storing and validating farmer details in MongoDB.
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class FarmerProfileCreate(BaseModel):
    """Fields submitted when a farmer creates/updates their profile."""
    name: str = Field(..., min_length=1, max_length=100)
    location: str = Field(..., min_length=1)
    farm_size: float = Field(..., gt=0, description="Farm size in acres")
    soil_type: str = Field(..., min_length=1)
    current_crop: str = Field(..., min_length=1)
    water_availability: str = Field(..., description="e.g. Low, Medium, High")


class FarmerProfileResponse(FarmerProfileCreate):
    """Profile returned from the API, includes database id and timestamp."""
    id: str
    created_at: datetime
    updated_at: datetime


class FarmerProfileUpdate(BaseModel):
    """All fields optional for partial profile updates."""
    name: Optional[str] = None
    location: Optional[str] = None
    farm_size: Optional[float] = Field(None, gt=0)
    soil_type: Optional[str] = None
    current_crop: Optional[str] = None
    water_availability: Optional[str] = None
