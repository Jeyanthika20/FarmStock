import pandas as pd
import pickle
from pathlib import Path
from sklearn.preprocessing import LabelEncoder

# Base ML directory
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "data" / "crop_prices.csv"
MODEL_PATH = BASE_DIR / "model"

def preprocess_data():
    df = pd.read_csv(DATA_PATH)

    # Convert arrival_date
    df['arrival_date'] = pd.to_datetime(df['arrival_date'], dayfirst=True)
    df['month'] = df['arrival_date'].dt.month
    df['year'] = df['arrival_date'].dt.year

    features = ['state', 'market', 'commodity', 'month', 'year']
    target = 'modal_price'

    encoders = {}
    for col in ['state', 'market', 'commodity']:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        encoders[col] = le

    X = df[features]
    y = df[target]

    MODEL_PATH.mkdir(exist_ok=True)
    with open(MODEL_PATH / "encoders.pkl", "wb") as f:
        pickle.dump(encoders, f)

    return X, y
