from pydantic import BaseModel, Field, EmailStr
from datetime import datetime

# -------- Auth --------

class RegisterSchema(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)

class TokenSchema(BaseModel):
    access_token: str
    token_type: str = "bearer"

# -------- Prediction Input --------

class PredictSchema(BaseModel):
    state: str = Field(min_length=2)
    market: str = Field(min_length=2)
    commodity: str = Field(min_length=2)
    month: int = Field(ge=1, le=12)
    year: int = Field(ge=2000, le=2100)
    quantity: float = Field(gt=0, lt=1_000_000)

# -------- Product Output --------

class ProductOut(BaseModel):
    id: int
    name: str
    quantity: float
    predicted_price: float
    created_at: datetime

    class Config:
        from_attributes = True  # Pydantic v2 compatibility
