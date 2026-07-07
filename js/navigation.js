const hamburger = document.querySelector(".hamburger");

const navMenu = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});