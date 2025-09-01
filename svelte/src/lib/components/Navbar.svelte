<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from '../stores/light-dark-mode';
  import fireEmoji from '../../assets/icons/fire.png';
  import { Popover } from 'flowbite';

  let popoverInstance: Popover;

  
  function setDailyDarkModePopover() {
    const popoverEl = document.getElementById('popover-default');
    const popoverTrigger = document.getElementById('popover-trigger');
    const today = new Date().toLocaleDateString();
    const storageKey = `popoverShownToday-${today}`;
    const hasShownToday = localStorage.getItem(storageKey);
    localStorage.setItem(storageKey, 'true');
    if (!hasShownToday) {
      const popover = new Popover(popoverEl, popoverTrigger);
      popover.show();
      setTimeout(() => popover.hide(), 10000);
    }
  }

  onMount(() => {
    setDailyDarkModePopover()
    
    const popoverEl = document.getElementById('popover-default');
    const popoverTrigger = document.getElementById('popover-trigger');

    if (!popoverEl || !popoverTrigger) return;

    // Initialize Flowbite Popover manually
    popoverInstance = new Popover(popoverEl, popoverTrigger, {
      placement: 'bottom', // where the popover appears
      // remove triggerType
    });

    // manually show/hide
    popoverInstance.show();


    // Show popover once per day
    const today = new Date().toLocaleDateString();
    const storageKey = `popoverShownToday-${today}`;
    const hasShownToday = localStorage.getItem(storageKey);

    if (!hasShownToday) {
      popoverInstance.show();
      setTimeout(() => {
        popoverInstance.hide();
      }, 10000);
      localStorage.setItem(storageKey, 'true');
    }
  });

  function toggleTheme() {
    theme.toggle();
  }
</script>

<main>
  <div class={$theme === 'light' ? theme.classes.light.nav : theme.classes.dark.nav}>
    <div class="md:w-4/5 lg:w-3/5 mx-auto grid grid-cols-2 md:grid-cols-3">

      <!-- Logo -->
      <div class="col-span-1 content-center">
        <img class="h-4 md:h-7 inline relative bottom-1 ml-3 lg:mr-1 lg:ml-0" src={fireEmoji} alt="Fire Emoji">
        <b class="text-md jura">EDDIE TALIAFERRO II</b>
      </div>

      <!-- Empty center column -->
      <div class="hidden md:block col-span-1 content-center"></div>

      <!-- Icons + Dark/Light Toggle -->
      <div class="col-span-1 text-right flex items-center justify-end space-x-2">
        <!-- Github -->
        <a class="mx-1" href="https://github.com/eddietal2" target="_blank" aria-label="Github Link">
          <ion-icon class="text-3xl p-0.5" name="logo-github"></ion-icon>
        </a>

        <!-- LinkedIn -->
        <a class="mx-1" href="https://www.linkedin.com/in/eddie-taliaferro-ii/" target="_blank" aria-label="LinkedIn Link">
          <ion-icon class="text-3xl p-0.5" name="logo-linkedin"></ion-icon>
        </a>

        <!-- Contact -->
        <a class="mx-1" href="#section-4" aria-label="Contact Me Link">
          <ion-icon class="text-3xl p-0.5" name="mail-outline"></ion-icon>
        </a>

        <!-- Light/Dark Mode Toggle -->
        <button id="popover-trigger" aria-label="Light/Dark Button"
          class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}
          type="button"
          on:click={toggleTheme}>
          <ion-icon class="text-3xl p-0.5" name="moon-outline"></ion-icon>
        </button>

        <!-- Popover -->
        <div id="popover-default"
          class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
          <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
            <h3 class="font-semibold text-gray-900 dark:text-white">Dark / Light Mode</h3>
          </div>
          <div class="px-3 py-2">
            <p class="py-1">You are currently in <b>{$theme.toUpperCase()}</b> mode.</p>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer" checked={$theme === 'dark'} on:click={toggleTheme} />
              <div
                class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700
                       peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white
                       after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border
                       after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
              </div>
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
            </label>
          </div>
          <!-- <div data-popper-arrow></div> -->
        </div>

      </div>
    </div>
  </div>
</main>
