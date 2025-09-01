<script lang="ts">
  import { theme } from '../stores/light-dark-mode';
  import fireEmoji from '../../assets/icons/fire.png';
  // Hero Section SVG Art
  import headerArtPic from '../../assets/illustrations/header-art-pic.svg';
    import { onMount } from 'svelte';

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
    <div id="section-1" class={$theme === 'light' ? theme.classes.light.bg : theme.classes.dark.bg}>
      <div class="md:w-4/5 lg:w-3/5 mx-auto lg:flex flex-row gap-20">

        <!-- Picture -->
        <div class="w-11/12 lg:w-1/4 mx-auto">
          <div id="header-pic" class="my-4"></div>
        </div>

        <!-- Text -->
        <div class="w-11/12 lg:w-3/4 mx-auto">
          <p class="landing-text">
            <span class="text-xl lg:text-4xl text-[#111] dark:text-white">
              <img class="fire-anim h-10 inline" src={fireEmoji} alt="Fire Emoji">
              <b class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}>
                <span class="greetings-anim-1 inline-block">HI,</span>
                <span class="greetings-anim-2 inline-block">I'M</span>
                <span class="greetings-anim-3 inline-block">EDDIE!</span>
              </b> 
            </span>
            <br>
            <span class="sm:text-xl xl:text-2xl block my-4">
              <span class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}>
                As a versatile developer and designer, I specialize in turning innovative ideas into tangible software. 
                From web applications to immersive XR experiences, my expertise spans web development, responsive design, CSS & SVG animation, UI/UX design, and even video game development using Unreal Engine. With a focus on creating high-performing and effective software, I've successfully delivered MVPs and beyond on numerous projects.
              </span>
            </span>
            <br>
            <span class="text-xl text-[#111] dark:text-[#ffcb0a] font-bold">
              <span class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}>SKILLS</span>
            </span>
            <span class="text-sm lg:text-xl bg-[#ffcb0a10] border-[#ffcb0a40] border-2 p-2 block sm:my-2">
              <span class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}>
                Angular, SvelteKit, Ionic, TailWindCSS, Linux, Git, Figma, Unreal Engine
              </span>
            </span>
          </p>
        </div>

      </div>
    </div>
</main>

<style>
    #section-1
       {
          width: 100%;
          height: 100vh;
          scroll-snap-align: start;
        }
  @media (max-width: 1000px)  {
      #section-1{
          scroll-snap-type: none;
          scroll-snap-align: none;
          height: auto;
      }
  }
</style>