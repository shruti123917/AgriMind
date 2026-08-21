from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services.yield_prediction_service import (
    predict_yield,
)


router = APIRouter(
    prefix="/api/yield",
    tags=["Yield Prediction"],
)


class YieldPredictionRequest(BaseModel):

    year: int = Field(
        ...,
        ge=1990,
        le=2100,
    )

    state: str = Field(
        ...,
        min_length=1,
    )

    crop: str = Field(
        ...,
        min_length=1,
    )

    season: str = Field(
        ...,
        min_length=1,
    )

    area: float = Field(
        ...,
        gt=0,
    )

    annual_rainfall: float = Field(
        ...,
        ge=0,
    )

    fertilizer: float = Field(
        ...,
        ge=0,
    )

    pesticide: float = Field(
        ...,
        ge=0,
    )


class YieldPredictionResponse(BaseModel):

    predicted_yield: float

    estimated_production: float

    unit: str

    production_unit: str


@router.post(
    "",
    response_model=YieldPredictionResponse,
)
async def get_yield_prediction(
    request: YieldPredictionRequest,
):

    try:

        result = predict_yield(
            year=request.year,
            state=request.state,
            crop=request.crop,
            season=request.season,
            area=request.area,
            annual_rainfall=request.annual_rainfall,
            fertilizer=request.fertilizer,
            pesticide=request.pesticide,
        )

        return result

    except FileNotFoundError as error:

        raise HTTPException(
            status_code=500,
            detail=str(error),
        )

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Yield prediction failed: {error}",
        )