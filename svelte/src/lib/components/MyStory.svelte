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

  let slides: HTMLImageElement[] = [];
  let current = 0;

  onMount(() => {
    slides = Array.from(document.querySelectorAll("#section-2 .md\\:block img"));
    slides[current].style.opacity = "1";

    setInterval(() => {
      slides[current].style.opacity = "0";
      current = (current + 1) % slides.length;
      slides[current].style.opacity = "1";
    }, 5000); // 5s per slide
  });
</script>
<main>
  <!-- My Story Section -->
  <div id="section-2" class="relative w-full min-h-screen md:flex {$theme === 'light' ? theme.classes.light.bg : theme.classes.dark.bg}">
    
    <!-- Left Side: Text -->
    <div class="relative z-10 w-full md:w-2/5 p-8 md:rounded-l-lg text-white flex flex-col justify-center {$theme === 'light' ? 'bg-white' : 'bg-black'}">
      <h1 class={$theme === 'light' ? theme.classes.light.header + 'text-4xl jura mb-4' : theme.classes.dark.header + 'text-4xl jura mb-4'}>
        <span class="mr-2">📖</span>
        MY STORY
      </h1>
      <p class="leading-relaxed {$theme === 'light' ? theme.classes.light.text + 'text-sm md:text-xl' : theme.classes.dark.text + 'text-sm md:text-xl'}">
        My passion for video games, anime, and graphic design began at 11, igniting a creative spark. Online forums like Playstation Universe became my playground for crafting custom signatures. This passion led me to pursue web development, fueled by hackathon victories, bootcamps, teaching, and freelance projects since 2017.
        <br><br>
        Giving back has been equally fulfilling. For four years, I taught Detroit's youth to code through Journi, a non-profit. This experience not only helped my students grow but also refined my own skills. It was an honor and an act of love for my city.
      </p>
    </div>

    <!-- Right Side: Carousel -->
    <div class="relative w-full md:w-3/5 overflow-hidden">
      <!-- Gradient overlay from left to right -->
      <div class="absolute inset-0 z-10 pointer-events-none bg-gradient-to-l from-transparent {$theme === 'light' ? 'to-white/100' : 'to-black/100'}"></div>

      <!-- Desktop Carousel -->
      <div class="hidden md:block absolute inset-0 z-0 overflow-hidden">
        {#each [slidePhotoOne, slidePhotoSeven, slidePhotoThree, slidePhotoFour, slidePhotoFive, slidePhotoSix, slidePhotoSeven] as slide}
          <img 
            src={slide} 
            class="absolute w-full h-full object-cover opacity-0 transition-opacity duration-1000 ease-in-out z-0" 
            alt="Slide Photo"
          />
        {/each}
      </div>

      <!-- Mobile Carousel below text -->
      <div class="md:hidden relative w-full mt-6">
        <div id="default-carousel" class="relative w-full" data-carousel="slide">
          <div class="relative h-56 overflow-hidden rounded-lg">
            {#each [slidePhotoOne, slidePhotoTwo, slidePhotoThree, slidePhotoFour, slidePhotoFive, slidePhotoSix, slidePhotoSeven] as slide}
              <div class="hidden duration-700 ease-in-out" data-carousel-item>
                <img src={slide} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover" alt="Slide"/>
              </div>
            {/each}
          </div>
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
  .swiper {
      width: 100%;
      /* height: ; */
    }
  .swiper-wrapper {
      margin: 0em;
  }
  @media (max-width: 600px)  {
      .swiper {
          margin: 3em auto;
          width: 100%
      }
  }

</style>
