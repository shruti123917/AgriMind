from pathlib import Path
import pickle

import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder


# ============================================================
# PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
MODEL_PATH = BASE_DIR / "yield_model.pkl"


# ============================================================
# DATASET LOADER
# ============================================================

def load_dataset():

    parquet_files = list(DATA_DIR.glob("*.parquet"))
    csv_files = list(DATA_DIR.glob("*.csv"))

    if parquet_files:
        dataset_path = parquet_files[0]

        print(f"Loading Parquet dataset: {dataset_path}")

        df = pd.read_parquet(dataset_path)

    elif csv_files:
        dataset_path = csv_files[0]

        print(f"Loading CSV dataset: {dataset_path}")

        df = pd.read_csv(dataset_path)

    else:
        raise FileNotFoundError(
            f"No .parquet or .csv file found inside {DATA_DIR}"
        )

    return df


# ============================================================
# MAIN TRAINING
# ============================================================

def main():

    print("\n======================================")
    print(" AGRIMIND YIELD PREDICTION TRAINING")
    print("======================================\n")

    # --------------------------------------------------------
    # Load dataset
    # --------------------------------------------------------

    df = load_dataset()

    print(f"Original rows: {len(df)}")
    print(f"Original columns: {list(df.columns)}")

    # --------------------------------------------------------
    # Standardize column names
    # --------------------------------------------------------

    df.columns = [
    str(column)
    .strip()
    .replace(" ", "_")
    .replace("(", "")
    .replace(")", "")
    for column in df.columns
]

    print("\nCleaned columns:")
    print(list(df.columns))

    # --------------------------------------------------------
    # Handle common column-name variations
    # --------------------------------------------------------

    rename_map = {}

    if "Crop_Year" in df.columns:
        rename_map["Crop_Year"] = "Year"

    if "Crop" not in df.columns and "crop" in df.columns:
        rename_map["crop"] = "Crop"

    if "State" not in df.columns and "state" in df.columns:
        rename_map["state"] = "State"

    if "Season" not in df.columns and "season" in df.columns:
        rename_map["season"] = "Season"

    if "Area" not in df.columns and "area" in df.columns:
        rename_map["area"] = "Area"

    if "Yield" not in df.columns and "yield" in df.columns:
        rename_map["yield"] = "Yield"

    if "Annual_Rainfall" not in df.columns:

        possible_rainfall = [
            "AnnualRainfall",
            "annual_rainfall",
            "Rainfall",
        ]

        for column in possible_rainfall:
            if column in df.columns:
                rename_map[column] = "Annual_Rainfall"
                break

    if "Fertilizer" not in df.columns and "fertilizer" in df.columns:
        rename_map["fertilizer"] = "Fertilizer"

    if "Pesticide" not in df.columns and "pesticide" in df.columns:
        rename_map["pesticide"] = "Pesticide"

    if rename_map:
        df = df.rename(columns=rename_map)

    print("\nFinal columns:")
    print(list(df.columns))

    # --------------------------------------------------------
    # Required features
    # --------------------------------------------------------

    FEATURES = [
        "Year",
        "State",
        "Crop",
        "Season",
        "Area",
        "Annual_Rainfall",
        "Fertilizer",
        "Pesticide",
    ]

    TARGET = "Yield"

    required_columns = FEATURES + [TARGET]

    missing_columns = [
        column
        for column in required_columns
        if column not in df.columns
    ]

    if missing_columns:

        print("\nERROR: Missing columns:")
        print(missing_columns)

        print("\nAvailable columns:")
        print(list(df.columns))

        raise ValueError(
            "Dataset does not contain all required columns."
        )

    # --------------------------------------------------------
    # Keep only required columns
    # --------------------------------------------------------

    df = df[required_columns].copy()

    # --------------------------------------------------------
    # Remove missing values
    # --------------------------------------------------------

    before = len(df)

    df = df.dropna(
        subset=required_columns
    )

    print(
        f"\nRemoved {before - len(df)} rows with missing values."
    )

    # --------------------------------------------------------
    # Convert numerical fields
    # --------------------------------------------------------

    numerical_columns = [
        "Year",
        "Area",
        "Annual_Rainfall",
        "Fertilizer",
        "Pesticide",
        "Yield",
    ]

    for column in numerical_columns:

        df[column] = pd.to_numeric(
            df[column],
            errors="coerce",
        )

    df = df.dropna(
        subset=numerical_columns
    )

    # --------------------------------------------------------
    # Remove invalid values
    # --------------------------------------------------------

    df = df[df["Area"] > 0]

    df = df[df["Yield"] >= 0]

    df = df[df["Annual_Rainfall"] >= 0]

    df = df[df["Fertilizer"] >= 0]

    df = df[df["Pesticide"] >= 0]

    print(
        f"Rows after cleaning: {len(df)}"
    )

    # --------------------------------------------------------
    # Features and target
    # --------------------------------------------------------

    X = df[FEATURES]

    y = df[TARGET]

    # --------------------------------------------------------
    # Feature types
    # --------------------------------------------------------

    categorical_features = [
        "State",
        "Crop",
        "Season",
    ]

    numerical_features = [
        "Year",
        "Area",
        "Annual_Rainfall",
        "Fertilizer",
        "Pesticide",
    ]

    # --------------------------------------------------------
    # Preprocessing
    # --------------------------------------------------------

    preprocessor = ColumnTransformer(
        transformers=[
            (
                "categorical",
                OneHotEncoder(
                    handle_unknown="ignore"
                ),
                categorical_features,
            ),
            (
                "numerical",
                "passthrough",
                numerical_features,
            ),
        ]
    )

    # --------------------------------------------------------
    # Train/test split
    # --------------------------------------------------------

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.20,
        random_state=42,
    )

    # --------------------------------------------------------
    # Fit preprocessing
    # --------------------------------------------------------

    X_train_processed = preprocessor.fit_transform(
        X_train
    )

    X_test_processed = preprocessor.transform(
        X_test
    )

    # --------------------------------------------------------
    # Train model
    # --------------------------------------------------------

    print("\nTraining Random Forest Regressor...")

    model = RandomForestRegressor(
        n_estimators=200,
        max_depth=20,
        min_samples_split=2,
        random_state=42,
        n_jobs=-1,
    )

    model.fit(
        X_train_processed,
        y_train,
    )

    # --------------------------------------------------------
    # Evaluate
    # --------------------------------------------------------

    predictions = model.predict(
        X_test_processed
    )

    mae = mean_absolute_error(
        y_test,
        predictions,
    )

    rmse = mean_squared_error(
        y_test,
        predictions,
    ) ** 0.5

    r2 = r2_score(
        y_test,
        predictions,
    )

    print("\n======================================")
    print(" MODEL TRAINING COMPLETE")
    print("======================================")

    print(
        f"MAE  : {mae:.4f}"
    )

    print(
        f"RMSE : {rmse:.4f}"
    )

    print(
        f"R²   : {r2:.4f}"
    )

    # --------------------------------------------------------
    # Save model + preprocessor
    # --------------------------------------------------------

    model_package = {
        "model": model,
        "preprocessor": preprocessor,
        "features": FEATURES,
    }

    with open(
        MODEL_PATH,
        "wb",
    ) as file:

        pickle.dump(
            model_package,
            file,
        )

    print("\nModel saved successfully:")

    print(
        MODEL_PATH
    )


if __name__ == "__main__":
    main()