from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String,
        unique=True,
        nullable=False,
        index=True
    )

    password_hash = Column(
        String,
        nullable=False
    )

    # ------------------------------------
    # BubblegumAuth Research Fields
    # ------------------------------------

    hidden_entropy = Column(
        String,
        nullable=False
    )

    mutation_counter = Column(
        Integer,
        default=0
    )

    credential_generation = Column(
        Integer,
        default=1
    )

    credential_health = Column(
        Integer,
        default=100
    )

    last_login = Column(
        DateTime,
        default=datetime.utcnow
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )