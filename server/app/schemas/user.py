from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Full Name")
    contact_number: str = Field(
        ..., min_length=7, max_length=20, description="Contact Phone Number"
    )
    email: EmailStr = Field(..., description="Valid Email Address")
    role: str = Field(..., description="User role identifier")


class UserCreate(UserBase):
    password: str = Field(
        ..., min_length=6, max_length=128, description="Account Password"
    )


class UserResponse(BaseModel):
    id: int
    name: str
    contact_number: str
    email: str
    role: str
    is_active: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
