#services/auth-service/schemas.py
from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)

    model_config = {"from_attributes": True}

class UserResponse(BaseModel):
    id: int
    email: EmailStr

    model_config = {"from_attributes": True}

class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)

    model_config = {"from_attributes": True}

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

    model_config = {"from_attributes": True}