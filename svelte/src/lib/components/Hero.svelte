<script lang="ts">
  import { theme } from '../stores/light-dark-mode';
  import headerArtPic from '../../assets/illustrations/eddie-header.svg';
  import profilePhoto from '../../assets/photos/eddie-profile.png';
  import { onMount } from 'svelte';

  let typedText = '';
  const fullText = `As a versatile developer and designer, I specialize in turning innovative ideas into tangible software. 
  From web applications to immersive XR experiences, my expertise spans web development, responsive design, CSS & SVG animation, UI/UX design, and even video game development using Unreal Engine. With a focus on creating high-performing and effective software, I've successfully delivered MVPs and beyond on numerous projects.`;

  onMount(() => {
    // Load SVG header art
    fetch(headerArtPic)
      .then(res => res.text())
      .then(svgContent => {
        const svgContainer = document.getElementById('header-pic');
        if (svgContainer) {
          svgContainer.innerHTML = svgContent;
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

    <div class="md:w-4/5 lg:w-3/5 mx-auto lg:mt-0 lg:flex flex-row gap-20 relative z-10">

      <!-- Picture -->
      <div class="w-11/12 lg:w-1/4 mx-auto flex items-center justify-center">
        <div class="my-4 header-pic-container">
          <div id="header-pic" class="header-frame"></div>
          <img src={profilePhoto} alt="Eddie" class="profile-photo" />
        </div>
      </div>

      <!-- Text -->
      <div class="w-11/12 lg:w-3/4 mx-auto">
        <p class="landing-text">
          <span class="text-xl lg:text-4xl text-[#111] dark:text-white">
            <span class="text-4xl wave-hand">👋🏾</span>
            <b class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}>
              <span class="text-4xl jura greetings-anim-1 inline-block">HI,</span>
              <span class="text-4xl jura greetings-anim-2 inline-block">I'M</span>
              <span class="text-5xl lg:text-6xl jura greetings-anim-3 inline-block name-highlight">EDDIE</span>
            </b> 
          </span>
          <br>
          <span class="sm:text-xl xl:text-lg block my-4 border-b border-gray-200/20 pb-4 typewriter-text">
            <span class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}>
              {typedText}
            </span>
          </span>
        </p>

        <h1 class={$theme === 'light' ? theme.classes.light.text + ' jura text-xl skills-title' : theme.classes.dark.text + ' jura text-xl skills-title'}>SKILLS</h1>
        <div class="flex flex-wrap gap-2 sm:my-2">
          {#each ["NextJS", "SvelteKit", "TypeScript", "PostgreSQL", "TailWindCSS", "Python", "Django", "Linux", "Git", "Figma", "Unreal Engine", "Vercel", "CI/CD", "AWS", "AR/MR/XR"] as skill, i}
            <span 
              class="text-sm bg-[#ff450015] border-[#ff4500] border px-3 py-1 rounded-full inline-block skill-tag"
              style="animation-delay: {5.5 + (i * 0.08)}s"
            >
              <span class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}>
                {skill}
              </span>
            </span>
          {/each}
        </div>

      </div>

      <div class="h-24"></div>
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
    background: radial-gradient(circle, rgba(255, 255, 255, 0.578) 2px, transparent 2px);
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
    color: #ff4500;
    margin-left: 2px;
  }
  @keyframes blink {
    0%, 50% { opacity: 1; }
    50.01%, 100% { opacity: 0; }
  }

  /* ===== POLISHED ENHANCEMENTS ===== */

  /* Profile picture container */
  .header-pic-container {
    position: relative;
    width: 280px;
    height: 280px;
    transition: transform 0.3s ease;
  }
  .header-pic-container:hover {
    transform: scale(1.02);
  }
  
  /* SVG frame positioned absolutely */
  .header-frame {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
    border: none;
    outline: none;
    background: transparent;
  }
  .header-frame :global(svg) {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }
  
  /* Remove any default image borders */
  #header-pic,
  #header-pic * {
    border: none !important;
    outline: none !important;
  }
  
  /* Profile photo - circular and centered */
  .profile-photo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 190px;
    height: 190px;
    border-radius: 50%;
    object-fit: cover;
    z-index: 1;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }
  
  /* Ensure no borders on any img inside container */
  .header-pic-container img {
    border: none !important;
    outline: none !important;
  }
  
  /* Glow effect */
  .header-pic-container::after {
    content: '';
    position: absolute;
    inset: -10px;
    background: radial-gradient(circle, rgba(255, 69, 0, 0.2) 0%, transparent 70%);
    z-index: 0;
    opacity: 0;
    animation: fadeInGlow 1s ease 1s forwards;
  }
  @keyframes fadeInGlow {
    to { opacity: 1; }
  }

  /* Name highlight - make EDDIE pop */
  .name-highlight {
    background: linear-gradient(135deg, #ff0000 0%, #ff4500 50%, #ffa500 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s ease-in-out 4s infinite;
    filter: drop-shadow(0 0 20px rgba(255, 69, 0, 0.4));
  }
  .greetings-anim-3.name-highlight {
    opacity: 0;
    animation: greeting-slide-2 500ms cubic-bezier(0.075, 0.82, 0.165, 1) 3s forwards,
               shimmer 3s ease-in-out 4s infinite;
  }
  @keyframes shimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  /* Skills section title */
  .skills-title {
    opacity: 0;
    animation: fadeSlideUp 0.5s ease 5.2s forwards;
    letter-spacing: 0.1em;
  }

  /* Skill tags with staggered entrance */
  .skill-tag {
    opacity: 0;
    animation: fadeSlideUp 0.4s ease forwards;
    transition: all 0.2s ease;
    backdrop-filter: blur(4px);
  }
  .skill-tag:hover {
    background: rgba(255, 69, 0, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 69, 0, 0.35);
  }

  @keyframes fadeSlideUp {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Smoother typewriter text */
  .typewriter-text {
    min-height: 4.5em;
    line-height: 1.6;
  }

  /* Landing text better spacing */
  .landing-text {
    line-height: 1.4;
  }
</style>
