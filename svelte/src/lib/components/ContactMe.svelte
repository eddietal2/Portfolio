<script>
  import { theme } from '../stores/light-dark-mode';

</script>
<main>
    <div id="section-4" class={$theme === 'light' ? theme.classes.light.heroGradient : theme.classes.dark.heroGradient}>
      <div class="md:w-4/5 lg:w-3/5 mx-auto py-40 lg:py-0 mb-8">
        <!-- Header -->
        <div class="text-center content-center">
          <span style="font-size: 5em;" class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}>
            <!-- Mail Icon -->
            📬
          </span>
          <h1 class="jura {$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}" style="margin: 1em; font-size: 2em; font-weight: 600;">CONTACT ME</h1>
        </div>

      <!-- Form -->
      <div class="ion-text-center w-11/12 lg:w-1/2 text-center mx-auto">
          <!-- https://formsubmit.co/ -->
          <!-- https://www.youtube.com/watch?v=iSobU_DjNN4 -->
          <form action="https://formsubmit.co/f6e4bbd318fdd3193043ce91e88f6bfd" method="POST">
              <input class={$theme === 'light' ? theme.classes.light.input : theme.classes.dark.input} type="text" required placeholder="First & Last Name" name="name">
              <input class={$theme === 'light' ? theme.classes.light.input : theme.classes.dark.input} type="text" required placeholder="Email Address" name="email">
              <textarea class={$theme === 'light' ? theme.classes.light.input : theme.classes.dark.input} rows="5" required placeholder="Want to collaborate or have a suggestion?" name="message"></textarea>
              <div class="h-10"></div>
              <button class={$theme === 'light' ? theme.classes.light.button : theme.classes.dark.button} style="padding: 0.5em 2em; font-size: 1.2em;" type="submit">
                  Send Message
              </button>
          </form>
      </div>

      </div>
    </div>
</main>
<style>
  #section-4 {
    width: 100%;
    height: 100vh;
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
</style>