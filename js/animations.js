// js/animations.js

// Ensure GSAP is available
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initHeroTyping();
});

function initPreloader() {
  const preloaderText = document.getElementById('preloader-text');
  const preloader = document.getElementById('preloader');
  
  if (!preloader || !preloaderText) return;

  const greetings = [
    "• Hello",
    "• Bonjour",
    "• Hola",
    "• Ciao",
    "• Hallo",
    "• स्वागत हे",
    "• こんにちは",
    "• 안녕하세요",
    "• 您好",
    "• Olá"
  ];

  let tl = gsap.timeline({
    onComplete: () => {
      // Slide preloader out of view
      gsap.to(preloader, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
          document.body.classList.remove('loading');
          preloader.style.display = 'none';
          initGSAPScroll();
        }
      });
    }
  });

  // Rapidly cycle through the languages
  greetings.forEach((greeting, index) => {
    // If it's the last greeting, hold it slightly longer
    const duration = index === greetings.length - 1 ? 0.6 : 0.15;
    
    tl.call(() => {
      preloaderText.textContent = greeting;
    }).to({}, { duration: duration });
  });
}

function initGSAPScroll() {
  // Hero reveal
  gsap.fromTo('.gsap-reveal-title', 
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
  );

  gsap.fromTo('.gsap-reveal', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.3 }
  );

  // General scroll elements
  // const scrollElements = document.querySelectorAll('.gsap-scroll');
  // scrollElements.forEach((el) => {
  //   gsap.fromTo(el, 
  //     { y: 50, opacity: 0 },
  //     {
  //       y: 0, 
  //       opacity: 1,
  //       duration: 0.8,
  //       ease: "power3.out",
  //       scrollTrigger: {
  //         trigger: el,
  //         start: "top 85%",
  //         toggleActions: "play none none reverse"
  //       }
  //     }
  //   );
  // });

  // Principles staggering
  // const principles = document.querySelectorAll('.principle-item');
  // if (principles.length) {
  //   gsap.fromTo(principles, 
  //     { x: -50, opacity: 0 },
  //     {
  //       x: 0,
  //       opacity: 1,
  //       duration: 0.6,
  //       stagger: 0.15,
  //       ease: "power2.out",
  //       scrollTrigger: {
  //         trigger: '.principles-list',
  //         start: "top 80%",
  //       }
  //     }
  //   );
  // }
}

function initHeroTyping() {
  const titleEl = document.querySelector('.hero-title');
  const subEl = document.querySelector('.hero-subtitle');
  if (!titleEl || !subEl) return;

  const heroTexts = [
    { title: "TURNING<br>COMPLEXITY<br>INTO CLARITY.", sub: "I design systems, analytics, and decision frameworks that help organizations move with confidence." },
    { title: "MAKING<br>BETTER<br>DECISIONS.", sub: "I help organizations transform data, processes, and ambiguity into confident action." },
    { title: "FROM<br>CHAOS TO<br>CLARITY.", sub: "Business analysis, analytics, and systems design for teams that need answers, not assumptions." },
    { title: "FINDING<br>SIGNAL IN<br>THE NOISE.", sub: "Designing frameworks that help businesses see what matters most." },
    { title: "WHERE<br>DATA MEETS<br>DIRECTION.", sub: "I bridge business strategy, analytics, and execution to create measurable outcomes." },
    { title: "DESIGNING<br>CLARITY AT<br>SCALE.", sub: "Helping teams navigate complexity through structured thinking and intelligent systems." },
    { title: "TURNING<br>INSIGHT INTO<br>ACTION.", sub: "Business analysis and analytics strategy focused on outcomes, not reports." },
    { title: "MAKING THE<br>COMPLEX<br>OBVIOUS.", sub: "I create systems, processes, and decision frameworks that reduce uncertainty." },
    { title: "CLARITY IS<br>A COMPETITIVE<br>ADVANTAGE.", sub: "I help organizations make faster, smarter, and more confident decisions." },
    { title: "BUILDING<br>SYSTEMS PEOPLE<br>TRUST.", sub: "From requirements to reporting, every decision should have a clear foundation." },
    { title: "LESS<br>GUESSWORK.<br>MORE CONFIDENCE.", sub: "Business analysis and analytics strategy designed to turn uncertainty into momentum." },
    { title: "AMAZE.<br>AMAZE.<br>AMAZE.", sub: "Delivering outcomes that exceed expectations." }
  ];

  let currentIndex = 0;

  function typeHTML(element, htmlString, speed) {
    return new Promise(resolve => {
      element.innerHTML = "";
      const tokens = htmlString.match(/<br>|./g) || [];
      let i = 0;
      function type() {
        if (i < tokens.length) {
          element.innerHTML += tokens[i];
          i++;
          setTimeout(type, speed);
        } else {
          resolve();
        }
      }
      type();
    });
  }

  function backspaceHTML(element, htmlString, speed) {
    return new Promise(resolve => {
      const tokens = htmlString.match(/<br>|./g) || [];
      let i = tokens.length;
      function backspace() {
        if (i > 0) {
          i--;
          element.innerHTML = tokens.slice(0, i).join("");
          setTimeout(backspace, speed);
        } else {
          resolve();
        }
      }
      backspace();
    });
  }

  async function runCycle() {
    const currentText = heroTexts[currentIndex];
    
    // Backspace the current text character by character
    await Promise.all([
      backspaceHTML(titleEl, currentText.title, 30),
      backspaceHTML(subEl, currentText.sub, 10)
    ]);
    
    // Short pause after deleting before typing the next one
    await new Promise(r => setTimeout(r, 400));

    // Move to the next text in the array
    currentIndex = (currentIndex + 1) % heroTexts.length;
    const nextText = heroTexts[currentIndex];

    // Type the next text character by character
    await Promise.all([
      typeHTML(titleEl, nextText.title, 50),
      typeHTML(subEl, nextText.sub, 20)
    ]);

    // Wait a few seconds before backspacing again
    setTimeout(runCycle, 4000);
  }
  
  // Start the loop after the preloader has finished
  setTimeout(runCycle, 4000);
}

// --- Plant Speech Bubble Interaction ---
const plantBtn = document.getElementById('footer-plant');
const speechBubble = document.getElementById('plant-speech-bubble');

if (plantBtn && speechBubble) {
  const quotes = [
    "I run on sunshine, water, and good sustainability choices!",
    "Reduce, reuse, regrow—that’s my kind of lifestyle.",
    "Every sustainable choice helps me grow a little happier.",
    "Don’t leaf the planet worse than you found it!",
    "Be-leaf in a greener future."
  ];
  
  let currentQuoteIndex = 0;
  let bubbleTimeout;

  plantBtn.addEventListener('click', () => {
    clearTimeout(bubbleTimeout);
    speechBubble.textContent = quotes[currentQuoteIndex];
    speechBubble.classList.add('active');
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    
    bubbleTimeout = setTimeout(() => {
      speechBubble.classList.remove('active');
    }, 4000);
    
    // Trigger jump animation
    const svgEl = plantBtn.querySelector('svg');
    if (svgEl) {
      svgEl.classList.remove('plant-excited');
      void svgEl.offsetWidth; // force reflow
      svgEl.classList.add('plant-excited');
    }
  });
}
