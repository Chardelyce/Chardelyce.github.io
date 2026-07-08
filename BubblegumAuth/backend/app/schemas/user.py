from pydantic import BaseModel, Field


class RegisterRequest(BaseModel):

    username: str = Field(
        ...,
        min_length=3,
        max_length=50
    )

    password: str = Field(
        ...,
        min_length=8
    )



class LoginRequest(BaseModel):

    username: str

    password: str

    stick_of_gum: str



class UserResponse(BaseModel):

    username: str

    mutation_counter: int

    credential_generation: int

    credential_health: float

    stick_of_gum: str

    ascii_gum: str


    class Config:

        from_attributes = True