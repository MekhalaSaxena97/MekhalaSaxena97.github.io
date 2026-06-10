// js/main.js

document.addEventListener('DOMContentLoaded', () => {
  initSystemsMap();
  initCreatureInteraction();
  initMobileNav();
});

// 1. Interactive Systems Map
function initSystemsMap() {
  const nodes = document.querySelectorAll('.sm-node');
  const detailsCards = document.querySelectorAll('.sm-details');
  const closeBtns = document.querySelectorAll('.sm-close');

  if (!nodes.length) return;

  function closeAllCards() {
    detailsCards.forEach(card => card.classList.remove('active'));
    nodes.forEach(node => node.classList.remove('active'));
  }

  nodes.forEach(node => {
    // Desktop & Mobile tap
    node.addEventListener('click', (e) => {
      e.preventDefault();
      
      // If clicking the currently active node, close it
      if (node.classList.contains('active')) {
        closeAllCards();
        return;
      }
      
      closeAllCards();
      node.classList.add('active');
      const targetId = 'details-' + node.getAttribute('data-node');
      const targetCard = document.getElementById(targetId);
      if (targetCard) targetCard.classList.add('active');
    });
  });

  // Close functionality
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllCards();
    });
  });

  // Removed container mouseleave auto-close to respect the new click interaction
}

// 2. Interactive Creatures (Run Away!)
function initCreatureInteraction() {
  const creatures = document.querySelectorAll('.creature');
  
  creatures.forEach(creature => {
    const svg = creature.querySelector('svg');
    let isRunning = false;

    // Both mouseenter (desktop) and touchstart (mobile)
    const runAway = () => {
      if (isRunning) return;
      isRunning = true;

      // Calculate a short jolt distance (between 60px and 120px in any direction)
      const moveX = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 60 + 60);
      const moveY = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 60 + 60);
      
      // Dart away quickly
      svg.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
      svg.style.transform = `translate(${moveX}px, ${moveY}px)`;
      
      // Slowly drift back to its original wandering path
      setTimeout(() => {
        svg.style.transition = 'transform 3s ease-in-out';
        svg.style.transform = 'translate(0, 0)';
        
        setTimeout(() => {
          isRunning = false;
        }, 3000);
      }, 1000);
    };

    creature.addEventListener('click', runAway);
    creature.addEventListener('touchstart', (e) => {
      runAway();
    });
  });
}

// 2. Mobile Navigation
function initMobileNav() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
      menuBtn.textContent = 'Menu';
      document.body.classList.remove('nav-open');
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = 'var(--bg-card)';
      navLinks.style.padding = '2rem 5vw';
      navLinks.style.borderBottom = '2px solid var(--text)';
      menuBtn.textContent = 'Close';
      document.body.classList.add('nav-open');
    }
  });

  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
        menuBtn.textContent = 'Menu';
        document.body.classList.remove('nav-open');
      }
    });
  });
}
