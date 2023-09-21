particlesJS('particles-js', {
    particles: {
        number: {
            value: 100, // Adjust the number of particles
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ffffff' // Particle color
        },
        shape: {
            type: 'circle' // Particle shape
        },
        opacity: {
            value: 0.5, // Particle opacity
            random: false
        },
        size: {
            value: 3, // Particle size
            random: true
        },
        line_linked: {
            enable: false,
        },
        move: {
            enable: true,
            speed: 2, // Particle movement speed
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        events: {
            onhover: {
                enable: true,
                mode: 'repulse' // Interaction on hover
            }
        },
        modes: {
            repulse: {
                distance: 100, // Interaction distance
                duration: 0.4
            }
        }
    },
    retina_detect: true
});
