<script lang="ts">
  import { theme } from '../stores/light-dark-mode';
  import { onMount } from 'svelte';

  // Carousel images
  import slidePhotoOne from '../../assets/photos/Photo_5.png'
  import slidePhotoTwo from '../../assets/photos/Photo_4.png'
  import slidePhotoThree from '../../assets/photos/Photo_1.png'
  import slidePhotoFour from '../../assets/photos/Photo_2.png'
  import slidePhotoFive from '../../assets/photos/Photo_3.png'
  import slidePhotoSix from '../../assets/photos/insta_1.png'
  import slidePhotoSeven from '../../assets/photos/Photo_6.jpg'

  const photos = [slidePhotoOne, slidePhotoTwo, slidePhotoThree, slidePhotoFour, slidePhotoFive, slidePhotoSix, slidePhotoSeven];
  
  let slides: HTMLImageElement[] = [];
  let current = 0;
  let isVisible = false;
  let activeTab = 0;

  const storyTabs = [
    {
      title: "The Beginning",
      icon: "🎮",
      content: "My passion for video games, anime, and graphic design began at 11, igniting a creative spark. Online forums like Playstation Universe became my playground for crafting custom signatures."
    },
    {
      title: "The Journey",
      icon: "🚀",
      content: "This passion led me to pursue web development, fueled by hackathon victories, bootcamps, teaching, and freelance projects since 2017."
    },
    {
      title: "Giving Back",
      icon: "�",
      content: "For four years, I taught Detroit's youth to code through Journi, a non-profit. This experience not only helped my students grow but also refined my own skills. It was an honor and an act of love for my city."
    }
  ];

  function setActiveTab(index: number) {
    activeTab = index;
  }
  
  onMount(() => {
    // Photos
    slides = Array.from(document.querySelectorAll("#section-2 .photo-slide"));
    if (slides.length > 0) {
      slides[current].style.opacity = "1";
      slides[current].style.transform = "scale(1.05)";
    }

    setInterval(() => {
      if (slides.length > 0) {
        slides[current].style.opacity = "0";
        slides[current].style.transform = "scale(1)";
        current = (current + 1) % slides.length;
        slides[current].style.opacity = "1";
        slides[current].style.transform = "scale(1.05)";
      }
    }, 5000);

    // Scroll reveal animation
    const sectionElement = document.getElementById('section-2');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isVisible = true;
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    });

    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  });
</script>

