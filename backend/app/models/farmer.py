"""Farmer profile validation models."""

from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class FarmerProfileBase(BaseModel):
    model_config = ConfigDict(extra="ignore")

    name: str = Field(..., min_length=1, max_length=100)
    age: int = Field(..., ge=1, le=120)
    gender: str = Field(..., min_length=1, max_length=20)
    village: str = Field(..., min_length=1, max_length=100)
    district: str = Field(..., min_length=1, max_length=100)
    state: str = Field(..., min_length=1, max_length=100)
    farm_size: float = Field(..., gt=0, description="Farm size in acres")
    soil_type: str = Field(..., min_length=1, max_length=50)
    location: Optional[str] = Field(default=None, max_length=200)
    current_crop: Optional[str] = Field(default=None, max_length=100)
    water_availability: Optional[str] = Field(default=None, max_length=50)
    sowing_date: Optional[date] = None


class FarmerProfileCreate(FarmerProfileBase):
    pass


class FarmerProfileUpdate(BaseModel):
    model_config = ConfigDict(extra="ignore")

    name: Optional[str] = Field(default=None, min_length=1, max_length=100)
    age: Optional[int] = Field(default=None, ge=1, le=120)
    gender: Optional[str] = Field(default=None, min_length=1, max_length=20)
    village: Optional[str] = Field(default=None, min_length=1, max_length=100)
    district: Optional[str] = Field(default=None, min_length=1, max_length=100)
    state: Optional[str] = Field(default=None, min_length=1, max_length=100)
    farm_size: Optional[float] = Field(default=None, gt=0)
    soil_type: Optional[str] = Field(default=None, min_length=1, max_length=50)
    location: Optional[str] = Field(default=None, max_length=200)
    current_crop: Optional[str] = Field(default=None, max_length=100)
    water_availability: Optional[str] = Field(default=None, max_length=50)
    sowing_date: Optional[date] = None


class FarmerProfileResponse(FarmerProfileBase):
    id: str
    created_at: datetime
    updated_at: datetime
