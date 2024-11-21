<script lang="ts">
  // Icons
  import fireEmoji from './assets/icons/fire.png'

  // Logos
  import cryptoTutorsLogo from './assets/icons/ctlogo.png'

  // My Story Images
  import Swiper from 'swiper';
  import slidePhotoOne from './assets/photos/insta_1.png'
  import slidePhotoTwo from './assets/photos/insta_2.png'
  import slidePhotoThree from './assets/photos/Photo_1.png'
  import slidePhotoFour from './assets/photos/Photo_2.png'
  import slidePhotoFive from './assets/photos/Photo_3.png'
  import slidePhotoSix from './assets/photos/Photo_4.png'
  import slidePhotoSeven from './assets/photos/Photo_5.png'

  // Hero Section SVG Art
  import headerArtPic from './assets/illustrations/header-art-pic.svg'


  /**
 * Table of Contents
 * - #1 Snap Scroll Behavior Desktop
 * - #2 Swiper JS implementation for Picture Slides in 'My Story'
 * - #3 Landing Header SVG Animation 
 * - #4 Scroll to Contact Section via hitting Contact Us Icon in Navbar
 * - #5 Generate Projects UI
 * - #6 
 */

// #1 Snap Scroll Behavior Desktop
// const options = {
//     root: document.getElementById('wrapper'), // Use a specific container as the viewport
//     threshold: [0.25], // Trigger at 25% and 75% visibility
// };
// function updateNavbar(activeSection) {
//     const navBullets = document.querySelectorAll('.nav-bullet');
//     console.log(navBullets);
    
