from argon2 import PasswordHasher
import secrets

ph = PasswordHasher()


def hash_password(password):

    return ph.hash(password)


def verify_password(hash, password):

    try:

        ph.verify(hash, password)

        return True

    except:

        return False


def generate_entropy():

    return secrets.token_hex(32)