<script lang="ts">
  import { theme } from '../stores/light-dark-mode';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import contactFrameGreen from '../../assets/illustrations/story-frame-green.svg';
  import contactFrameFire from '../../assets/illustrations/story-frame-fire.svg';

  let isInputFocused = false;
  let keystrokeFlicker = false;
  let flickerTimeout: ReturnType<typeof setTimeout>;
  
  // Frame animation state
  let mailFrameHovered = false;
  let contactScrollProgress = 0;

  // Function to load the appropriate frame SVG based on theme and state
  function loadMailFrame(currentTheme: string, showInverse: boolean = false) {
    let svgUrl: string;
    if (showInverse) {
      // Inverse: light mode shows fire, dark mode shows green
      svgUrl = currentTheme === 'light' ? contactFrameFire : contactFrameGreen;
    } else {
      // Normal: light mode shows green, dark mode shows fire
      svgUrl = currentTheme === 'light' ? contactFrameGreen : contactFrameFire;
    }
    
    fetch(svgUrl)
      .then(res => res.text())
      .then(svgContent => {
        const frameContainer = document.getElementById('mail-frame');
        if (frameContainer) {
          frameContainer.innerHTML = svgContent;
          // Apply rotation based on scroll progress (desktop only)
          const svg = frameContainer.querySelector('svg');
          if (svg && window.innerWidth >= 1024) {
            const rotation = contactScrollProgress * 360;
            svg.style.transform = `rotate(${rotation}deg)`;
            svg.style.transition = 'transform 0.3s ease-out';
          }
        }
      });
  }

  // Determine if we should show inverse color
  $: isMailRotating = contactScrollProgress > 0 && contactScrollProgress < 1;
  $: showMailInverseColor = mailFrameHovered || isMailRotating;

  // Subscribe to theme changes
  theme.subscribe((currentTheme) => {
    if (typeof document !== 'undefined') {
      loadMailFrame(currentTheme, showMailInverseColor);
    }
  });

  // Reactive statement to reload frame when inverse color state changes
  $: if (typeof document !== 'undefined' && showMailInverseColor !== undefined) {
    loadMailFrame(get(theme), showMailInverseColor);
  }

  // Handle frame hover
  function handleMailFrameEnter() {
    mailFrameHovered = true;
    loadMailFrame(get(theme), true);
  }

  function handleMailFrameLeave() {
    mailFrameHovered = false;
    loadMailFrame(get(theme), isMailRotating);
  }

  function handleFocus() {
    isInputFocused = true;
  }

  function handleBlur() {
    isInputFocused = false;
  }

  function handleKeydown() {
    if (!isInputFocused) return;
    keystrokeFlicker = true;
    clearTimeout(flickerTimeout);
    flickerTimeout = setTimeout(() => {
      keystrokeFlicker = false;
    }, 150);
  }

  onMount(() => {
    // Load initial mail frame SVG
    loadMailFrame(get(theme), false);

    // Track scroll progress for mail frame rotation (desktop only)
    const wrapper = document.getElementById('wrapper');
    const section4 = document.getElementById('section-4');
    if (wrapper && section4 && window.innerWidth >= 1024) {
      let wasMailRotating = false;
      
      const updateContactScrollProgress = () => {
        const section4Rect = section4.getBoundingClientRect();
        const wrapperRect = wrapper.getBoundingClientRect();
        
        // Calculate how far into section-4 we've scrolled
        const sectionTop = section4Rect.top - wrapperRect.top;
        const sectionHeight = section4.offsetHeight;
        const viewportHeight = wrapperRect.height;
        
        // Start animation when section enters viewport, complete when it exits
        const progress = Math.min(Math.max((-sectionTop + viewportHeight * 0.3) / (sectionHeight * 0.7), 0), 1);
        contactScrollProgress = progress;
        
        // Update frame rotation
        const frameContainer = document.getElementById('mail-frame');
        const svg = frameContainer?.querySelector('svg');
        if (svg) {
          const rotation = contactScrollProgress * 360;
          svg.style.transform = `rotate(${rotation}deg)`;
        }
        
        // Swap to inverse color when rotation starts or stops
        const isCurrentlyRotating = contactScrollProgress > 0 && contactScrollProgress < 1;
        if (isCurrentlyRotating !== wasMailRotating) {
          wasMailRotating = isCurrentlyRotating;
          loadMailFrame(get(theme), isCurrentlyRotating || mailFrameHovered);
        }
      };
      
      wrapper.addEventListener('scroll', updateContactScrollProgress, { passive: true });
      updateContactScrollProgress();
    }
  });
