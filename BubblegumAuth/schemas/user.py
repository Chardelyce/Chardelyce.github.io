from pydantic import BaseModel
from typing import List


# ---------------------------------------
# Register
# ---------------------------------------

class RegisterRequest(BaseModel):

    username: str

    password: str


# ---------------------------------------
# Login
# ---------------------------------------

class LoginRequest(BaseModel):

    username: str

    password: str


# ---------------------------------------
# Bubble Challenge Verification
# ---------------------------------------

class VerifyChallengeRequest(BaseModel):

    username: str

    response: str


# ---------------------------------------
# Challenge
# ---------------------------------------

class BubbleChallenge(BaseModel):

    line: int

    start: int

    end: int

    prompt: str


# ---------------------------------------
# Bubble Status
# ---------------------------------------

class BubbleStatus(BaseModel):

    credential_health: int

    mutation_counter: int

    credential_generation: int


# ---------------------------------------
# Login Response
# ---------------------------------------

class LoginResponse(BaseModel):

    username: str

    credential_health: int

    mutation_counter: int

    credential_generation: int

    ascii_credential: List[str]

    challenge: BubbleChallenge


# ---------------------------------------
# JWT Token
# ---------------------------------------

class TokenResponse(BaseModel):

    access_token: str

    token_type: str = "bearer"