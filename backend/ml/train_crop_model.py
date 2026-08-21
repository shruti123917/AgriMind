"""
Train the AgriMind crop recommendation model.

Dataset:
Crop_recommendation.csv

Features:
N, P, K, temperature, humidity, ph, rainfall

Target:
label
"""

from pathlib import Path
import pickle

import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report


BASE_DIR = Path(__file__).resolve().parent
DATA_PATH = BASE_DIR / "data" / "Crop_recommendation.csv"
MODEL_PATH = BASE_DIR / "crop_model.pkl"


FEATURES = [
    "N",
    "P",
    "K",
    "temperature",
    "humidity",
    "ph",
    "rainfall",
]

TARGET = "label"


def main():
    print("Loading dataset...")

    if not DATA_PATH.exists():
        raise FileNotFoundError(
            f"Dataset not found at: {DATA_PATH}\n"
            "Download Crop_recommendation.csv and place it inside "
            "backend/ml/data/"
        )

    df = pd.read_csv(DATA_PATH)

    print(f"Dataset loaded: {len(df)} rows")

    # Clean column names
    df.columns = [column.strip() for column in df.columns]

    # Validate required columns
    required_columns = FEATURES + [TARGET]

    missing = [
        column for column in required_columns
        if column not in df.columns
    ]

    if missing:
        raise ValueError(
            f"Dataset is missing columns: {missing}"
        )

    # Remove incomplete rows
    df = df.dropna(subset=required_columns)

    X = df[FEATURES]
    y = df[TARGET]

    print(f"Number of crops: {y.nunique()}")
    print(f"Crops: {sorted(y.unique())}")

    # 80% training / 20% testing
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.20,
        random_state=42,
        stratify=y,
    )

    print("Training Random Forest model...")

    model = RandomForestClassifier(
        n_estimators=200,
        max_depth=20,
        min_samples_split=2,
        random_state=42,
        n_jobs=-1,
    )

    model.fit(X_train, y_train)

    # Evaluate
    predictions = model.predict(X_test)

    accuracy = accuracy_score(y_test, predictions)

    print("\n==============================")
    print("MODEL TRAINING COMPLETE")
    print("==============================")
    print(f"Accuracy: {accuracy * 100:.2f}%")

    print("\nClassification Report:")
    print(classification_report(y_test, predictions))

    # Save model
    with open(MODEL_PATH, "wb") as file:
        pickle.dump(model, file)

    print(f"\nModel saved to:")
    print(MODEL_PATH)


if __name__ == "__main__":
    main()