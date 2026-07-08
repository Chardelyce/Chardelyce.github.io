import secrets

from datetime import datetime
from app.services.gum_security import hash_gum
from app.services.gum_renderer import GumRenderer


class MutationEngine:


    @staticmethod
    def mutate(user):

        """
        Evolves the Bubblegum credential state.

        Each successful authentication:
        - advances generation
        - mutates hidden entropy
        - creates a new Stick of Gum
        - creates a new ASCII representation
        """


        # Increase mutation history

        user.mutation_counter += 1



        # Stretch/Fold:
        # Replace hidden internal entropy

        user.hidden_entropy = secrets.token_hex(32)



        # Credential ages slightly

        user.credential_health -= 3



        # Generate new Stick of Gum

        new_gum = (
            GumRenderer.generate_gum_fragment()
        )


        user.stick_of_gum_hash = hash_gum(new_gum)



        # Render the visual gum state

        user.ascii_gum = (
            GumRenderer.generate_ascii_gum(
                user.credential_generation,
                new_gum
            )
        )



        # Update lifecycle

        user.gum_last_mutation = datetime.utcnow()



        # If gum loses elasticity,
        # create a new credential generation

        if user.credential_health <= 0:


            user.credential_generation += 1


            user.credential_health = 100



        return user