import pandas as pd
import pickle
from pathlib import Path
from sklearn.preprocessing import LabelEncoder

# ------------------- Paths -------------------
BASE_DIR = Path(__file__).resolve().parents[1]  # ml/
DATA_PATH = BASE_DIR / "data" / "crop_prices.csv"
MODEL_PATH = BASE_DIR / "model"
MODEL_PATH.mkdir(exist_ok=True)

# ------------------- Preprocessing Function -------------------
def preprocess_data():
    """
    Loads raw crop prices CSV, cleans categorical columns, extracts features,
    encodes categoricals, and returns X (features) and y (target).
    Saves encoders and numeric feature info for API validation.
    """
    df = pd.read_csv(DATA_PATH)

    # ------------------- Normalize Categorical Columns -------------------
    for col in ['state', 'market', 'commodity']:
        df[col] = df[col].astype(str).str.strip().str.title()  # " andhra pradesh " -> "Andhra Pradesh"

    # Extract month/year from arrival_date
    df['arrival_date'] = pd.to_datetime(df['arrival_date'], dayfirst=True)
    df['month'] = df['arrival_date'].dt.month
    df['year'] = df['arrival_date'].dt.year

    # Ensure target is float
    df['modal_price'] = df['modal_price'].astype(float)

    features = ['state', 'market', 'commodity', 'month', 'year']
    target = 'modal_price'

    # ------------------- Encode Categorical Features -------------------
    encoders = {}
    for col in ['state', 'market', 'commodity']:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        encoders[col] = le

    # ------------------- Save Encoders -------------------
    with open(MODEL_PATH / "encoders.pkl", "wb") as f:
        pickle.dump(encoders, f)

    # ------------------- Save Numeric Feature Info -------------------
    numeric_features = {col: sorted(df[col].unique()) for col in ['month', 'year']}
    with open(MODEL_PATH / "numeric_features.pkl", "wb") as f:
        pickle.dump(numeric_features, f)

    # ------------------- Prepare Features & Target -------------------
    X = df[features]
    y = df[target]

    return X, y
