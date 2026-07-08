import secrets
import string


class GumRenderer:

    """
    Generates the visual Stick of Gum representation.

    The ASCII gum is a projection of the current
    credential state.
    """


    CHARSET = (
        string.ascii_letters +
        string.digits
    )


    @staticmethod
    def generate_gum_fragment(length=10):

        """
        Generates the user-facing Stick of Gum fragment.
        """

        return "".join(
            secrets.choice(
                GumRenderer.CHARSET
            )
            for _ in range(length)
        )


    @staticmethod
    def generate_ascii_gum(
        generation: int,
        fragment: str
    ):

        """
        Creates the ASCII bubble representation.

        Future versions will morph the shape based on:
        - generation
        - credential health
        - mutation history
        """

        interior = (
            f"  {fragment}  "
        )


        if generation <= 1:

            shape = f"""

              .-~~~~~~~~-.
           .-'            '-.
         .'                  '.
        /                    \\
       |    {interior}       |
       |                      |
        \\                    /
         '.                .'
           '-.__________.-'

"""

        elif generation <= 5:

            shape = f"""

          .-===============-.
       .-'                  '-.
     .'    {interior}          '.
    |                          |
    |       {fragment}         |
    |                          |
     '.                      .'
       '-.================.-'

"""

        else:

            shape = f"""

        .-====================-.
     .-'                        '-.
    /      {fragment}             \\
   |                            |
   |   MUTATED GUM STATE        |
   |                            |
    \\                          /
     '-.====================.-'

"""


        return shape