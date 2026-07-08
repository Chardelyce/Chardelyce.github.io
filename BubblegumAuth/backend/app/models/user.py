from sqlalchemy import Column, Integer, String, Float, DateTime

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


    # Hidden server-side entropy
    hidden_entropy = Column(
        String,
        nullable=False
    )


    # Bubblegum evolution tracking

    mutation_counter = Column(
        Integer,
        default=0
    )


    credential_generation = Column(
        Integer,
        default=1
    )


    credential_health = Column(
        Float,
        default=100.0
    )


    # Current Stick of Gum

    stick_of_gum_hash = Column(
    String,
    nullable=True
)


    # Current visual representation

    ascii_gum = Column(
        String,
        nullable=True
    )


    # Gum lifecycle

    gum_created = Column(
        DateTime,
        default=datetime.utcnow
    )


    gum_last_mutation = Column(
        DateTime,
        default=datetime.utcnow
    )