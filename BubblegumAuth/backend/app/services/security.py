from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError


password_hasher = PasswordHasher()



def hash_password(password: str):
    """
    Creates a secure Argon2 password hash.
    """

    return password_hasher.hash(password)



def verify_password(
    password: str,
    hashed_password: str
):
    """
    Checks a password against the stored hash.
    """

    try:

        password_hasher.verify(
            hashed_password,
            password
        )

        return True


    except VerifyMismatchError:

        return False