from fastapi import FastAPI
import pickle
import pandas as pd
from pathlib import Path

app = FastAPI(title="FarmStock Crop Price Prediction API")

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent.parent  # FarmStock
MODEL_DIR = BASE_DIR / "ml" / "model"

# Load model and encoders
model_path = MODEL_DIR / "price_model.pkl"
encoders_path = MODEL_DIR / "encoders.pkl"

model = pickle.load(open(model_path, "rb"))
encoders = pickle.load(open(encoders_path, "rb"))

# Root route (friendly message)
@app.get("/")
def root():
    return {
        "message": "FarmStock API is running. Use POST /predict-price with state, market, commodity, month, and year."
    }

# Prediction endpoint
@app.post("/predict-price")
def predict_price(data: dict):
    try:
        df = pd.DataFrame([data])

        # Check required fields
        required_fields = ['state', 'market', 'commodity', 'month', 'year']
        missing = [f for f in required_fields if f not in df.columns]
        if missing:
            return {"error": f"Missing fields: {missing}"}

        # Safe encoding: unseen categories -> -1
        for col in ['state', 'market', 'commodity']:
            le = encoders[col]
            df[col] = df[col].apply(
                lambda x: le.transform([x])[0] if x in le.classes_ else -1
            )

        prediction = model.predict(df)[0]
        return {"predicted_price": round(float(prediction), 2)}

    except Exception as e:
        return {"error": str(e)}
