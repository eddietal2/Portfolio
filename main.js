/**
 * Table of Contents
 * - #1 Snap Scroll Behavior Desktop
 * - #2 Swiper JS implementation for Picture Slides in 'My Story'
 * - #3 Landing Header SVG Animation 
 * - #4 Scroll to Contact Section via hitting Contact Us Icon in Navbar
 * - #5 Generate Projects UI
 * - #6 
 */

// #1 Snap Scroll Behavior Desktop
const options = {
    root: document.getElementById('wrapper'), // Use a specific container as the viewport
    threshold: [0.25], // Trigger at 25% and 75% visibility
};
function updateNavbar(activeSection) {
    const navBullets = document.querySelectorAll('.nav-bullet');
    navBullets.forEach((bullet) => {
        console.log(bullet);
        bullet.classList.remove('current');
        if (bullet.dataset.currentSection === activeSection) {
            bullet.classList.add('current');
        }
    });
    // Add any additional navbar updates here (e.g., change background color)
}
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const activeSection = entry.target.dataset.currentSection;
            console.log(activeSection);
            updateNavbar(activeSection);
        }
    });
}, options);
const ionRows = document.querySelectorAll('section');
ionRows.forEach((row) => {
    observer.observe(row);
});

// #2 Swiper JS implementation for Picture Slides in 'My Story'
const swiper = new Swiper('.swiper', {
    // Optional parameters
    speed: 300,
    autoplay: true,
    direction: 'horizontal',
    loop: true,
    effect: 'fade',
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
    //   el: '.swiper-scrollbar',
    },
});
swiper.init();

// #3 Landing Header SVG Animation 
fetch('assets/icons/header-pic-svg.svg')
.then(response => response.text())
.then(svgContent => {
        // Process the SVG content
        // https://g.co/bard/share/ec7f38615b0c
        const svgContainer = document.getElementById('header-pic');
        // svgContainer.style.width = "50%";
        svgContainer.innerHTML = svgContent;
        console.log(svgContainer.firstElementChild.childNodes)
        const lineOne = svgContainer.firstElementChild.childNodes[7];
        const lineTwo = svgContainer.firstElementChild.childNodes[5];
        const lineThree = svgContainer.firstElementChild.childNodes[3];
        const lineFour = svgContainer.firstElementChild.childNodes[1];
        
        setInterval(() => {
            lineOneAnim();
            lineTwoAnim();
            lineThreeAnim();
            lineFourAnim();
        }, 1600);
        
        function lineOneAnim() {
            setTimeout(() => {
                lineOne.style.fill = '#0ff131';
            }, 200);
            setTimeout(() => {
                lineOne.style.fill = '#888';
            }, 900);
        }
        function lineTwoAnim() {
            setTimeout(() => {
                lineTwo.style.fill = '#650087';
            }, 400);
            setTimeout(() => {
                lineTwo.style.fill = '#666';
            }, 1000);
        }
        function lineThreeAnim() {
            setTimeout(() => {
                lineThree.style.fill = '#0ff131';
            }, 600);
            setTimeout(() => {
                lineThree.style.fill = '#444';
            }, 1100);
        }
        function lineFourAnim() {
            setTimeout(() => {
                lineFour.style.fill = '#650087';
            }, 800);
            setTimeout(() => {
                lineFour.style.fill = '#222';
            }, 1200);
        }

        lineOne.style.transition = '0.5s';
        lineTwo.style.transition = '0.5s';
        lineThree.style.transition = '0.5s';
        lineFour.style.transition = '0.5s';
});

// #4 Scroll to Contact Section via hitting Contact Us Icon in Navbar
const contactButton = document.getElementById('contact-btn');
contactButton.addEventListener('click', goToContact);
function goToContact() {
    console.log('Going to Contact Section');
    const contactSection = document.getElementById('section-4');
    contactSection.scrollIntoView({ behavior: 'smooth' });
}

// #5 Generate Projects UI
var projects = null;
fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        console.log('Getting Projects:');
        this.projects = data;
        console.log(projects);
        let projectsList = document.getElementById('projects-list');
        this.projects.forEach(item => {
            console.log(item);
            
            // const hOne = document.createElement('h1');
            // hOne.textContent = item;
            // projectsList.appendChild(hOne);
          });
    })