//     navBullets.forEach((bullet: HTMLElement) => {
//         console.log(bullet);
//         bullet.classList.remove('current');
//         if (bullet.dataset.currentSection === activeSection) {
//             bullet.classList.add('current');
//         }
//     });
//     // Add any additional navbar updates here (e.g., change background color)
// }
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry: any) => {
//         if (entry.isIntersecting) {
//             const activeSection = entry.target.dataset.currentSection;
//             console.log(activeSection);
//             updateNavbar(activeSection);
//         }
//     });
// }, options);
// const rows = document.querySelectorAll('section');
// rows.forEach((row) => {
//     observer.observe(row);
// });

// #2 Swiper JS implementation for Picture Slides in 'My Story'
const swiper = new Swiper('.swiper', {
    // Optional parameters
    speed: 300,
    autoplay: true,
    direction: 'horizontal',
    loop: true,
    effect: 'fade'
});
swiper.init();

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
let projects = null;
fetch('projects.json')
  .then(response => response.json())
  .then((data: any) => {
      console.log('Got Projects!');
      projects = data.projects as Project[];
      console.log(projects);
        
    })

  

  // Tailwind CSS Classes
  let sectionHeader = 'text-3xl font-bold'
</script>

<main>

  <!-- Navbar -->
  <div id="toolbar" class="backdrop-blur-lg bg-[#fff]/30 dark:bg-[#222] h-16 drop-shadow-lg fixed w-full top-0 content-center z-50">
    <div class="w-3/5 lg:mx-auto grid grid-cols-3">
      <div class="col-span-1 content-center">
        <img class="h-7 relative bottom-1 mr-1 inline" src={fireEmoji} alt="">
        <b class="text-xl">
          EDDIE TALIAFERRO II
        </b>
      </div>
      <div class="col-span-1 content-center">
        <!-- Space that goes in between both sides -->
      </div>
      <div class="col-span-1 text-right">
        <a class="mx-1" href="https://github.com/eddietal2" target="_blank" aria-label="Github Link">
            <ion-icon size="large" class="text-[#222]" name="logo-github" ></ion-icon>
        </a>
        <a class="mx-1" href="https://github.com/eddietal2" target="_blank" aria-label="Github Link">
            <ion-icon size="large" class="text-[#222]" name="logo-linkedin" ></ion-icon>
        </a>
        <a class="mx-1" href="https://github.com/eddietal2" target="_blank" aria-label="Github Link">
            <ion-icon size="large" class="text-[#222]" name="mail-outline" ></ion-icon>
        </a>
        <a class="mx-1" href="https://github.com/eddietal2" target="_blank" aria-label="Github Link">
            <ion-icon size="large" class="text-[#222]" name="moon-outline" ></ion-icon>
        </a>
      </div>
    </div>
  </div>

  <!-- Section Nav -->
  <nav id="sectionation-lg">
    <ul>
        <li>
            <div class="nav-bullet" data-current-section="s1" aria-label="First Section"></div>
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
    <section data-current-section="s1" class="border-b-2 border-[#999]">
      <div id="section-1" class="content-center">
        <div class="w-3/5 mx-auto flex flex-row gap-8">
          <div class="w-1/4">
            <div id="header-pic" class="my-4 mt-24 lg:mt-4"></div>
          </div>
          <div class="w-3/4">
            <p class="landing-text">
              <span class="text-xl lg:text-4xl text-[#111] dark:text-white">
                <img class="h-10 inline" src={fireEmoji} alt="">
                  <b>
                    HI, I'M EDDIE!
                  </b> 
              </span>
              <br>
              <span class="text-2xl text-[#111] dark:text-white block my-4">
                  As a versatile developer and designer, I specialize in turning innovative ideas into tangible software. 
                  From web applications to immersive XR experiences, my expertise spans web development, responsive design, CSS & SVG animation, UI/UX design, and even video game development using Unreal Engine. With a focus on creating high-performing and effective software, I've successfully delivered MVPs and beyond on numerous projects.
              </span>
              <br>
              <span class="text-xl text-[#111] dark:text-[#ffcb0a] font-bold">SKILLS</span>
              <span class="text-sm lg:text-xl text-[#111] dark:text-[#fff] bg-[#ffcb0a10] border-[#ffcb0a40] border-2 p-2 block sm:my-2">
              Angular, SvelteKit, Ionic, TailWindCSS, Linux, Git, Figma, Unreal Engine
              </span>
          </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- My Story -->
    <section data-current-section="s2" class="border-b-2 border-[#999]">
      <div id="section-2" class="content-center">
        <div class="w-3/5 p-4 mx-auto flex flex-row gap-8">
          <!-- Text -->
          <div class="w-2/4">
              <h1 class={sectionHeader}>MY STORY</h1>
              <p class="text-lg lg:text-md text-[#111] dark:text-white">
                My passion for video games, anime, and graphic design began at 11, igniting a creative spark. Online forums like Playstation Universe became my playground for crafting custom signatures. This passion led me to pursue web development, fueled by hackathon victories, bootcamps, teaching, and freelance projects since 2017.
                <br>
                <br>
                Giving back has been equally fulfilling. For four years, I taught Detroit's youth to code through Journi, a non-profit. This experience not only helped my students grow but also refined my own skills. It was an honor and an act of love for my city.
              </p>
          </div>
          <!-- Photo Side -->
          <div class="w-2/4 content-center">
            <!-- Slider main container -->
            <div class="swiper">
              <!-- Additional required wrapper -->
              <div class="swiper-wrapper">
                <!-- Slides -->
                <div class="swiper-slide">
                 <img src={slidePhotoOne} alt="Slide">
                </div>
                <div class="swiper-slide">
                 <img src={slidePhotoTwo} alt="Slide">
                </div>
                <div class="swiper-slide">
                 <img src={slidePhotoThree} alt="Slide">
                </div>
                <div class="swiper-slide">
                 <img src={slidePhotoFour} alt="Slide">
                </div>
                <div class="swiper-slide">
                 <img src={slidePhotoFive} alt="Slide">
                </div>
                <div class="swiper-slide">
                 <img src={slidePhotoSix} alt="Slide">
                </div>
                <div class="swiper-slide">
                 <img src={slidePhotoSeven} alt="Slide">
                </div>
              </div>
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section data-current-section="s3" class="border-b-2 border-[#999]">
      <div id="section-3" class="content-center">
        <div class="w-3/5 mx-auto mb-8">
          <h1 class={sectionHeader}>PROJECTS</h1>
          <p class="text-xl">
            Here are some projects (that I can share), ranging from personal projects that I have worked on, or startups I have built MVPs or major features for.
            <b>You can view more of my projects via <a class="text-[#3686fd] underline" href="https://github.com/eddietal2">Github</a></b>.</p>
        </div>
        <div class="w-3/5 gap-8 mx-auto grid grid-cols-2">
          {#each projects as project}
            <div class="flex flex-row gap-2 bg-[#999]/10 p-2">
              <img src={project.image} class="h-12" alt="CryptoTutors Logo">
              <div class="content-center">
                <p class="text-sm">{project.role} / 2023 - 2024</p>
                <p class="text-xl">This is test text in this project card.</p>
              </div>
            </div>
          {/each }
        </div>
    </section>

    <!-- Contact Me -->
    <section data-current-section="s4" class="border-b-2 border-[#999]">
      <div id="section-4" class="content-center">
        <div class="w-3/5 mx-auto mb-8">
          <!-- Header -->
          <div class="text-center ion-align-items-center">
            <h1 class="text-4xl text-[#111] dark:text-[#ffcb0a] font-bold relative bottom-2">CONTACT ME</h1>
            <ion-icon class="text-[#222] text-[10rem]" name="mail-outline" ></ion-icon>
          </div>

        <!-- Form -->
        <div class="ion-text-center w-1/2 text-center mx-auto">
            <!-- https://formsubmit.co/ -->
            <!-- https://www.youtube.com/watch?v=iSobU_DjNN4 -->
            <form action="https://formsubmit.co/f6e4bbd318fdd3193043ce91e88f6bfd" method="POST">
                <input class="text-xl text-[#111] w-full my-1 h-10 p-2 border-2 border-[#999]" type="text" required placeholder="Your Name" name="name">
                <input class="text-xl text-[#111] w-full my-1 h-10 p-2 border-2 border-[#999]" type="text" required placeholder="Email Address" name="email">
                <textarea class="text-xl text-[#111] my-1 mx-auto p-2 w-full border-2 border-[#999] dark:text-white block" rows="5" required placeholder="Message goes here." name="message"></textarea>
                <button class="py-2 px-8 my-4 bg-black text-white text-xl" type="submit">
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
/* Toolbar */
@media (max-width: 1000px)  {
    #toolbar{
        bottom: 0;
        z-index: 99;
    }
}

/* Snap Scrolling Indicator */
#sectionation-lg {
    /* background: #b1b1b153; */
    background: linear-gradient(300deg, #0D021C 26.7%, #191123 82.37%);
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
    background-image: url('../../svelte/public/icons/nav-bullet.svg');
    background-repeat: no-repeat;
    margin: 0.54em 0;
    width: 10px;
    height: 10px;
    transition: 1s;
}
.current {
    background-image: url('../../svelte/public/icons/nav-bullet-current.svg');
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
#section-1,
#section-2,
#section-3,
#section-4,
#section-5
 {
    width: 100%;
    height: 100vh;
    scroll-snap-align: start;
}
@media (max-width: 1000px)  {
    #wrapper,
    #section-1,
    #section-2,
    #section-3,
    #section-4,
    #section-5{
        scroll-snap-type: none;
        scroll-snap-align: none;
        height: auto;
    }

    #section-1 {
        height: auto;
    }
}

