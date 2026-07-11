from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session


from app.database import get_db
from app.models.user import User
from app.schemas.user import (
    RegisterRequest,
    LoginRequest
)


from app.services.security import (
    hash_password,
    verify_password
)



router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)



@router.post("/register")
def register(
    user: RegisterRequest,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.username == user.username
    ).first()


    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )


    new_user = User(

        username=user.username,

        password_hash=hash_password(
            user.password
        )
    )


    db.add(new_user)

    db.commit()

    db.refresh(new_user)


    return {

        "message": "Account created",

        "username": new_user.username

    }




@router.post("/login")
def login(
    user: LoginRequest,
    db: Session = Depends(get_db)
):


    existing_user = db.query(User).filter(
        User.username == user.username
    ).first()



    if not existing_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )



    password_correct = verify_password(
        user.password,
        existing_user.password_hash
    )



    if not password_correct:

        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )



    return {

        "message":"Login successful",

        "username": existing_user.username

    }