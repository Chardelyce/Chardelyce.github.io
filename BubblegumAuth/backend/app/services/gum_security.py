from argon2 import PasswordHasher
import hashlib


ph = PasswordHasher()



def create_gum_signature(
    gum,
    generation,
    mutation,
    entropy
):

    """
    Creates a deterministic credential state signature.

    The Stick of Gum is tied to the
    current Bubblegum credential state.
    """


    combined = (

        gum

        +

        str(generation)

        +

        str(mutation)

        +

        entropy

    )


    return hashlib.sha256(
        combined.encode()
    ).hexdigest()



def hash_gum_signature(signature):

    return ph.hash(signature)



def verify_gum_signature(
    stored_hash,
    gum,
    generation,
    mutation,
    entropy
):

    signature = create_gum_signature(
        gum,
        generation,
        mutation,
        entropy
    )


    try:

        ph.verify(
            stored_hash,
            signature
        )

        return True


    except:

        return False