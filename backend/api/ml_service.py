import joblib, numpy as np, os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "../../ml/model/price_model.pkl")
model = joblib.load(MODEL_PATH)

def predict_price(features: list):
    if len(features) != 1:
        raise ValueError("Invalid feature shape")
    arr = np.array([features])
    return float(model.predict(arr)[0])
