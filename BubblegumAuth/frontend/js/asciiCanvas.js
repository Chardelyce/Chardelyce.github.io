const canvas = document.getElementById("asciiCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

const chars =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

const particles = [];

const TOTAL = 350;

class Particle{

    constructor(){

        this.reset();

    }

    reset(){

        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;

        this.vx = (Math.random()-.5)*.4;
        this.vy = (Math.random()-.5)*.4;

        this.size = 10 + Math.random()*6;

        this.character =
            chars[Math.floor(Math.random()*chars.length)];

        this.alpha = .2 + Math.random()*.8;

    }

    draw(){

        ctx.globalAlpha=this.alpha;

        ctx.fillStyle="#ffffff";

        ctx.font=this.size+"px monospace";

        ctx.fillText(this.character,this.x,this.y);

    }

    update(){

        this.x+=this.vx;

        this.y+=this.vy;

        if(this.x<0||this.x>canvas.width){

            this.vx*=-1;

        }

        if(this.y<0||this.y>canvas.height){

            this.vy*=-1;

        }

        this.draw();

    }

}

for(let i=0;i<TOTAL;i++){

    particles.push(new Particle());

}

export {particles,canvas,ctx};
export function animateCloud(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{

        p.update();

    });

    requestAnimationFrame(animateCloud);

}