const API_URL = "http://127.0.0.1:8000";


// Elements

const loginButton = document.getElementById("login-btn");
const registerButton = document.getElementById("register-btn");

const statusMessage = document.getElementById("status-message");

const asciiGum = document.getElementById("ascii-gum");

const health = document.getElementById("health");
const generation = document.getElementById("generation");
const mutation = document.getElementById("mutation");
const gumToken = document.getElementById("gum-token");



// Store current Stick of Gum

let currentGum = null;



// REGISTER

registerButton.addEventListener(
    "click",
    async () => {


        const username =
            document.getElementById(
                "register-username"
            ).value;


        const password =
            document.getElementById(
                "register-password"
            ).value;



        const response = await fetch(
            `${API_URL}/auth/register`,
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    username,
                    password

                })

            }
        );



        const data = await response.json();



        if(response.ok){

            currentGum = data.stick_of_gum;


            statusMessage.innerText =
                "Fresh bubblegum credential created!";


            asciiGum.textContent =
                data.ascii_gum;


            gumToken.innerText =
                currentGum;

        }

        else {

            statusMessage.innerText =
                data.detail;

        }

    }
);





// LOGIN

loginButton.addEventListener(
    "click",
    async () => {


        const username =
            document.getElementById(
                "login-username"
            ).value;



        const password =
            document.getElementById(
                "login-password"
            ).value;



        const response = await fetch(
            `${API_URL}/auth/login`,
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },


                body: JSON.stringify({

                    username,

                    password,

                    stick_of_gum:
                        currentGum

                })

            }
        );



        const data = await response.json();



        if(response.ok){


            const user = data.user;


            currentGum =
                user.stick_of_gum;



            statusMessage.innerText =
                "Bubblegum stretched and regenerated!";



            asciiGum.textContent =
                user.ascii_gum;



            health.innerText =
                user.credential_health;



            generation.innerText =
                user.credential_generation;



            mutation.innerText =
                user.mutation_counter;



            gumToken.innerText =
                currentGum;


        }


        else {


            statusMessage.innerText =
                data.detail;


        }


    }
);