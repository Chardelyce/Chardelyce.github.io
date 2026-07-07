const username = "Chardelyce";

const feed = document.getElementById("github-feed");


fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
.then(response => response.json())
.then(repos => {


    repos.slice(0,3).forEach(repo => {


        const card = document.createElement("div");

        card.className="github-card";


        card.innerHTML=`

            <h3>${repo.name}</h3>

            <p>
            ${repo.description || "Software project"}
            </p>

            <span>
            ${repo.language || "Code"}
            </span>

            <br><br>

            <a href="${repo.html_url}" target="_blank">
            View Repository →
            </a>

        `;


        feed.appendChild(card);


    });


});