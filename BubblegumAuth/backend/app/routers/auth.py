from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_current_user
from app.models.user import User
from app.services.jwt_service import create_access_token
from app.database import SessionLocal
from app.schemas.user import RegisterRequest, LoginRequest

from app.services.security import (
    hash_password,
    verify_password,
    generate_entropy
)

from app.services.gum_renderer import GumRenderer

from app.services.gum_security import (
    create_gum_signature,
    hash_gum_signature,
    verify_gum_signature
)

from app.services.mutation import MutationEngine


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)



@router.post("/register")
def register(data: RegisterRequest):

    db: Session = SessionLocal()

    try:

        existing = (
            db.query(User)
            .filter(
                User.username == data.username
            )
            .first()
        )


        if existing:

            raise HTTPException(
                status_code=400,
                detail="Username already exists."
            )


        # Create initial credential entropy

        user_entropy = generate_entropy()


        # Create first Stick of Gum

        initial_gum = (
            GumRenderer.generate_gum_fragment()
        )


        # Bind gum to initial credential state

        gum_signature = create_gum_signature(

            initial_gum,

            1,      # generation

            0,      # mutation count

            user_entropy

        )


        user = User(

            username=data.username,


            password_hash=(
                hash_password(
                    data.password
                )
            ),


            hidden_entropy=user_entropy,


            stick_of_gum_hash=(
                hash_gum_signature(
                    gum_signature
                )
            ),


            ascii_gum=(
                GumRenderer.generate_ascii_gum(
                    1,
                    initial_gum
                )
            )

        )


        db.add(user)

        db.commit()

        db.refresh(user)



        return {

            "message":
                "Bubblegum credential initialized.",


            "username":
                user.username,


            # Only time the raw gum is shown

            "stick_of_gum":
                initial_gum,


            "ascii_gum":
                user.ascii_gum

        }



    finally:

        db.close()





@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):

    return {

        "username":
            current_user.username,


        "credential_health":
            current_user.credential_health,


        "mutation_counter":
            current_user.mutation_counter,


        "credential_generation":
            current_user.credential_generation,


        "ascii_gum":
            current_user.ascii_gum

    }





@router.post("/login")
def login(data: LoginRequest):

    db: Session = SessionLocal()


    try:

        user = (

            db.query(User)

            .filter(
                User.username == data.username
            )

            .first()

        )



        if user is None:

            raise HTTPException(

                status_code=404,

                detail="User not found."

            )



        # Verify password

        if not verify_password(

            user.password_hash,

            data.password

        ):

            raise HTTPException(

                status_code=401,

                detail="Invalid password."

            )



        # Verify state-bound Stick of Gum

        if not verify_gum_signature(

            user.stick_of_gum_hash,

            data.stick_of_gum,

            user.credential_generation,

            user.mutation_counter,

            user.hidden_entropy

        ):


            raise HTTPException(

                status_code=401,

                detail="Invalid Stick of Gum."

            )



        #
        # Mutate credential state
        #

        new_gum = MutationEngine.mutate(user)



        db.commit()

        db.refresh(user)



        token = create_access_token(

            {

                "sub":
                    user.username,


                "generation":
                    user.credential_generation,


                "mutation":
                    user.mutation_counter

            }

        )



        return {


            "access_token":

                token,


            "token_type":

                "bearer",



            "user":

            {

                "username":

                    user.username,


                "credential_health":

                    user.credential_health,


                "mutation_counter":

                    user.mutation_counter,


                "credential_generation":

                    user.credential_generation,


                "stick_of_gum":

                    new_gum,


                "ascii_gum":

                    user.ascii_gum

            }

        }



    finally:

        db.close()