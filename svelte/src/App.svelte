<script lang="ts">
  import { onMount } from 'svelte';
  import { Popover } from 'flowbite';

  // Icons
  import fireEmoji from './assets/icons/fire.png'

  // My Story Images
  import slidePhotoOne from './assets/photos/Photo_5.png'
  import slidePhotoTwo from './assets/photos/Photo_4.png'
  import slidePhotoThree from './assets/photos/Photo_1.png'
  import slidePhotoFour from './assets/photos/Photo_2.png'
  import slidePhotoFive from './assets/photos/Photo_3.png'
  import slidePhotoSix from './assets/photos/insta_1.png'
  import slidePhotoSeven from './assets/photos/insta_2.png'

  // Hero Section SVG Art
  import headerArtPic from './assets/illustrations/header-art-pic.svg'

  let projects = [
        {
            "name": "Crypto Tutors",
            "image": "https://ik.imagekit.io/2ax1lblqa/ctlogo.png?updatedAt=1732316143920",
            "role": "Senior Front End Developer",
            "type": "Professional",
            "link": "https://www.defiallodds.xyz/",
            "description": "Crypto Tutors is a leading provider of engaging and accessible Web3 education. Our award-winning curriculum, trusted by Fortune 500 companies and recognized by the National Science Foundation. I built the Defi All Odds assessment with SvelteKit and TailwindCSS. I fell in love with both."
        },
        {
            "name": "VOpposition",
            "image": "https://ik.imagekit.io/2ax1lblqa/vopposition-logomark-red.png?updatedAt=1732316143809",
            "role": "Senior Front End Developer",
            "type": "Professional",
            "link": "https://www.vopposition.com/",
            "description": "A matchmaking app for pick up sports, like Basketball, Volleyball, etc, with gamified features. I acted as a Front End Engineer and UX Designer, refining the UX as I translated assets from the Design team to front end code. Built with Angular, Ionic, and TailwindCSS."
        },
        {
            "name": "FinalBossXR",
            "image": "https://ik.imagekit.io/2ax1lblqa/fbs_logo.png?updatedAt=1732316143932",
            "role": "Web Developer / Co-Founder",
            "type": "Professional",
            "link": "https://www.finalbossxr.com/",
            "description": "This is a Video Game & Augmented Reality Studio that I co-founded in 2021. I also act as Web Developer and Game Designer for our team while we build our first IP, Cosmic Collisions. I remade this site with SvelteKit & TailwindCSS"
        },
        // {
        //     "name": "FinalBossXR",
        //     "image": "https://ik.imagekit.io/2ax1lblqa/fbs_logo.png?updatedAt=1732316143932",
        //     "role": "Web Developer / Co-Founder",
        //     "type": "Professional",
        //     "link": "https://www.finalbossxr.com/",
        //     "description": "This is a Video Game & Augmented Reality Studio that I co-founded in 2021. I also act as Web Developer and Game Designer for our team while we build our first IP, Cosmic Collisions. I remade this site with SvelteKit & TailwindCSS"
        // }
       
    ]


  /**
 * Table of Contents
 * - #1 Snap Scroll Behavior Desktop
 * - #3 Landing Header SVG Animation 
 * - #4 Scroll to Contact Section via hitting Contact Us Icon in Navbar
 * - #5 Generate Projects UI
 * - #6 Dark / Light Mode
 * - #7 Project Description Popover
 */



// #3 Landing Header SVG Animation 
fetch(headerArtPic)
.then(response => response.text())
.then(svgContent => {
        // Process the SVG content
        // https://g.co/bard/share/ec7f38615b0c
        const svgContainer = document.getElementById('header-pic');
        // svgContainer.style.width = "50%";
        svgContainer.innerHTML = svgContent;
        const lineOne = svgContainer.firstElementChild.childNodes[7] as HTMLElement;
        const lineTwo = svgContainer.firstElementChild.childNodes[5] as HTMLElement;
        const lineThree = svgContainer.firstElementChild.childNodes[3] as HTMLElement;
        const lineFour = svgContainer.firstElementChild.childNodes[1] as HTMLElement;
        
        setInterval(() => {
            lineOneAnim();
            lineTwoAnim();
            lineThreeAnim();
            lineFourAnim();
        }, 1600);
        
        function lineOneAnim() {
            setTimeout(() => {
                lineOne.style.fill = '#0ff131';
            }, 200);
            setTimeout(() => {
                lineOne.style.fill = '#888';
            }, 900);
        }
        function lineTwoAnim() {
            setTimeout(() => {
                lineTwo.style.fill = '#650087';
            }, 400);
            setTimeout(() => {
                lineTwo.style.fill = '#666';
            }, 1000);
        }
        function lineThreeAnim() {
            setTimeout(() => {
                lineThree.style.fill = '#0ff131';
            }, 600);
            setTimeout(() => {
                lineThree.style.fill = '#444';
            }, 1100);
        }
        function lineFourAnim() {
            setTimeout(() => {
                lineFour.style.fill = '#650087';
            }, 800);
            setTimeout(() => {
                lineFour.style.fill = '#222';
            }, 1200);
        }

        lineOne.style.transition = '0.5s';
        lineTwo.style.transition = '0.5s';
        lineThree.style.transition = '0.5s';
        lineFour.style.transition = '0.5s';
});

