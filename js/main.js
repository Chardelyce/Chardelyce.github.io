/* 

Template 2089 Meteor

http://www.tooplate.com/view/2089-meteor

*/

/* image control  */

const moonImage = document.querySelector('.moon-image');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    moonImage.style.display = 'none';
  } else {
    // Scrolling up
    moonImage.style.display = 'block';
  }

  lastScrollTop = scrollTop;
});

/* end image control  */

/* stars  */

  // Function to create a star and add it to the body
  function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');

    // Randomly position the star on the page
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    star.style.left = x + 'px';
    star.style.top = y + 'px';

    document.body.appendChild(star);
  }

  // Function to create a specified number of stars
  function createStars(count) {
    for (let i = 0; i < count; i++) {
      createStar();
    }
  }

  // Create 100 stars (you can adjust the number)
  createStars(100);



/* end stars  */

jQuery(document).ready(function($) {

	'use strict';


        $('.counter').each(function() {
          var $this = $(this),
              countTo = $this.attr('data-count');
          
          $({ countNum: $this.text()}).animate({
            countNum: countTo
          },

          {

            duration: 8000,
            easing:'linear',
            step: function() {
              $this.text(Math.floor(this.countNum));
            },
            complete: function() {
              $this.text(this.countNum);
              //alert('finished');
            }

          });  
          
        });



        $(".b1").click(function () {
            $(".pop").fadeIn(300);
            
        });
		
		$(".b2").click(function () {
            $(".pop2").fadeIn(300);
            
        });
		
		$(".b3").click(function () {
            $(".pop3").fadeIn(300);
            
        });

        $(".pop > span, .pop").click(function () {
            $(".pop").fadeOut(300);
        });
		
		$(".pop2 > span, .pop2").click(function () {
            $(".pop2").fadeOut(300);
        });
		
		$(".pop3 > span, .pop3").click(function () {
            $(".pop3").fadeOut(300);
        });


        $(window).on("scroll", function() {
            if($(window).scrollTop() > 100) {
                $(".header").addClass("active");
            } else {
                //remove the background property so it comes transparent again (defined in your css)
               $(".header").removeClass("active");
            }
        });


	/************** Mixitup (Filter Projects) *********************/
    	$('.projects-holder').mixitup({
            effects: ['fade','grayscale'],
            easing: 'snap',
            transitionSpeed: 400
        });

});