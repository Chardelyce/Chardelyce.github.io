import secrets


class MutationEngine:

    @staticmethod
    def mutate(user):

        user.mutation_counter += 1

        user.hidden_entropy = secrets.token_hex(32)

        user.credential_health -= 3

        if user.credential_health <= 0:

            user.credential_generation += 1

            user.credential_health = 100

        return user