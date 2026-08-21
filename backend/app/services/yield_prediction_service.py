from pathlib import Path
import pickle

import pandas as pd


BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_PATH = BASE_DIR / "ml" / "yield_model.pkl"


_model_package = None


def get_model_package():

    global _model_package

    if _model_package is None:

        if not MODEL_PATH.exists():

            raise FileNotFoundError(
                f"Yield model not found at {MODEL_PATH}. "
                "Run: python ml/train_yield_model.py"
            )

        with open(
            MODEL_PATH,
            "rb",
        ) as file:

            _model_package = pickle.load(file)

    return _model_package


def predict_yield(
    year,
    state,
    crop,
    season,
    area,
    annual_rainfall,
    fertilizer,
    pesticide,
):

    package = get_model_package()

    model = package["model"]

    preprocessor = package["preprocessor"]

    input_data = pd.DataFrame(
        [
            {
                "Year": year,
                "State": state,
                "Crop": crop,
                "Season": season,
                "Area": area,
                "Annual_Rainfall": annual_rainfall,
                "Fertilizer": fertilizer,
                "Pesticide": pesticide,
            }
        ]
    )

    processed = preprocessor.transform(
        input_data
    )

    predicted_yield = model.predict(
        processed
    )[0]

    predicted_yield = max(
        0,
        float(predicted_yield),
    )

    estimated_production = (
        predicted_yield * area
    )

    return {
        "predicted_yield": round(
            predicted_yield,
            3,
        ),
        "estimated_production": round(
            estimated_production,
            3,
        ),
        "unit": "tonnes/hectare",
        "production_unit": "tonnes",
    }