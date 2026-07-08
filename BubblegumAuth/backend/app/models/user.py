from sqlalchemy import Column, Integer, String, Float

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, unique=True, nullable=False, index=True)

    password_hash = Column(String, nullable=False)

    hidden_entropy = Column(String, nullable=False)

    mutation_counter = Column(Integer, default=0)

    credential_generation = Column(Integer, default=1)

    credential_health = Column(Float, default=100.0)