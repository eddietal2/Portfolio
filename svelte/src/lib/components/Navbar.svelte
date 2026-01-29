<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from '../stores/light-dark-mode';

  function toggleTheme() {
    theme.toggle();
    // Hide tooltip when user clicks the theme button
    showThemeTooltip = false;
  }

  let activeSection = 's1';
  let showThemeTooltip = false;

  onMount(() => {
    // Track active section for nav highlighting
    const options = {
      root: document.getElementById('wrapper'),
      threshold: [0.25],
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          activeSection = entry.target.dataset.currentSection;
        }
      });
    }, options);
    document.querySelectorAll('section').forEach(section => observer.observe(section));

    // Show theme tooltip for first-time visitors
    const hasSeenTooltip = localStorage.getItem('hasSeenThemeTooltip');
    if (!hasSeenTooltip) {
      // Small delay before showing tooltip for better UX
      setTimeout(() => {
        showThemeTooltip = true;
        // Auto-hide after 5 seconds
        setTimeout(() => {
          showThemeTooltip = false;
          localStorage.setItem('hasSeenThemeTooltip', 'true');
        }, 5000);
      }, 1000);
    }
  });

</script>

<main>
  <div class="{$theme === 'light' ? theme.classes.light.nav : theme.classes.dark.nav} navbar-container">
    <div class="w-full max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 px-4 lg:px-8">

      <!-- Logo -->
      <div class="col-span-1 content-center flex items-center">
        <!-- Custom E.T Logo - Clean modern monogram with style -->
        <svg class="h-10 md:h-12 w-14 md:w-16 inline-block mr-2 flex-shrink-0" viewBox="0 0 56 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="etCodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color={$theme === 'light' ? '#00c400' : '#ff4500'}/>
              <stop offset="100%" stop-color={$theme === 'light' ? '#00ff88' : '#ff8c00'}/>
            </linearGradient>
            <linearGradient id="etGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color={$theme === 'light' ? '#00c400' : '#ff4500'} stop-opacity="0"/>
              <stop offset="50%" stop-color={$theme === 'light' ? '#00ff88' : '#ff8c00'} stop-opacity="0.8"/>
              <stop offset="100%" stop-color={$theme === 'light' ? '#00c400' : '#ff4500'} stop-opacity="0"/>
            </linearGradient>
            <filter id="etGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <!-- E letter - italicized with diagonal cut -->
          <path d="M8,10 L10,6 L25,6 L24,9 L14,9 L13,18 L22,18 L21,21 L12,21 L11,32 L24,32 L23,35 L6,35 Z" 
            fill="url(#etCodeGrad)" filter="url(#etGlow)"/>
          
          <!-- T letter - italicized with diagonal cut -->
          <path d="M28,6 L29,6 L50,6 L49,9 L42,9 L38,35 L34,35 L38,9 L30,9 Z" 
            fill="url(#etCodeGrad)" filter="url(#etGlow)"/>
          
          <!-- Diagonal slash accent cutting through -->
          <line x1="4" y1="38" x2="52" y2="2" stroke="url(#etGlowGrad)" stroke-width="1" stroke-linecap="round">
            <animate attributeName="stroke-dasharray" values="0,100;60,100;0,100" dur="3s" repeatCount="indefinite"/>
          </line>
          
          <!-- Top accent dot -->
          <circle cx="52" cy="4" r="2" fill="url(#etCodeGrad)" opacity="0.6">
            <animate attributeName="r" values="2;2.5;2" dur="2s" repeatCount="indefinite"/>
          </circle>
          
          <!-- Bottom accent dot -->
          <circle cx="4" cy="40" r="2" fill="url(#etCodeGrad)" opacity="0.6">
            <animate attributeName="r" values="2;2.5;2" dur="2s" repeatCount="indefinite" begin="1s"/>
          </circle>
        </svg>
        <b class="text-sm jura tracking-wide sm:hidden">EDDIE T.</b>
      </div>

      <!-- Center Navigation Links (Desktop only) -->
      <div class="hidden md:flex col-span-1 items-center justify-center space-x-3 lg:space-x-6">
        <a href="#section-1" class="nav-link text-xs lg:text-sm jura tracking-wider transition-all duration-300 whitespace-nowrap
          {activeSection === 's1' 
            ? ($theme === 'light' ? 'text-[#00a000] font-bold' : 'text-[#ff6030] font-bold') 
            : ($theme === 'light' ? 'text-gray-600 hover:text-[#00c400]' : 'text-gray-400 hover:text-[#ff4500]')}">HOME</a>
        <a href="#section-2" class="nav-link text-xs lg:text-sm jura tracking-wider transition-all duration-300 whitespace-nowrap
          {activeSection === 's2' 
            ? ($theme === 'light' ? 'text-[#00a000] font-bold' : 'text-[#ff6030] font-bold') 
            : ($theme === 'light' ? 'text-gray-600 hover:text-[#00c400]' : 'text-gray-400 hover:text-[#ff4500]')}">STORY</a>
        <a href="#section-3" class="nav-link text-xs lg:text-sm jura tracking-wider transition-all duration-300 whitespace-nowrap
          {activeSection === 's3' 
            ? ($theme === 'light' ? 'text-[#00a000] font-bold' : 'text-[#ff6030] font-bold') 
            : ($theme === 'light' ? 'text-gray-600 hover:text-[#00c400]' : 'text-gray-400 hover:text-[#ff4500]')}">PROJECTS</a>
        <a href="#section-4" class="nav-link text-xs lg:text-sm jura tracking-wider transition-all duration-300 whitespace-nowrap
          {activeSection === 's4' 
            ? ($theme === 'light' ? 'text-[#00a000] font-bold' : 'text-[#ff6030] font-bold') 
            : ($theme === 'light' ? 'text-gray-600 hover:text-[#00c400]' : 'text-gray-400 hover:text-[#ff4500]')}">CONTACT</a>
      </div>

      <!-- Icons + Dark/Light Toggle -->
      <div class="col-span-1 text-right flex items-center justify-end space-x-1 lg:space-x-3">
        <!-- Github -->
        <a class="nav-icon-link p-1 lg:p-1.5 rounded-full transition-all duration-300 {$theme === 'light' ? 'hover:bg-[#00c40020]' : 'hover:bg-[#ff450020]'}" 
           href="https://github.com/eddietal2" target="_blank" aria-label="Github Link">
          <ion-icon class="text-xl lg:text-2xl xl:text-3xl" name="logo-github"></ion-icon>
        </a>

        <!-- LinkedIn -->
        <a class="nav-icon-link p-1 lg:p-1.5 rounded-full transition-all duration-300 {$theme === 'light' ? 'hover:bg-[#00c40020]' : 'hover:bg-[#ff450020]'}" 
           href="https://www.linkedin.com/in/eddie-taliaferro-ii/" target="_blank" aria-label="LinkedIn Link">
          <ion-icon class="text-xl lg:text-2xl xl:text-3xl" name="logo-linkedin"></ion-icon>
        </a>

        <!-- Contact -->
        <a class="nav-icon-link p-1 lg:p-1.5 rounded-full transition-all duration-300 {$theme === 'light' ? 'hover:bg-[#00c40020]' : 'hover:bg-[#ff450020]'}" 
           href="#section-4" aria-label="Contact Me Link">
          <ion-icon class="text-xl lg:text-2xl xl:text-3xl" name="mail-outline"></ion-icon>
        </a>

        <!-- Divider -->
        <div class="h-5 lg:h-6 w-px {$theme === 'light' ? 'bg-gray-300' : 'bg-gray-600'} hidden md:block"></div>

        <!-- Light/Dark Mode Toggle -->
        <button aria-label="Light/Dark Button"
          type="button"
          class="p-1 lg:p-1.5 rounded-full transition-all duration-300 {$theme === 'light' ? 'hover:bg-[#00c40020]' : 'hover:bg-[#ff450020]'}
            {showThemeTooltip ? 'animate-pulse ring-2 ring-offset-2 ' + ($theme === 'light' ? 'ring-[#00c400] ring-offset-white' : 'ring-[#ff4500] ring-offset-gray-900') : ''}"
          on:click={toggleTheme}>
          {#if $theme === 'light'}
            <ion-icon class="text-xl lg:text-2xl xl:text-3xl text-[#00c400]" name="sunny-sharp"></ion-icon>
          {:else}
            <ion-icon class="text-xl lg:text-2xl xl:text-3xl text-[#ff4500]" name="moon-sharp"></ion-icon>
          {/if}
        </button>

      </div>
    </div>
  </div>
</main>

<!-- Theme Popover - Rendered outside navbar to avoid z-index/overflow issues -->
{#if showThemeTooltip}
  <div class="theme-popover fixed bottom-24 md:top-20 right-4 md:right-[10%] lg:right-[20%] z-[99999]">
    <div class="relative p-5 rounded-2xl shadow-2xl min-w-[240px]
      {$theme === 'light' 
        ? 'bg-white border-2 border-[#00c400]' 
        : 'bg-gray-900 border-2 border-[#ff4500]'}"
      style="box-shadow: 0 25px 50px -12px {$theme === 'light' ? 'rgba(0, 196, 0, 0.4)' : 'rgba(255, 69, 0, 0.4)'};">
      
      <!-- Close button -->
      <button 
        class="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full transition-colors
          {$theme === 'light' ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-100' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-700'}"
        on:click={() => { showThemeTooltip = false; localStorage.setItem('hasSeenThemeTooltip', 'true'); }}
        aria-label="Close tooltip">
        ✕
      </button>
      
      <!-- Icon -->
      <div class="flex justify-center mb-3">
        <div class="w-14 h-14 rounded-full flex items-center justify-center text-3xl
          {$theme === 'light' 
            ? 'bg-gradient-to-br from-[#00c400] to-[#00e000]' 
            : 'bg-gradient-to-br from-[#ff4500] to-[#ff6b35]'}">
          {$theme === 'light' ? '🌙' : '☀️'}
        </div>
      </div>
      
      <!-- Message -->
      <p class="text-center text-lg font-bold mb-2 {$theme === 'light' ? 'text-gray-800' : 'text-white'}">
        ✨ Try {$theme === 'light' ? 'Dark' : 'Light'} Mode!
      </p>
      <p class="text-center text-sm {$theme === 'light' ? 'text-gray-600' : 'text-gray-400'}">
        Click the {$theme === 'light' ? 'sun ☀️' : 'moon 🌙'} icon in the navbar
      </p>
      
      <!-- Arrow pointing to navbar -->
      <div class="flex justify-center mt-3">
        <span class="text-2xl animate-bounce">{$theme === 'light' ? '👆' : '👆'}</span>
      </div>
    </div>
  </div>
{/if}

<style>
  .navbar-container {
    border-bottom: 1px solid rgba(128, 128, 128, 0.1);
  }
  
  .nav-link {
    position: relative;
    transition: all 0.3s ease;
  }
  
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: currentColor;
    transition: width 0.3s ease;
  }
  
  .nav-link:hover::after {
    width: 100%;
  }
  
  .nav-icon-link {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .nav-icon-link:hover {
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    .navbar-container {
      border-top: 1px solid rgba(128, 128, 128, 0.1);
      border-bottom: none;
    }
  }

  /* Theme popover animation */
  .theme-popover {
    animation: popoverSlideIn 0.4s ease-out;
  }

  @keyframes popoverSlideIn {
    0% {
      opacity: 0;
      transform: translateY(15px) scale(0.95);
    }
    50% {
      transform: translateY(-3px) scale(1.02);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
</style>
