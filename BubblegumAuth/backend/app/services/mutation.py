import secrets

from app.services.gum_renderer import GumRenderer

from app.services.gum_security import (
    create_gum_signature,
    hash_gum_signature
)


class MutationEngine:


    @staticmethod
    def mutate(user):


        # Increase credential evolution

        user.mutation_counter += 1



        # Regenerate hidden entropy

        user.hidden_entropy = (
            secrets.token_hex(32)
        )



        # Reduce gum health

        user.credential_health -= 3



        # If gum becomes stale,
        # regenerate the credential generation

        if user.credential_health <= 0:


            user.credential_generation += 1

            user.credential_health = 100



        #
        # Create new Stick of Gum
        #

        new_gum = (
            GumRenderer.generate_gum_fragment()
        )



        #
        # Bind new gum to current state
        #

        signature = create_gum_signature(

            new_gum,

            user.credential_generation,

            user.mutation_counter,

            user.hidden_entropy

        )



        #
        # Store only verifier
        #

        user.stick_of_gum_hash = (
            hash_gum_signature(signature)
        )



        #
        # Update ASCII gum
        #

        user.ascii_gum = (
            GumRenderer.generate_ascii_gum(

                user.credential_generation,

                new_gum

            )
        )



        return new_gum