from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import pickle
from pathlib import Path
from preprocess import preprocess_data

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "model"

# Load data
X, y = preprocess_data()

# Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
rmse = mean_squared_error(y_test, model.predict(X_test)) ** 0.5
print(f"RMSE: {rmse}")

# Save model
MODEL_PATH.mkdir(exist_ok=True)
with open(MODEL_PATH / "price_model.pkl", "wb") as f:
    pickle.dump(model, f)
