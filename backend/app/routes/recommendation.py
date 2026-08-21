"""
Crop Recommendation API.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services.crop_recommendation_service import recommend_crops


router = APIRouter(
    prefix="/api/recommendation",
    tags=["Crop Recommendation"],
)


class CropRecommendationRequest(BaseModel):
    N: float = Field(..., ge=0, le=200)
    P: float = Field(..., ge=0, le=200)
    K: float = Field(..., ge=0, le=250)

    temperature: float = Field(..., ge=-10, le=60)
    humidity: float = Field(..., ge=0, le=100)

    ph: float = Field(..., ge=0, le=14)

    rainfall: float = Field(..., ge=0, le=1000)


class CropRecommendation(BaseModel):
    crop: str
    score: float


class CropRecommendationResponse(BaseModel):
    recommendations: list[CropRecommendation]


@router.post(
    "",
    response_model=CropRecommendationResponse,
)
async def get_crop_recommendation(
    request: CropRecommendationRequest,
):
    try:
        recommendations = recommend_crops(
            N=request.N,
            P=request.P,
            K=request.K,
            temperature=request.temperature,
            humidity=request.humidity,
            ph=request.ph,
            rainfall=request.rainfall,
        )

        return {
            "recommendations": recommendations
        }

    except FileNotFoundError as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Crop recommendation failed: {error}",
        )