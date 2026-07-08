from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.user import User
from app.services.jwt_service import verify_access_token


security = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    db: Session = SessionLocal()

    try:
        token = credentials.credentials

        payload = verify_access_token(token)

        username = payload.get("sub")

        if username is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token."
            )

        user = (
            db.query(User)
            .filter(User.username == username)
            .first()
        )

        if user is None:
            raise HTTPException(
                status_code=401,
                detail="User not found."
            )

        return user

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token."
        )

    finally:
        db.close()