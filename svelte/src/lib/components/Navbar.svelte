<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from '../stores/light-dark-mode';

  function toggleTheme() {
    theme.toggle();
  }

  let activeSection = 's1';

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
  });

</script>

<main>
  <div class="{$theme === 'light' ? theme.classes.light.nav : theme.classes.dark.nav} navbar-container">
    <div class="md:w-4/5 lg:w-3/5 mx-auto grid grid-cols-2 md:grid-cols-3 px-2">

      <!-- Logo -->
      <div class="col-span-1 content-center flex items-center">
        <!-- Custom Fire SVG Logo -->
        <svg class="h-6 md:h-8 w-6 md:w-8 inline-block mr-2 ml-2 lg:ml-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C16 2 12 8 12 14C12 16 13 18 14 19C13 17 13 15 14 13C14 13 16 17 16 20C16 17 18 13 18 13C19 15 19 17 18 19C19 18 20 16 20 14C20 8 16 2 16 2Z" 
            fill={$theme === 'light' ? '#00c400' : '#ff4500'}>
            <animate attributeName="d" dur="2s" repeatCount="indefinite"
              values="M16 2C16 2 12 8 12 14C12 16 13 18 14 19C13 17 13 15 14 13C14 13 16 17 16 20C16 17 18 13 18 13C19 15 19 17 18 19C19 18 20 16 20 14C20 8 16 2 16 2Z;
                      M16 3C16 3 11 9 11 15C11 17 12 19 13 20C12 18 12 16 13 14C13 14 16 18 16 21C16 18 19 14 19 14C20 16 20 18 19 20C20 19 21 17 21 15C21 9 16 3 16 3Z;
                      M16 2C16 2 12 8 12 14C12 16 13 18 14 19C13 17 13 15 14 13C14 13 16 17 16 20C16 17 18 13 18 13C19 15 19 17 18 19C19 18 20 16 20 14C20 8 16 2 16 2Z"/>
          </path>
          <path d="M16 10C16 10 14 14 14 17C14 19 15 20 16 21C15 20 15 19 15.5 17.5C15.5 17.5 16 19 16 20.5C16 19 16.5 17.5 16.5 17.5C17 19 17 20 16 21C17 20 18 19 18 17C18 14 16 10 16 10Z" 
            fill={$theme === 'light' ? '#00dd00' : '#ff6030'}>
          </path>
        </svg>
        <b class="text-sm md:text-base jura tracking-wide hidden sm:inline">EDDIE TALIAFERRO II</b>
        <b class="text-sm jura tracking-wide sm:hidden">EDDIE T.</b>
      </div>

      <!-- Center Navigation Links (Desktop only) -->
      <div class="hidden md:flex col-span-1 items-center justify-center space-x-6">
        <a href="#section-1" class="nav-link text-sm jura tracking-wider transition-all duration-300
          {activeSection === 's1' 
            ? ($theme === 'light' ? 'text-[#00a000] font-bold' : 'text-[#ff6030] font-bold') 
            : ($theme === 'light' ? 'text-gray-600 hover:text-[#00c400]' : 'text-gray-400 hover:text-[#ff4500]')}">HOME</a>
        <a href="#section-2" class="nav-link text-sm jura tracking-wider transition-all duration-300
          {activeSection === 's2' 
            ? ($theme === 'light' ? 'text-[#00a000] font-bold' : 'text-[#ff6030] font-bold') 
            : ($theme === 'light' ? 'text-gray-600 hover:text-[#00c400]' : 'text-gray-400 hover:text-[#ff4500]')}">STORY</a>
        <a href="#section-3" class="nav-link text-sm jura tracking-wider transition-all duration-300
          {activeSection === 's3' 
            ? ($theme === 'light' ? 'text-[#00a000] font-bold' : 'text-[#ff6030] font-bold') 
            : ($theme === 'light' ? 'text-gray-600 hover:text-[#00c400]' : 'text-gray-400 hover:text-[#ff4500]')}">PROJECTS</a>
        <a href="#section-4" class="nav-link text-sm jura tracking-wider transition-all duration-300
          {activeSection === 's4' 
            ? ($theme === 'light' ? 'text-[#00a000] font-bold' : 'text-[#ff6030] font-bold') 
            : ($theme === 'light' ? 'text-gray-600 hover:text-[#00c400]' : 'text-gray-400 hover:text-[#ff4500]')}">CONTACT</a>
      </div>

      <!-- Icons + Dark/Light Toggle -->
      <div class="col-span-1 text-right flex items-center justify-end space-x-1 md:space-x-3 mr-2 lg:mr-0">
        <!-- Github -->
        <a class="nav-icon-link p-1.5 rounded-full transition-all duration-300 {$theme === 'light' ? 'hover:bg-[#00c40020]' : 'hover:bg-[#ff450020]'}" 
           href="https://github.com/eddietal2" target="_blank" aria-label="Github Link">
          <ion-icon class="text-2xl md:text-3xl" name="logo-github"></ion-icon>
        </a>

        <!-- LinkedIn -->
        <a class="nav-icon-link p-1.5 rounded-full transition-all duration-300 {$theme === 'light' ? 'hover:bg-[#00c40020]' : 'hover:bg-[#ff450020]'}" 
           href="https://www.linkedin.com/in/eddie-taliaferro-ii/" target="_blank" aria-label="LinkedIn Link">
          <ion-icon class="text-2xl md:text-3xl" name="logo-linkedin"></ion-icon>
        </a>

        <!-- Contact -->
        <a class="nav-icon-link p-1.5 rounded-full transition-all duration-300 {$theme === 'light' ? 'hover:bg-[#00c40020]' : 'hover:bg-[#ff450020]'}" 
           href="#section-4" aria-label="Contact Me Link">
          <ion-icon class="text-2xl md:text-3xl" name="mail-outline"></ion-icon>
        </a>

        <!-- Divider -->
        <div class="h-6 w-px {$theme === 'light' ? 'bg-gray-300' : 'bg-gray-600'} hidden md:block"></div>

        <!-- Light/Dark Mode Toggle -->
        <button aria-label="Light/Dark Button"
          type="button"
          class="p-1.5 rounded-full transition-all duration-300 {$theme === 'light' ? 'hover:bg-[#00c40020]' : 'hover:bg-[#ff450020]'}"
          on:click={toggleTheme}>
          {#if $theme === 'light'}
            <ion-icon class="text-2xl md:text-3xl text-[#00c400]" name="sunny-sharp"></ion-icon>
          {:else}
            <ion-icon class="text-2xl md:text-3xl text-[#ff4500]" name="moon-sharp"></ion-icon>
          {/if}
        </button>

      </div>
    </div>
  </div>
</main>

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
</style>
