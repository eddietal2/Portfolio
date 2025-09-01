<script>
  import { theme } from '../stores/light-dark-mode';
  let projects = [
    {
      name: "HARP",
      image: "https://ik.imagekit.io/2ax1lblqa/Slice_1__1_-removebg-preview.png?updatedAt=1732343747682",
      role: "VR Developer",
      type: "Professional",
      link: "https://www.harp-rose.org/",
      text: "VR Enhanced Therapy, powered by Unreal Engine.",
      description: "VR Startup that aims to make therapy more accessible and innovative. I am the lead software developer for this MVP. This is being built with Unreal Engine 5, while I outsource things like 3D Model creation, audio, etc."
    },
    {
      name: "Crypto Tutors",
      image: "https://ik.imagekit.io/2ax1lblqa/ctlogo.png?updatedAt=1732316143920",
      role: "Senior Front End Developer",
      type: "Professional",
      link: "https://www.defiallodds.xyz/",
      text: "DefiAllOdds, powered by Web3 Education startup CryptoTutors.",
      description: "Crypto Tutors is a leading provider of engaging and accessible Web3 education. Our award-winning curriculum, trusted by Fortune 500 companies and recognized by the National Science Foundation. I built the Defi All Odds assessment with SvelteKit and TailwindCSS. I fell in love with both."
    },
    {
      name: "VOpposition",
      image: "https://ik.imagekit.io/2ax1lblqa/vopposition-logomark-red.png?updatedAt=1732316143809",
      role: "Senior Front End Developer",
      type: "Professional",
      link: "https://www.vopposition.com/",
      text: "Gamified sports matchmaking, Hybrid App, Web App focus with MVP",
      description: "A matchmaking app for pick up sports, like Basketball, Volleyball, etc, with gamified features. I acted as a Front End Engineer and UX Designer, refining the UX as I translated assets from the Design team to front end code. Built with Angular, Ionic, and TailwindCSS."
    },
    {
      name: "Final Boss Studios",
      image: "https://ik.imagekit.io/2ax1lblqa/fbs_logo.png?updatedAt=1732316143932",
      role: "Web Developer / Co-Founder",
      type: "Professional",
      link: "https://www.finalbossxr.com/",
      text: "Video Game Studio focusing on Augmented Reality",
      description: "This is a Video Game & Augmented Reality Studio that I co-founded in 2021. I also act as Web Developer and Game Designer for our team while we build our first IP, Cosmic Collisions. I remade this site with SvelteKit & TailwindCSS"
    }
  ];
</script>

<main>
    <div id="section-3" class={$theme === 'light' ? theme.classes.light.bg : theme.classes.dark.bg}>
        <!-- Header -->
        <div class="md:w-4/5 lg:w-3/5 p-4 mx-auto lg:mb-4 content-center">
          <h1 class={$theme === 'light' ? theme.classes.light.header : theme.classes.dark.header}>
            <span class="h-10 mr-2">💻</span>
            PROJECTS
          </h1>
         <span class="text-lg lg:text-xl">
          <p class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}>
            Here are some projects (that I can share), ranging from personal projects that I have worked on, or startups I have built MVPs or major features for.
            You can view more of my projects via <a class="text-[#3686fd] pb-0.5 underline" href="https://github.com/eddietal2">Github</a>.
          </p>
         </span>
        </div>
        <!-- Project -->
        <div class="md:w-4/5 lg:w-3/5 p-4 gap-8 mx-auto lg:grid grid-cols-2">
          {#each projects as project, index}
            <div class="flex flex-row gap-2  p-2 my-2 lg:my-0">
              <!-- Project Image -->
              <img src={project.image} class="h-12" alt="Project Logo">
              <div class="content-center">
                <!-- Project Card Text -->
                <span class="text-xs">
                  <p class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}>{project.name}</p>
                </span>
                <span class="text-xs">
                  <p class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}>{project.role} / 2023 - 2024</p>
                </span>
                <p style="font-size: 1.2em;" class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}>
                  {project.text}
                </p>
                <!-- Link & Description Buttons -->
                <span class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}>
                  <button class={$theme === 'light' ? theme.classes.light.button : theme.classes.dark.button}>
                    <a href={project.link} target="_blank">Link</a>
                  </button>
                  <button data-popover-target="popover-description-{index}" type="button" class={$theme === 'light' ? theme.classes.light.button : theme.classes.dark.button}>Description</button>
                  <div data-popover id="popover-description-{index}" role="tooltip" class="absolute z-10 invisible inline-block w-96 text-sm transition-opacity duration-300 border border-gray-200 rounded-lg shadow-sm opacity-0">
                    <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                        <h3 class="font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                    </div>
                    <div class={$theme === 'light' ? theme.classes.light.bg : theme.classes.dark.bg} style="padding: 1em;">
                        <p class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}>{project.description}</p>
                    </div>
                  </div>
                </span>
              </div>
            </div>
          {/each }
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