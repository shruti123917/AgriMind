"""
Crop recommendation ML service.
"""

from pathlib import Path
import pickle

import pandas as pd


BASE_DIR = Path(__file__).resolve().parents[2]
MODEL_PATH = BASE_DIR / "ml" / "crop_model.pkl"


FEATURES = [
    "N",
    "P",
    "K",
    "temperature",
    "humidity",
    "ph",
    "rainfall",
]


_model = None


def get_model():
    global _model

    if _model is None:
        if not MODEL_PATH.exists():
            raise FileNotFoundError(
                f"Crop model not found at {MODEL_PATH}. "
                "Run: python ml/train_crop_model.py"
            )

        with open(MODEL_PATH, "rb") as file:
            _model = pickle.load(file)

    return _model


def recommend_crops(
    N: float,
    P: float,
    K: float,
    temperature: float,
    humidity: float,
    ph: float,
    rainfall: float,
):
    model = get_model()

    input_data = pd.DataFrame(
        [[
            N,
            P,
            K,
            temperature,
            humidity,
            ph,
            rainfall,
        ]],
        columns=FEATURES,
    )

    probabilities = model.predict_proba(input_data)[0]
    classes = model.classes_

    ranked = sorted(
        zip(classes, probabilities),
        key=lambda item: item[1],
        reverse=True,
    )

    recommendations = []

    for crop, probability in ranked[:3]:
        recommendations.append({
            "crop": str(crop).title(),
            "score": round(float(probability) * 100, 2),
        })

    return recommendations