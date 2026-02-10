from sqlalchemy.orm import Session
from api.models import User, Product
from api.auth import hash_password

# -------- USERS --------

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, email: str, password: str, role: str = "farmer"):
    user = User(
        email=email,
        password=hash_password(password),
        role=role
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


# -------- PRODUCTS --------

def create_product(
    db: Session,
    name: str,
    quantity: float,
    predicted_price: float,
    farmer_id: int
):
    product = Product(
        name=name,
        quantity=quantity,
        predicted_price=predicted_price,
        farmer_id=farmer_id
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


def get_products_by_farmer(db: Session, farmer_id: int):
    return db.query(Product).filter(Product.farmer_id == farmer_id).all()
