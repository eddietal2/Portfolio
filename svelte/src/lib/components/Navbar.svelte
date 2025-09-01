<script>
    
  // Icons
  import fireEmoji from './assets/icons/fire.png'
    // #6 Dark / Light Mode
/**
 * Check the user's device to see what their bightness mode is
 */
let brightnessMode = null;
function getBrightnessMode() {
    let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if(isDarkMode === false) {
      brightnessMode = 'LIGHT'
    } else {
      brightnessMode = 'DARK'
    }
    return isDarkMode;
}
function toggleBrightnessMode() {
  if(brightnessMode === 'LIGHT') {
      brightnessMode = 'DARK'
    } else {
      brightnessMode = 'LIGHT'
    }
}
getBrightnessMode();

  /**
   * TailwindCSS Classes
   */
  // Light Mode
  let lightNav = 'backdrop-blur-lg bg-[#fff]/30 h-16 drop-shadow-lg fixed w-full bottom-0 md:top-0 content-center z-50 transition duration-150';
  let lightText = 'text-black transition duration-150';
  let lightHeader = 'text-3xl text-black font-bold transition duration-150';
  let lightBG = 'bg-[#fff] content-center transition duration-150';
  let lightButton = 'bg-[#00000020] text-[#1cb6fc] hover:bg-[#dd0000] hover:text-[#ffd24d] transition duration-1 p-0.5';

  // Dark Mode
  let darkNav = 'backdrop-blur-lg text-white bg-[#000]/70 h-16 drop-shadow-lg fixed w-full bottom-0 md:top-0 content-center z-50 transition duration-150';
  let darkText = 'text-white transition duration-150';
  let darkHeader = 'text-3xl text-white font-bold transition duration-150';
  let darkBG = 'bg-[#222] content-center transition duration-150';
  let darkButton = 'bg-[#ffffff20] text-[#1cb6fc] hover:bg-[#dd0000] hover:text-[#ffd24d] transition duration-1 p-0.5';
</script>

<main>
    
  <!-- Navbar -->
  <div class={brightnessMode === "LIGHT" ? lightNav : darkNav}>
    <div class="md:w-4/5 lg:w-3/5 mx-auto grid grid-cols-2 md:grid-cols-3">
      <div class="col-span-1 content-center">
        <img class="h-4 md:h-7 inline relative bottom-1 ml-3 lg:mr-1 lg:ml-0 " src={fireEmoji} alt="">
        <b class="text-md">
          EDDIE TALIAFERRO II
        </b>
      </div>
      <div class="hidden md:block col-span-1 content-center">
        <!-- Space that goes in between both sides -->
      </div>
      <div class="col-span-1 text-right">
        <!-- Github -->
        <a class="mx-1" href="https://github.com/eddietal2" target="_blank" aria-label="Github Link">
            <ion-icon class="text-3xl p-0.5" name="logo-github" ></ion-icon>
        </a>
        <!-- LinkedIn -->
        <a class="mx-1" href="https://www.linkedin.com/in/eddie-taliaferro-ii/" target="_blank" aria-label="LinkedIn Link">
            <ion-icon class="text-3xl p-0.5" name="logo-linkedin" ></ion-icon>
        </a>
        <!-- Contact Me -->
        <a class="mx-1" href="#section-4"  aria-label="Contact Me Link">
            <ion-icon class="text-3xl p-0.5" name="mail-outline" ></ion-icon>
        </a>
        <!-- Light / Dark Mode -->
        
        <button data-popover-target="popover-default" id="popover-trigger" aria-label="Light/Dark Button" class={brightnessMode === "LIGHT" ? lightText : darkText}  type="button">
          <ion-icon class="text-3xl p-0.5"  name="moon-outline" ></ion-icon>
        </button>

        <div data-popover id="popover-default" role="tooltip" class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
            <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                <h3 class="font-semibold text-gray-900 dark:text-white">Dark / Light Mode</h3>
            </div>
            <div class="px-3 py-2">
                <p class="py-1">You are curretly in <b>{brightnessMode}</b> mode.</p>
                <label class="inline-flex items-center cursor-pointer">
                  <input on:click={toggleBrightnessMode} type="checkbox" value="" class="sr-only peer">
                  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
                </label>
            </div>
            <div data-popper-arrow></div>
        </div>
      </div>
    </div>
  </div>
</main>