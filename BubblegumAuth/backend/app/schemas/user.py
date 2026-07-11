from pydantic import BaseModel



class RegisterRequest(BaseModel):

    username: str

    password: str



class LoginRequest(BaseModel):

    username: str

    password: str



class UserResponse(BaseModel):

    id: int

    username: str


    class Config:
        from_attributes = True