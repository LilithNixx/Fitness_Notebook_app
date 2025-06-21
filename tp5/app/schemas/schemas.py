# app/schemas.py
from pydantic import BaseModel

class LoginRequest(BaseModel):
    email: str
    contraseña: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
