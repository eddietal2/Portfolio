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
  import slidePhotoSeven from '../../assets/photos/insta_2.png'
</script>
<main>
    <!-- My Story -->
      <div id="section-2" class={$theme === 'light' ? theme.classes.light.bg : theme.classes.dark.bg}>
        <div class="md:w-4/5 lg:w-3/5 p-4 mx-auto md:flex flex-row gap-8">
          <!-- Text -->
          <div class="w-11/12 lg:w-2/4 mt-20 md:mt-0">
              <h1 class={$theme === 'light' ? theme.classes.light.header : theme.classes.dark.header}>
                <span class="h-10 mr-2">📖</span>
                MY STORY
              </h1>
              <p style="margin-top: 1em;" class={$theme === 'light' ? theme.classes.light.text : theme.classes.dark.text}>
                My passion for video games, anime, and graphic design began at 11, igniting a creative spark. Online forums like Playstation Universe became my playground for crafting custom signatures. This passion led me to pursue web development, fueled by hackathon victories, bootcamps, teaching, and freelance projects since 2017.
                <br>
                <br>
                Giving back has been equally fulfilling. For four years, I taught Detroit's youth to code through Journi, a non-profit. This experience not only helped my students grow but also refined my own skills. It was an honor and an act of love for my city.
              </p>
          </div>
          <!-- Photo Side -->
          <div class="w-11/12 lg:w-2/4 content-center">
            <div id="default-carousel" class="relative w-full" data-carousel="slide">
  <!-- Carousel wrapper -->
  <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
       <!-- Item 1 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img src={slidePhotoOne} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
      <!-- Item 2 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img src={slidePhotoTwo} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
      <!-- Item 3 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img src={slidePhotoThree} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
      <!-- Item 4 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img src={slidePhotoFour} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
      <!-- Item 5 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img src={slidePhotoFive} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
      <!-- Item 6 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img src={slidePhotoSix} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
      <!-- Item 7 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img src={slidePhotoSeven} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
  </div>
  <!-- Slider indicators -->
  <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
      <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
      <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
      <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
      <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
      <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
  </div>
  <!-- Slider controls -->
  <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
      <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
          </svg>
          <span class="sr-only">Previous</span>
      </span>
  </button>
  <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
      <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg>
          <span class="sr-only">Next</span>
      </span>
  </button>
            </div>
          </div>
        </div>
      </div>
</main>
<style>
  #section-2 {
    width: 100%;
    height: 100vh;
    scroll-snap-align: start;
  }
  @media (max-width: 1000px) {
    #section-2 {
      scroll-snap-type: none;
      scroll-snap-align: none;
      height: auto;
    }
  }
</style>
