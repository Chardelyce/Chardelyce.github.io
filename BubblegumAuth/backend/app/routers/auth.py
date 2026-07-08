from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from fastapi import Depends
from app.dependencies import get_current_user
from app.models.user import User
from app.services.jwt_service import create_access_token
from app.database import SessionLocal
from app.models.user import User
from app.schemas.user import RegisterRequest, LoginRequest, UserResponse 
from app.services.security import (
    hash_password,
    verify_password,
    generate_entropy
)
from app.services.mutation import MutationEngine

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register")
def register(data: RegisterRequest):

    db: Session = SessionLocal()

    try:

        existing = (
            db.query(User)
            .filter(User.username == data.username)
            .first()
        )

        if existing:

            raise HTTPException(
                status_code=400,
                detail="Username already exists."
            )

        user = User(
            username=data.username,
            password_hash=hash_password(data.password),
            hidden_entropy=generate_entropy(),
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return {
            "message": "Credential initialized.",
            "username": user.username
        }

    finally:

        db.close()

@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "username": current_user.username,
        "credential_health": current_user.credential_health,
        "mutation_counter": current_user.mutation_counter,
        "credential_generation": current_user.credential_generation,
    }
@router.post("/login")
def login(data: LoginRequest):
    db: Session = SessionLocal()

    try:
        user = (
            db.query(User)
            .filter(User.username == data.username)
            .first()
        )

        if user is None:
            raise HTTPException(
                status_code=404,
                detail="User not found."
            )

        if not verify_password(
            user.password_hash,
            data.password
        ):
            raise HTTPException(
                status_code=401,
                detail="Invalid password."
            )

        MutationEngine.mutate(user)

        db.commit()
        db.refresh(user)

        token = create_access_token(
            {
                "sub": user.username,
                "generation": user.credential_generation,
                "mutation": user.mutation_counter,
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "username": user.username,
                "credential_health": user.credential_health,
                "mutation_counter": user.mutation_counter,
                "credential_generation": user.credential_generation,
            },
        }

    finally:
        db.close()