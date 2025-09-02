<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from '../stores/light-dark-mode';

  let projects = [
    {
      name: "Clensable",
      image: "https://ik.imagekit.io/2ax1lblqa/Slice_1__1_-removebg-preview.png?updatedAt=1732343747682",
      role: "VR Developer",
      type: "Professional",
      badges: ["Fullstack Dev", "2025", "Personal", "Web"],
      link: "https://www.harp-rose.org/",
      text: "VR Enhanced Therapy, powered by Unreal Engine.",
      video: "https://finalbossxr.s3.us-east-1.amazonaws.com/videos/space_rock_2.mp4",
      description: "VR Startup that aims to make therapy more accessible and innovative. I am the lead software developer for this MVP. This is being built with Unreal Engine 5, while I outsource things like 3D Model creation, audio, etc."
    },
    {
      name: "HARP",
      image: "https://ik.imagekit.io/2ax1lblqa/Slice_1__1_-removebg-preview.png?updatedAt=1732343747682",
      role: "VR Developer",
      type: "Professional",
      badges: ["VR Developer", "2025", "Contract", "Meta Quest 2"],
      link: "https://www.harp-rose.org/",
      text: "VR Enhanced Therapy, powered by Unreal Engine.",
      video: "https://finalbossxr.s3.us-east-1.amazonaws.com/videos/space_rock_2.mp4",
      description: "VR Startup that aims to make therapy more accessible and innovative. I am the lead software developer for this MVP. This is being built with Unreal Engine 5, while I outsource things like 3D Model creation, audio, etc."
    },
    {
      name: "J.O.B Lactation",
      image: "https://ik.imagekit.io/2ax1lblqa/Slice_1__1_-removebg-preview.png?updatedAt=1732343747682",
      role: "VR Developer",
      type: "Professional",
      badges: ["VR Developer", "2025", "Contract", "Meta Quest 2"],
      link: "https://www.harp-rose.org/",
      text: "VR Enhanced Therapy, powered by Unreal Engine.",
      video: "https://finalbossxr.s3.us-east-1.amazonaws.com/videos/space_rock_2.mp4",
      description: "VR Startup that aims to make therapy more accessible and innovative. I am the lead software developer for this MVP. This is being built with Unreal Engine 5, while I outsource things like 3D Model creation, audio, etc."
    },
    {
      name: "Crypto Tutors - Defi All Odds",
      image: "https://ik.imagekit.io/2ax1lblqa/ctlogo.png?updatedAt=1732316143920",
      role: "Senior Front End Developer",
      type: "Professional",
      badges: ["Senior Front End Developer", "2024", "Contract", "Web"],
      link: "https://www.defiallodds.xyz/",
      text: "DefiAllOdds, powered by Web3 Education startup CryptoTutors.",
      video: "https://finalbossxr.s3.us-east-1.amazonaws.com/videos/space_rock_2.mp4",
      description: "Crypto Tutors is a leading provider of engaging and accessible Web3 education. Our award-winning curriculum, trusted by Fortune 500 companies and recognized by the National Science Foundation. I built the Defi All Odds assessment with SvelteKit and TailwindCSS. I fell in love with both."
    },
    {
      name: "VOpposition",
      image: "https://ik.imagekit.io/2ax1lblqa/vopposition-logomark-red.png?updatedAt=1732316143809",
      role: "Senior Front End Developer",
      type: "Professional",
      badges: ["Senior Front End Developer", "2024", "Contract", "Web"],
      link: "https://www.vopposition.com/",
      text: "Gamified sports matchmaking, Hybrid App, Web App focus with MVP",
      video: "https://finalbossxr.s3.us-east-1.amazonaws.com/videos/space_rock_2.mp4",
      description: "A matchmaking app for pick up sports, like Basketball, Volleyball, etc, with gamified features. I acted as a Front End Engineer and UX Designer, refining the UX as I translated assets from the Design team to front end code. Built with Angular, Ionic, and TailwindCSS."
    },
    {
      name: "Drone Capital AR Drone Trainer",
      image: "https://ik.imagekit.io/2ax1lblqa/vopposition-logomark-red.png?updatedAt=1732316143809",
      role: "Senior Front End Developer",
      type: "Professional",
      badges: ["AR Developer", "2023", "Personal", "Mobile"],
      link: "https://www.vopposition.com/",
      text: "Gamified sports matchmaking, Hybrid App, Web App focus with MVP",
      video: "https://finalbossxr.s3.us-east-1.amazonaws.com/videos/space_rock_2.mp4",
      description: "A matchmaking app for pick up sports, like Basketball, Volleyball, etc, with gamified features. I acted as a Front End Engineer and UX Designer, refining the UX as I translated assets from the Design team to front end code. Built with Angular, Ionic, and TailwindCSS."
    },
    {
      name: "Taste of Tech MR Car Experience",
      image: "https://ik.imagekit.io/2ax1lblqa/vopposition-logomark-red.png?updatedAt=1732316143809",
      role: "Senior Front End Developer",
      type: "Professional",
      badges: ["MR Developer", "2023", "Contract", "Meta Quest 2"],
      link: "https://www.vopposition.com/",
      text: "Gamified sports matchmaking, Hybrid App, Web App focus with MVP",
      video: "https://finalbossxr.s3.us-east-1.amazonaws.com/videos/space_rock_2.mp4",
      description: "A matchmaking app for pick up sports, like Basketball, Volleyball, etc, with gamified features. I acted as a Front End Engineer and UX Designer, refining the UX as I translated assets from the Design team to front end code. Built with Angular, Ionic, and TailwindCSS."
    },
    {
      name: "Final Boss Studios",
      image: "https://ik.imagekit.io/2ax1lblqa/fbs_logo.png?updatedAt=1732316143932",
      role: "Web Developer",
      type: "Professional",
      badges: ["Full Stack Web Developer", "Co-Founder", "DevOps", "2021-Present"],
      link: "https://www.finalbossxr.com/",
      text: "Video Game Studio focusing on Augmented Reality",
      video: "https://finalbossxr.s3.us-east-1.amazonaws.com/videos/space_rock_2.mp4",
      description: "This is a Video Game & Augmented Reality Studio that I co-founded in 2021. I also act as Web Developer and Game Designer for our team while we build our first IP, Cosmic Collisions. I remade this site with SvelteKit & TailwindCSS"
    }
  ];

  let projectSlides: HTMLDivElement[] = [];
  let currentSlide = 0;

  onMount(() => {
    projectSlides = Array.from(document.querySelectorAll("#projects-carousel [data-carousel-item]"));
    projectSlides[currentSlide].classList.remove("hidden");
  });

  function slide(direction: number) {
    projectSlides[currentSlide].classList.add("hidden");
    currentSlide = (currentSlide + direction + projectSlides.length) % projectSlides.length;
    projectSlides[currentSlide].classList.remove("hidden");
  }
