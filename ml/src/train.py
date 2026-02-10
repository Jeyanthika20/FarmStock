from pathlib import Path
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from preprocess import preprocess_data

# ------------------- Directories -------------------
BASE_DIR = Path(__file__).resolve().parents[1]  # ml/
MODEL_DIR = BASE_DIR / "model"
MODEL_DIR.mkdir(exist_ok=True)

# ------------------- Load Preprocessed Data -------------------
X, y = preprocess_data()  # returns DataFrame X, Series y

# ------------------- Split Data -------------------
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ------------------- Train Model -------------------
model = RandomForestRegressor(n_estimators=200, max_depth=15, random_state=42)
model.fit(X_train, y_train)

# ------------------- Evaluate -------------------
y_pred = model.predict(X_test)
rmse = mean_squared_error(y_test, y_pred) ** 0.5
print(f"RMSE: {rmse:.2f}")

# ------------------- Save Model -------------------
with open(MODEL_DIR / "price_model.pkl", "wb") as f:
    pickle.dump(model, f)

print(f"Model, encoders, and numeric features saved to {MODEL_DIR}")