</script>

<svelte:window on:keydown={handleKeydown} />
<main>
    <div id="section-4" class="{$theme === 'light' ? theme.classes.light.heroGradient : theme.classes.dark.heroGradient} relative">
      
      <!-- Background Silhouette - Communication/Connection lines focusing toward center form -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <svg 
          class="absolute w-full h-full transition-all duration-300 {isInputFocused ? 'opacity-[0.45]' : 'opacity-[0.20]'} {keystrokeFlicker ? 'contact-flicker' : ''}"
          viewBox="0 0 1200 800" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          preserveAspectRatio="xMidYMid slice"
          style="filter: {isInputFocused ? ($theme === 'light' ? 'hue-rotate(-10deg) saturate(1.8) brightness(1.2)' : 'hue-rotate(10deg) saturate(1.6) brightness(1.3)') : 'none'};"
        >
          <!-- Gradient definitions -->
          <defs>
            <linearGradient id="contactGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color={$theme === 'light' ? '#00c400' : '#ff4500'}>
                <animate attributeName="stop-color" values={$theme === 'light' ? '#00c400;#00ff88;#00ddaa;#00c400' : '#ff4500;#ff8800;#ffaa44;#ff4500'} dur="5s" repeatCount="indefinite"/>
              </stop>
              <stop offset="50%" stop-color={$theme === 'light' ? '#00ff88' : '#ff8800'}>
                <animate attributeName="stop-color" values={$theme === 'light' ? '#00ff88;#44ffcc;#00ff88' : '#ff8800;#ffcc44;#ff8800'} dur="5s" repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" stop-color={$theme === 'light' ? '#00ddaa' : '#ffaa44'}>
                <animate attributeName="stop-color" values={$theme === 'light' ? '#00ddaa;#00ff88;#00c400;#00ddaa' : '#ffaa44;#ff6622;#ff4500;#ffaa44'} dur="5s" repeatCount="indefinite"/>
              </stop>
            </linearGradient>
            <linearGradient id="contactGrad2" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stop-color={$theme === 'light' ? '#22ffaa' : '#ffcc44'}>
                <animate attributeName="stop-color" values={$theme === 'light' ? '#22ffaa;#00ff66;#22ffaa' : '#ffcc44;#ff9922;#ffcc44'} dur="4s" repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" stop-color={$theme === 'light' ? '#00cc88' : '#ff6633'}>
                <animate attributeName="stop-color" values={$theme === 'light' ? '#00cc88;#00ffaa;#00cc88' : '#ff6633;#ff8844;#ff6633'} dur="4s" repeatCount="indefinite"/>
              </stop>
            </linearGradient>
            <radialGradient id="contactNodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color={$theme === 'light' ? '#00ff88' : '#ffaa44'} stop-opacity="1"/>
              <stop offset="100%" stop-color={$theme === 'light' ? '#00c400' : '#ff4500'} stop-opacity="0"/>
            </radialGradient>
            <filter id="contactGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <!-- Left side converging lines with gradient -->
          <g stroke="url(#contactGrad1)" stroke-width="2" fill="none" filter="url(#softGlow)">
            <path d="M0 100 H150 L300 250 L450 250 H500" stroke-dasharray="800" stroke-dashoffset="800">
              <animate attributeName="stroke-dashoffset" values="800;0" dur="3s" fill="freeze"/>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" begin="3s" repeatCount="indefinite"/>
            </path>
            <path d="M0 300 H100 L250 400 H500" stroke-dasharray="600" stroke-dashoffset="600">
              <animate attributeName="stroke-dashoffset" values="600;0" dur="2.5s" begin="0.5s" fill="freeze"/>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.8s" begin="3s" repeatCount="indefinite"/>
            </path>
            <path d="M0 500 H200 L350 400 H500" stroke-dasharray="700" stroke-dashoffset="700">
              <animate attributeName="stroke-dashoffset" values="700;0" dur="2.8s" begin="1s" fill="freeze"/>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.6s" begin="3s" repeatCount="indefinite"/>
            </path>
            <path d="M0 700 H150 L300 550 L450 550 H500" stroke-dasharray="800" stroke-dashoffset="800">
              <animate attributeName="stroke-dashoffset" values="800;0" dur="3s" begin="1.5s" fill="freeze"/>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3.2s" begin="3s" repeatCount="indefinite"/>
            </path>
          </g>
          
          <!-- Right side converging lines with gradient -->
          <g stroke="url(#contactGrad2)" stroke-width="2" fill="none" filter="url(#softGlow)">
            <path d="M1200 100 H1050 L900 250 L750 250 H700" stroke-dasharray="800" stroke-dashoffset="800">
              <animate attributeName="stroke-dashoffset" values="800;0" dur="3s" begin="0.3s" fill="freeze"/>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.9s" begin="3s" repeatCount="indefinite"/>
            </path>
            <path d="M1200 300 H1100 L950 400 H700" stroke-dasharray="600" stroke-dashoffset="600">
              <animate attributeName="stroke-dashoffset" values="600;0" dur="2.5s" begin="0.8s" fill="freeze"/>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3.1s" begin="3s" repeatCount="indefinite"/>
            </path>
            <path d="M1200 500 H1000 L850 400 H700" stroke-dasharray="700" stroke-dashoffset="700">
              <animate attributeName="stroke-dashoffset" values="700;0" dur="2.8s" begin="1.3s" fill="freeze"/>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.7s" begin="3s" repeatCount="indefinite"/>
            </path>
            <path d="M1200 700 H1050 L900 550 L750 550 H700" stroke-dasharray="800" stroke-dashoffset="800">
              <animate attributeName="stroke-dashoffset" values="800;0" dur="3s" begin="1.8s" fill="freeze"/>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3.3s" begin="3s" repeatCount="indefinite"/>
            </path>
          </g>
          
          <!-- Center form frame with animated gradient -->
          <rect x="480" y="200" width="240" height="400" rx="8" stroke="url(#contactGrad1)" stroke-width="3" fill="none" filter="url(#contactGlow)" opacity="0.6">
            <animate attributeName="stroke-dasharray" values="0 1300;1300 0" dur="4s" fill="freeze"/>
          </rect>
          
          <!-- Glowing connection nodes on left -->
          <g fill="url(#contactNodeGlow)" filter="url(#contactGlow)">
            <circle cx="0" cy="100" r="8">
              <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="0" cy="300" r="8">
              <animate attributeName="r" values="6;10;6" dur="2.3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2.3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="0" cy="500" r="8">
              <animate attributeName="r" values="6;10;6" dur="1.8s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="1.8s" repeatCount="indefinite"/>
            </circle>
            <circle cx="0" cy="700" r="8">
              <animate attributeName="r" values="6;10;6" dur="2.1s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2.1s" repeatCount="indefinite"/>
            </circle>
            
            <!-- Connection nodes on right -->
            <circle cx="1200" cy="100" r="8">
              <animate attributeName="r" values="6;10;6" dur="2.2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2.2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="1200" cy="300" r="8">
              <animate attributeName="r" values="6;10;6" dur="1.9s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="1.9s" repeatCount="indefinite"/>
            </circle>
            <circle cx="1200" cy="500" r="8">
              <animate attributeName="r" values="6;10;6" dur="2.4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2.4s" repeatCount="indefinite"/>
            </circle>
            <circle cx="1200" cy="700" r="8">
              <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
            </circle>
          </g>
          
          <!-- Data flow dots traveling along paths - colorful -->
          <g filter="url(#contactGlow)">
            <circle r="5" fill={$theme === 'light' ? '#00ff88' : '#ffaa44'}>
              <animateMotion dur="3s" repeatCount="indefinite" path="M0 100 H150 L300 250 L450 250 H500"/>
            </circle>
            <circle r="5" fill={$theme === 'light' ? '#44ffcc' : '#ffcc66'}>
              <animateMotion dur="3.5s" repeatCount="indefinite" begin="1s" path="M0 300 H100 L250 400 H500"/>
            </circle>
            <circle r="5" fill={$theme === 'light' ? '#00ffaa' : '#ff8844'}>
              <animateMotion dur="3s" repeatCount="indefinite" begin="2s" path="M0 500 H200 L350 400 H500"/>
            </circle>
            <circle r="5" fill={$theme === 'light' ? '#22ff99' : '#ffbb55'}>
              <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.5s" path="M0 700 H150 L300 550 L450 550 H500"/>
            </circle>
            <!-- Right side data dots -->
            <circle r="5" fill={$theme === 'light' ? '#00ddaa' : '#ff9944'}>
              <animateMotion dur="3s" repeatCount="indefinite" begin="0.3s" path="M1200 100 H1050 L900 250 L750 250 H700"/>
            </circle>
            <circle r="5" fill={$theme === 'light' ? '#33ffbb' : '#ffdd66'}>
              <animateMotion dur="3.5s" repeatCount="indefinite" begin="1.3s" path="M1200 300 H1100 L950 400 H700"/>
            </circle>
            <circle r="5" fill={$theme === 'light' ? '#00ff77' : '#ff7733'}>
              <animateMotion dur="3s" repeatCount="indefinite" begin="2.3s" path="M1200 500 H1000 L850 400 H700"/>
            </circle>
            <circle r="5" fill={$theme === 'light' ? '#44ffaa' : '#ffaa33'}>
              <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.8s" path="M1200 700 H1050 L900 550 L750 550 H700"/>
            </circle>
          </g>
          
          <!-- Colorful decorative lines top and bottom -->
          <g stroke-width="2" fill="none">
            <path d="M400 50 H800" stroke={$theme === 'light' ? '#00ff88' : '#ffaa44'} opacity="0.4">
              <animate attributeName="stroke" values={$theme === 'light' ? '#00ff88;#00cc66;#44ffaa;#00ff88' : '#ffaa44;#ff8822;#ffcc66;#ffaa44'} dur="4s" repeatCount="indefinite"/>
            </path>
            <path d="M400 750 H800" stroke={$theme === 'light' ? '#44ffcc' : '#ff8844'} opacity="0.4">
              <animate attributeName="stroke" values={$theme === 'light' ? '#44ffcc;#00ffaa;#00dd88;#44ffcc' : '#ff8844;#ffbb44;#ff6622;#ff8844'} dur="4s" begin="2s" repeatCount="indefinite"/>
            </path>
          </g>
          
          <!-- Colorful corner accents with glow -->
          <g stroke-width="3" fill="none" filter="url(#softGlow)">
            <path d="M420 80 L420 120 L460 120" stroke={$theme === 'light' ? '#00ff66' : '#ff7744'}>
              <animate attributeName="stroke" values={$theme === 'light' ? '#00ff66;#00dd88;#44ffaa;#00ff66' : '#ff7744;#ffaa44;#ff9922;#ff7744'} dur="3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite"/>
            </path>
            <path d="M780 80 L780 120 L740 120" stroke={$theme === 'light' ? '#22ffaa' : '#ffbb44'}>
              <animate attributeName="stroke" values={$theme === 'light' ? '#22ffaa;#00ff77;#00dd66;#22ffaa' : '#ffbb44;#ff8833;#ffcc55;#ffbb44'} dur="3s" begin="0.75s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" begin="0.75s" repeatCount="indefinite"/>
            </path>
            <path d="M420 720 L420 680 L460 680" stroke={$theme === 'light' ? '#00ffcc' : '#ff9955'}>
              <animate attributeName="stroke" values={$theme === 'light' ? '#00ffcc;#44ff99;#00ffaa;#00ffcc' : '#ff9955;#ffcc44;#ff7722;#ff9955'} dur="3s" begin="1.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" begin="1.5s" repeatCount="indefinite"/>
            </path>
            <path d="M780 720 L780 680 L740 680" stroke={$theme === 'light' ? '#44ff88' : '#ffaa66'}>
              <animate attributeName="stroke" values={$theme === 'light' ? '#44ff88;#00ffbb;#22ff99;#44ff88' : '#ffaa66;#ff7733;#ffbb55;#ffaa66'} dur="3s" begin="2.25s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" begin="2.25s" repeatCount="indefinite"/>
            </path>
          </g>
          
          <!-- Message/envelope silhouettes floating -->
          <g fill="none" stroke={$theme === 'light' ? '#00ff88' : '#ffaa44'} stroke-width="1.5" opacity="0.3">
            <!-- Left envelope -->
            <g transform="translate(80, 200)">
              <rect x="0" y="0" width="40" height="28" rx="2"/>
              <path d="M0 4 L20 18 L40 4"/>
              <animateTransform attributeName="transform" type="translate" values="80,200;80,180;80,200" dur="6s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="6s" repeatCount="indefinite"/>
            </g>
            <!-- Right envelope -->
            <g transform="translate(1080, 580)">
              <rect x="0" y="0" width="40" height="28" rx="2"/>
              <path d="M0 4 L20 18 L40 4"/>
              <animateTransform attributeName="transform" type="translate" values="1080,580;1080,560;1080,580" dur="5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="5s" repeatCount="indefinite"/>
            </g>
          </g>
          
          <!-- Signal/wifi-like waves emanating from center -->
          <g stroke={$theme === 'light' ? '#00ff88' : '#ffaa44'} stroke-width="2" fill="none" opacity="0.25">
            <path d="M560 400 Q520 360 560 320" stroke-dasharray="80">
              <animate attributeName="stroke-dashoffset" values="80;0;-80" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;0.4;0" dur="3s" repeatCount="indefinite"/>
            </path>
            <path d="M640 400 Q680 360 640 320" stroke-dasharray="80">
              <animate attributeName="stroke-dashoffset" values="80;0;-80" dur="3s" begin="0.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;0.4;0" dur="3s" begin="0.5s" repeatCount="indefinite"/>
            </path>
            <path d="M560 400 Q520 440 560 480" stroke-dasharray="80">
              <animate attributeName="stroke-dashoffset" values="80;0;-80" dur="3s" begin="1s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;0.4;0" dur="3s" begin="1s" repeatCount="indefinite"/>
            </path>
            <path d="M640 400 Q680 440 640 480" stroke-dasharray="80">
              <animate attributeName="stroke-dashoffset" values="80;0;-80" dur="3s" begin="1.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;0.4;0" dur="3s" begin="1.5s" repeatCount="indefinite"/>
            </path>
          </g>
          
          <!-- Floating particles around the form -->
          <g fill={$theme === 'light' ? '#00ff88' : '#ffaa44'}>
            {#each [
              {x: 520, y: 250, dur: 4},
              {x: 680, y: 300, dur: 5},
              {x: 490, y: 400, dur: 4.5},
              {x: 710, y: 500, dur: 3.5},
              {x: 550, y: 580, dur: 5.5},
              {x: 650, y: 220, dur: 4.2}
            ] as particle}
              <circle cx={particle.x} cy={particle.y} r="3" opacity="0.5">
                <animate attributeName="cy" values="{particle.y};{particle.y - 30};{particle.y}" dur="{particle.dur}s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="{particle.dur}s" repeatCount="indefinite"/>
              </circle>
            {/each}
          </g>
        </svg>
      </div>
      
      <div class="md:w-4/5 lg:w-3/5 mx-auto py-40 lg:py-0 mb-8 relative z-10">
        
        <!-- Header -->
        <div class="text-center content-center">
          <!-- Mail Icon with Animated Frame -->
          <div 
            class="mail-icon-container mx-auto {showMailInverseColor
              ? ($theme === 'light' ? 'glow-fire' : 'glow-green') 
              : ($theme === 'light' ? 'glow-green' : 'glow-fire')}"
            on:mouseenter={handleMailFrameEnter}
            on:mouseleave={handleMailFrameLeave}
            role="presentation"
          >
            <div id="mail-frame" class="mail-frame"></div>
            <svg class="mail-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Envelope body -->
              <rect x="4" y="14" width="56" height="40" rx="4" fill="{$theme === 'light' ? '#00c400' : '#ff4500'}">
                <animate attributeName="fill-opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite"/>
              </rect>
              <!-- Envelope flap (triangle) -->
              <path d="M4 18l28 18 28-18" stroke="{$theme === 'light' ? '#00a000' : '#cc3700'}" stroke-width="3" fill="none" stroke-linejoin="round">
                <animate attributeName="stroke-opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
              </path>
              <!-- Inner fold lines -->
              <path d="M4 54l20-16" stroke="{$theme === 'light' ? '#00a000' : '#cc3700'}" stroke-width="2" fill="none" opacity="0.5"/>
              <path d="M60 54l-20-16" stroke="{$theme === 'light' ? '#00a000' : '#cc3700'}" stroke-width="2" fill="none" opacity="0.5"/>
              <!-- Letter peeking out -->
              <rect x="14" y="8" width="36" height="24" rx="2" fill="{$theme === 'light' ? '#f5f5f5' : '#e8e8e8'}">
                <animate attributeName="y" values="8;6;8" dur="4s" repeatCount="indefinite"/>
              </rect>
              <!-- Letter lines -->
              <g stroke="{$theme === 'light' ? '#00c400' : '#ff4500'}" stroke-width="2" stroke-linecap="round">
                <line x1="20" y1="16" x2="44" y2="16" opacity="0.6">
                  <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/>
                </line>
                <line x1="20" y1="22" x2="38" y2="22" opacity="0.5">
                  <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite"/>
                </line>
              </g>
              <!-- Sparkle/notification dot -->
              <circle cx="54" cy="12" r="6" fill="{$theme === 'light' ? '#ff4500' : '#00c400'}">
                <animate attributeName="r" values="5;7;5" dur="1.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite"/>
              </circle>
              <!-- Highlight -->
              <path d="M8 18a4 4 0 0 1 4-4h40" stroke="{$theme === 'light' ? '#00dd00' : '#ff6030'}" stroke-width="2" fill="none" opacity="0.3"/>
            </svg>
          </div>
          <h1 class="jura {$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}" style="margin: 1em; font-size: 2em; font-weight: 600;">CONTACT ME</h1>
        </div>

        <!-- Form -->
        <div class="ion-text-center w-11/12 lg:w-1/2 text-center mx-auto">
        <div class="form-wrapper {$theme === 'light' ? 'bg-white border-[#228b22]/30' : 'bg-[#1a1a1a] border-[#cc4400]/30'} border-2 rounded-2xl p-6 md:p-8 shadow-lg">
          <!-- https://formsubmit.co/ -->
          <!-- https://www.youtube.com/watch?v=iSobU_DjNN4 -->
          <form action="https://formsubmit.co/f6e4bbd318fdd3193043ce91e88f6bfd" method="POST">
              <input 
                class={$theme === 'light' ? theme.classes.light.input : theme.classes.dark.input} 
                type="text" 
                required 
                placeholder="First & Last Name" 
                name="name"
                on:focus={handleFocus}
                on:blur={handleBlur}
              >
              <input 
                class={$theme === 'light' ? theme.classes.light.input : theme.classes.dark.input} 
                type="text" 
                required 
                placeholder="Email Address" 
                name="email"
                on:focus={handleFocus}
                on:blur={handleBlur}
              >
              <textarea 
                class={$theme === 'light' ? theme.classes.light.input : theme.classes.dark.input} 
                rows="5" 
                required 
                placeholder="Want to collaborate or have a suggestion?" 
                name="message"
                on:focus={handleFocus}
                on:blur={handleBlur}
              ></textarea>
              <div class="h-10"></div>
              <button class={$theme === 'light' ? theme.classes.light.button : theme.classes.dark.button} style="padding: 0.5em 2em; font-size: 1.2em;" type="submit">
                  Send Message
              </button>
          </form>
        </div>
        </div>

      </div>
    </div>
