from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.disease_detection_service import detect_disease
from app.services.history_service import save_disease_prediction

router = APIRouter()


@router.post("/disease-detection")
async def disease_detection(
    file: UploadFile = File(...)
):
    try:

        image_bytes = await file.read()

        result = detect_disease(image_bytes)

        await save_disease_prediction(
            disease=result["disease"],
            confidence=result["confidence"],
            recommendation=result["recommendation"]
        )

        return {
            "success": True,
            "disease": result["disease"],
            "confidence": result["confidence"],
            "recommendation": result["recommendation"]
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )