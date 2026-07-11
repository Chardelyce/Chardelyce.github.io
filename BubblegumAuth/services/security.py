from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError


password_hasher = PasswordHasher()


def hash_password(password: str):
   

    return password_hasher.hash(password)



def verify_password(password: str, hashed_password: str):
   

    try:
        password_hasher.verify(
            hashed_password,
            password
        )

        return True


    except VerifyMismatchError:
        return False