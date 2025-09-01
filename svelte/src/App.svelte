<script lang="ts">
  import { onMount } from 'svelte';
  import { Popover } from 'flowbite';

  import Navbar from './lib/components/Navbar.svelte';
  import MyStory from './lib/components/MyStory.svelte';
  import Projects from './lib/components/Projects.svelte';
  import ContactMe from './lib/components/ContactMe.svelte';
  import Hero from './lib/components/Hero.svelte';

  import { theme } from './lib/stores/light-dark-mode';

  // Icons
  import fireEmoji from './assets/icons/fire.png';

  

  // Hero Section SVG Art
  import headerArtPic from './assets/illustrations/header-art-pic.svg';


  // SVG Header Animation
  onMount(() => {
    fetch(headerArtPic)
      .then(res => res.text())
      .then(svgContent => {
        const svgContainer = document.getElementById('header-pic');
        svgContainer.innerHTML = svgContent;

        const lineOne = svgContainer.firstElementChild.childNodes[7] as HTMLElement;
        const lineTwo = svgContainer.firstElementChild.childNodes[5] as HTMLElement;
        const lineThree = svgContainer.firstElementChild.childNodes[3] as HTMLElement;
        const lineFour = svgContainer.firstElementChild.childNodes[1] as HTMLElement;

        setInterval(() => {
          animateLine(lineOne, '#f3f3f3', '#888', 200, 900);
          animateLine(lineTwo, '#ffd24d', '#666', 400, 1000);
          animateLine(lineThree, '#f56f33', '#444', 600, 1100);
          animateLine(lineFour, '#f73209', '#222', 800, 1200);
        }, 1600);

        [lineOne, lineTwo, lineThree, lineFour].forEach(line => line.style.transition = '0.5s');

        function animateLine(line: HTMLElement, color1: string, color2: string, t1: number, t2: number) {
          setTimeout(() => line.style.fill = color1, t1);
          setTimeout(() => line.style.fill = color2, t2);
        }
      });

    setSnapScrolling();
    setDailyDarkModePopover();

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

    function setDailyDarkModePopover() {
      const popoverEl = document.getElementById('popover-default');
      const popoverTrigger = document.getElementById('popover-trigger');
      const today = new Date().toLocaleDateString();
      const storageKey = `popoverShownToday-${today}`;
      const hasShownToday = localStorage.getItem(storageKey);
      localStorage.setItem(storageKey, 'true');

      if (!hasShownToday) {
        const popover = new Popover(popoverEl, popoverTrigger);
        popover.show();
        setTimeout(() => popover.hide(), 10000);
      }
    }
  });
</script>

<main>
  <Navbar />
  
   <!-- Section Nav -->
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
  /* Greetings Animation */
  .fire-anim {
    opacity: 0;
    animation: fire-slide 500ms cubic-bezier(0.075, 0.82, 0.165, 1) 750ms forwards;
  }
  .greetings-anim-1 {
    opacity: 0;
    animation: greeting-slide-1 500ms cubic-bezier(0.075, 0.82, 0.165, 1) 1500ms forwards;
  }
  .greetings-anim-2 {
    opacity: 0;
    animation: greeting-slide-2 500ms cubic-bezier(0.075, 0.82, 0.165, 1) 2500ms forwards;
  }
  .greetings-anim-3 {
    opacity: 0;
    animation: greeting-slide-2 500ms cubic-bezier(0.075, 0.82, 0.165, 1) 3000ms forwards;
  }
  @keyframes greeting-slide-1 {
    0% {
      transform: translateY(50px);
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }
  @keyframes fire-slide {
    0% {
      transform: translateX(-50px);
    }
    100% {
      transform: translateX(0px);
      opacity: 1;
    }
  }
  @keyframes greeting-slide-2 {
    0% {
      transform: translateX(50px);
    }
    100% {
      transform: translateX(0px);
      opacity: 1;
    }
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

  /* For Snap Scrolling Sections on Desktop */
  #wrapper {
      width: 100%;
      height: 100vh;
      overflow-y: scroll;
      scroll-snap-type: y mandatory;
  }
  #section-1,
  #section-2,
  #section-3,
  #section-4
   {
      width: 100%;
      height: 100vh;
      scroll-snap-align: start;
  }
  @media (max-width: 1000px)  {
      #wrapper,
      #section-1,
      #section-2,
      #section-3 {
          scroll-snap-type: none;
          scroll-snap-align: none;
          height: auto;
      }

      #section-4 {
          scroll-snap-type: none;
          scroll-snap-align: none;
          height: auto;
          padding: 10em 0 5em 0;
      }
  }

  /* Projects */
  #popover {
    /* Style the popover as you wish */
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    display: none;
  }

  #popover:target {
    display: block;
  }

  /* Contact Form */
  input:focus, textarea:focus {
    border: 2px solid #999;
  }
  /* Swiper */
  .swiper {
      width: 100%;
      /* height: ; */
    }
  .swiper-wrapper {
      margin: 0em;
  }
  @media (max-width: 600px)  {
      .swiper {
          margin: 3em auto;
          width: 100%
      }
  }


</style>