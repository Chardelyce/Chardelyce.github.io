from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float

from database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True)

    username = Column(String, unique=True)

    password_hash = Column(String)

    hidden_entropy = Column(String)

    mutation_counter = Column(Integer, default=0)

    credential_generation = Column(Integer, default=1)

    credential_health = Column(Float, default=100)