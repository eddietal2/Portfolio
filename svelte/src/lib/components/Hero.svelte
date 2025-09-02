<script lang="ts">
  import { theme } from '../stores/light-dark-mode';
  import headerArtPic from '../../assets/illustrations/header-art-pic.svg';
  import { onMount } from 'svelte';

  let typedText = '';
  const fullText = `As a versatile developer and designer, I specialize in turning innovative ideas into tangible software. 
  From web applications to immersive XR experiences, my expertise spans web development, responsive design, CSS & SVG animation, UI/UX design, and even video game development using Unreal Engine. With a focus on creating high-performing and effective software, I've successfully delivered MVPs and beyond on numerous projects.`;

  onMount(() => {
    // Animate SVG header art
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

    // Typewriter effect
    let i = 0;
    setTimeout(() => {
      const interval = setInterval(() => {
        if (i < fullText.length) {
          typedText += fullText.charAt(i);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 25);
    }, 5250); // delay start by 3 seconds


    // Snap Scrolling & Navbar Bullets
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
  <div id="section-1" class={$theme === 'light' ? theme.classes.light.heroGradient : theme.classes.dark.heroGradient}>
    
    <!-- Floating lights overlay -->
    <div class={$theme === 'light' ? 'floating-lights-light' : 'floating-lights-dark'} aria-hidden="true"></div>

    <div class="md:w-4/5 lg:w-3/5 mx-auto lg:flex flex-row gap-20 relative z-10">

      <!-- Picture -->
      <div class="w-11/12 lg:w-1/4 mx-auto">
        <div id="header-pic" class="my-4"></div>
      </div>

      <!-- Text -->
      <div class="w-11/12 lg:w-3/4 mx-auto">
        <p class="landing-text">
          <span class="text-xl lg:text-4xl text-[#111] dark:text-white">
            <span class="text-4xl wave-hand">👋🏾</span>
            <b class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}>
              <span class="text-4xl jura greetings-anim-1 inline-block">HI,</span>
              <span class="text-4xl jura greetings-anim-2 inline-block">I'M</span>
              <span class="text-4xl jura greetings-anim-3 inline-block">EDDIE</span>
            </b> 
          </span>
          <br>
          <span class="sm:text-xl xl:text-2xl block my-4 border-b border-gray-200/20 pb-4 typewriter-text">
            <span class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}>
              {typedText}
            </span>
          </span>
        </p>

        <h1 class={$theme === 'light' ? theme.classes.light.text + ' jura text-xl' : theme.classes.dark.text + ' jura text-xl'}>SKILLS</h1>
        <div class="flex flex-wrap gap-2 sm:my-2">
          {#each ["Angular", "SvelteKit", "Ionic", "TailWindCSS", "Linux", "Git", "Figma", "Unreal Engine", "Vercel", "CI/CD", "AWS"] as skill}
            <span class="text-sm bg-[#00c40020] border-[#00c400] border-2 px-3 py-1 rounded-full inline-block">
              <span class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}>
                {skill}
              </span>
            </span>
          {/each}
        </div>

      </div>
    </div>
  </div>
</main>

<style>
  #section-1 {
    width: 100%;
    height: 100vh;
    scroll-snap-align: start;
    position: relative;
    overflow: hidden;
  }

  @media (max-width: 1000px) {
    #section-1 {
      scroll-snap-type: none;
      scroll-snap-align: none;
      height: auto;
    }
  }

  /* Gradient animation */
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-gradientShift {
    animation: gradientShift 12s ease infinite;
    background-size: 400% 400%;
  }

  /* Floating lights overlay */
  .floating-lights-dark,
  .floating-lights-light {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    background-size: 40px 40px;
    animation: floatLights 20s linear infinite;
    opacity: 0.5;
  }
  .floating-lights-dark {
    background: radial-gradient(circle, rgba(255,255,255,0.16) 2px, transparent 2px);
  }
  .floating-lights-light {
    background: radial-gradient(circle, rgba(28, 2, 2, 0.16) 2px, transparent 2px);
  }
  @keyframes floatLights {
    from { background-position: 0 0; }
    to { background-position: 40px -1000px; }
  }

  /* Greetings Animation */
  .fire-anim { opacity: 0; animation: fire-slide 500ms cubic-bezier(0.075, 0.82, 0.165, 1) 750ms forwards; }
  .greetings-anim-1 { opacity: 0; animation: greeting-slide-1 500ms cubic-bezier(0.075, 0.82, 0.165, 1) 1500ms forwards; }
  .greetings-anim-2 { opacity: 0; animation: greeting-slide-2 500ms cubic-bezier(0.075, 0.82, 0.165, 1) 2500ms forwards; }
  .greetings-anim-3 { opacity: 0; animation: greeting-slide-2 500ms cubic-bezier(0.075, 0.82, 0.165, 1) 3000ms forwards; }
  @keyframes greeting-slide-1 { 0% { transform: translateY(50px); } 100% { transform: translateY(0); opacity: 1; } }
  @keyframes fire-slide { 0% { transform: translateX(-50px); } 100% { transform: translateX(0); opacity: 1; } }
  @keyframes greeting-slide-2 { 0% { transform: translateX(50px); } 100% { transform: translateX(0); opacity: 1; } }

  .wave-hand {
    display: inline-block;
    transform-origin: 70% 70%;
    animation: wave 1.2s infinite;
  }
  @keyframes wave {
    0% { transform: rotate(0deg); }
    15% { transform: rotate(14deg); }
    30% { transform: rotate(-8deg); }
    40% { transform: rotate(14deg); }
    50% { transform: rotate(-4deg); }
    60% { transform: rotate(10deg); }
    70% { transform: rotate(0deg); }
    100% { transform: rotate(0deg); }
  }

  /* Typewriter caret */
  .typewriter-text span::after {
    content: '|';
    animation: blink 1s infinite;
    color: #00c400;
    margin-left: 2px;
  }
  @keyframes blink {
    0%, 50% { opacity: 1; }
    50.01%, 100% { opacity: 0; }
  }
</style>
