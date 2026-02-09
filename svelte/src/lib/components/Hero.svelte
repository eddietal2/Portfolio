<script lang="ts">
  import { theme } from '../stores/light-dark-mode';
  import { goldenState } from '../stores/golden-state';
  import headerArtPicFire from '../../assets/illustrations/eddie-header.svg';
  import headerArtPicGreen from '../../assets/illustrations/eddie-header-green.svg';
  import headerArtPicGold from '../../assets/illustrations/eddie-header-gold.svg';
  import profilePhoto from '../../assets/photos/eddie-profile.png';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  let typedText = '';
  let typedName = '';
  let nameTypingComplete = false;
  let hoveredSkill: string | null = null;
  let frameHovered = false;
  let scrollProgress = 0;

  const fullName = 'EDDIE TALIAFERRO II';

  // Skill descriptions for hover expansion
  const skillDescriptions: Record<string, string> = {
    "NextJS": "React framework for production-grade web apps with SSR, routing, and API routes.",
    "SvelteKit": "Modern framework for building fast, elegant web applications with minimal boilerplate.",
    "TypeScript": "Strongly typed JavaScript that catches errors early and improves code quality.",
    "PostgreSQL": "Powerful open-source relational database for complex data management.",
    "TailWindCSS": "Utility-first CSS framework for rapid, responsive UI development.",
    "Python": "Versatile language for backend development, automation, and data science.",
    "Django": "High-level Python framework for building secure, scalable web applications.",
    "Linux": "Open-source OS powering servers, containers, and development environments.",
    "Git": "Version control system for tracking changes and team collaboration.",
    "Figma": "Collaborative design tool for creating UI/UX mockups and prototypes.",
    "Unreal Engine": "AAA game engine for creating immersive games and XR experiences.",
    "Vercel": "Cloud platform for deploying and scaling modern web applications.",
    "CI/CD": "Automated pipelines for continuous integration and deployment workflows.",
    "AWS": "Cloud services for hosting, storage, databases, and serverless computing.",
    "XR": "Extended reality development for augmented, mixed, and virtual experiences."
  };

  const fullText = `As a versatile developer and designer, I specialize in turning innovative ideas into tangible software. 
  From web applications to immersive XR experiences, my expertise spans web development, responsive design, CSS & SVG animation, UI/UX design, and even video game development using Unreal Engine. With a focus on creating high-performing and effective software, I've successfully delivered on numerous types of projects.`;

  // Function to load the appropriate SVG based on theme and state
  // Shows gold when hovering, inverse color when rotating (scrolling)
  function loadHeaderSvg(currentTheme: string, showInverse: boolean = false, showGold: boolean = false) {
    let svgUrl: string;
    if (showGold) {
      // Golden state on hover
      svgUrl = headerArtPicGold;
    } else if (showInverse) {
      // Swap colors: light mode shows fire, dark mode shows green
      svgUrl = currentTheme === 'light' ? headerArtPicFire : headerArtPicGreen;
    } else {
      svgUrl = currentTheme === 'light' ? headerArtPicGreen : headerArtPicFire;
    }
    
    fetch(svgUrl)
      .then(res => res.text())
      .then(svgContent => {
        const svgContainer = document.getElementById('header-pic');
        if (svgContainer) {
          svgContainer.innerHTML = svgContent;
          // Apply rotation based on scroll progress (desktop only)
          const svg = svgContainer.querySelector('svg');
          if (svg && window.innerWidth >= 1024) {
            const rotation = scrollProgress * 360;
            svg.style.transform = `rotate(${rotation}deg)`;
            svg.style.transition = 'transform 0.3s ease-out';
          }
        }
      });
  }

  // Determine if we should show inverse color (rotating only, not hovering - hover shows gold)
  $: isRotating = scrollProgress > 0;
  $: showInverseColor = isRotating; // Only rotating triggers inverse, hover shows gold

  // Subscribe to theme changes to update the SVG
  theme.subscribe((currentTheme) => {
    if (typeof document !== 'undefined') {
      loadHeaderSvg(currentTheme, showInverseColor, frameHovered);
    }
  });

  // Handle frame hover - show golden state
  function handleFrameEnter() {
    frameHovered = true;
    goldenState.set(true);
    loadHeaderSvg(get(theme), isRotating, true); // Show gold on hover
  }

  function handleFrameLeave() {
    frameHovered = false;
    goldenState.set(false);
    loadHeaderSvg(get(theme), isRotating, false); // Return to normal/inverse
  }

  onMount(() => {
    // Load initial SVG based on current theme
    loadHeaderSvg(get(theme), false);

    // Track scroll progress for frame rotation (desktop only)
    const wrapper = document.getElementById('wrapper');
    if (wrapper && window.innerWidth >= 1024) {
      let wasRotating = false;
      
      const updateScrollProgress = () => {
        const heroSection = document.getElementById('section-1');
        if (!heroSection) return;
        
        const scrollTop = wrapper.scrollTop;
        const heroHeight = heroSection.offsetHeight;
        
        // Calculate progress: 0 at top, 1 when hero is fully scrolled past
        scrollProgress = Math.min(Math.max(scrollTop / heroHeight, 0), 1);
        
        // Update frame rotation
        const svgContainer = document.getElementById('header-pic');
        const svg = svgContainer?.querySelector('svg');
        if (svg) {
          const rotation = scrollProgress * 360;
          svg.style.transform = `rotate(${rotation}deg)`;
        }
        
        // Swap to inverse color when rotation starts or stops
        const isCurrentlyRotating = scrollProgress > 0;
        if (isCurrentlyRotating !== wasRotating) {
          wasRotating = isCurrentlyRotating;
          loadHeaderSvg(get(theme), isCurrentlyRotating || frameHovered);
        }
      };
      
      wrapper.addEventListener('scroll', updateScrollProgress, { passive: true });
      updateScrollProgress();
    }

    // Name typewriter effect - starts after "I'M" animation (at 3s)
    let nameIndex = 0;
    setTimeout(() => {
      const nameInterval = setInterval(() => {
        if (nameIndex < fullName.length) {
          typedName += fullName.charAt(nameIndex);
          nameIndex++;
        } else {
          clearInterval(nameInterval);
          nameTypingComplete = true;
        }
      }, 70); // 70ms per character
    }, 3000); // Start at 3s (after I'M slides in)

    // Main typewriter effect
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
    }, 5250); // delay start by 5.25 seconds


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
      <svg class="absolute w-full h-full transition-opacity duration-300 {frameHovered ? ($theme === 'light' ? 'opacity-[0.35]' : 'opacity-[0.45]') : 'opacity-[0.25]'}" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <!-- Gradient definitions -->
        <defs>
          <linearGradient id="circuitGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color={frameHovered ? ($theme === 'light' ? '#9A7B1C' : '#FFD700') : ($theme === 'light' ? '#00c400' : '#ff4500')}>
              <animate attributeName="stop-color" values={frameHovered ? ($theme === 'light' ? '#9A7B1C;#A8862A;#9A7B1C' : '#FFD700;#FFC125;#FFD700') : ($theme === 'light' ? '#00c400;#00ff88;#00c400' : '#ff4500;#ff8800;#ff4500')} dur="4s" repeatCount="indefinite"/>
            </stop>
            <stop offset="50%" stop-color={frameHovered ? ($theme === 'light' ? '#A8862A' : '#FFC125') : ($theme === 'light' ? '#00ff88' : '#ff8800')}>
              <animate attributeName="stop-color" values={frameHovered ? ($theme === 'light' ? '#A8862A;#9A7B1C;#A8862A' : '#FFC125;#FFD700;#FFC125') : ($theme === 'light' ? '#00ff88;#00c400;#00ff88' : '#ff8800;#ff4500;#ff8800')} dur="4s" repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" stop-color={frameHovered ? ($theme === 'light' ? '#7A5F08' : '#DAA520') : ($theme === 'light' ? '#00aa66' : '#cc3300')}>
              <animate attributeName="stop-color" values={frameHovered ? ($theme === 'light' ? '#7A5F08;#9A7B1C;#7A5F08' : '#DAA520;#FFB347;#DAA520') : ($theme === 'light' ? '#00aa66;#00ffaa;#00aa66' : '#cc3300;#ff6644;#cc3300')} dur="4s" repeatCount="indefinite"/>
            </stop>
          </linearGradient>
          <linearGradient id="circuitGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color={frameHovered ? ($theme === 'light' ? '#9A7B1C' : '#FFD700') : ($theme === 'light' ? '#22cc88' : '#ff6622')}/>
            <stop offset="100%" stop-color={frameHovered ? ($theme === 'light' ? '#7A5F08' : '#FFA500') : ($theme === 'light' ? '#00ff44' : '#ffaa00')}/>
          </linearGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color={frameHovered ? ($theme === 'light' ? '#A8862A' : '#FFD700') : ($theme === 'light' ? '#00ff88' : '#ffaa44')} stop-opacity="1"/>
            <stop offset="100%" stop-color={frameHovered ? ($theme === 'light' ? '#7A5F08' : '#DAA520') : ($theme === 'light' ? '#00c400' : '#ff4500')} stop-opacity="0"/>
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Main circuit grid with gradient strokes -->
        <g stroke="url(#circuitGrad1)" stroke-width="2" fill="none" filter="url(#glow)">
          <!-- Top horizontal lines with data pulse -->
          <path d="M0 200 H200 L250 150 H400 L450 200 H600" stroke-dasharray="800" stroke-dashoffset="800">
            <animate attributeName="stroke-dashoffset" values="800;0" dur="3s" fill="freeze"/>
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="3s" repeatCount="indefinite"/>
          </path>
          <path d="M600 200 H800 L850 250 H1000 L1050 200 H1200" stroke-dasharray="600" stroke-dashoffset="600">
            <animate attributeName="stroke-dashoffset" values="600;0" dur="2.5s" begin="0.5s" fill="freeze"/>
          </path>
          
          <!-- Middle crossing lines -->
          <path d="M100 400 V300 H300 V350 H500 V400" stroke-dasharray="500" stroke-dashoffset="500">
            <animate attributeName="stroke-dashoffset" values="500;0" dur="2s" begin="1s" fill="freeze"/>
          </path>
          <path d="M700 400 V350 H900 V300 H1100 V400" stroke-dasharray="500" stroke-dashoffset="500">
            <animate attributeName="stroke-dashoffset" values="500;0" dur="2s" begin="1.5s" fill="freeze"/>
          </path>
        </g>
        
        <!-- Secondary circuit layer with different color -->
        <g stroke={frameHovered ? ($theme === 'light' ? '#9A7B1C' : '#FFD700') : ($theme === 'light' ? '#00ddaa' : '#ff7744')} stroke-width="1.5" fill="none" opacity="0.7">
          <path d="M200 150 V50">
            <animate attributeName="stroke" values={frameHovered ? ($theme === 'light' ? '#9A7B1C;#A8862A;#9A7B1C' : '#FFD700;#FFC125;#FFD700') : ($theme === 'light' ? '#00ddaa;#44ffcc;#00ddaa' : '#ff7744;#ffcc44;#ff7744')} dur="3s" repeatCount="indefinite"/>
          </path>
          <path d="M450 200 V100"/>
          <path d="M850 250 V350"/>
          <path d="M1050 200 V100"/>
        </g>
        
        <!-- Bottom circuit with animated gradient -->
        <g stroke="url(#circuitGrad2)" stroke-width="2" fill="none">
          <path d="M0 600 H150 L200 550 H350 L400 600 H550" stroke-dasharray="550" stroke-dashoffset="550">
            <animate attributeName="stroke-dashoffset" values="550;0" dur="2.5s" begin="2s" fill="freeze"/>
          </path>
          <path d="M650 600 H800 L850 650 H1000 L1050 600 H1200" stroke-dasharray="550" stroke-dashoffset="550">
            <animate attributeName="stroke-dashoffset" values="550;0" dur="2.5s" begin="2.5s" fill="freeze"/>
          </path>
          <path d="M200 550 V450"/>
          <path d="M400 600 V700"/>
          <path d="M850 650 V750"/>
          <path d="M1050 600 V500"/>
        </g>
        
        <!-- Animated circuit nodes with glow -->
        <g fill="url(#nodeGlow)" filter="url(#glow)">
          <circle cx="200" cy="200" r="8">
            <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="450" cy="200" r="8">
            <animate attributeName="r" values="6;10;6" dur="2.3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2.3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="850" cy="250" r="8">
            <animate attributeName="r" values="6;10;6" dur="1.8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite"/>
          </circle>
          <circle cx="200" cy="550" r="8">
            <animate attributeName="r" values="6;10;6" dur="2.1s" repeatCount="indefinite"/>
          </circle>
          <circle cx="400" cy="600" r="8">
            <animate attributeName="r" values="6;10;6" dur="1.9s" repeatCount="indefinite"/>
          </circle>
          <circle cx="850" cy="650" r="8">
            <animate attributeName="r" values="6;10;6" dur="2.2s" repeatCount="indefinite"/>
          </circle>
        </g>
        
        <!-- Data pulse traveling along paths -->
        <g fill={frameHovered ? ($theme === 'light' ? '#9A7B1C' : '#FFD700') : ($theme === 'light' ? '#00ff88' : '#ffaa44')}>
          <circle r="4" opacity="0.9">
            <animateMotion dur="4s" repeatCount="indefinite" path="M0,200 H200 L250,150 H400 L450,200 H600"/>
          </circle>
          <circle r="4" opacity="0.9">
            <animateMotion dur="4s" repeatCount="indefinite" begin="2s" path="M600,200 H800 L850,250 H1000 L1050,200 H1200"/>
          </circle>
          <circle r="3" opacity="0.8">
            <animateMotion dur="3s" repeatCount="indefinite" path="M0,600 H150 L200,550 H350 L400,600 H550"/>
          </circle>
        </g>
        
        <!-- Colorful code brackets -->
        <g stroke-width="4" fill="none" filter="url(#glow)">
          <path d="M50 350 L20 400 L50 450" stroke={frameHovered ? ($theme === 'light' ? '#9A7B1C' : '#FFD700') : ($theme === 'light' ? '#00ff66' : '#ff6644')}>
            <animate attributeName="stroke" values={frameHovered ? ($theme === 'light' ? '#9A7B1C;#A8862A;#9A7B1C' : '#FFD700;#FFC125;#FFD700') : ($theme === 'light' ? '#00ff66;#00cc44;#00ff66' : '#ff6644;#ffaa44;#ff6644')} dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite"/>
          </path>
          <path d="M1150 350 L1180 400 L1150 450" stroke={frameHovered ? ($theme === 'light' ? '#A8862A' : '#FFC125') : ($theme === 'light' ? '#44ffaa' : '#ffcc44')}>
            <animate attributeName="stroke" values={frameHovered ? ($theme === 'light' ? '#A8862A;#9A7B1C;#A8862A' : '#FFC125;#FFD700;#FFC125') : ($theme === 'light' ? '#44ffaa;#00ff88;#44ffaa' : '#ffcc44;#ff8844;#ffcc44')} dur="3s" begin="1.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" begin="1.5s" repeatCount="indefinite"/>
          </path>
          <path d="M580 320 L620 480" stroke={frameHovered ? ($theme === 'light' ? '#7A5F08' : '#DAA520') : ($theme === 'light' ? '#00dd88' : '#ff9944')} opacity="0.6"/>
        </g>
        
        <!-- Animated hexagons with color cycling -->
        <g stroke-width="2" fill="none">
          <polygon points="100,700 130,680 160,700 160,740 130,760 100,740" stroke={frameHovered ? ($theme === 'light' ? '#9A7B1C' : '#FFD700') : ($theme === 'light' ? '#00ff88' : '#ff8844')}>
            <animate attributeName="stroke" values={frameHovered ? ($theme === 'light' ? '#9A7B1C;#A8862A;#7A5F08;#9A7B1C' : '#FFD700;#FFC125;#DAA520;#FFD700') : ($theme === 'light' ? '#00ff88;#00cc66;#44ffaa;#00ff88' : '#ff8844;#ffcc44;#ff6622;#ff8844')} dur="4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite"/>
          </polygon>
          <polygon points="1040,100 1070,80 1100,100 1100,140 1070,160 1040,140" stroke={frameHovered ? ($theme === 'light' ? '#A8862A' : '#FFC125') : ($theme === 'light' ? '#44ffcc' : '#ffaa44')}>
            <animate attributeName="stroke" values={frameHovered ? ($theme === 'light' ? '#A8862A;#9A7B1C;#7A5F08;#A8862A' : '#FFC125;#FFD700;#DAA520;#FFC125') : ($theme === 'light' ? '#44ffcc;#00ff88;#00ddaa;#44ffcc' : '#ffaa44;#ff6622;#ffcc66;#ffaa44')} dur="4s" begin="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" begin="2s" repeatCount="indefinite"/>
          </polygon>
          <!-- Additional spinning hexagon -->
          <g transform="translate(600, 100)">
            <polygon points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" stroke={frameHovered ? ($theme === 'light' ? '#9A7B1C' : '#FFD700') : ($theme === 'light' ? '#00ffaa' : '#ff7744')} opacity="0.5">
              <animateTransform attributeName="transform" type="rotate" values="0;360" dur="20s" repeatCount="indefinite"/>
            </polygon>
          </g>
        </g>
        
        <!-- Colorful triangles -->
        <g fill="none" stroke-width="2">
          <polygon points="950,700 980,650 1010,700" stroke={frameHovered ? ($theme === 'light' ? '#9A7B1C' : '#FFD700') : ($theme === 'light' ? '#00dd66' : '#ff9955')} opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite"/>
          </polygon>
          <polygon points="300,80 330,30 360,80" stroke={frameHovered ? ($theme === 'light' ? '#A8862A' : '#FFC125') : ($theme === 'light' ? '#22ffaa' : '#ffbb44')} opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" begin="1.5s" repeatCount="indefinite"/>
          </polygon>
        </g>
        
        <!-- Colorful binary/data stream with gradient text -->
        <g opacity="0.25" font-family="monospace" font-size="12">
          <text x="50" y="150" fill={frameHovered ? ($theme === 'light' ? '#9A7B1C' : '#FFD700') : ($theme === 'light' ? '#00ff88' : '#ffaa44')}>
            01001000 01100101 01101100
            <animate attributeName="opacity" values="0.2;0.4;0.2" dur="4s" repeatCount="indefinite"/>
          </text>
          <text x="900" y="720" fill={frameHovered ? ($theme === 'light' ? '#A8862A' : '#FFC125') : ($theme === 'light' ? '#00dd66' : '#ff8844')}>
            01101100 01101111 00100001
            <animate attributeName="opacity" values="0.2;0.4;0.2" dur="4s" begin="2s" repeatCount="indefinite"/>
          </text>
          <text x="80" y="500" font-size="10" fill={frameHovered ? ($theme === 'light' ? '#7A5F08' : '#DAA520') : ($theme === 'light' ? '#44ffaa' : '#ffcc44')}>const dev = true;</text>
          <text x="1000" y="400" font-size="10" fill={frameHovered ? ($theme === 'light' ? '#9A7B1C' : '#FFB347') : ($theme === 'light' ? '#00ffcc' : '#ff9966')}>{"<Code />"}</text>
        </g>
        
        <!-- Floating particles -->
        <g fill={frameHovered ? ($theme === 'light' ? '#9A7B1C' : '#FFD700') : ($theme === 'light' ? '#00ff88' : '#ffaa44')}>
          {#each [
            {cx: 150, cy: 300, dur: 8},
            {cx: 350, cy: 500, dur: 10},
            {cx: 550, cy: 250, dur: 7},
            {cx: 750, cy: 450, dur: 9},
            {cx: 950, cy: 350, dur: 11},
            {cx: 250, cy: 650, dur: 8.5},
            {cx: 850, cy: 150, dur: 9.5}
          ] as particle}
            <circle cx={particle.cx} cy={particle.cy} r="3" opacity="0.6">
              <animate attributeName="cy" values="{particle.cy};{particle.cy - 100};{particle.cy}" dur="{particle.dur}s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="{particle.dur}s" repeatCount="indefinite"/>
            </circle>
          {/each}
        </g>
      </svg>
    </div>
    
    <!-- Floating lights overlay -->
    <div class={$theme === 'light' ? 'floating-lights-light' : 'floating-lights-dark'} aria-hidden="true"></div>

    <div class="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 lg:mt-0 md:flex flex-row gap-8 lg:gap-16 xl:gap-20 relative lg:bottom-32 z-10 pt-8 md:pt-0 md:items-center md:min-h-[calc(100vh-4rem)]">

      <!-- Picture -->
      <div class="w-full md:w-2/5 lg:w-1/3 mx-auto flex items-center justify-center mb-6 md:mb-0">
        <div 
          class="header-pic-container {frameHovered ? 'super-saiyan' : ''} {frameHovered
            ? ($theme === 'light' ? 'glow-gold-light' : 'glow-gold-dark')
            : (showInverseColor
              ? ($theme === 'light' ? 'glow-fire' : 'glow-green') 
              : ($theme === 'light' ? 'glow-green' : 'glow-fire'))}"
          on:mouseenter={handleFrameEnter}
          on:mouseleave={handleFrameLeave}
          role="presentation"
        >
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
              <span class="text-xl md:text-2xl lg:text-3xl xl:text-4xl jura inline-block name-typewriter {nameTypingComplete ? '' : 'typing'} {frameHovered ? ($theme === 'light' ? 'name-highlight-gold-light' : 'name-highlight-gold-dark') : ($theme === 'light' ? 'name-highlight-green' : 'name-highlight')}">{typedName}</span>
            </b> 
          </span>
        </div>
        <div class="min-h-[120px] md:min-h-[140px] lg:min-h-[180px] my-4 border-b border-gray-200/20 pb-4 typewriter-text {frameHovered ? 'caret-gold' : ($theme === 'light' ? 'caret-green' : 'caret-fire')}">
          <span class="text-sm md:text-base lg:text-lg xl:text-xl transition-colors duration-300 {frameHovered ? ($theme === 'light' ? 'typewriter-gold-light' : 'typewriter-gold-dark') : ($theme === 'light' ? theme.classes.light.text : theme.classes.dark.text)}">
            {typedText}
          </span>
        </div>

        <h1 class="{frameHovered ? ($theme === 'light' ? 'text-[#9A7B1C]' : 'text-[#FFD700]') : ($theme === 'light' ? theme.classes.light.text : theme.classes.dark.text)} jura text-base md:text-lg lg:text-xl skills-title transition-colors duration-300">SKILLS</h1>
        <div class="flex flex-wrap gap-2 md:gap-3 sm:my-2 items-start">
          {#each ["NextJS", "SvelteKit", "TypeScript", "PostgreSQL", "TailWindCSS", "Python", "Django", "Linux", "Git", "Figma", "Unreal Engine", "Vercel", "CI/CD", "AWS", "XR"] as skill, i}
            <button 
              class="skill-badge border rounded-2xl px-2 md:px-3 py-0.5 md:py-1 transition-all duration-300 ease-out skill-tag
                {hoveredSkill === skill 
                  ? (frameHovered 
                    ? ($theme === 'light' ? 'bg-[#9A7B1C] border-[#9A7B1C] shadow-md shadow-[#9A7B1C]/30 scale-105' : 'bg-[#DAA520] border-[#DAA520] shadow-md shadow-[#FFD700]/30 scale-105')
                    : ($theme === 'light' ? 'bg-[#228b22] border-[#228b22] shadow-md shadow-[#228b22]/30 scale-105' : 'bg-[#cc4400] border-[#cc4400] shadow-md shadow-[#cc4400]/30 scale-105'))
                  : (frameHovered
                    ? ($theme === 'light' ? 'bg-[#9A7B1C15] border-[#9A7B1C] hover:bg-[#9A7B1C30]' : 'bg-[#FFD70015] border-[#FFD700] hover:bg-[#FFD70030]')
                    : ($theme === 'light' ? 'bg-[#228b2215] border-[#228b22] hover:bg-[#228b2230]' : 'bg-[#cc440015] border-[#cc4400] hover:bg-[#cc440030]'))}"
              style="animation-delay: {5.5 + (i * 0.08)}s"
              on:mouseenter={() => hoveredSkill = skill}
              on:mouseleave={() => hoveredSkill = null}
              on:click={() => hoveredSkill = hoveredSkill === skill ? null : skill}
              on:focus={() => hoveredSkill = skill}
              on:blur={() => hoveredSkill = null}
            >
              <span class="text-xs md:text-sm font-medium whitespace-nowrap {hoveredSkill === skill ? 'text-white' : (frameHovered ? ($theme === 'light' ? 'text-[#9A7B1C]' : 'text-[#FFD700]') : ($theme === 'light' ? theme.classes.light.text : theme.classes.dark.text))}">
                {skill}
              </span>
            </button>
          {/each}
        </div>
        
        <!-- Skill description area -->
        <div class="skill-description-area h-12 md:h-10 mt-2 overflow-hidden">
          {#if hoveredSkill}
            <div class="skill-description-content flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-300 {frameHovered ? ($theme === 'light' ? 'bg-[#9A7B1C10] border border-[#9A7B1C40]' : 'bg-[#FFD70010] border border-[#FFD70040]') : ($theme === 'light' ? 'bg-[#228b2210] border border-[#228b2240]' : 'bg-[#cc440010] border border-[#cc440040]')}">
              <span class="text-sm font-semibold transition-colors duration-300 {frameHovered ? ($theme === 'light' ? 'text-[#9A7B1C]' : 'text-[#FFD700]') : ($theme === 'light' ? 'text-[#228b22]' : 'text-[#cc4400]')}">{hoveredSkill}:</span>
              <span class="text-xs md:text-sm {$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text} opacity-80">
                {skillDescriptions[hoveredSkill]}
              </span>
            </div>
          {:else}
            <div class="flex items-center h-full px-3 opacity-50">
              <span class="text-xs {$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}">
                <span class="hidden md:inline">Hover over</span><span class="md:hidden">Tap</span> a skill to learn more
              </span>
            </div>
          {/if}
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
  .typewriter-text.caret-gold span::after {
    animation: blink 1s infinite, gold-caret-pulse 1.5s ease-in-out infinite;
  }
  @keyframes gold-caret-pulse {
    0%, 100% { color: #FFD700; }
    50% { color: #ffffff; }
  }

  /* Name typewriter effect */
  .name-typewriter {
    min-width: 1ch; /* Ensure some width even when empty */
  }
  .name-typewriter.typing::after {
    content: '|';
    animation: blink 0.8s infinite;
    margin-left: 1px;
  }
  :global(.light) .name-typewriter.typing::after {
    color: #00c400;
  }
  :global(.dark) .name-typewriter.typing::after {
    color: #ff4500;
  }
  .name-typewriter.name-highlight-gold-light.typing::after,
  .name-typewriter.name-highlight-gold-dark.typing::after {
    color: #FFD700;
  }

  /* Gold pulsating typewriter text */
  .typewriter-gold-light {
    animation: typewriter-pulse-light 1.5s ease-in-out infinite;
  }
  .typewriter-gold-dark {
    animation: typewriter-pulse-dark 1.5s ease-in-out infinite;
  }
  @keyframes typewriter-pulse-light {
    0%, 100% { color: #9A7B1C; }
    50% { color: #4a3a0e; }
  }
  @keyframes typewriter-pulse-dark {
    0%, 100% { color: #FFD700; }
    50% { color: #ffffff; }
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
    cursor: pointer;
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

  /* ===== IDLE PULSATING ANIMATION (Desktop only) ===== */
  @media (min-width: 1024px) {
    .header-pic-container:not(.super-saiyan) {
      animation: idle-pulse 2.5s ease-in-out infinite;
    }
    
    .header-pic-container:not(.super-saiyan) .header-frame :global(svg) {
      animation: idle-glow 2.5s ease-in-out infinite;
    }
  }

  @keyframes idle-pulse {
    0%, 100% { 
      transform: scale(1);
    }
    50% { 
      transform: scale(1.03);
    }
  }

  @keyframes idle-glow {
    0%, 100% { 
      filter: drop-shadow(0 0 2px currentColor);
      opacity: 0.85;
    }
    50% { 
      filter: drop-shadow(0 0 8px currentColor) drop-shadow(0 0 16px currentColor);
      opacity: 1;
    }
  }

  /* Lighter glow for light mode */
  :global(.light) .header-pic-container:not(.super-saiyan) .header-frame :global(svg) {
    animation: idle-glow-light 2.5s ease-in-out infinite;
  }

  @keyframes idle-glow-light {
    0%, 100% { 
      filter: drop-shadow(0 0 1px rgba(0, 196, 0, 0.3));
      opacity: 0.9;
    }
    50% { 
      filter: drop-shadow(0 0 4px rgba(0, 196, 0, 0.4)) drop-shadow(0 0 8px rgba(0, 196, 0, 0.2));
      opacity: 1;
    }
  }
  
  /* ===== SUPER SAIYAN EFFECT ===== */
  .header-pic-container.super-saiyan {
    animation: saiyan-power 0.8s ease-in-out infinite;
  }
  
  /* Power-up breathing/pulsing scale */
  @keyframes saiyan-power {
    0%, 100% { 
      transform: scale(1.02);
    }
    25% {
      transform: scale(1.06);
    }
    50% { 
      transform: scale(1.04);
    }
    75% {
      transform: scale(1.08);
    }
  }
  
  /* Intense golden aura glow - pulsing */
  .header-pic-container.super-saiyan::before {
    content: '';
    position: absolute;
    inset: -20px;
    border-radius: 50%;
    background: radial-gradient(circle, 
      rgba(255, 215, 0, 0.6) 0%, 
      rgba(255, 193, 37, 0.4) 30%,
      rgba(255, 165, 0, 0.2) 50%,
      transparent 70%);
    z-index: -1;
    animation: aura-pulse 0.5s ease-in-out infinite alternate;
    filter: blur(8px);
  }
  
  /* Energy ring expanding outward */
  .header-pic-container.super-saiyan::after {
    background: radial-gradient(circle, 
      transparent 30%,
      rgba(255, 215, 0, 0.8) 45%,
      rgba(255, 193, 37, 0.6) 50%,
      rgba(255, 165, 0, 0.3) 60%,
      transparent 70%) !important;
    animation: energy-ring 1s ease-out infinite !important;
    opacity: 1 !important;
  }
  
  @keyframes aura-pulse {
    0% {
      transform: scale(1);
      opacity: 0.7;
      filter: blur(8px);
    }
    100% {
      transform: scale(1.15);
      opacity: 1;
      filter: blur(12px);
    }
  }
  
  @keyframes energy-ring {
    0% {
      transform: scale(0.9);
      opacity: 0.9;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(1.3);
      opacity: 0;
    }
  }
  
  /* SVG frame intense glow when super saiyan */
  .header-pic-container.super-saiyan .header-frame :global(svg) {
    filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.8)) 
            drop-shadow(0 0 16px rgba(255, 193, 37, 0.6))
            drop-shadow(0 0 24px rgba(255, 165, 0, 0.4));
    animation: svg-glow-pulse 0.4s ease-in-out infinite alternate;
  }
  
  @keyframes svg-glow-pulse {
    0% {
      filter: drop-shadow(0 0 6px rgba(255, 215, 0, 0.7)) 
              drop-shadow(0 0 12px rgba(255, 193, 37, 0.5))
              drop-shadow(0 0 18px rgba(255, 165, 0, 0.3));
    }
    100% {
      filter: drop-shadow(0 0 12px rgba(255, 215, 0, 1)) 
              drop-shadow(0 0 24px rgba(255, 193, 37, 0.8))
              drop-shadow(0 0 36px rgba(255, 165, 0, 0.5));
    }
  }

  /* Light mode super saiyan - softer muted gold tones */
  :global(.light) .header-pic-container.super-saiyan::before,
  .header-pic-container.super-saiyan.glow-gold-light::before {
    background: radial-gradient(circle, 
      rgba(154, 123, 28, 0.25) 0%, 
      rgba(168, 134, 42, 0.15) 30%,
      rgba(122, 95, 8, 0.08) 50%,
      transparent 70%);
    filter: blur(6px);
  }
  
  :global(.light) .header-pic-container.super-saiyan::after,
  .header-pic-container.super-saiyan.glow-gold-light::after {
    background: radial-gradient(circle, 
      transparent 30%,
      rgba(154, 123, 28, 0.35) 45%,
      rgba(168, 134, 42, 0.25) 50%,
      rgba(122, 95, 8, 0.12) 60%,
      transparent 70%) !important;
  }

  :global(.light) .header-pic-container.super-saiyan .header-frame :global(svg) {
    filter: drop-shadow(0 0 4px rgba(154, 123, 28, 0.5)) 
            drop-shadow(0 0 8px rgba(168, 134, 42, 0.3))
            drop-shadow(0 0 12px rgba(122, 95, 8, 0.2));
    animation: svg-glow-pulse-light 0.4s ease-in-out infinite alternate;
  }

  @keyframes svg-glow-pulse-light {
    0% {
      filter: drop-shadow(0 0 3px rgba(154, 123, 28, 0.4)) 
              drop-shadow(0 0 6px rgba(168, 134, 42, 0.25))
              drop-shadow(0 0 10px rgba(122, 95, 8, 0.15));
    }
    100% {
      filter: drop-shadow(0 0 6px rgba(154, 123, 28, 0.6)) 
              drop-shadow(0 0 12px rgba(168, 134, 42, 0.4))
              drop-shadow(0 0 18px rgba(122, 95, 8, 0.25));
    }
  }
  
  /* Dark mode super saiyan - deeper gold tones */
  :global(.dark) .header-pic-container.super-saiyan::before,
  .header-pic-container.super-saiyan.glow-gold-dark::before {
    background: radial-gradient(circle, 
      rgba(218, 165, 32, 0.7) 0%, 
      rgba(184, 134, 11, 0.5) 30%,
      rgba(205, 133, 63, 0.3) 50%,
      transparent 70%);
  }
  
  :global(.dark) .header-pic-container.super-saiyan::after,
  .header-pic-container.super-saiyan.glow-gold-dark::after {
    background: radial-gradient(circle, 
      transparent 30%,
      rgba(218, 165, 32, 0.9) 45%,
      rgba(184, 134, 11, 0.7) 50%,
      rgba(205, 133, 63, 0.4) 60%,
      transparent 70%) !important;
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
    background: radial-gradient(circle, rgba(0, 196, 0, 0.12) 0%, transparent 70%);
  }
  /* Gold glow for hover state - softer in light mode, deeper in dark mode */
  .header-pic-container.glow-gold-light::after {
    background: radial-gradient(circle, rgba(154, 123, 28, 0.18) 0%, rgba(168, 134, 42, 0.08) 40%, transparent 70%);
  }
  .header-pic-container.glow-gold-dark::after {
    background: radial-gradient(circle, rgba(218, 165, 32, 0.4) 0%, rgba(184, 134, 11, 0.2) 40%, transparent 70%);
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
    opacity: 1;
    animation: greeting-slide-2 500ms cubic-bezier(0.075, 0.82, 0.165, 1) 3s forwards,
               shimmer 3s ease-in-out 4s infinite;
  }

  /* Green name highlight for light mode */
  .name-highlight-green {
    background: linear-gradient(135deg, #00dd00 0%, #00c400 50%, #00bb00 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s ease-in-out 4s infinite;
    filter: drop-shadow(0 0 10px rgba(0, 196, 0, 0.15));
  }
  .greetings-anim-3.name-highlight-green {
    opacity: 1;
    animation: greeting-slide-2 500ms cubic-bezier(0.075, 0.82, 0.165, 1) 3s forwards,
               shimmer 3s ease-in-out 4s infinite;
  }

  /* Gold name highlight for light mode (muted bronze) */
  .name-highlight-gold-light {
    background: linear-gradient(135deg, #9A7B1C 0%, #A8862A 50%, #7A5F08 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 1.5s ease-in-out infinite;
    filter: drop-shadow(0 0 8px rgba(154, 123, 28, 0.2));
  }
  .greetings-anim-3.name-highlight-gold-light {
    opacity: 1;
    animation: shimmer 1.5s ease-in-out infinite;
  }

  /* Gold name highlight for dark mode (bright gold) */
  .name-highlight-gold-dark {
    background: linear-gradient(135deg, #FFD700 0%, #FFC125 50%, #DAA520 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 1.5s ease-in-out infinite;
    filter: drop-shadow(0 0 25px rgba(255, 215, 0, 0.6));
  }
  .greetings-anim-3.name-highlight-gold-dark {
    opacity: 1;
    animation: shimmer 1.5s ease-in-out infinite;
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
    backdrop-filter: blur(4px);
  }

  /* Skill badge interactive styles */
  .skill-badge {
    cursor: pointer;
    transform-origin: center center;
    will-change: transform, background-color, box-shadow;
  }
  
  .skill-badge:hover {
    z-index: 10;
  }
  
  .skill-badge:active {
    transform: scale(0.95);
  }
  
  /* Skill description area */
  .skill-description-area {
    transition: all 0.3s ease;
  }
  
  .skill-description-content {
    animation: fadeSlideIn 0.3s ease-out forwards;
  }
  
  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
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
