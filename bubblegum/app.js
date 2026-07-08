const API = "http://127.0.0.1:8000";

document
.getElementById("registerButton")
.addEventListener("click", register);

document
.getElementById("loginButton")
.addEventListener("click", login);

async function register(){

    const username =
        document.getElementById("registerUsername").value;

    const password =
        document.getElementById("registerPassword").value;

    const response = await fetch(`${API}/register`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            username,

            password

        })

    });

    const data = await response.json();

    alert(data.message);

}

async function login(){

    const username =
        document.getElementById("loginUsername").value;

    const password =
        document.getElementById("loginPassword").value;

    const response = await fetch(`${API}/login`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            username,

            password

        })

    });

    const data = await response.json();

    console.log(data);

}