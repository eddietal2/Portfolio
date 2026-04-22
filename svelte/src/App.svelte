<script lang="ts">
  import Navbar from './lib/components/Navbar.svelte';
  import Hero from './lib/components/Hero.svelte';
  import type { ComponentType } from 'svelte';
  import { onMount } from 'svelte';

  let MyStory: ComponentType | null = null;
  let Projects: ComponentType | null = null;
  let ContactMe: ComponentType | null = null;

  onMount(async () => {
    const [myStoryModule, projectsModule, contactModule] = await Promise.all([
      import('./lib/components/MyStory.svelte'),
      import('./lib/components/Projects.svelte'),
      import('./lib/components/ContactMe.svelte')
    ]);

    MyStory = myStoryModule.default;
    Projects = projectsModule.default;
    ContactMe = contactModule.default;
  });
</script>

<main>
  <Navbar />
  <div id="wrapper">
    <section id="section-1" data-current-section="s1">
      <Hero />
    </section>

    <section id="section-2" data-current-section="s2">
      {#if MyStory}
        <svelte:component this={MyStory} />
      {:else}
        <div class="section-loading min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
          Loading story section…
        </div>
      {/if}
    </section>

    <section id="section-3" data-current-section="s3">
      {#if Projects}
        <svelte:component this={Projects} />
      {:else}
        <div class="section-loading min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
          Loading projects…
        </div>
      {/if}
    </section>

    <section id="section-4" data-current-section="s4">
      {#if ContactMe}
        <svelte:component this={ContactMe} />
      {:else}
        <div class="section-loading min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
          Loading contact section…
        </div>
      {/if}
    </section>
  </div>
</main>
<style>
  /* Wrapper for scrolling sections */
  #wrapper {
      width: 100%;
      height: 100vh;
      overflow-y: scroll;
  }
</style>