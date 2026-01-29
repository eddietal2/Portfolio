<script lang="ts">
  import { theme } from '../stores/light-dark-mode';
  import headerArtPicFire from '../../assets/illustrations/eddie-header.svg';
  import headerArtPicGreen from '../../assets/illustrations/eddie-header-green.svg';
  import profilePhoto from '../../assets/photos/eddie-profile.png';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  let typedText = '';
  const fullText = `As a versatile developer and designer, I specialize in turning innovative ideas into tangible software. 
  From web applications to immersive XR experiences, my expertise spans web development, responsive design, CSS & SVG animation, UI/UX design, and even video game development using Unreal Engine. With a focus on creating high-performing and effective software, I've successfully delivered MVPs and beyond on numerous projects.`;

  // Function to load the appropriate SVG based on theme
  function loadHeaderSvg(currentTheme: string) {
    const svgUrl = currentTheme === 'light' ? headerArtPicGreen : headerArtPicFire;
    fetch(svgUrl)
      .then(res => res.text())
      .then(svgContent => {
        const svgContainer = document.getElementById('header-pic');
        if (svgContainer) {
          svgContainer.innerHTML = svgContent;
        }
      });
  }

  // Subscribe to theme changes to update the SVG
  theme.subscribe((currentTheme) => {
    if (typeof document !== 'undefined') {
      loadHeaderSvg(currentTheme);
    }
  });

  onMount(() => {
    // Load initial SVG based on current theme
    loadHeaderSvg(get(theme));

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
        const currentTheme = get(theme);
        const activeColor = currentTheme === 'light' ? '#00c400' : '#ff4500';
        const navBullets = document.querySelectorAll('.nav-bullet');
        navBullets.forEach((bullet: any) => {
          bullet.innerHTML = bullet.dataset.currentSection === activeSection
            ? `<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect width="10" height="10" fill="${activeColor}"/></svg>`
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
    
    <!-- Background Silhouette SVG -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg class="absolute w-full h-full opacity-[0.12]" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <!-- Circuit board pattern - tech silhouette -->
        <g stroke={$theme === 'light' ? '#00c400' : '#ff4500'} stroke-width="1.5" fill="none">
          <!-- Main circuit lines -->
          <path d="M0 200 H200 L250 150 H400 L450 200 H600">
            <animate attributeName="stroke-dasharray" values="0 1000;1000 0" dur="8s" repeatCount="indefinite"/>
          </path>
          <path d="M600 200 H800 L850 250 H1000 L1050 200 H1200"/>
          <path d="M100 400 V300 H300 V350 H500 V400"/>
          <path d="M700 400 V350 H900 V300 H1100 V400"/>
          
          <!-- Vertical connectors -->
          <path d="M200 150 V50"/>
          <path d="M450 200 V100"/>
          <path d="M850 250 V350"/>
          <path d="M1050 200 V100"/>
          
          <!-- Bottom circuit lines -->
          <path d="M0 600 H150 L200 550 H350 L400 600 H550"/>
          <path d="M650 600 H800 L850 650 H1000 L1050 600 H1200"/>
          <path d="M200 550 V450"/>
          <path d="M400 600 V700"/>
          <path d="M850 650 V750"/>
          <path d="M1050 600 V500"/>
        </g>
        
        <!-- Circuit nodes/dots -->
        <g fill={$theme === 'light' ? '#00c400' : '#ff4500'}>
          <circle cx="200" cy="200" r="6"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite"/></circle>
          <circle cx="450" cy="200" r="6"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="3.5s" repeatCount="indefinite"/></circle>
          <circle cx="850" cy="250" r="6"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.8s" repeatCount="indefinite"/></circle>
          <circle cx="200" cy="50" r="4"/>
          <circle cx="1050" cy="100" r="4"/>
          <circle cx="200" cy="550" r="6"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="3.2s" repeatCount="indefinite"/></circle>
          <circle cx="400" cy="600" r="6"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.9s" repeatCount="indefinite"/></circle>
          <circle cx="850" cy="650" r="6"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="3.3s" repeatCount="indefinite"/></circle>
        </g>
        
        <!-- Code brackets silhouette -->
        <g stroke={$theme === 'light' ? '#00a000' : '#cc3700'} stroke-width="3" fill="none" opacity="0.5">
          <!-- Left bracket < -->
          <path d="M50 350 L20 400 L50 450">
            <animate attributeName="stroke-opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite"/>
          </path>
          <!-- Right bracket > -->
          <path d="M1150 350 L1180 400 L1150 450">
            <animate attributeName="stroke-opacity" values="0.3;0.6;0.3" dur="4s" begin="2s" repeatCount="indefinite"/>
          </path>
          <!-- Slash / -->
          <path d="M580 320 L620 480"/>
        </g>
        
        <!-- Geometric shapes - abstract tech feel -->
        <g stroke={$theme === 'light' ? '#00c400' : '#ff4500'} stroke-width="1" fill="none" opacity="0.3">
          <!-- Hexagons -->
          <polygon points="100,700 130,680 160,700 160,740 130,760 100,740">
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="5s" repeatCount="indefinite"/>
          </polygon>
          <polygon points="1040,100 1070,80 1100,100 1100,140 1070,160 1040,140">
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="5s" begin="2.5s" repeatCount="indefinite"/>
          </polygon>
          <!-- Triangles -->
          <polygon points="950,700 980,650 1010,700"/>
          <polygon points="300,80 330,30 360,80"/>
        </g>
        
        <!-- Binary/data stream lines -->
        <g fill={$theme === 'light' ? '#00c400' : '#ff4500'} opacity="0.15">
          <text x="50" y="150" font-family="monospace" font-size="12">01001000 01100101 01101100</text>
          <text x="900" y="720" font-family="monospace" font-size="12">01101100 01101111 00100001</text>
          <text x="80" y="500" font-family="monospace" font-size="10">const dev = true;</text>
          <text x="1000" y="400" font-family="monospace" font-size="10">{"<Code />"}</text>
        </g>
      </svg>
    </div>
    
    <!-- Floating lights overlay -->
    <div class={$theme === 'light' ? 'floating-lights-light' : 'floating-lights-dark'} aria-hidden="true"></div>

    <div class="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 lg:mt-0 md:flex flex-row gap-8 lg:gap-16 xl:gap-20 relative lg:bottom-32 z-10 pt-8 md:pt-0 md:items-center md:min-h-[calc(100vh-4rem)]">

      <!-- Picture -->
      <div class="w-full md:w-2/5 lg:w-1/3 mx-auto flex items-center justify-center mb-6 md:mb-0">
        <div class="header-pic-container {$theme === 'light' ? 'glow-green' : 'glow-fire'}">
          <div id="header-pic" class="header-frame"></div>
          <img src={profilePhoto} alt="Eddie" class="profile-photo" />
        </div>
      </div>

      <!-- Text -->
      <div class="w-full md:w-3/5 lg:w-2/3">
        <div class="landing-text">
          <span class="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#111] dark:text-white">
            <span class="text-2xl md:text-3xl lg:text-4xl wave-hand">👋🏾</span>
            <b class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}>
              <span class="text-2xl md:text-3xl lg:text-4xl jura greetings-anim-1 inline-block">HI,</span>
              <span class="text-2xl md:text-3xl lg:text-4xl jura greetings-anim-2 inline-block">I'M</span>
              <span class="text-xl md:text-2xl lg:text-3xl xl:text-4xl jura greetings-anim-3 inline-block {$theme === 'light' ? 'name-highlight-green' : 'name-highlight'}">EDDIE TALIAFERRO II</span>
            </b> 
          </span>
        </div>
        <div class="min-h-[120px] md:min-h-[140px] lg:min-h-[180px] my-4 border-b border-gray-200/20 pb-4 typewriter-text {$theme === 'light' ? 'caret-green' : 'caret-fire'}">
          <span class="text-sm md:text-base lg:text-lg xl:text-xl {$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}">
            {typedText}
          </span>
        </div>

        <h1 class="{$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text} jura text-base md:text-lg lg:text-xl skills-title">SKILLS</h1>
        <div class="flex flex-wrap gap-1.5 md:gap-2 sm:my-2">
          {#each ["NextJS", "SvelteKit", "TypeScript", "PostgreSQL", "TailWindCSS", "Python", "Django", "Linux", "Git", "Figma", "Unreal Engine", "Vercel", "CI/CD", "AWS", "AR/MR/XR"] as skill, i}
            <span 
              class="text-xs md:text-sm border px-2 md:px-3 py-0.5 md:py-1 rounded-full inline-block skill-tag {$theme === 'light' ? 'bg-[#00c40015] border-[#00c400]' : 'bg-[#ff450015] border-[#ff4500]'}"
              style="animation-delay: {5.5 + (i * 0.08)}s"
            >
              <span class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}>
                {skill}
              </span>
            </span>
          {/each}
        </div>

      </div>

      <div class="h-16 md:h-0"></div>
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
    margin-left: 2px;
  }
  .typewriter-text.caret-fire span::after {
    color: #ff4500;
  }
  .typewriter-text.caret-green span::after {
    color: #00c400;
  }
  @keyframes blink {
    0%, 50% { opacity: 1; }
    50.01%, 100% { opacity: 0; }
  }

  /* Smoother typewriter text */
  .typewriter-text {
    line-height: 1.6;
    display: block;
  }

  /* ===== POLISHED ENHANCEMENTS ===== */

  /* Profile picture container */
  .header-pic-container {
    position: relative;
    width: 200px;
    height: 200px;
    transition: transform 0.3s ease;
  }
  
  /* Tablet size */
  @media (min-width: 768px) {
    .header-pic-container {
      width: 220px;
      height: 220px;
    }
  }
  
  /* Desktop size */
  @media (min-width: 1024px) {
    .header-pic-container {
      width: 260px;
      height: 260px;
    }
  }
  
  /* Large desktop */
  @media (min-width: 1280px) {
    .header-pic-container {
      width: 280px;
      height: 280px;
    }
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
  
  /* Profile photo - circular and centered - responsive sizes */
  .profile-photo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 140px;
    height: 140px;
    border-radius: 50%;
    object-fit: cover;
    z-index: 1;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }
  
  @media (min-width: 768px) {
    .profile-photo {
      width: 155px;
      height: 155px;
    }
  }
  
  @media (min-width: 1024px) {
    .profile-photo {
      width: 175px;
      height: 175px;
    }
  }
  
  @media (min-width: 1280px) {
    .profile-photo {
      width: 190px;
      height: 190px;
    }
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
    z-index: 0;
    opacity: 0;
    animation: fadeInGlow 1s ease 1s forwards;
  }
  .header-pic-container.glow-fire::after {
    background: radial-gradient(circle, rgba(255, 69, 0, 0.2) 0%, transparent 70%);
  }
  .header-pic-container.glow-green::after {
    background: radial-gradient(circle, rgba(0, 196, 0, 0.2) 0%, transparent 70%);
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

  /* Green name highlight for light mode */
  .name-highlight-green {
    background: linear-gradient(135deg, #00ff00 0%, #00c400 50%, #00dd00 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s ease-in-out 4s infinite;
    filter: drop-shadow(0 0 20px rgba(0, 196, 0, 0.4));
  }
  .greetings-anim-3.name-highlight-green {
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

  /* Landing text better spacing */
  .landing-text {
    line-height: 1.4;
  }
</style>
