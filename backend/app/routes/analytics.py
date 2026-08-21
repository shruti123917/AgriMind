from collections import Counter

from fastapi import APIRouter

from app.database.mongodb import get_database

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/dashboard")
async def dashboard_analytics():

    db = get_database()

    predictions = await db.disease_history.find().to_list(1000)

    total_predictions = len(predictions)

    if total_predictions == 0:
        return {
            "total_predictions": 0,
            "most_common_disease": "N/A",
            "latest_prediction": "N/A",
            "average_confidence": 0,
        }

    diseases = [p["disease"] for p in predictions]

    most_common = Counter(diseases).most_common(1)[0][0]

    latest = predictions[-1]["disease"]

    avg_confidence = round(
        sum(p["confidence"] for p in predictions)
        / total_predictions,
        2
    )

    return {
        "total_predictions": total_predictions,
        "most_common_disease": most_common,
        "latest_prediction": latest,
        "average_confidence": avg_confidence,
    }