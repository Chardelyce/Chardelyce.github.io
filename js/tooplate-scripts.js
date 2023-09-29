// github-feed.js

// Function to fetch GitHub activity and populate the feed
function fetchGitHubActivity() {
  // Replace with your GitHub username and repo name
  const username = "chardelyce";
  const repo = "chardelyce";

  // GitHub API URL for the user's activity feed
  const apiUrl = `https://api.github.com/repos/${username}/${repo}/events`;

  // Map event types to their corresponding actions
  const eventActionMap = {
      PushEvent: "pushed to",
      PullRequestEvent: "opened a pull request in",
      // Add more event types and actions as needed
  };

  // Fetch the GitHub activity data
  fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
          const githubFeed = document.getElementById("github-feed");

          // Clear any existing content
          githubFeed.innerHTML = "";

          // Loop through the GitHub activity events
          data.forEach((event) => {
              // Determine the action based on the event type
              const action = eventActionMap[event.type] || "performed an action in";

              // Extract the repository name
              const repoName = event.repo.name || "an unknown repository";

              // Create a new notification item for each event
              const notificationItem = document.createElement("div");
              notificationItem.classList.add("media", "tm-notification-item");

              // Display the event content in white text
              notificationItem.innerHTML = `
                  <p style="color: white;">
                      ${event.actor.login} ${action} <strong>${repoName}</strong>
                  </p>
              `;

              // Append the notification item to the feed
              githubFeed.appendChild(notificationItem);
          });
      })
      .catch((error) => {
          console.error("Error fetching GitHub activity:", error);
      });
}

// Call the function to fetch and display GitHub activity
fetchGitHubActivity();
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const maxParticles = 100;
const minDistance = 150;

class Particle {
  constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.radius = 2;
      this.velocityX = Math.random() * 4 - 2;
      this.velocityY = Math.random() * 4 - 2;
  }

  draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
  }

  update() {
      // Update particle position
      this.x += this.velocityX;
      this.y += this.velocityY;

      // Bounce off the screen boundaries
      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.velocityX = -this.velocityX;
      }
      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.velocityY = -this.velocityY;
      }

      this.draw();
  }
}

// Create initial particles
for (let i = 0; i < maxParticles; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const particle = new Particle(x, y, color);
  particles.push(particle);
}

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < minDistance) {
              ctx.beginPath();
              ctx.strokeStyle = particles[i].color;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
              ctx.closePath();
          }
      }
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
      particles[i].update();
  }

  drawLines();
}

animate();
$(document).ready(function () {
$(".scroll-to").on("click", function (event) {
  event.preventDefault();
  var target = $(this).attr("href");
  $("html, body").animate({
    scrollTop: $(target).offset().top
  }, 800); // Adjust the animation duration as needed
});
});

$(document).ready(function () {
// Select all anchor links except those with the class "no-smooth-scroll"
$('a[href*="#"]:not(.no-smooth-scroll)').click(function(event) {
  event.preventDefault();
  
  // Get the target element's ID from the href attribute
  var target = $(this).attr("href");
  
  // Animate the scroll to the target element's position
  $('html, body').animate({
    scrollTop: $(target).offset().top
  }, 800); // Adjust the animation duration as needed
});
});

var slideIndex = 0;
carousel();


jQuery(document).ready(function() {
"use strict";
  $('.gallery-slider').slick({
      slidesToShow: 5,
      slidesToScroll: 3,
      autoplay: false,
      dots: true,
      autoplaySpeed: 2000,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 575,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
      
  });

  $(".navbar-button").click(function(e){
      e.stopPropagation();
      $(".header").toggleClass("open");
      $(".navbar-button").toggleClass("collapsed");
  });

  function closeMenu() {
    $(".header").removeClass("open");
    $(".navbar-button").addClass("collapsed"); 
  }

  $(".navbar .navbar-nav > .nav-item > a.nav-link").click(function(e){
    e.stopPropagation();
    closeMenu();     
  });

  $("html").click(function(e) {
    closeMenu();
  });

  $('.single-page-nav').singlePageNav({
      filter: ':not(.external)',
      updateHash: true
  });


  
}
);
const width_threshold = 480;

function drawLineChart() {
if ($("#lineChart").length) {
  ctxLine = document.getElementById("lineChart").getContext("2d");
  optionsLine = {
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Hits"
          }
        }
      ]
    }
  };

  // Set aspect ratio based on window width
  optionsLine.maintainAspectRatio =
    $(window).width() < width_threshold ? false : true;

  configLine = {
    type: "line",
    data: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July"
      ],
      datasets: [
        {
          label: "Latest Hits",
          data: [88, 68, 79, 57, 50, 55, 70],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          cubicInterpolationMode: "monotone",
          pointRadius: 0
        },
        {
          label: "Popular Hits",
          data: [33, 45, 37, 21, 55, 74, 69],
          fill: false,
          borderColor: "rgba(255,99,132,1)",
          cubicInterpolationMode: "monotone",
          pointRadius: 0
        },
        {
          label: "Featured",
          data: [44, 19, 38, 46, 85, 66, 79],
          fill: false,
          borderColor: "rgba(153, 102, 255, 1)",
          cubicInterpolationMode: "monotone",
          pointRadius: 0
        }
      ]
    },
    options: optionsLine
  };

  lineChart = new Chart(ctxLine, configLine);
}
}

function drawBarChart() {
if ($("#barChart").length) {
  ctxBar = document.getElementById("barChart").getContext("2d");

  optionsBar = {
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 0.2,
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: "Hits"
          }
        }
      ]
    }
  };

  optionsBar.maintainAspectRatio =
    $(window).width() < width_threshold ? false : true;

  /**
   * COLOR CODES
   * Red: #F7604D
   * Aqua: #4ED6B8
   * Green: #A8D582
   * Yellow: #D7D768
   * Purple: #9D66CC
   * Orange: #DB9C3F
   * Blue: #3889FC
   */

  configBar = {
    type: "horizontalBar",
    data: {
      labels: ["Red", "Aqua", "Green", "Yellow", "Purple", "Orange", "Blue"],
      datasets: [
        {
          label: "# of Hits",
          data: [33, 40, 28, 49, 58, 38, 44],
          backgroundColor: [
            "#F7604D",
            "#4ED6B8",
            "#A8D582",
            "#D7D768",
            "#9D66CC",
            "#DB9C3F",
            "#3889FC"
          ],
          borderWidth: 0
        }
      ]
    },
    options: optionsBar
  };

  barChart = new Chart(ctxBar, configBar);
}
}

function drawPieChart() {
if ($("#pieChart").length) {
  var chartHeight = 300;

  $("#pieChartContainer").css("height", chartHeight + "px");

  ctxPie = document.getElementById("pieChart").getContext("2d");

  optionsPie = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10
      }
    },
    legend: {
      position: "top"
    }
  };

  configPie = {
    type: "pie",
    data: {
      datasets: [
        {
          data: [18.24, 6.5, 9.15],
          backgroundColor: ["#F7604D", "#4ED6B8", "#A8D582"],
          label: "Storage"
        }
      ],
      labels: [
        "Used Storage (18.240GB)",
        "System Storage (6.500GB)",
        "Available Storage (9.150GB)"
      ]
    },
    options: optionsPie
  };

  pieChart = new Chart(ctxPie, configPie);
}
}

function updateLineChart() {
if (lineChart) {
  lineChart.options = optionsLine;
  lineChart.update();
}
}

function updateBarChart() {
if (barChart) {
  barChart.options = optionsBar;
  barChart.update();
}
}

