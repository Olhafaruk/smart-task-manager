#services/auth-service/src/crud.py
from sqlalchemy.orm import Session
from .models import User
from .utils import hash_password
from .schemas import UserCreate


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user_data: UserCreate):
    if not isinstance(user_data.password, str):
        raise ValueError("Password must be a string")
    hashed_pw = hash_password(user_data.password)
    user = User(email=user_data.email, password_hash=hashed_pw)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()