</script>

<main>
  <div id="section-3" class={$theme === 'light' ? theme.classes.light.heroGradient : theme.classes.dark.heroGradient}>
    <!-- Header -->
    <div class="md:w-4/5 lg:w-3/5 p-4 mx-auto lg:mb-4 content-center">
      <h1 class={$theme === 'light' ? theme.classes.light.header + 'text-4xl mb-2 jura' : theme.classes.dark.header + 'text-4xl mb-2 jura'}>
        <span class="h-10 mr-2">💻</span>
        PROJECTS
      </h1>
      <p class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text + ' text-lg lg:text-xl'}>
        Here are some projects (that I can share), ranging from personal projects that I have worked on, or startups I have built MVPs or major features for.
        You can view more of my projects via <a class="text-[#3686fd] pb-0.5 underline" href="https://github.com/eddietal2">Github</a>.
      </p>
    </div>

    <!-- Carousel Controls Top Right -->
    <div class="flex justify-end gap-2 md:w-4/5 lg:w-3/5 mx-auto mb-2">
      <button class={$theme === 'light' ? theme.classes.light.button : theme.classes.dark.button} on:click={() => slide(-1)}>‹ Prev</button>
      <button class={$theme === 'light' ? theme.classes.light.button : theme.classes.dark.button} on:click={() => slide(1)}>Next ›</button>
    </div>

    <!-- Project Carousel -->
    <div id="projects-carousel" class="relative w-full md:w-4/5 lg:w-3/5 mx-auto">
      <div class="relative h-144 md:h-192 overflow-hidden rounded-lg"> <!-- height doubled -->
        {#each projects as project, index}
          <div class="hidden duration-700 ease-in-out p-4 bg-black/20" data-carousel-item>
            <div class="flex flex-col md:flex-row gap-4">

              <!-- Video / Media Area 16:9 -->
              <div class="w-full md:w-1/2 relative aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                <video
                  src={project.video ? project.video : project.image}
                  class="w-full h-full object-cover"
                  controls
                  autoplay={true}
                  loop
                  muted
                  playsinline
                ></video>
              </div>

              <!-- Project Info -->
              <div class="flex flex-col w-full md:w-1/2 gap-3 h-80 overflow-y-auto p-2"> <!-- fixed height -->
                <h2 class={$theme === 'light' ? theme.classes.light.text + ' font-bold text-2xl jura' : theme.classes.dark.text + ' font-bold text-2xl jura'}>
                  {project.name}
                </h2>
              
                <div class="flex gap-2 mt-2">
                  <a href={project.link} target="_blank" class={$theme === 'light' ? theme.classes.light.button : theme.classes.dark.button}>
                    Link
                  </a>
                </div>
              
                <!-- Badges Container -->
                <div class="flex flex-wrap gap-2 mt-2">
                  {#each project.badges as skill}
                    <span class="inline-flex text-xs bg-[#00c40020] border-[#00c400] border-2 px-3 py-1 rounded-full">
                      <span class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}>
                        {skill}
                      </span>
                    </span>
                  {/each}
                </div>

              
                <p class="text-xs md:text-sm {$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}">
                  {project.description}
                </p>
              </div>



            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</main>

<style>
  #section-3 {
    width: 100%;
    height: 100vh;
    scroll-snap-align: start;
  }
  @media (max-width: 1000px) {
    #section-3 {
      scroll-snap-type: none;
      scroll-snap-align: none;
      height: auto;
    }
  }
</style>
