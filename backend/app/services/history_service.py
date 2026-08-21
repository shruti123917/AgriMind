from datetime import datetime

from app.database.mongodb import get_database


async def save_disease_prediction(
    disease: str,
    confidence: float,
    recommendation: str,
):

    db = get_database()

    await db.disease_history.insert_one(
        {
            "disease": disease,
            "confidence": confidence,
            "recommendation": recommendation,
            "created_at": datetime.utcnow(),
        }
    )


async def get_disease_history():

    db = get_database()

    cursor = (
        db.disease_history
        .find()
        .sort("created_at", -1)
        .limit(50)
    )

    history = []

    async for item in cursor:

        history.append(
            {
                "id": str(item["_id"]),
                "disease": item["disease"],
                "confidence": item["confidence"],
                "recommendation": item["recommendation"],
                "created_at": item["created_at"],
            }
        )

    return history