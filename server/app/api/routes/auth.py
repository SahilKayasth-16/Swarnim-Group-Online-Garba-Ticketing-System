from typing import Any, Dict
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, get_db
from app.models.user import User
from app.schemas.auth import AuthResponse, LoginRequest, RegisterRequest
from app.schemas.user import UserResponse
from app.services.auth_service import authenticate_user, get_super_admin, register_user

router = APIRouter()


@router.get(
    "/super-admin",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Check if a Super Admin is already registered",
)
def get_super_admin_status(db: Session = Depends(get_db)):
    """
    Returns the status and name of the registered Super Admin if one exists.
    """
    super_admin = get_super_admin(db)
    if super_admin:
        return {
            "success": True,
            "message": "Super Admin already exists.",
            "data": {
                "exists": True,
                "name": super_admin.name,
                "message": f"{super_admin.name} is the Super Admin only. Kindly register as another role.",
            },
        }
    return {
        "success": True,
        "message": "No Super Admin registered yet.",
        "data": {
            "exists": False,
            "name": None,
            "message": None,
        },
    }


@router.post(
    "/register",
    response_model=Dict[str, Any],
    status_code=status.HTTP_201_CREATED,
    summary="Register a new staff/admin user",
)
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    """
    Register a new user account with role assignment and receive an access token.
    """
    try:
        auth_data = register_user(db, request)
        return {
            "success": True,
            "message": "User registered successfully.",
            "data": AuthResponse(
                access_token=auth_data["access_token"],
                token_type=auth_data["token_type"],
                user=UserResponse.model_validate(auth_data["user"]),
            ).model_dump(),
        }
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.post(
    "/login",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Log in user and get access token",
)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    """
    Authenticate user credentials and receive an access token with user details.
    """
    try:
        auth_data = authenticate_user(db, request)
        return {
            "success": True,
            "message": "User logged in successfully.",
            "data": AuthResponse(
                access_token=auth_data["access_token"],
                token_type=auth_data["token_type"],
                user=UserResponse.model_validate(auth_data["user"]),
            ).model_dump(),
        }
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
        )


@router.get(
    "/me",
    response_model=Dict[str, Any],
    status_code=status.HTTP_200_OK,
    summary="Get current authenticated user profile",
)
def get_me(current_user: User = Depends(get_current_user)):
    """
    Returns the authenticated user details from the JWT token.
    """
    return {
        "success": True,
        "message": "User profile retrieved successfully.",
        "data": UserResponse.model_validate(current_user).model_dump(),
    }

