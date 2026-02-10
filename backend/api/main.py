from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pathlib import Path
import pickle
import pandas as pd
import logging

from api.database import SessionLocal, engine, Base
from api.models import User, Product
from api.auth import hash_password, verify_password, create_access_token
from api.deps import get_current_user, get_db
from api.schemas import RegisterSchema, PredictSchema, ProductOut

# ------------------- Logging -------------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("farmstock")

# ------------------- App -------------------
app = FastAPI(title="FarmStock Crop Price Prediction API")

# ------------------- DB -------------------
Base.metadata.create_all(bind=engine)  # only for dev

# ------------------- ML Model Loading -------------------
BASE_DIR = Path(__file__).resolve().parents[2]  # FarmStock/backend/api -> FarmStock
MODEL_DIR = BASE_DIR / "ml" / "model"

try:
    with open(MODEL_DIR / "price_model.pkl", "rb") as f:
        model = pickle.load(f)

    with open(MODEL_DIR / "encoders.pkl", "rb") as f:
        encoders = pickle.load(f)

    with open(MODEL_DIR / "numeric_features.pkl", "rb") as f:
        numeric_features = pickle.load(f)

    # Safety check: required encoders present
    for col in ["state", "market", "commodity"]:
        if col not in encoders:
            raise RuntimeError(f"Missing encoder for column '{col}'")

except Exception as e:
    logger.error(f"Failed to load ML model or encoders: {e}")
    raise RuntimeError(f"ML model loading failed: {e}")

# ------------------- Routes -------------------

@app.get("/")
def root():
    return {"message": "FarmStock Backend running. Use /docs for API usage."}

# ------------------- Auth -------------------

@app.post("/register")
def register(user: RegisterSchema, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = User(email=user.email, password=hash_password(user.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    logger.info(f"New user registered: {new_user.email}")
    return {"message": "User registered successfully", "user_id": new_user.id}


@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"id": user.id, "email": user.email, "role": user.role})
    logger.info(f"User logged in: {user.email}")
    return {"access_token": token, "token_type": "bearer"}


# ------------------- Prediction + Store in DB -------------------

@app.post("/predict-price", response_model=ProductOut)
def predict_price(
    payload: PredictSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    data = payload.dict(exclude={"quantity"})
    df = pd.DataFrame([data])

    # ------------------- Normalize & Encode Categorical Features -------------------
    for col in ["state", "market", "commodity"]:
        value = str(data[col]).strip().title()  # normalize user input
        le = encoders[col]
        if value not in le.classes_:
            raise HTTPException(status_code=400, detail=f"Invalid {col}: {value}")
        df[col] = le.transform([value])

    # ------------------- Validate Numeric Features -------------------
    for col in ["month", "year"]:
        if col not in numeric_features:
            raise HTTPException(status_code=500, detail=f"Missing numeric feature info for {col}")
        value = data[col]
        if value not in numeric_features[col]:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid {col}: {value}. Valid values: {numeric_features[col]}"
            )

    # ------------------- Predict Price -------------------
    try:
        predicted_price = float(model.predict(df)[0])
    except Exception as e:
        logger.error(f"Prediction failed: {e}")
        raise HTTPException(status_code=500, detail="Prediction failed")

    # ------------------- Save Product to DB -------------------
    product = Product(
        name=payload.commodity,
        quantity=payload.quantity,
        predicted_price=predicted_price,
        farmer_id=current_user.id
    )
    db.add(product)
    db.commit()
    db.refresh(product)

    logger.info(f"Prediction stored: user={current_user.email}, crop={payload.commodity}, price={predicted_price}")

    return product


# ------------------- View Own Products -------------------

@app.get("/products", response_model=list[ProductOut])
def my_products(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    products = db.query(Product).filter(Product.farmer_id == current_user.id).all()
    return products
