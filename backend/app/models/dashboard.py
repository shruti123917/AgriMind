"""
Dashboard and crop lifecycle API models.
"""

from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, Field


class CropStatusResponse(BaseModel):
    current_stage: str
    days_since_sowing: int
    next_task: str
    days_until_task: int


class InsightsResponse(BaseModel):
    crop_health_score: Optional[float] = None
    weather_risk: Optional[str] = None
    disease_risk: Optional[str] = None
    expected_yield: Optional[str] = None
    estimated_profit: Optional[str] = None


class TimelineStage(BaseModel):
    stage: str
    task: str
    start_date: str
    end_date: str
    is_current: bool
    is_completed: bool


class DashboardResponse(BaseModel):
    profile_id: str
    name: str
    location: str
    farm_size: float
    soil_type: str
    current_crop: str
    water_availability: str
    sowing_date: date
    crop_status: CropStatusResponse
    insights: InsightsResponse
    timeline: list[TimelineStage]
