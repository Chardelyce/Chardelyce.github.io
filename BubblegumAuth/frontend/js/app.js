const API = "http://127.0.0.1:8000";

const username =
document.getElementById("username");

const password =
document.getElementById("password");

const registerButton =
document.getElementById("registerButton");

const loginButton =
document.getElementById("loginButton");

const prompt =
document.getElementById("bubblePrompt");

//-------------------------------------
// Register
//-------------------------------------
import {
    registerUser,
    loginUser
} from "./login.js";
registerButton.onclick = async () => {

    const response = await fetch(

        API + "/register",

        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                username:username.value,

                password:password.value

            })

        }

    );

    const data = await response.json();

    console.log(data);

    if(response.ok){

        prompt.textContent =
        "🍬 Bubble Created Successfully";

    }else{

        prompt.textContent =
        data.detail;

    }

};

//-------------------------------------
// Login
//-------------------------------------

loginButton.onclick = async()=>{

    const response = await fetch(

        API+"/login",

        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                username:username.value,

                password:password.value

            })

        }

    );

    const data =
    await response.json();

    console.log(data);

    if(response.ok){

        prompt.textContent =
        "Generating Authentication Bubble...";

        console.log(data);

    }else{

        prompt.textContent =
        "Login Failed";

    }
    const usernameInput =
document.getElementById("username");


const passwordInput =
document.getElementById("password");


const registerButton =
document.getElementById("registerButton");


const loginButton =
document.getElementById("loginButton");


const prompt =
document.getElementById("bubblePrompt");



registerButton.addEventListener(
    "click",
    async () => {


        const username =
        usernameInput.value;


        const password =
        passwordInput.value;


        const result =
        await registerUser(
            username,
            password
        );


        console.log(result);


        prompt.textContent =
        result.message;

    }
);



loginButton.addEventListener(
    "click",
    async () => {


        const username =
        usernameInput.value;


        const password =
        passwordInput.value;


        const result =
        await loginUser(
            username,
            password
        );


        console.log(result);


        prompt.textContent =
        result.message;

    }
);

};