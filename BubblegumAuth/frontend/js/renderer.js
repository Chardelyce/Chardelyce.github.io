/*
==========================================
BubblegumAuth Renderer
Handles ALL canvas drawing
==========================================
*/

const canvas = document.getElementById("asciiCanvas");
const ctx = canvas.getContext("2d");

//----------------------------------
// Resize
//----------------------------------

function resizeCanvas(){

    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

}

window.addEventListener("resize",resizeCanvas);
resizeCanvas();

//----------------------------------
// Renderer Class
//----------------------------------

export default class Renderer{

    constructor(){

        this.ctx = ctx;

        this.canvas = canvas;

        this.width = canvas.width;

        this.height = canvas.height;

    }

    //----------------------------------

    clear(){

        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

    }

    //----------------------------------

    drawCharacter(x,y,char,size=16,alpha=1){

        this.ctx.save();

        this.ctx.globalAlpha = alpha;

        this.ctx.fillStyle = "#FFFFFF";

        this.ctx.font = `${size}px monospace`;

        this.ctx.textAlign = "center";

        this.ctx.fillText(char,x,y);

        this.ctx.restore();

    }

    //----------------------------------

    drawCloud(particles){

        particles.forEach(p=>{

            this.drawCharacter(

                p.x,

                p.y,

                p.char,

                p.size,

                p.alpha

            );

        });

    }

    //----------------------------------

    drawStick(progress){

        this.ctx.save();

        this.ctx.fillStyle="white";

        this.ctx.shadowBlur=20;

        this.ctx.shadowColor="#ff99cc";

        const width = 120 + progress*250;

        const height = 16;

        this.ctx.fillRect(

            (this.canvas.width-width)/2,

            this.canvas.height/2,

            width,

            height

        );

        this.ctx.restore();

    }

    //----------------------------------

    drawFold(progress){

        this.ctx.save();

        this.ctx.strokeStyle="white";

        this.ctx.lineWidth=6;

        this.ctx.shadowBlur=20;

        this.ctx.shadowColor="#ff99cc";

        const x=this.canvas.width/2;

        const y=this.canvas.height/2;

        const amp=30*progress;

        this.ctx.beginPath();

        this.ctx.moveTo(x-160,y);

        this.ctx.quadraticCurveTo(

            x,

            y-amp,

            x+160,

            y

        );

        this.ctx.stroke();

        this.ctx.restore();

    }

    //----------------------------------

    drawCredential(lines){

        this.ctx.save();

        this.ctx.fillStyle="white";

        this.ctx.font="15px monospace";

        this.ctx.textAlign="center";

        let startY=120;

        lines.forEach(line=>{

            this.ctx.fillText(

                line,

                this.canvas.width/2,

                startY

            );

            startY+=20;

        });

        this.ctx.restore();

    }

    //----------------------------------

    drawChallenge(challenge){

        this.ctx.save();

        const w=260;
        const h=140;

        const x=(this.canvas.width-w)/2;
        const y=this.canvas.height-180;

        this.ctx.fillStyle="rgba(255,255,255,.15)";
        this.ctx.strokeStyle="#ffffff";
        this.ctx.lineWidth=2;

        this.ctx.beginPath();

        this.ctx.roundRect(x,y,w,h,18);

        this.ctx.fill();

        this.ctx.stroke();

        this.ctx.fillStyle="white";

        this.ctx.font="18px Fredoka";

        this.ctx.textAlign="center";

        this.ctx.fillText(

            "🍬 Authentication Challenge",

            this.canvas.width/2,

            y+30

        );

        this.ctx.font="16px monospace";

        this.ctx.fillText(

            challenge,

            this.canvas.width/2,

            y+75

        );

        this.ctx.restore();

    }

}