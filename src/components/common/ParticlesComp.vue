<template>
  <vue-particles
    id="particles"
    :particlesInit="particlesInit"
    :particlesLoaded="particlesLoaded"
    :options="{
      fpsLimit: 120,
      interactivity: {
        detectsOn: 'canvas',
        events: {
          onClick: {
            enable: false,
            mode: 'push'
          },
          onHover: {
            enable: false,
            mode: 'grab'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 0
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      particles: {
        number: {
          value: 6,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#1b1e34'
        },
        links: {
          color: '#ffffff',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1
        },
        collisions: {
          enable: true
        },
        move: {
          direction: 'none',
          enable: true,
          outMode: 'bounce',
          random: false,
          speed: 6,
          straight: false
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        shape: {
          type: 'polygon',
          stroke: {
            width: 0,
            color: '#000000'
          },
          polygon: {
            nb_sides: 6
          },
          image: {
            src: 'img/github.svg',
            width: 100,
            height: 100
          }
        },
        size: {
          value: 160,
          random: false,
          anim: {
            enable: true,
            speed: 20,
            size_min: 40,
            sync: false
          }
        }
      },
      detectRetina: true
    }"
  />
</template>

<script setup>
import { loadFull } from 'tsparticles'

const particlesInit = async (engine) => {
  await loadFull(engine)
}
</script>