<main>
  <!-- My Story Section -->
  <div id="section-2" class="relative w-full min-h-screen overflow-hidden {$theme === 'light' ? 'bg-gray-50' : 'bg-gray-950'}">
    
    <!-- Animated background gradient orbs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="orb orb-1 {$theme === 'light' ? 'bg-[#00c400]/20' : 'bg-[#ff4500]/10'}"></div>
      <div class="orb orb-2 {$theme === 'light' ? 'bg-emerald-400/20' : 'bg-orange-500/10'}"></div>
      <div class="orb orb-3 {$theme === 'light' ? 'bg-teal-400/20' : 'bg-amber-500/10'}"></div>
    </div>

    <div class="relative z-10 flex flex-col lg:flex-row min-h-screen">
      
      <!-- Left Side: Content -->
      <div class="w-full lg:w-1/2 p-6 md:p-12 lg:p-16 flex flex-col justify-center">
        
        <!-- Header with animated underline -->
        <div class="mb-8 {isVisible ? 'animate-slide-up' : 'opacity-0'}">
          <span class="text-sm font-mono tracking-widest {$theme === 'light' ? 'text-[#00c400]' : 'text-[#ff4500]'}">
            CHAPTER 01
          </span>
          <div class="flex items-center gap-4 mt-2">
            <!-- Book SVG Illustration -->
            <svg class="w-14 h-14 md:w-16 md:h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Book spine -->
              <rect x="8" y="8" width="8" height="48" rx="2" fill="{$theme === 'light' ? '#1a7a1a' : '#b33000'}">
                <animate attributeName="fill-opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite"/>
              </rect>
              <!-- Book cover back -->
              <path d="M16 8h36a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4H16V8z" fill="{$theme === 'light' ? '#228b22' : '#cc4400'}"/>
              <!-- Book pages (visible from side) -->
              <rect x="14" y="12" width="2" height="40" fill="{$theme === 'light' ? '#f5f5f5' : '#e8e8e8'}"/>
              <!-- Page lines -->
              <g stroke="{$theme === 'light' ? '#1a7a1a' : '#cc4400'}" stroke-width="1.5" stroke-linecap="round">
                <line x1="24" y1="20" x2="48" y2="20" opacity="0.6">
                  <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/>
                </line>
                <line x1="24" y1="28" x2="44" y2="28" opacity="0.5">
                  <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite"/>
                </line>
                <line x1="24" y1="36" x2="46" y2="36" opacity="0.6">
                  <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.2s" repeatCount="indefinite"/>
                </line>
                <line x1="24" y1="44" x2="40" y2="44" opacity="0.5">
                  <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.8s" repeatCount="indefinite"/>
                </line>
              </g>
              <!-- Bookmark ribbon -->
              <path d="M42 8v18l-4-3-4 3V8" fill="{$theme === 'light' ? '#cc4400' : '#228b22'}">
                <animate attributeName="d" values="M42 8v18l-4-3-4 3V8;M42 8v20l-4-3-4 3V8;M42 8v18l-4-3-4 3V8" dur="4s" repeatCount="indefinite"/>
              </path>
              <!-- Book edge highlight -->
              <path d="M56 12v40a4 4 0 0 1-4 4" stroke="{$theme === 'light' ? '#2e8b2e' : '#dd5522'}" stroke-width="2" fill="none" opacity="0.4"/>
              <!-- Sparkle effect -->
              <circle cx="50" cy="16" r="1.5" fill="{$theme === 'light' ? '#2e8b2e' : '#dd5522'}">
                <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="r" values="1;2;1" dur="2s" repeatCount="indefinite"/>
              </circle>
            </svg>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold jura {$theme === 'light' ? 'text-gray-900' : 'text-white'}">
              My Story
            </h1>
          </div>
          <div class="h-1 w-24 bg-gradient-to-r {$theme === 'light' ? 'from-[#00c400] via-emerald-400 to-teal-500' : 'from-[#ff4500] via-orange-400 to-amber-500'} mt-4 rounded-full animated-gradient"></div>
        </div>

        <!-- Interactive Story Tabs -->
        <div class="space-y-6 {isVisible ? 'animate-slide-up-delay' : 'opacity-0'}">
          
          <!-- Tab Navigation -->
          <div class="flex flex-wrap gap-2">
            {#each storyTabs as tab, index}
              <button
                on:click={() => setActiveTab(index)}
                class="tab-button px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  {activeTab === index 
                    ? ($theme === 'light' 
                        ? 'bg-gradient-to-r from-[#00c400] to-emerald-500 text-white shadow-lg shadow-[#00c400]/25'
                        : 'bg-gradient-to-r from-[#ff4500] to-orange-500 text-white shadow-lg shadow-[#ff4500]/25')
                    : $theme === 'light' 
                      ? 'bg-white/80 text-gray-700 hover:bg-white border border-gray-200' 
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }"
              >
                <span class="mr-1">{tab.icon}</span>
                {tab.title}
              </button>
            {/each}
          </div>

          <!-- Tab Content -->
          <div class="story-card p-6 md:p-8 rounded-2xl backdrop-blur-xl transition-all duration-500
            {$theme === 'light' 
              ? 'bg-white/70 border border-gray-200 shadow-xl' 
              : 'bg-white/5 border border-white/10 shadow-2xl shadow-black/20'}">
            
            <div class="flex items-start gap-4">
              <span class="text-4xl">{storyTabs[activeTab].icon}</span>
              <div>
                <h3 class="text-xl font-bold mb-3 {$theme === 'light' ? 'text-gray-900' : 'text-white'}">
                  {storyTabs[activeTab].title}
                </h3>
                <p class="text-base md:text-lg leading-relaxed {$theme === 'light' ? 'text-gray-600' : 'text-gray-300'}">
                  {storyTabs[activeTab].content}
                </p>
              </div>
            </div>

            <!-- Progress dots -->
            <div class="flex justify-center gap-2 mt-6">
              {#each storyTabs as _, index}
                <button
                  on:click={() => setActiveTab(index)}
                  class="w-2 h-2 rounded-full transition-all duration-300 {activeTab === index 
                    ? ($theme === 'light' ? 'w-8 bg-gradient-to-r from-[#00c400] to-emerald-500' : 'w-8 bg-gradient-to-r from-[#ff4500] to-orange-500')
                    : $theme === 'light' ? 'bg-gray-300' : 'bg-gray-600'}"
                  aria-label="Go to tab {index + 1}"
                ></button>
              {/each}
            </div>
          </div>

          <!-- Stats Row -->
          <div class="grid grid-cols-3 gap-4 mt-8">
            {#each [
              { value: '7+', label: 'Years Coding' },
              { value: '4', label: 'Years Teaching' },
              { value: '50+', label: 'Projects' }
            ] as stat, index}
              <div 
                class="stat-card text-center p-4 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105
                  {$theme === 'light' 
                    ? 'bg-white/50 border border-gray-200' 
                    : 'bg-white/5 border border-white/10'}"
                style="animation-delay: {index * 100}ms"
              >
                <div class="text-2xl md:text-3xl font-bold bg-gradient-to-r {$theme === 'light' ? 'from-[#00c400] to-emerald-400' : 'from-[#ff4500] to-orange-400'} bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div class="text-xs md:text-sm mt-1 {$theme === 'light' ? 'text-gray-500' : 'text-gray-400'}">
                  {stat.label}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Right Side: Photo Gallery -->
      <div class="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-screen {isVisible ? 'animate-fade-in' : 'opacity-0'}">
        
        <!-- Gradient overlay - subtle edge blend on desktop, stronger on mobile -->
        <div class="absolute inset-0 z-10 pointer-events-none 
          lg:bg-gradient-to-r lg:from-gray-950/60 lg:via-transparent lg:to-transparent
          bg-gradient-to-t {$theme === 'light' ? 'from-gray-50' : 'from-gray-950'} to-transparent
          {$theme === 'light' ? 'lg:from-gray-50/60' : ''}"></div>

        <!-- Photo slides -->
        <div class="absolute inset-0">
          {#each photos as photo, index}
            <img 
              src={photo} 
              class="photo-slide absolute w-full h-full object-cover opacity-0 transition-all duration-1000 ease-in-out" 
              alt="Eddie's journey photo {index + 1}"
            />
          {/each}
        </div>

        <!-- Floating photo indicators -->
        <div class="absolute bottom-8 right-8 z-20 flex gap-2">
          {#each photos as _, index}
            <div 
              class="w-2 h-2 rounded-full transition-all duration-500 
                {current === index 
                  ? ($theme === 'light' ? 'bg-[#00c400] w-6' : 'bg-[#ff4500] w-6')
                  : 'bg-white/50'}"
            ></div>
          {/each}
        </div>

        <!-- Decorative frame - more subtle -->
        <div class="absolute top-8 right-8 bottom-8 left-8 lg:left-16 border border-white/30 rounded-2xl z-10 pointer-events-none"></div>
      </div>

    </div>
  </div>
</main>

<style>
  #section-2 {
    scroll-snap-align: start;
  }

  @media (max-width: 1000px) {
    #section-2 {
      scroll-snap-type: none;
      scroll-snap-align: none;
    }
  }

  /* Floating orbs */
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    animation: float 20s ease-in-out infinite;
  }

  .orb-1 {
    width: 400px;
    height: 400px;
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }

  .orb-2 {
    width: 300px;
    height: 300px;
    top: 50%;
    right: 20%;
    animation-delay: -5s;
  }

  .orb-3 {
    width: 350px;
    height: 350px;
    bottom: 10%;
    left: 30%;
    animation-delay: -10s;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(30px, -30px) scale(1.1); }
    50% { transform: translate(-20px, 20px) scale(0.9); }
    75% { transform: translate(20px, 30px) scale(1.05); }
  }

  /* Animated gradient line */
  .animated-gradient {
    background-size: 200% 200%;
    animation: gradientShift 3s ease infinite;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* Slide up animations */
  .animate-slide-up {
    animation: slideUp 0.8s ease-out forwards;
  }

  .animate-slide-up-delay {
    animation: slideUp 0.8s ease-out 0.2s forwards;
    opacity: 0;
  }

  .animate-fade-in {
    animation: fadeIn 1s ease-out 0.4s forwards;
    opacity: 0;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Tab button hover effect */
  .tab-button {
    position: relative;
    overflow: hidden;
  }

  .tab-button::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s;
  }

  .tab-button:hover::before {
    transform: translateX(100%);
  }

  /* Story card glow */
  .story-card {
    position: relative;
  }

  .story-card::before {
    content: '';
    position: absolute;
    inset: -1px;
    background: linear-gradient(135deg, rgba(0,196,0,0.3), rgba(16,185,129,0.3), rgba(20,184,166,0.3));
    border-radius: inherit;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .story-card:hover::before {
    opacity: 1;
  }

  /* Stat cards stagger animation */
  .stat-card {
    animation: popIn 0.5s ease-out backwards;
  }

  @keyframes popIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
