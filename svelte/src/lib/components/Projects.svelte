<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from '../stores/light-dark-mode';

  // Project categories for filtering
  type CategoryOption = 'Web' | 'Mobile' | 'Python' | 'XR';
  type Category = 'All' | CategoryOption;
  
  let projects = [
    {
      name: "Pivy",
      image: "https://eddie-portfolio.s3.us-east-1.amazonaws.com/logo/pivotal.ai.png",
      role: "Product & Software Developer",
      type: "Professional",
      categories: ["Web", "Mobile"] as CategoryOption[],
      badges: ["NextJS", "Django", "Hybrid", "iOS", "Android", "Capacitor", "2026"],
      link: "https://pivotal-ai-web-app.vercel.app/login",
      text: "AI-Chat & Stock Market analysis web app.",
      video: "https://eddie-portfolio.s3.us-east-1.amazonaws.com/videos/Pivy_Demo_04.mp4",
      description: "AI-Chat & Stock Market analysis web app. I am the lead software developer for this MVP. This is being built with NextJS and Django, and is designed to work on both web and mobile platforms using Capacitor.",
      color: "#10A8C6"
    }, 
    {
      name: "FinalBossXR.com",
      image: "https://eddie-portfolio.s3.us-east-1.amazonaws.com/logo/F_Logo_White.png",
      role: "Web Developer & Designer",
      type: "Professional",
      categories: ["Web"] as CategoryOption[],
      badges: ["SvelteKit", "TailwindCSS", "DevOps", "2021-Present"],
      link: "https://www.finalbossxr.com/",
      text: "Official Website for FinalBossXR.com",
      video: "https://eddie-portfolio.s3.us-east-1.amazonaws.com/videos/FBXR_Portfolio_Video.mp4",
      description: "This is a Video Game & Augmented Reality Studio that I co-founded in 2021. I also act as Web Developer and Game Designer for our team while we build our first IP, Cosmic Collisions. I remade this site with SvelteKit & TailwindCSS",
      color: "#F97316"
    },
    {
      name: "Trading Simulator",
      image: "https://eddie-portfolio.s3.us-east-1.amazonaws.com/logo/python-svgrepo-com.svg",
      role: "Software Developer & Designer",
      type: "Personal",
      categories: ["Python"] as CategoryOption[],
      badges: ["Stock Market", "2026", "Python"],
      link: "https://www.harp-rose.org/",
      text: "iOS/Mobile Augmented Reality Game. Alpha Demo out now. Release date: Summer 2026.",
      video: "https://eddie-portfolio.s3.us-east-1.amazonaws.com/videos/trading_simulator_demo_video.mp4",
      description: "VR Startup that aims to make therapy more accessible and innovative. I am the lead software developer for this MVP. This is being built with Unreal Engine 5, while I outsource things like 3D Model creation, audio, etc.",
      color: "#00c400"
    },
    {
      name: "Red Queen AI",
      image: "https://finalbossxr.s3.us-east-1.amazonaws.com/cosmic/red_queen_icon.png",
      role: "Web Developer & Designer",
      type: "Professional",
      categories: ["Web"] as CategoryOption[],
      badges: ["AI Agent", "LlamaIndex", "Django", "NextJS", "2026"],
      link: "https://www.harp-rose.org/",
      text: "iOS/Mobile Augmented Reality Game. Alpha Demo out now. Release date: Summer 2026.",
      video: "https://finalbossxr.s3.us-east-1.amazonaws.com/videos/Game-trailer-Attempt-3.mp4",
      description: "VR Startup that aims to make therapy more accessible and innovative. I am the lead software developer for this MVP. This is being built with Unreal Engine 5, while I outsource things like 3D Model creation, audio, etc.",
      color: "#EF4444"
    }, 
    {
      name: "Cosmic Collisions",
      image: "https://finalbossxr.s3.us-east-1.amazonaws.com/cosmic/logos/CC_LogoAnimated.gif",
      role: "Game Developer & Designer",
      type: "Professional",
      categories: ["Mobile", "XR"] as CategoryOption[],
      badges: ["Unreal Engine 5", "AR", "2025"],
      link: "https://www.harp-rose.org/",
      text: "iOS/Mobile Augmented Reality Game. Alpha Demo out now. Release date: Summer 2026.",
      video: "https://finalbossxr.s3.us-east-1.amazonaws.com/videos/Game-trailer-Attempt-3.mp4",
      description: "VR Startup that aims to make therapy more accessible and innovative. I am the lead software developer for this MVP. This is being built with Unreal Engine 5, while I outsource things like 3D Model creation, audio, etc.",
      color: "#8B5CF6"
    },
    {
      name: "HARP",
      image: "https://ik.imagekit.io/2ax1lblqa/Slice_1__1_-removebg-preview.png?updatedAt=1732343747682",
      role: "Lead VR Developer",
      type: "Professional",
      categories: ["XR"] as CategoryOption[],
      badges: ["Unreal Engine 5", "Meta Quest 2", "2025"],
      link: "https://www.harp-rose.org/",
      text: "VR Enhanced Therapy, powered by Unreal Engine.",
      video: "https://eddie-portfolio.s3.us-east-1.amazonaws.com/videos/Harp_Demo_01.mp4",
      description: "VR Startup that aims to make therapy more accessible and innovative. I am the lead software developer for this MVP. This is being built with Unreal Engine 5, while I outsource things like 3D Model creation, audio, etc.",
      color: "#EC4899"
    },
    {
      name: "J.O.B Lactation",
      image: "https://eddie-portfolio.s3.us-east-1.amazonaws.com/logo/fire_icon.png",
      role: "VR Developer",
      type: "Professional",
      categories: ["XR"] as CategoryOption[],
      badges: ["Unreal Engine 5", "Meta Quest 2", "2025"],
      link: "https://joblactation.com/",
      text: "VR Healthcare Application",
      video: "https://eddie-portfolio.s3.us-east-1.amazonaws.com/videos/jobl_demo.MP4",
      description: "Healthcare VR application designed to support lactation consultants and new mothers. Built with Unreal Engine 5 for Meta Quest 2, featuring interactive educational experiences.",
      color: "#14B8A6"
    },
    {
      name: "Crypto Tutors - Defi All Odds",
      image: "https://ik.imagekit.io/2ax1lblqa/ctlogo.png?updatedAt=1732316143920",
      role: "Senior Front End Developer",
      type: "Professional",
      categories: ["Web"] as CategoryOption[],
      badges: ["SvelteKit", "TailwindCSS", "Web3", "2024"],
      link: "https://www.defiallodds.xyz/",
      text: "DefiAllOdds, powered by Web3 Education startup CryptoTutors.",
      video: "https://eddie-portfolio.s3.us-east-1.amazonaws.com/videos/defi_all_odds_demo.mov",
      description: "Crypto Tutors is a leading provider of engaging and accessible Web3 education. Our award-winning curriculum, trusted by Fortune 500 companies and recognized by the National Science Foundation. I built the Defi All Odds assessment with SvelteKit and TailwindCSS.",
      color: "#FBBF24"
    },
    {
      name: "VOpposition",
      image: "https://ik.imagekit.io/2ax1lblqa/vopposition-logomark-red.png?updatedAt=1732316143809",
      role: "Senior Front End Developer",
      type: "Professional",
      categories: ["Web", "Mobile"] as CategoryOption[],
      badges: ["Angular", "Ionic", "TailwindCSS", "2024"],
      link: "https://www.vopposition.com/",
      text: "Gamified sports matchmaking, Hybrid App",
      video: "https://eddie-portfolio.s3.us-east-1.amazonaws.com/videos/vo_demo.mov",
      description: "A matchmaking app for pick up sports, like Basketball, Volleyball, etc, with gamified features. I acted as a Front End Engineer and UX Designer, refining the UX as I translated assets from the Design team to front end code.",
      color: "#EF4444"
    },
    {
      name: "Drone Capital AR Trainer",
      image: "https://eddie-portfolio.s3.us-east-1.amazonaws.com/logo/DroneCapLogo.png",
      role: "AR Developer",
      type: "Professional",
      categories: ["XR", "Mobile"] as CategoryOption[],
      badges: ["Unity", "ARKit", "ARCore", "2023"],
      link: "https://dronecapital.com/",
      text: "AR Drone Training Application",
      video: "https://eddie-portfolio.s3.us-east-1.amazonaws.com/videos/DC_Demo_02.mov",
      description: "An augmented reality drone training application that allows users to practice flying drones in a safe, simulated environment before taking to the skies with real hardware.",
      color: "#06B6D4"
    },
    {
      name: "Taste of Tech MR Car",
      image: "https://eddie-portfolio.s3.us-east-1.amazonaws.com/logo/fire_icon.png",
      role: "MR Developer",
      type: "Professional",
      categories: ["XR"] as CategoryOption[],
      badges: ["Unreal Engine 5", "Meta Quest Pro", "2023"],
      link: "https://blackkidsdetroit.org/",
      text: "Mixed Reality Car Experience",
      video: "https://eddie-portfolio.s3.us-east-1.amazonaws.com/videos/mr_car_02.mov",
      description: "A mixed reality automotive experience built for educational purposes, allowing students to explore and interact with vehicle components in an immersive 3D environment.",
      color: "#A855F7"
    }
  ];

  // State
  let selectedCategory: Category = 'All';
  let selectedProject: typeof projects[0] | null = null;
  let isModalOpen = false;
  let hoveredIndex: number | null = null;
  let cardsVisible = false;

  const categories: Category[] = ['All', 'Web', 'Mobile', 'Python', 'XR'];

  $: filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.categories.includes(selectedCategory as CategoryOption));

  onMount(() => {
    // Trigger staggered animation
    setTimeout(() => {
      cardsVisible = true;
    }, 100);
  });

  function openModal(project: typeof projects[0]) {
    selectedProject = project;
    isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    isModalOpen = false;
    selectedProject = null;
    document.body.style.overflow = '';
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && isModalOpen) {
      closeModal();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
  <div id="section-3" class="pb-0 pt-10 min-h-screen {$theme === 'light' ? theme.classes.light.heroGradient : theme.classes.dark.heroGradient}">
    
    <!-- Header Section -->
    <div class="md:w-4/5 lg:w-4/5 xl:w-3/4 p-4 mx-auto">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold jura {$theme === 'light' ? 'text-black' : 'text-white'} flex items-center gap-3">
            <svg class="w-14 h-14 md:w-16 md:h-16 relative top-2" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Laptop Base/Keyboard -->
              <rect x="6" y="40" width="52" height="5" rx="1.5" fill="url(#laptopGradient1)" />
              <!-- Screen Frame -->
              <rect x="8" y="8" width="48" height="32" rx="2" fill="url(#laptopGradient2)" />
              <!-- Screen Inner -->
              <rect x="11" y="11" width="42" height="26" rx="1" fill="#0a0a0f" />
              <!-- Clip for matrix effect -->
              <clipPath id="screenClip">
                <rect x="11" y="11" width="42" height="26" rx="1" />
              </clipPath>
              <!-- Matrix Binary Columns -->
              <g clip-path="url(#screenClip)">
                <!-- Column 1 -->
                <text x="14" y="14" fill="#00ff00" font-family="monospace" font-size="4" opacity="0.9">
                  <tspan x="14" dy="0">1</tspan><tspan x="14" dy="4">0</tspan><tspan x="14" dy="4">1</tspan><tspan x="14" dy="4">1</tspan><tspan x="14" dy="4">0</tspan><tspan x="14" dy="4">1</tspan><tspan x="14" dy="4">0</tspan><tspan x="14" dy="4">0</tspan>
                  <animate attributeName="y" values="14;-18;14" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite" />
                </text>
                <!-- Column 2 -->
                <text x="20" y="8" fill="#00dd00" font-family="monospace" font-size="4" opacity="0.8">
                  <tspan x="20" dy="0">0</tspan><tspan x="20" dy="4">1</tspan><tspan x="20" dy="4">0</tspan><tspan x="20" dy="4">0</tspan><tspan x="20" dy="4">1</tspan><tspan x="20" dy="4">1</tspan><tspan x="20" dy="4">0</tspan><tspan x="20" dy="4">1</tspan>
                  <animate attributeName="y" values="8;-24;8" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.5s" repeatCount="indefinite" />
                </text>
                <!-- Column 3 -->
                <text x="26" y="18" fill="#00ff00" font-family="monospace" font-size="4" opacity="0.7">
                  <tspan x="26" dy="0">1</tspan><tspan x="26" dy="4">1</tspan><tspan x="26" dy="4">0</tspan><tspan x="26" dy="4">1</tspan><tspan x="26" dy="4">0</tspan><tspan x="26" dy="4">0</tspan><tspan x="26" dy="4">1</tspan><tspan x="26" dy="4">0</tspan>
                  <animate attributeName="y" values="18;-14;18" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.8s" repeatCount="indefinite" />
                </text>
                <!-- Column 4 -->
                <text x="32" y="6" fill="#00cc00" font-family="monospace" font-size="4" opacity="0.85">
                  <tspan x="32" dy="0">0</tspan><tspan x="32" dy="4">0</tspan><tspan x="32" dy="4">1</tspan><tspan x="32" dy="4">0</tspan><tspan x="32" dy="4">1</tspan><tspan x="32" dy="4">1</tspan><tspan x="32" dy="4">1</tspan><tspan x="32" dy="4">0</tspan>
                  <animate attributeName="y" values="6;-26;6" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.85;0.35;0.85" dur="3s" repeatCount="indefinite" />
                </text>
                <!-- Column 5 -->
                <text x="38" y="12" fill="#00ff00" font-family="monospace" font-size="4" opacity="0.75">
                  <tspan x="38" dy="0">1</tspan><tspan x="38" dy="4">0</tspan><tspan x="38" dy="4">0</tspan><tspan x="38" dy="4">1</tspan><tspan x="38" dy="4">1</tspan><tspan x="38" dy="4">0</tspan><tspan x="38" dy="4">1</tspan><tspan x="38" dy="4">1</tspan>
                  <animate attributeName="y" values="12;-20;12" dur="2.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.75;0.25;0.75" dur="2.2s" repeatCount="indefinite" />
                </text>
                <!-- Column 6 -->
                <text x="44" y="16" fill="#00ee00" font-family="monospace" font-size="4" opacity="0.8">
                  <tspan x="44" dy="0">0</tspan><tspan x="44" dy="4">1</tspan><tspan x="44" dy="4">1</tspan><tspan x="44" dy="4">0</tspan><tspan x="44" dy="4">0</tspan><tspan x="44" dy="4">1</tspan><tspan x="44" dy="4">0</tspan><tspan x="44" dy="4">1</tspan>
                  <animate attributeName="y" values="16;-16;16" dur="2.7s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.7s" repeatCount="indefinite" />
                </text>
                <!-- Column 7 -->
                <text x="50" y="10" fill="#00dd00" font-family="monospace" font-size="4" opacity="0.7">
                  <tspan x="50" dy="0">1</tspan><tspan x="50" dy="4">1</tspan><tspan x="50" dy="4">0</tspan><tspan x="50" dy="4">0</tspan><tspan x="50" dy="4">1</tspan><tspan x="50" dy="4">0</tspan><tspan x="50" dy="4">1</tspan><tspan x="50" dy="4">1</tspan>
                  <animate attributeName="y" values="10;-22;10" dur="1.9s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.9s" repeatCount="indefinite" />
                </text>
              </g>
              <!-- Screen Glare -->
              <path d="M11 11 L18 11 L11 20 Z" fill="white" opacity="0.08" />
              <!-- Hinge -->
              <rect x="24" y="40" width="16" height="2" rx="1" fill="#1a1a2a" />
              <!-- Keyboard Base Shadow -->
              <ellipse cx="32" cy="48" rx="24" ry="2" fill="black" opacity="0.15" />
              <!-- Gradients -->
              <defs>
                <linearGradient id="laptopGradient1" x1="6" y1="40" x2="58" y2="45" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#3d3d4a" />
                  <stop offset="0.5" stop-color="#5a5a6a" />
                  <stop offset="1" stop-color="#3d3d4a" />
                </linearGradient>
                <linearGradient id="laptopGradient2" x1="8" y1="8" x2="56" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#4a4a5a" />
                  <stop offset="1" stop-color="#2d2d3a" />
                </linearGradient>
              </defs>
            </svg>
            MY PROJECTS
          </h1>
          <p class="mt-3 text-sm md:text-base max-w-2xl {$theme === 'light' ? 'text-gray-600' : 'text-gray-400'}">
            A collection of professional work and passion projects spanning VR/AR, Web, and Mobile development. This portfolio ranges back to 2024. If you want to see more, visit my Github,
            which goes back to 2016, when I first started this journey. I have been a freelance, contract, or entrepreneur within the tech space since then. This even includes 5 years as a tech educator,
            in which some projects on my github were apart of some curriculum I developed for teaching coding to students.
            <br>
            <br>
            <a class="text-[#3686fd] hover:text-[#5a9dfd] underline underline-offset-2 transition-colors" href="https://github.com/eddietal2" target="_blank">View more on Github →</a>
          </p>
        </div>

        <!-- Category Filter Pills -->
        <div class="flex flex-wrap gap-2">
          {#each categories as category}
            <button
              class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105
                {selectedCategory === category 
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/25' 
                  : $theme === 'light' 
                    ? 'bg-white/50 text-gray-700 hover:bg-white/80 border border-gray-200' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'}"
              on:click={() => { selectedCategory = category; cardsVisible = false; setTimeout(() => cardsVisible = true, 50); }}
            >
              {category}
            </button>
          {/each}
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {#each filteredProjects as project, index}
          <button
            class="project-card group relative rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:z-10 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 {$theme === 'light' ? 'focus:ring-offset-white' : 'focus:ring-offset-black'}
              {cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}"
            style="transition-delay: {index * 75}ms; --accent-color: {project.color}"
            on:click={() => openModal(project)}
            on:mouseenter={() => hoveredIndex = index}
            on:mouseleave={() => hoveredIndex = null}
          >
            <!-- Card Background with Gradient Border -->
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent p-[1px]">
              <div class="absolute inset-[1px] rounded-2xl {$theme === 'light' ? 'bg-white/90' : 'bg-black/80'} backdrop-blur-xl"></div>
            </div>

            <!-- Glow Effect on Hover -->
            <div 
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              style="background: radial-gradient(circle at 50% 50%, {project.color}20, transparent 70%)"
            ></div>

            <!-- Card Content -->
            <div class="relative p-5 h-full flex flex-col min-h-[280px]">
              <!-- Top Row: Logo & Category -->
              <div class="flex items-start justify-between mb-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 p-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img src={project.image} class="w-full h-full object-contain" alt={project.name} />
                </div>
                <div class="flex flex-wrap gap-1 justify-end max-w-[60%]">
                  {#each project.categories as cat}
                    <span 
                      class="text-xs font-medium px-2 py-1 rounded-full"
                      style="background: {project.color}20; color: {project.color}"
                    >
                      {cat}
                    </span>
                  {/each}
                </div>
              </div>

              <!-- Project Info -->
              <div class="flex-1">
                <h3 class="text-lg font-bold jura mb-1 {$theme === 'light' ? 'text-gray-900' : 'text-white'} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-pink-500 transition-all duration-300">
                  {project.name}
                </h3>
                <p class="text-xs font-medium mb-3" style="color: {project.color}">{project.role}</p>
                <p class="text-sm leading-relaxed line-clamp-3 {$theme === 'light' ? 'text-gray-600' : 'text-gray-400'}">
                  {project.text}
                </p>
              </div>

              <!-- Tech Stack Pills -->
              <div class="flex flex-wrap gap-1.5 mt-4">
                {#each project.badges.slice(0, 3) as badge}
                  <span class="text-xs px-2 py-1 rounded-md {$theme === 'light' ? 'bg-gray-100 text-gray-600' : 'bg-white/10 text-gray-300'}">
                    {badge}
                  </span>
                {/each}
                {#if project.badges.length > 3}
                  <span class="text-xs px-2 py-1 rounded-md {$theme === 'light' ? 'bg-gray-100 text-gray-500' : 'bg-white/10 text-gray-400'}">
                    +{project.badges.length - 3}
                  </span>
                {/if}
              </div>

              <!-- Hover Indicator -->
              <div class="absolute bottom-5 right-5 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2"
                style="background: {project.color}">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </button>
        {/each}
      </div>

      <!-- Empty State -->
      {#if filteredProjects.length === 0}
        <div class="text-center py-16">
          <p class="{$theme === 'light' ? 'text-gray-500' : 'text-gray-400'}">No projects found in this category.</p>
        </div>
      {/if}
    </div>
  </div>

  <!-- Project Modal -->
  {#if isModalOpen && selectedProject}
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
    <div 
      class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      on:click={closeModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <!-- Backdrop -->
      <button 
        class="absolute inset-0 bg-black/80 backdrop-blur-sm w-full h-full border-none cursor-default"
        on:click={closeModal}
        aria-label="Close modal"
        tabindex="-1"
      ></button>

      <!-- Modal Content -->
      <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
      <div 
        class="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl {$theme === 'light' ? 'bg-white' : 'bg-gray-900'} shadow-2xl"
        on:click|stopPropagation
        role="document"
      >
        <!-- Close Button -->
        <button 
          class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
          on:click={closeModal}
          aria-label="Close project details"
        >
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="flex flex-col lg:flex-row h-full max-h-[90vh]">
          <!-- Video Section -->
          <div class="lg:w-3/5 bg-black flex items-center justify-center">
            <video
              src={selectedProject.video}
              class="w-full h-full object-contain max-h-[50vh] lg:max-h-[90vh]"
              controls
              autoplay
              loop
              muted
              playsinline
            ></video>
          </div>

          <!-- Info Section -->
          <div class="lg:w-2/5 p-6 lg:p-8 overflow-y-auto max-h-[40vh] lg:max-h-[90vh]">
            <!-- Header -->
            <div class="flex items-center gap-4 mb-6">
              <div 
                class="w-16 h-16 rounded-2xl p-3 flex items-center justify-center"
                style="background: {selectedProject.color}20"
              >
                <img src={selectedProject.image} class="w-full h-full object-contain" alt={selectedProject.name} />
              </div>
              <div>
                <h2 id="modal-title" class="text-2xl font-bold jura {$theme === 'light' ? 'text-gray-900' : 'text-white'}">
                  {selectedProject.name}
                </h2>
                <p class="text-sm" style="color: {selectedProject.color}">{selectedProject.role}</p>
              </div>
            </div>

            <!-- Category & Type -->
            <div class="flex flex-wrap gap-2 mb-6">
              {#each selectedProject.categories as cat}
                <span 
                  class="text-xs font-medium px-3 py-1.5 rounded-full"
                  style="background: {selectedProject.color}20; color: {selectedProject.color}"
                >
                  {cat}
                </span>
              {/each}
              <span class="text-xs font-medium px-3 py-1.5 rounded-full {$theme === 'light' ? 'bg-gray-100 text-gray-600' : 'bg-white/10 text-gray-300'}">
                {selectedProject.type}
              </span>
            </div>

            <!-- Description -->
            <p class="text-sm leading-relaxed mb-6 {$theme === 'light' ? 'text-gray-600' : 'text-gray-400'}">
              {selectedProject.description}
            </p>

            <!-- Tech Stack -->
            <div class="mb-6">
              <h3 class="text-xs font-semibold uppercase tracking-wider mb-3 {$theme === 'light' ? 'text-gray-500' : 'text-gray-500'}">
                Tech Stack
              </h3>
              <div class="flex flex-wrap gap-2">
                {#each selectedProject.badges as badge}
                  <span class="text-xs px-3 py-1.5 rounded-lg border {$theme === 'light' ? 'bg-gray-50 border-gray-200 text-gray-700' : 'bg-white/5 border-white/10 text-gray-300'}">
                    {badge}
                  </span>
                {/each}
              </div>
            </div>

            <!-- Action Button -->
            <a 
              href={selectedProject.link} 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style="background: linear-gradient(135deg, {selectedProject.color}, {selectedProject.color}CC); box-shadow: 0 4px 20px {selectedProject.color}40"
            >
              Visit Project
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  {/if}
</main>

<style>
  #section-3 {
    width: 100%;
    min-height: 100vh;
    scroll-snap-align: start;
    padding-bottom: 4rem;
  }

  @media (max-width: 1000px) {
    #section-3 {
      scroll-snap-type: none;
      scroll-snap-align: none;
      height: auto;
    }
  }

  /* Line clamp utility */
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Project card animations */
  .project-card {
    will-change: transform, opacity;
  }

  .project-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 1rem;
    padding: 1px;
    background: linear-gradient(135deg, var(--accent-color, #f97316) 0%, transparent 50%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .project-card:hover::before {
    opacity: 1;
  }

  /* Gradient animation for header */
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .animate-gradientShift {
    animation: gradientShift 12s ease infinite;
    background-size: 400% 400%;
  }

  /* Pulse animation for status dot */
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
  }

  .animate-pulse {
    animation: pulse 2s ease-in-out infinite;
  }

  /* Scrollbar for modal */
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }
</style>