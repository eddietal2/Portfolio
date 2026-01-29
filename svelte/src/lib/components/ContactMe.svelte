<script>
  import { theme } from '../stores/light-dark-mode';

</script>
<main>
    <div id="section-4" class="{$theme === 'light' ? theme.classes.light.heroGradient : theme.classes.dark.heroGradient} relative">
      
      <!-- Background Silhouette - Communication/Connection lines focusing toward center form -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <svg class="absolute w-full h-full opacity-[0.20]" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <!-- Gradient definitions -->
          <defs>
            <linearGradient id="contactGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color={$theme === 'light' ? '#00c400' : '#ff4500'}>
                <animate attributeName="stop-color" values={$theme === 'light' ? '#00c400;#00ff88;#00ddaa;#00c400' : '#ff4500;#ff8800;#ffaa44;#ff4500'} dur="5s" repeatCount="indefinite"/>
              </stop>
              <stop offset="50%" stop-color={$theme === 'light' ? '#00ff88' : '#ff8800'}>
                <animate attributeName="stop-color" values={$theme === 'light' ? '#00ff88;#44ffcc;#00ff88' : '#ff8800;#ffcc44;#ff8800'} dur="5s" repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" stop-color={$theme === 'light' ? '#00ddaa' : '#ffaa44'}>
                <animate attributeName="stop-color" values={$theme === 'light' ? '#00ddaa;#00ff88;#00c400;#00ddaa' : '#ffaa44;#ff6622;#ff4500;#ffaa44'} dur="5s" repeatCount="indefinite"/>
              </stop>
            </linearGradient>
            <linearGradient id="contactGrad2" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stop-color={$theme === 'light' ? '#22ffaa' : '#ffcc44'}>
                <animate attributeName="stop-color" values={$theme === 'light' ? '#22ffaa;#00ff66;#22ffaa' : '#ffcc44;#ff9922;#ffcc44'} dur="4s" repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" stop-color={$theme === 'light' ? '#00cc88' : '#ff6633'}>
                <animate attributeName="stop-color" values={$theme === 'light' ? '#00cc88;#00ffaa;#00cc88' : '#ff6633;#ff8844;#ff6633'} dur="4s" repeatCount="indefinite"/>
              </stop>
            </linearGradient>
            <radialGradient id="contactNodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color={$theme === 'light' ? '#00ff88' : '#ffaa44'} stop-opacity="1"/>
              <stop offset="100%" stop-color={$theme === 'light' ? '#00c400' : '#ff4500'} stop-opacity="0"/>
            </radialGradient>
            <filter id="contactGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <!-- Left side converging lines with gradient -->
          <g stroke="url(#contactGrad1)" stroke-width="2" fill="none" filter="url(#softGlow)">
            <path d="M0 100 H150 L300 250 L450 250 H500" stroke-dasharray="800" stroke-dashoffset="800">
              <animate attributeName="stroke-dashoffset" values="800;0" dur="3s" fill="freeze"/>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" begin="3s" repeatCount="indefinite"/>
            </path>
            <path d="M0 300 H100 L250 400 H500" stroke-dasharray="600" stroke-dashoffset="600">
              <animate attributeName="stroke-dashoffset" values="600;0" dur="2.5s" begin="0.5s" fill="freeze"/>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.8s" begin="3s" repeatCount="indefinite"/>
            </path>
            <path d="M0 500 H200 L350 400 H500" stroke-dasharray="700" stroke-dashoffset="700">
              <animate attributeName="stroke-dashoffset" values="700;0" dur="2.8s" begin="1s" fill="freeze"/>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.6s" begin="3s" repeatCount="indefinite"/>
            </path>
            <path d="M0 700 H150 L300 550 L450 550 H500" stroke-dasharray="800" stroke-dashoffset="800">
              <animate attributeName="stroke-dashoffset" values="800;0" dur="3s" begin="1.5s" fill="freeze"/>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3.2s" begin="3s" repeatCount="indefinite"/>
            </path>
          </g>
          
          <!-- Right side converging lines with gradient -->
          <g stroke="url(#contactGrad2)" stroke-width="2" fill="none" filter="url(#softGlow)">
            <path d="M1200 100 H1050 L900 250 L750 250 H700" stroke-dasharray="800" stroke-dashoffset="800">
              <animate attributeName="stroke-dashoffset" values="800;0" dur="3s" begin="0.3s" fill="freeze"/>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.9s" begin="3s" repeatCount="indefinite"/>
            </path>
            <path d="M1200 300 H1100 L950 400 H700" stroke-dasharray="600" stroke-dashoffset="600">
              <animate attributeName="stroke-dashoffset" values="600;0" dur="2.5s" begin="0.8s" fill="freeze"/>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3.1s" begin="3s" repeatCount="indefinite"/>
            </path>
            <path d="M1200 500 H1000 L850 400 H700" stroke-dasharray="700" stroke-dashoffset="700">
              <animate attributeName="stroke-dashoffset" values="700;0" dur="2.8s" begin="1.3s" fill="freeze"/>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.7s" begin="3s" repeatCount="indefinite"/>
            </path>
            <path d="M1200 700 H1050 L900 550 L750 550 H700" stroke-dasharray="800" stroke-dashoffset="800">
              <animate attributeName="stroke-dashoffset" values="800;0" dur="3s" begin="1.8s" fill="freeze"/>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3.3s" begin="3s" repeatCount="indefinite"/>
            </path>
          </g>
          
          <!-- Center form frame with animated gradient -->
          <rect x="480" y="200" width="240" height="400" rx="8" stroke="url(#contactGrad1)" stroke-width="3" fill="none" filter="url(#contactGlow)" opacity="0.6">
            <animate attributeName="stroke-dasharray" values="0 1300;1300 0" dur="4s" fill="freeze"/>
          </rect>
          
          <!-- Glowing connection nodes on left -->
          <g fill="url(#contactNodeGlow)" filter="url(#contactGlow)">
            <circle cx="0" cy="100" r="8">
              <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="0" cy="300" r="8">
              <animate attributeName="r" values="6;10;6" dur="2.3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2.3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="0" cy="500" r="8">
              <animate attributeName="r" values="6;10;6" dur="1.8s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="1.8s" repeatCount="indefinite"/>
            </circle>
            <circle cx="0" cy="700" r="8">
              <animate attributeName="r" values="6;10;6" dur="2.1s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2.1s" repeatCount="indefinite"/>
            </circle>
            
            <!-- Connection nodes on right -->
            <circle cx="1200" cy="100" r="8">
              <animate attributeName="r" values="6;10;6" dur="2.2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2.2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="1200" cy="300" r="8">
              <animate attributeName="r" values="6;10;6" dur="1.9s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="1.9s" repeatCount="indefinite"/>
            </circle>
            <circle cx="1200" cy="500" r="8">
              <animate attributeName="r" values="6;10;6" dur="2.4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2.4s" repeatCount="indefinite"/>
            </circle>
            <circle cx="1200" cy="700" r="8">
              <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
            </circle>
          </g>
          
          <!-- Data flow dots traveling along paths - colorful -->
          <g filter="url(#contactGlow)">
            <circle r="5" fill={$theme === 'light' ? '#00ff88' : '#ffaa44'}>
              <animateMotion dur="3s" repeatCount="indefinite" path="M0 100 H150 L300 250 L450 250 H500"/>
            </circle>
            <circle r="5" fill={$theme === 'light' ? '#44ffcc' : '#ffcc66'}>
              <animateMotion dur="3.5s" repeatCount="indefinite" begin="1s" path="M0 300 H100 L250 400 H500"/>
            </circle>
            <circle r="5" fill={$theme === 'light' ? '#00ffaa' : '#ff8844'}>
              <animateMotion dur="3s" repeatCount="indefinite" begin="2s" path="M0 500 H200 L350 400 H500"/>
            </circle>
            <circle r="5" fill={$theme === 'light' ? '#22ff99' : '#ffbb55'}>
              <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.5s" path="M0 700 H150 L300 550 L450 550 H500"/>
            </circle>
            <!-- Right side data dots -->
            <circle r="5" fill={$theme === 'light' ? '#00ddaa' : '#ff9944'}>
              <animateMotion dur="3s" repeatCount="indefinite" begin="0.3s" path="M1200 100 H1050 L900 250 L750 250 H700"/>
            </circle>
            <circle r="5" fill={$theme === 'light' ? '#33ffbb' : '#ffdd66'}>
              <animateMotion dur="3.5s" repeatCount="indefinite" begin="1.3s" path="M1200 300 H1100 L950 400 H700"/>
            </circle>
            <circle r="5" fill={$theme === 'light' ? '#00ff77' : '#ff7733'}>
              <animateMotion dur="3s" repeatCount="indefinite" begin="2.3s" path="M1200 500 H1000 L850 400 H700"/>
            </circle>
            <circle r="5" fill={$theme === 'light' ? '#44ffaa' : '#ffaa33'}>
              <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.8s" path="M1200 700 H1050 L900 550 L750 550 H700"/>
            </circle>
          </g>
          
          <!-- Colorful decorative lines top and bottom -->
          <g stroke-width="2" fill="none">
            <path d="M400 50 H800" stroke={$theme === 'light' ? '#00ff88' : '#ffaa44'} opacity="0.4">
              <animate attributeName="stroke" values={$theme === 'light' ? '#00ff88;#00cc66;#44ffaa;#00ff88' : '#ffaa44;#ff8822;#ffcc66;#ffaa44'} dur="4s" repeatCount="indefinite"/>
            </path>
            <path d="M400 750 H800" stroke={$theme === 'light' ? '#44ffcc' : '#ff8844'} opacity="0.4">
              <animate attributeName="stroke" values={$theme === 'light' ? '#44ffcc;#00ffaa;#00dd88;#44ffcc' : '#ff8844;#ffbb44;#ff6622;#ff8844'} dur="4s" begin="2s" repeatCount="indefinite"/>
            </path>
          </g>
          
          <!-- Colorful corner accents with glow -->
          <g stroke-width="3" fill="none" filter="url(#softGlow)">
            <path d="M420 80 L420 120 L460 120" stroke={$theme === 'light' ? '#00ff66' : '#ff7744'}>
              <animate attributeName="stroke" values={$theme === 'light' ? '#00ff66;#00dd88;#44ffaa;#00ff66' : '#ff7744;#ffaa44;#ff9922;#ff7744'} dur="3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite"/>
            </path>
            <path d="M780 80 L780 120 L740 120" stroke={$theme === 'light' ? '#22ffaa' : '#ffbb44'}>
              <animate attributeName="stroke" values={$theme === 'light' ? '#22ffaa;#00ff77;#00dd66;#22ffaa' : '#ffbb44;#ff8833;#ffcc55;#ffbb44'} dur="3s" begin="0.75s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" begin="0.75s" repeatCount="indefinite"/>
            </path>
            <path d="M420 720 L420 680 L460 680" stroke={$theme === 'light' ? '#00ffcc' : '#ff9955'}>
              <animate attributeName="stroke" values={$theme === 'light' ? '#00ffcc;#44ff99;#00ffaa;#00ffcc' : '#ff9955;#ffcc44;#ff7722;#ff9955'} dur="3s" begin="1.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" begin="1.5s" repeatCount="indefinite"/>
            </path>
            <path d="M780 720 L780 680 L740 680" stroke={$theme === 'light' ? '#44ff88' : '#ffaa66'}>
              <animate attributeName="stroke" values={$theme === 'light' ? '#44ff88;#00ffbb;#22ff99;#44ff88' : '#ffaa66;#ff7733;#ffbb55;#ffaa66'} dur="3s" begin="2.25s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" begin="2.25s" repeatCount="indefinite"/>
            </path>
          </g>
          
          <!-- Message/envelope silhouettes floating -->
          <g fill="none" stroke={$theme === 'light' ? '#00ff88' : '#ffaa44'} stroke-width="1.5" opacity="0.3">
            <!-- Left envelope -->
            <g transform="translate(80, 200)">
              <rect x="0" y="0" width="40" height="28" rx="2"/>
              <path d="M0 4 L20 18 L40 4"/>
              <animateTransform attributeName="transform" type="translate" values="80,200;80,180;80,200" dur="6s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="6s" repeatCount="indefinite"/>
            </g>
            <!-- Right envelope -->
            <g transform="translate(1080, 580)">
              <rect x="0" y="0" width="40" height="28" rx="2"/>
              <path d="M0 4 L20 18 L40 4"/>
              <animateTransform attributeName="transform" type="translate" values="1080,580;1080,560;1080,580" dur="5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="5s" repeatCount="indefinite"/>
            </g>
          </g>
          
          <!-- Signal/wifi-like waves emanating from center -->
          <g stroke={$theme === 'light' ? '#00ff88' : '#ffaa44'} stroke-width="2" fill="none" opacity="0.25">
            <path d="M560 400 Q520 360 560 320" stroke-dasharray="80">
              <animate attributeName="stroke-dashoffset" values="80;0;-80" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;0.4;0" dur="3s" repeatCount="indefinite"/>
            </path>
            <path d="M640 400 Q680 360 640 320" stroke-dasharray="80">
              <animate attributeName="stroke-dashoffset" values="80;0;-80" dur="3s" begin="0.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;0.4;0" dur="3s" begin="0.5s" repeatCount="indefinite"/>
            </path>
            <path d="M560 400 Q520 440 560 480" stroke-dasharray="80">
              <animate attributeName="stroke-dashoffset" values="80;0;-80" dur="3s" begin="1s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;0.4;0" dur="3s" begin="1s" repeatCount="indefinite"/>
            </path>
            <path d="M640 400 Q680 440 640 480" stroke-dasharray="80">
              <animate attributeName="stroke-dashoffset" values="80;0;-80" dur="3s" begin="1.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;0.4;0" dur="3s" begin="1.5s" repeatCount="indefinite"/>
            </path>
          </g>
          
          <!-- Floating particles around the form -->
          <g fill={$theme === 'light' ? '#00ff88' : '#ffaa44'}>
            {#each [
              {x: 520, y: 250, dur: 4},
              {x: 680, y: 300, dur: 5},
              {x: 490, y: 400, dur: 4.5},
              {x: 710, y: 500, dur: 3.5},
              {x: 550, y: 580, dur: 5.5},
              {x: 650, y: 220, dur: 4.2}
            ] as particle}
              <circle cx={particle.x} cy={particle.y} r="3" opacity="0.5">
                <animate attributeName="cy" values="{particle.y};{particle.y - 30};{particle.y}" dur="{particle.dur}s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="{particle.dur}s" repeatCount="indefinite"/>
              </circle>
            {/each}
          </g>
        </svg>
      </div>
      
      <div class="md:w-4/5 lg:w-3/5 mx-auto py-40 lg:py-0 mb-8 relative z-10">
        <!-- Header -->
        <div class="text-center content-center">
          <!-- Mail Icon SVG -->
          <svg class="w-20 h-20 md:w-24 md:h-24 mx-auto" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Envelope body -->
            <rect x="4" y="14" width="56" height="40" rx="4" fill="{$theme === 'light' ? '#00c400' : '#ff4500'}">
              <animate attributeName="fill-opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite"/>
            </rect>
            <!-- Envelope flap (triangle) -->
            <path d="M4 18l28 18 28-18" stroke="{$theme === 'light' ? '#00a000' : '#cc3700'}" stroke-width="3" fill="none" stroke-linejoin="round">
              <animate attributeName="stroke-opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
            </path>
            <!-- Inner fold lines -->
            <path d="M4 54l20-16" stroke="{$theme === 'light' ? '#00a000' : '#cc3700'}" stroke-width="2" fill="none" opacity="0.5"/>
            <path d="M60 54l-20-16" stroke="{$theme === 'light' ? '#00a000' : '#cc3700'}" stroke-width="2" fill="none" opacity="0.5"/>
            <!-- Letter peeking out -->
            <rect x="14" y="8" width="36" height="24" rx="2" fill="{$theme === 'light' ? '#f5f5f5' : '#e8e8e8'}">
              <animate attributeName="y" values="8;6;8" dur="4s" repeatCount="indefinite"/>
            </rect>
            <!-- Letter lines -->
            <g stroke="{$theme === 'light' ? '#00c400' : '#ff4500'}" stroke-width="2" stroke-linecap="round">
              <line x1="20" y1="16" x2="44" y2="16" opacity="0.6">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/>
              </line>
              <line x1="20" y1="22" x2="38" y2="22" opacity="0.5">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite"/>
              </line>
            </g>
            <!-- Sparkle/notification dot -->
            <circle cx="54" cy="12" r="6" fill="{$theme === 'light' ? '#ff4500' : '#00c400'}">
              <animate attributeName="r" values="5;7;5" dur="1.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite"/>
            </circle>
            <!-- Highlight -->
            <path d="M8 18a4 4 0 0 1 4-4h40" stroke="{$theme === 'light' ? '#00dd00' : '#ff6030'}" stroke-width="2" fill="none" opacity="0.3"/>
          </svg>
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