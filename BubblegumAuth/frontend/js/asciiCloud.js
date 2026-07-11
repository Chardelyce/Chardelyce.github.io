const asciiBubble = document.getElementById("asciiBubble");

const chars =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()<>?/[]{}";

const particles = [];

const PARTICLE_COUNT = 220;

export function createAsciiCloud(){

    asciiBubble.innerHTML = "";

    particles.length = 0;

    for(let i=0;i<PARTICLE_COUNT;i++){

        const span = document.createElement("span");

        span.className = "asciiParticle";

        span.textContent =
            chars[Math.floor(Math.random()*chars.length)];

        span.style.left = Math.random()*100+"%";

        span.style.top = Math.random()*100+"%";

        span.style.fontSize =
            (8+Math.random()*8)+"px";

        span.style.animationDelay =
            Math.random()*6+"s";

        asciiBubble.appendChild(span);

        particles.push(span);

    }

}

export function randomizeCloud(){

    particles.forEach(p=>{

        p.textContent =
            chars[Math.floor(Math.random()*chars.length)];

    });

}