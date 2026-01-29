<script lang="ts">
  import { theme } from './lib/stores/light-dark-mode';

  // Components
  import Navbar from './lib/components/Navbar.svelte';
  import MyStory from './lib/components/MyStory.svelte';
  import Projects from './lib/components/Projects.svelte';
  import ContactMe from './lib/components/ContactMe.svelte';
  import Hero from './lib/components/Hero.svelte';
</script>

<main>
  <Navbar />
  <div id="wrapper">
    <section id="section-1" data-current-section="s1">
      <Hero />
    </section>

    <section id="section-2" data-current-section="s2">
      <MyStory />
    </section>

    <section id="section-3" data-current-section="s3">
      <Projects />
    </section>

    <section id="section-4" data-current-section="s4">
      <ContactMe />
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