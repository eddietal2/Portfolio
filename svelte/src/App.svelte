<script lang="ts">
  import { onMount } from 'svelte';

  // Components
  import Navbar from './lib/components/Navbar.svelte';
  import MyStory from './lib/components/MyStory.svelte';
  import Projects from './lib/components/Projects.svelte';
  import ContactMe from './lib/components/ContactMe.svelte';
  import Hero from './lib/components/Hero.svelte';

  // Set Snap Scrolling on Desktop, and disable on Mobile
  onMount(() => {
    setSnapScrolling();

    function setSnapScrolling() {
      const options = {
        root: document.getElementById('wrapper'),
        threshold: [0.25],
      };
      function updateNavbar(activeSection) {
        const navBullets = document.querySelectorAll('.nav-bullet');
        navBullets.forEach((bullet: any) => {
          bullet.innerHTML = bullet.dataset.currentSection === activeSection
            ? `<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect width="10" height="10" fill="#f56f33"/></svg>`
            : `<svg width="10" height="10" viewBox="0 0 10 10" fill="#000"><circle cx="5" cy="5" r="5" fill="#ffffff50"/></svg>`;
        });
      }
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry: any) => {
          if (entry.isIntersecting) updateNavbar(entry.target.dataset.currentSection);
        });
      }, options);
      document.querySelectorAll('section').forEach(section => observer.observe(section));
    }
  });
</script>

<main>
  <Navbar />
  <!-- Section Nav @ Bottom Right of Desktop -->
  <nav id="sectionation-lg">
    <ul>
        <li>
            <div class="nav-bullet" data-current-section="s1" aria-label="First Section">
              
            </div>
        </li>
        <li>
            <div class="nav-bullet" data-current-section="s2" aria-label="Second Section"></div>
        </li>
        <li>
            <div class="nav-bullet" data-current-section="s3" aria-label="Third Section"></div>
        </li>
        <li>
            <div class="nav-bullet" data-current-section="s4" aria-label="Fourth Section"></div>
        </li>
    </ul>
  </nav>
  <div id="wrapper">
    <section id="section-1" data-current-section="s1">
      <Hero />
    </section>

    <section id="section-2" data-current-section="s2">
      <MyStory />
    </section>

    <section id="section-3" data-current-section="s3">
      <Projects />
    </section>

    <section id="section-4" data-current-section="s4">
      <ContactMe />
    </section>
  </div>
</main>
<style>
  /* For Snap Scrolling Sections on Desktop */
  #wrapper {
      width: 100%;
      height: 100vh;
      overflow-y: scroll;
      scroll-snap-type: y mandatory;
  }
  /* Snap Scrolling Indicator */
  #sectionation-lg {
      /* background: #b1b1b153; */
      background: #191123;
      z-index: 9999;
      width: auto;
      height: auto;
      padding: 0.35em;
      position: fixed;
      right: 3%;
      bottom: 20%;
      text-align: center;
      border-radius: 10px;
  }
  #sectionation-lg ul {
      list-style: none;
      margin: 0;
      padding: 0;
      text-align: center;
  }
  #sectionation-lg ul li {
      justify-content: center;
      display: flex;
  }
  .nav-bullet {
      /* background-image: url('./assets/icons/nav-bullet.svg'); */
      /* background-repeat: no-repeat; */
      margin: 0.54em 0;
      width: 10px;
      height: 10px;
      transition: 1s;
      animation: nav-change-section 1s ease;
  }
  @media (max-width: 1000px)  {
      #sectionation-lg{
          display: none;
      }
  }
  @keyframes nav-change-section {
      0% {
          rotate: 0deg;
      }
      100% {
          rotate: 360deg;
      }
  }

  
</style>