/* Swiper */
/* .photos {
    width: 100%;
    height: 100%;
    background: blue;
    display: flex;
    align-items: center;
    justify-content: center;
} */
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
    /* .slider-btns {
        position: relative;
        bottom: 6em;
        background: linear-gradient(300deg, #0D021C 26.7%, #191123 82.37%);
    } */
}

/* Contact Form */
@media (max-width: 1000px)  {
    #section-4 {
        padding: 5em 0;
    }
}
#section-4 ion-input {
    text-align: left;
    display: inline-block;
    width: 40%;
    border: 1px solid #fff;
    /* --padding-start: 1em;
    --highlight-color-focused: #ffcb0a; */
}
#section-4 ion-textarea {
    text-align: left;
    display: inline-block;
    margin-top: 1em;
    width: 80.5%;
    border: 1px solid #fff;
    /* --padding-start: 1em;
    --highlight-color-focused: #ffcb0a; */
}
.send-art {
    height: 200px;
    width: 100px;
    background: blue;
    display: inline;
}
.send-header {
    background: linear-gradient(300deg, #00c400 26.7%, #0ff131 82.37%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.send-btn {
    margin: 1em auto;
    width: 300px;
    color: #fff;
    /* border: 1px solid #0ff131; */
    background: #650087;
}
</style>
