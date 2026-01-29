<script>
  import { theme } from '../stores/light-dark-mode';

</script>
<main>
    <div id="section-4" class="{$theme === 'light' ? theme.classes.light.heroGradient : theme.classes.dark.heroGradient} relative">
      
      <!-- Background Silhouette - Communication/Connection lines focusing toward center form -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <svg class="absolute w-full h-full opacity-[0.08]" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <g stroke={$theme === 'light' ? '#00c400' : '#ff4500'} stroke-width="1.5" fill="none">
            <!-- Left side - lines converging toward center -->
            <path d="M0 100 H150 L300 250 L450 250 H500">
              <animate attributeName="stroke-dasharray" values="0 800;800 0" dur="6s" repeatCount="indefinite"/>
            </path>
            <path d="M0 300 H100 L250 400 H500">
              <animate attributeName="stroke-dasharray" values="0 600;600 0" dur="5s" repeatCount="indefinite" begin="0.5s"/>
            </path>
            <path d="M0 500 H200 L350 400 H500">
              <animate attributeName="stroke-dasharray" values="0 700;700 0" dur="5.5s" repeatCount="indefinite" begin="1s"/>
            </path>
            <path d="M0 700 H150 L300 550 L450 550 H500">
              <animate attributeName="stroke-dasharray" values="0 800;800 0" dur="6s" repeatCount="indefinite" begin="1.5s"/>
            </path>
            
            <!-- Right side - lines converging toward center -->
            <path d="M1200 100 H1050 L900 250 L750 250 H700">
              <animate attributeName="stroke-dasharray" values="0 800;800 0" dur="6s" repeatCount="indefinite" begin="0.3s"/>
            </path>
            <path d="M1200 300 H1100 L950 400 H700">
              <animate attributeName="stroke-dasharray" values="0 600;600 0" dur="5s" repeatCount="indefinite" begin="0.8s"/>
            </path>
            <path d="M1200 500 H1000 L850 400 H700">
              <animate attributeName="stroke-dasharray" values="0 700;700 0" dur="5.5s" repeatCount="indefinite" begin="1.3s"/>
            </path>
            <path d="M1200 700 H1050 L900 550 L750 550 H700">
              <animate attributeName="stroke-dasharray" values="0 800;800 0" dur="6s" repeatCount="indefinite" begin="1.8s"/>
            </path>
            
            <!-- Center form frame outline -->
            <rect x="480" y="200" width="240" height="400" rx="8" stroke-width="2" opacity="0.5">
              <animate attributeName="stroke-dasharray" values="0 1300;1300 0" dur="4s" fill="freeze"/>
            </rect>
            
            <!-- Connection nodes on left -->
            <circle cx="0" cy="100" r="4" fill={$theme === 'light' ? '#00c400' : '#ff4500'}/>
            <circle cx="0" cy="300" r="4" fill={$theme === 'light' ? '#00c400' : '#ff4500'}/>
            <circle cx="0" cy="500" r="4" fill={$theme === 'light' ? '#00c400' : '#ff4500'}/>
            <circle cx="0" cy="700" r="4" fill={$theme === 'light' ? '#00c400' : '#ff4500'}/>
            
            <!-- Connection nodes on right -->
            <circle cx="1200" cy="100" r="4" fill={$theme === 'light' ? '#00c400' : '#ff4500'}/>
            <circle cx="1200" cy="300" r="4" fill={$theme === 'light' ? '#00c400' : '#ff4500'}/>
            <circle cx="1200" cy="500" r="4" fill={$theme === 'light' ? '#00c400' : '#ff4500'}/>
            <circle cx="1200" cy="700" r="4" fill={$theme === 'light' ? '#00c400' : '#ff4500'}/>
            
            <!-- Data flow dots traveling along paths -->
            <circle r="3" fill={$theme === 'light' ? '#00ff88' : '#ff8c00'}>
              <animateMotion dur="4s" repeatCount="indefinite" path="M0 300 H100 L250 400 H500"/>
            </circle>
            <circle r="3" fill={$theme === 'light' ? '#00ff88' : '#ff8c00'}>
              <animateMotion dur="4s" repeatCount="indefinite" begin="2s" path="M1200 500 H1000 L850 400 H700"/>
            </circle>
            
            <!-- Top and bottom decorative lines -->
            <path d="M400 50 H800" stroke-width="1" opacity="0.3"/>
            <path d="M400 750 H800" stroke-width="1" opacity="0.3"/>
            
            <!-- Corner accents -->
            <path d="M420 80 L420 120 L460 120" stroke-width="2" opacity="0.4"/>
            <path d="M780 80 L780 120 L740 120" stroke-width="2" opacity="0.4"/>
            <path d="M420 720 L420 680 L460 680" stroke-width="2" opacity="0.4"/>
            <path d="M780 720 L780 680 L740 680" stroke-width="2" opacity="0.4"/>
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