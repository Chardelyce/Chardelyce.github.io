import {particles} from "./asciiCloud.js";

export function gatherParticles(){

    particles.forEach(p=>{

        p.style.transition="1.2s";

        p.style.left="50%";

        p.style.top="50%";

    });

}