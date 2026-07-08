from fastapi import APIRouter, HTTPException

from database import SessionLocal
from models import User

from schemas import UserRegister
from schemas import UserLogin

from security import (
    hash_password,
    verify_password,
    generate_entropy
)

from mutation import MutationEngine

router = APIRouter()
@router.post("/register")
def register(data: UserRegister):

    db = SessionLocal()

    exists = db.query(User).filter(
        User.username == data.username
    ).first()

    if exists:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    user = User(
        username=data.username,
        password_hash=hash_password(data.password),
        hidden_entropy=generate_entropy()
    )

    db.add(user)
    db.commit()

    return {
        "message": "Credential Initialized"
    }
@router.post("/login")
def login(data: UserLogin):

    db = SessionLocal()

    user = db.query(User).filter(
        User.username == data.username
    ).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not verify_password(
        user.password_hash,
        data.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Incorrect password"
        )

    MutationEngine.mutate(user)

    db.commit()

    return {
        "health": user.credential_health,
        "generation": user.credential_generation,
        "mutations": user.mutation_counter,
        "entropy": user.hidden_entropy
    }