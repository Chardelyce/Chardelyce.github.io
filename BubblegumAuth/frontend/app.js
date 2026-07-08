
// Bubblegum Authentication Frontend Controller

const statusMessage = document.getElementById("status-message");
const asciiGum = document.getElementById("ascii-gum");

const healthDisplay = document.getElementById("health");
const generationDisplay = document.getElementById("generation");
const mutationDisplay = document.getElementById("mutation");
const gumTokenDisplay = document.getElementById("gum-token");


const loginButton = document.getElementById("login-btn");
const registerButton = document.getElementById("register-btn");


// Temporary Bubblegum Animation State

function updateStatus(message) {

    statusMessage.innerText = message;

}


function createBubbleEffect() {

    asciiGum.innerText = `

          .-~~~~~~~~-.
       .-'            '-.
     .'                  '.
    /      BUBBLEGUM      \\
   |        FORMING        |
    \\                    /
     '.                .'
       '-.________.-'

`;

}


function popBubble() {

    asciiGum.innerText = `

             *
          *     *
       *   POP!   *
          *     *
             *

`;

}


// Fake credential mutation display

function simulateMutation() {


    updateStatus(
        "Stretching and folding credentials..."
    );


    createBubbleEffect();


    setTimeout(() => {

        updateStatus(
            "Generating Stick of Gum..."
        );


        healthDisplay.innerText = "100%";
        generationDisplay.innerText = "1";
        mutationDisplay.innerText = "0";

        gumTokenDisplay.innerText =
            "Waiting for gum fragment";


    }, 2000);



    setTimeout(() => {

        popBubble();


        updateStatus(
            "Stick of Gum created!"
        );


    }, 5000);

}



// Register button

registerButton.addEventListener(
    "click",
    () => {

        updateStatus(
            "Creating your Bubblegum credential..."
        );

        simulateMutation();

    }
);



// Login button

loginButton.addEventListener(
    "click",
    () => {

        updateStatus(
            "Checking your Bubblegum state..."
        );


        simulateMutation();

    }
);