</main>
<style>
  #section-4 {
    width: 100%;
    scroll-snap-align: start;
  }
  @media (max-width: 1000px) {
    #section-4 {
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

  /* Keystroke flicker effect */
  .contact-flicker {
    animation: contactFlicker 0.15s ease-out;
  }

  @keyframes contactFlicker {
    0% {
      opacity: 0.45;
      filter: brightness(1.3) saturate(1.8);
    }
    50% {
      opacity: 0.7;
      filter: brightness(1.8) saturate(2.2);
    }
    100% {
      opacity: 0.45;
      filter: brightness(1.3) saturate(1.8);
    }
  }

  /* Mail icon container with animated frame */
  .mail-icon-container {
    position: relative;
    width: 100px;
    height: 100px;
    transition: transform 0.3s ease;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    .mail-icon-container {
      width: 120px;
      height: 120px;
    }
  }

  @media (min-width: 1024px) {
    .mail-icon-container {
      width: 140px;
      height: 140px;
    }
  }

  .mail-icon-container:hover {
    transform: scale(1.05);
  }

  /* SVG frame positioned absolutely */
  .mail-frame {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }

  .mail-frame :global(svg) {
    width: 100%;
    height: 100%;
  }

  /* Mail icon centered inside frame */
  .mail-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    z-index: 1;
  }

  @media (min-width: 768px) {
    .mail-icon {
      width: 60px;
      height: 60px;
    }
  }

  @media (min-width: 1024px) {
    .mail-icon {
      width: 70px;
      height: 70px;
    }
  }

  /* Glow effects for mail frame */
  .mail-icon-container::after {
    content: '';
    position: absolute;
    inset: -8px;
    z-index: 0;
    opacity: 0;
    animation: fadeInGlow 1s ease 0.5s forwards;
  }

  .mail-icon-container.glow-fire::after {
    background: radial-gradient(circle, rgba(255, 69, 0, 0.25) 0%, transparent 70%);
  }

  .mail-icon-container.glow-green::after {
    background: radial-gradient(circle, rgba(0, 196, 0, 0.25) 0%, transparent 70%);
  }

  @keyframes fadeInGlow {
    to { opacity: 1; }
  }
</style>