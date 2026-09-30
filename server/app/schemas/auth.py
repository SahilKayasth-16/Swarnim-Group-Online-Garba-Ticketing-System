from pydantic import BaseModel, EmailStr, Field, field_validator
from app.schemas.user import UserResponse

ALLOWED_ROLES = {"super_admin", "event_admin", "counter_operator", "security_staff"}


class RegisterRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Full Name")
    contact_number: str = Field(
        ..., min_length=7, max_length=20, description="Contact Number"
    )
    email: EmailStr = Field(..., description="Email Address")
    password: str = Field(
        ..., min_length=6, max_length=128, description="Password (min 6 chars)"
    )
    role: str = Field(..., description="Role assignment")

    @field_validator("role")
    @classmethod
    def validate_role(cls, v: str) -> str:
        role_cleaned = v.strip().lower()
        if role_cleaned not in ALLOWED_ROLES:
            raise ValueError(
                f"Invalid role '{v}'. Allowed roles: {', '.join(sorted(ALLOWED_ROLES))}"
            )
        return role_cleaned


class LoginRequest(BaseModel):
    email: EmailStr = Field(..., description="Email Address")
    password: str = Field(..., min_length=1, description="Password")


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