// #5 Generate Projects UI
interface Project {
  name: string,
  image: string,
  role: string,
  type: string,
  link: string,
  description: string,
}

// #6 Dark / Light Mode
/**
 * Check the user's device to see what their bightness mode is
 */
let brightnessMode = null;
function getBrightnessMode() {
    let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if(isDarkMode === false) {
      brightnessMode = 'LIGHT'
    } else {
      brightnessMode = 'DARK'
    }
    return isDarkMode;
}
function toggleBrightnessMode() {
  if(brightnessMode === 'LIGHT') {
      brightnessMode = 'DARK'
    } else {
      brightnessMode = 'LIGHT'
    }
}
getBrightnessMode();

  /**
   * TailwindCSS Classes
   */
  // Light Mode
  let lightNav = 'backdrop-blur-lg bg-[#fff]/30 h-16 drop-shadow-lg fixed w-full bottom-0 md:top-0 content-center z-50 transition duration-150';
  let lightText = 'text-black transition duration-150';
  let lightHeader = 'text-3xl text-black font-bold transition duration-150';
  let lightBG = 'bg-[#fff] content-center transition duration-150';

  // Dark Mode
  let darkNav = 'backdrop-blur-lg text-white bg-[#000]/70 h-16 drop-shadow-lg fixed w-full bottom-0 md:top-0 content-center z-50 transition duration-150';
  let darkText = 'text-white transition duration-150';
  let darkHeader = 'text-3xl text-white font-bold transition duration-150';
  let darkBG = 'bg-[#222] content-center transition duration-150';

  onMount(() => {
    setSnapScrolling();
    setDailyDarkModePopover();

    // #1 Snap Scroll Behavior Desktop
    function setSnapScrolling() {
      const options = {
      root: document.getElementById('wrapper'), // Use a specific container as the viewport
      threshold: [0.25], // Trigger at 25% and 75% visibility
      };

    function updateNavbar(activeSection) {
      const navBullets = document.querySelectorAll('.nav-bullet');
      navBullets.forEach((bullet: any) => {
        if (bullet.dataset.currentSection === activeSection) {
          // console.log(activeSection);
          // Active Section, orange square
          bullet.innerHTML = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="10" height="10" fill="#f56f33"/>
              </svg>`
        } else {
          // Inactive Section, white circle.
          bullet.innerHTML = `
              <svg width="10" height="10" viewBox="0 0 10 10" fill="#000" xmlns="http://www.w3.org/2000/svg"> 
                <circle cx="5" cy="5" r="5" fill="#ffffff50"/>
              </svg>`
        }
      });
    }
    const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
            const activeSection = entry.target.dataset.currentSection;
            // console.log(activeSection);
            updateNavbar(activeSection);
        }
    });
    }, options);
    const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
      observer.observe(section);
    });
    }

    // #7 Handle Project Description Popover
    /**
     * Show the Dark/Light mode popover for 5 seconds when the page loads. 
     * I am doing this just to learn how to do it, and a small bit of UX in
     * case someone refreshed they page. No need to see the popover again If you have already
     * seen it once
     */
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
        setTimeout(() => {
          popover.hide();
        }, 10000);
      }

      // For testing purposes
      // localStorage.removeItem(storageKey);
      // console.log(popoverEl);
      // console.log(today);
      // console.log(storageKey);
      // console.log(hasShownToday);
      // console.log('Local Storage: ' + localStorage);   
    }

  });
</script>

<main>
  <!-- Navbar -->
  <div class={brightnessMode === "LIGHT" ? lightNav : darkNav}>
    <div class="md:w-4/5 lg:w-3/5 mx-auto grid grid-cols-2 md:grid-cols-3">
      <div class="col-span-1 content-center">
        <img class="h-4 md:h-7 inline relative bottom-1 ml-3 lg:mr-1 lg:ml-0 " src={fireEmoji} alt="">
        <b class="text-md">
          EDDIE TALIAFERRO II
        </b>
      </div>
      <div class="hidden md:block col-span-1 content-center">
        <!-- Space that goes in between both sides -->
      </div>
      <div class="col-span-1 text-right">
        <!-- Github -->
        <a class="mx-1" href="https://github.com/eddietal2" target="_blank" aria-label="Github Link">
            <ion-icon class="text-3xl p-0.5" name="logo-github" ></ion-icon>
        </a>
        <!-- LinkedIn -->
        <a class="mx-1" href="https://www.linkedin.com/in/eddie-taliaferro-ii/" target="_blank" aria-label="LinkedIn Link">
            <ion-icon class="text-3xl p-0.5" name="logo-linkedin" ></ion-icon>
        </a>
        <!-- Contact Me -->
        <a class="mx-1" href="#section-4"  aria-label="Contact Me Link">
            <ion-icon class="text-3xl p-0.5" name="mail-outline" ></ion-icon>
        </a>
        <!-- Light / Dark Mode -->
        
        <button data-popover-target="popover-default" id="popover-trigger" aria-label="Light/Dark Button" class={brightnessMode === "LIGHT" ? lightText : darkText}  type="button">
          <ion-icon class="text-3xl p-0.5"  name="moon-outline" ></ion-icon>
        </button>

        <div data-popover id="popover-default" role="tooltip" class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
            <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                <h3 class="font-semibold text-gray-900 dark:text-white">Dark / Light Mode</h3>
            </div>
            <div class="px-3 py-2">
                <p class="py-1">You are curretly in <b>{brightnessMode}</b> mode.</p>
                <label class="inline-flex items-center cursor-pointer">
                  <input on:click={toggleBrightnessMode} type="checkbox" value="" class="sr-only peer">
                  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
                </label>
            </div>
            <div data-popper-arrow></div>
        </div>
      </div>
    </div>
  </div>

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

    <!-- Landing Intro -->
    <section data-current-section="s1">
      <div id="section-1" class={brightnessMode === "LIGHT" ? lightBG : darkBG}>
        <div class="md:w-4/5 lg:w-3/5 mx-auto lg:flex flex-row gap-20">
          <!-- Picture -->
          <div class="w-11/12 lg:w-1/4 mx-auto">
            <div id="header-pic" class="my-4"></div>
          </div>
          <!-- Text -->
          <div class="w-11/12 lg:w-3/4 mx-auto">
            <p class="landing-text">
              <span class="text-xl lg:text-4xl text-[#111] dark:text-white">
                <img class="h-10 inline" src={fireEmoji} alt="">
                  <b class={brightnessMode === "LIGHT" ? lightText : darkText}>
                    HI, I'M EDDIE!
                  </b> 
              </span>
              <br>
              <span class="sm:text-xl xl:text-2xl block my-4">
                <span class={brightnessMode === "LIGHT" ? lightText : darkText}>
                  As a versatile developer and designer, I specialize in turning innovative ideas into tangible software. 
                  From web applications to immersive XR experiences, my expertise spans web development, responsive design, CSS & SVG animation, UI/UX design, and even video game development using Unreal Engine. With a focus on creating high-performing and effective software, I've successfully delivered MVPs and beyond on numerous projects.
                </span>
              </span>
              <br>
              <span class="text-xl text-[#111] dark:text-[#ffcb0a] font-bold">
                <span class={brightnessMode === "LIGHT" ? lightText : darkText}>SKILLS</span>
              </span>
              <span class="text-sm lg:text-xl bg-[#ffcb0a10] border-[#ffcb0a40] border-2 p-2 block sm:my-2">
                <span class={brightnessMode === "LIGHT" ? lightText : darkText}>
                  Angular, SvelteKit, Ionic, TailWindCSS, Linux, Git, Figma, Unreal Engine
                </span>
              </span>
          </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- My Story -->
    <section data-current-section="s2">
      <div id="section-2" class={brightnessMode === "LIGHT" ? lightBG : darkBG}>
        <div class="md:w-4/5 lg:w-3/5 p-4 mx-auto md:flex flex-row gap-8">
          <!-- Text -->
          <div class="w-11/12 lg:w-2/4 mt-20 md:mt-0">
              <h1 class={brightnessMode === "LIGHT" ? lightHeader : darkHeader}>MY STORY</h1>
              <p class={brightnessMode === "LIGHT" ? lightText : darkText}>
                My passion for video games, anime, and graphic design began at 11, igniting a creative spark. Online forums like Playstation Universe became my playground for crafting custom signatures. This passion led me to pursue web development, fueled by hackathon victories, bootcamps, teaching, and freelance projects since 2017.
                <br>
                <br>
                Giving back has been equally fulfilling. For four years, I taught Detroit's youth to code through Journi, a non-profit. This experience not only helped my students grow but also refined my own skills. It was an honor and an act of love for my city.
              </p>
          </div>
          <!-- Photo Side -->
          <div class="w-11/12 lg:w-2/4 content-center">
            <!-- Slider main container -->
           

            

<div id="default-carousel" class="relative w-full" data-carousel="slide">
  <!-- Carousel wrapper -->
  <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
       <!-- Item 1 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img src={slidePhotoOne} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
      <!-- Item 2 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img src={slidePhotoTwo} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
      <!-- Item 3 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img src={slidePhotoThree} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
      <!-- Item 4 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img src={slidePhotoFour} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
      <!-- Item 5 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img src={slidePhotoFive} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
      <!-- Item 6 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img src={slidePhotoSix} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
      <!-- Item 7 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img src={slidePhotoSeven} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
  </div>
  <!-- Slider indicators -->
  <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
      <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
      <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
      <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
      <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
      <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
  </div>
  <!-- Slider controls -->
  <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
      <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
          </svg>
          <span class="sr-only">Previous</span>
      </span>
  </button>
  <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
      <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg>
          <span class="sr-only">Next</span>
      </span>
  </button>
</div>

          </div>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section data-current-section="s3">
      <div id="section-3" class={brightnessMode === "LIGHT" ? lightBG : darkBG}>
        <!-- Header -->
        <div class="md:w-4/5 lg:w-3/5 p-4 mx-auto lg:mb-4 content-center">
          <h1 class={brightnessMode === "LIGHT" ? lightHeader : darkHeader}>PROJECTS</h1>
         <span class="text-lg lg:text-xl">
          <p class={brightnessMode === "LIGHT" ? lightText : darkText}>
            Here are some projects (that I can share), ranging from personal projects that I have worked on, or startups I have built MVPs or major features for.
            You can view more of my projects via <a class="text-[#3686fd] pb-0.5 underline" href="https://github.com/eddietal2">Github</a>.
          </p>
         </span>
        </div>
        <!-- Project -->
        <div class="md:w-4/5 lg:w-3/5 p-4 gap-8 mx-auto lg:grid grid-cols-2">
          {#each projects as project}
            <div class="flex flex-row gap-2  p-2 my-2 lg:my-0">
              <img src={project.image} class="h-12" alt="CryptoTutors Logo">
              <div class="content-center">
                <span class="text-xs">
                  <p class={brightnessMode === "LIGHT" ? lightText : darkText}>{project.role} / 2023 - 2024</p>
                </span>
                <p style="font-size: 1.2em;" class={brightnessMode === "LIGHT" ? lightText : darkText}>This is test text in this project card.</p>
                <p class={brightnessMode === "LIGHT" ? lightText : darkText}>
                  <span>
                    <a href={project.link} target="_blank" class="underline pb-0.5 text-[#3686fd]">Link</a>
                  </span>
                  <span>|</span>
                  <button id="popover-trigger" >Description</button>
                  <span id="popover" class="hidden">{project.description}</span>
                </p>
              </div>
            </div>
          {/each }
        </div>
      </div>
    </section>

    <!-- Contact Me -->
    <section data-current-section="s4">
      <div id="section-4" class={brightnessMode === "LIGHT" ? lightBG : darkBG}>
        <div class="md:w-4/5 lg:w-3/5 mx-auto mb-8">
          <!-- Header -->
          <div class="text-center content-center">
            <h1 class="text-4xl text-[#111] dark:text-[#ffcb0a] font-bold relative bottom-2">CONTACT ME</h1>
            <span style="font-size: 5em;" class={brightnessMode === "LIGHT" ? lightText : darkText}>
              <!-- Mail Icon -->
              <ion-icon name="mail-outline" ></ion-icon>
            </span>
            
          </div>

        <!-- Form -->
        <div class="ion-text-center w-11/12 lg:w-1/2 text-center mx-auto">
            <!-- https://formsubmit.co/ -->
            <!-- https://www.youtube.com/watch?v=iSobU_DjNN4 -->
            <form action="https://formsubmit.co/f6e4bbd318fdd3193043ce91e88f6bfd" method="POST">
                <input class="text-lg text-[#111] w-full my-1 h-10 p-2 border-2 border-[#999]" type="text" required placeholder="First & Last Name" name="name">
                <input class="text-lg text-[#111] w-full my-1 h-10 p-2 border-2 border-[#999]" type="text" required placeholder="Email Address" name="email">
                <textarea class="text-lg text-[#111] my-1 mx-auto p-2 w-full border-2 border-[#999]" rows="5" required placeholder="Want to collaborate or have a suggestion?" name="message"></textarea>
                <button class="py-2 px-8 my-4 bg-[#999] text-black text-xl" type="submit">
                    Send Message
                </button>
            </form>
        </div>

        </div>
      </div>
    </section>

  </div>
</main>

<style>

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
