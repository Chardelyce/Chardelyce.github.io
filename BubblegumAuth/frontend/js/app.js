const container = document.getElementById("background-bubbles");

for(let i=0;i<20;i++){

const bubble=document.createElement("div");

bubble.className="backgroundBubble";

const size=20+Math.random()*120;

bubble.style.width=size+"px";

bubble.style.height=size+"px";

bubble.style.left=Math.random()*100+"vw";

bubble.style.animationDuration=10+Math.random()*20+"s";

bubble.style.animationDelay=Math.random()*15+"s";

container.appendChild(bubble);

}