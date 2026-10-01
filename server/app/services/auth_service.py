from typing import Any, Dict, Optional
from sqlalchemy import select, or_
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.security import hash_password, verify_password, create_access_token
from app.models.user import User
from app.schemas.auth import RegisterRequest, LoginRequest

def register_user(db: Session, request: RegisterRequest) -> Dict[str, Any]:
    """
    Registers a new user, hashes password, saves to database, and issues an access token.
    """
    email_clean = request.email.strip().lower()
    contact_clean = request.contact_number.strip()
    role_clean = request.role.strip().lower()

    #if user already exists by email or contact number
    existing = db.scalar(
        select(User).where(
            or_(User.email == email_clean, 
                User.contact_number == contact_clean)
        )
    )

    if existing:
        if existing.email == email_clean:
            raise ValueError("An account with this email already exists.")
        
        raise ValueError("An account with this contact number already exists.")

    # Only one Super Admin is allowed
    if role_clean == "super_admin":
        existing_super_admin = db.scalar(
            select(User).where(User.role == "super_admin")
        )

        if existing_super_admin:
            raise ValueError(
                f"{existing_super_admin.name} is the Super Admin only. "
                "Kindly register as another role."
            )

    password_hash = hash_password(request.password)

    user = User(
        name=request.name.strip(),
        contact_number=contact_clean,
        email=email_clean,
        password_hash=password_hash,
        role=role_clean,
        is_active=True,
    )

    try:
        db.add(user)
        db.commit()
        db.refresh(user)
    except IntegrityError:
        db.rollback()
        raise ValueError("Unable to register user. Please try again.")

    # Create JWT access token
    token_payload = {
        "sub": str(user.id),
        "email": user.email,
        "role": user.role,
    }

    access_token = create_access_token(token_payload)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user,
    }

def authenticate_user(db: Session, request: LoginRequest) -> Dict[str, Any]:
    """
    Validates user credentials, ensures account is active, and issues an access token.
    """
    email_clean = request.email.strip().lower()

    user = db.scalar(select(User).where(User.email == email_clean))
    if not user:
        raise ValueError("Invalid email or password.")

    if not verify_password(request.password, user.password_hash):
        raise ValueError("Invalid email or password.")

    if not user.is_active:
        raise ValueError("Account is deactivated. Please contact an administrator.")

    token_payload = {
        "sub": str(user.id),
        "email": user.email,
        "role": user.role,
    }
    access_token = create_access_token(token_payload)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user,
    }


def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    """
    Fetches a user by their database primary key.
    """
    return db.scalar(select(User).where(User.id == user_id))
