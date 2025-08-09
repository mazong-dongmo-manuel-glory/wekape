// Navigation fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Menu mobile - Gestion du hamburger
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.className = 'fas fa-times';
    } else {
      icon.className = 'fas fa-bars';
    }
  });

  // Fermer le menu au clic sur un lien
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.querySelector('i').className = 'fas fa-bars';
    });
  });

  // Fermer le menu si on clique en dehors
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      hamburger.querySelector('i').className = 'fas fa-bars';
    }
  });
}

// Animation au scroll avec intersection observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observer tous les éléments animables
document.querySelectorAll('.work-card, .highlight-card, .book-display').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

// Navigation sticky avec effet amélioré
let lastScrollTop = 0;
const nav = document.querySelector('.nav');
let ticking = false;

function updateNav() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scroll vers le bas
    nav.style.transform = 'translateY(-100%)';
  } else {
    // Scroll vers le haut
    nav.style.transform = 'translateY(0)';
  }

  // Effet de transparence et ombre
  if (scrollTop > 50) {
    nav.style.background = 'rgba(255,255,255,0.98)';
    nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
  } else {
    nav.style.background = 'rgba(255,255,255,0.95)';
    nav.style.boxShadow = 'none';
  }

  lastScrollTop = scrollTop;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateNav);
    ticking = true;
  }
});

// Création des particules pour le hero
function createParticles() {
  const particlesContainer = document.querySelector('.particles');
  if (!particlesContainer) return;

  // Nettoyer les particules existantes
  particlesContainer.innerHTML = '';

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(255,255,255,0.3);
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
      animation-delay: ${Math.random() * 2}s;
      z-index: 1;
    `;
    particlesContainer.appendChild(particle);
  }
}

// Initialiser les particules
createParticles();

// Gestion du formulaire de contact avec validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validation simple
    const name = this.querySelector('#name').value.trim();
    const email = this.querySelector('#email').value.trim();
    const subject = this.querySelector('#subject').value.trim();
    const message = this.querySelector('#message').value.trim();

    if (!name || !email || !subject || !message) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Veuillez entrer une adresse email valide.');
      return;
    }

    // Animation de soumission
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitBtn.disabled = true;

    // Simulation d'envoi (remplacer par vraie logique)
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
      submitBtn.style.background = '#28a745';

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        this.reset();
      }, 2000);
    }, 2000);
  });
}

// Effet parallaxe léger et optimisé
let parallaxTicking = false;
function updateParallax() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
  parallaxTicking = false;
}

window.addEventListener('scroll', () => {
  if (!parallaxTicking) {
    requestAnimationFrame(updateParallax);
    parallaxTicking = true;
  }
});

// Lazy loading pour les images futures
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Initialiser le lazy loading
lazyLoadImages();

// Gestion des erreurs globales
window.addEventListener('error', function(e) {
  console.log('Erreur capturée:', e.error);
});

// Performance: Débounce pour le resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Recréer les particules en cas de redimensionnement
    createParticles();
  }, 250);
});

// Amélioration de l'accessibilité
document.addEventListener('keydown', (e) => {
  // Fermer le menu mobile avec Escape
  if (e.key === 'Escape') {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    if (navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      if (hamburger) {
        hamburger.querySelector('i').className = 'fas fa-bars';
      }
    }
  }
});

// Focus management pour le menu mobile
const navLinksElements = document.querySelectorAll('.nav-links a');
navLinksElements.forEach((link, index) => {
  link.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % navLinksElements.length;
      navLinksElements[nextIndex].focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = index === 0 ? navLinksElements.length - 1 : index - 1;
      navLinksElements[prevIndex].focus();
    }
  });
});

// Effet de typing pour le titre (optionnel)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Animation d'apparition progressive des éléments
function animateOnScroll() {
  const elements = document.querySelectorAll('.work-card, .highlight-card, .bio-text');

  elements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 200);
  });
}

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
  // Toutes les initialisations sont déjà faites ci-dessus
  console.log('Site Lottin Wekape chargé avec succès');
});

// Fonction utilitaire pour débouncer les événements
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Application du débounce au scroll pour optimiser les performances
const debouncedScroll = debounce(() => {
  updateNav();
  updateParallax();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// === Carousel (Galerie) ===
(function () {
  const track = document.querySelector(".carousel .carousel-track");
  if (!track) return;

  // Create slides dynamically for 1.jpeg .. 28.jpeg at project root
  const total = 28;
  const sources = Array.from({ length: total }, (_, i) => `img/${i + 1}.jpeg`);

  // Build DOM
  sources.forEach((src, idx) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    const img = document.createElement("img");
    img.loading = "lazy";
    img.alt = `Image ${idx + 1}`;
    img.src = src;
    slide.appendChild(img);
    track.appendChild(slide);
  });

  const slides = Array.from(track.children);
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const dotsWrap = document.querySelector(".carousel-dots");

  // Dots
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Aller à l'image ${i + 1}`);
    dot.setAttribute("role", "tab");
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  let index = 0;
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let lastTranslate = 0;
  let autoTimer;

  function update() {
    const width = track.clientWidth;
    const translateX = -index * width;
    track.style.transition = "transform 500ms ease";
    track.style.transform = `translateX(${translateX}px)`;
    lastTranslate = translateX;

    dots.forEach((d, i) => d.setAttribute("aria-selected", i === index ? "true" : "false"));
  }

  function next() {
    index = (index + 1) % slides.length;
    update();
  }

  function prev() {
    index = (index - 1 + slides.length) % slides.length;
    update();
  }

  function jumpTo(i) {
    index = Math.max(0, Math.min(i, slides.length - 1));
    update();
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(next, 3500);
  }
  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  // Resize handling
  window.addEventListener("resize", () => {
    // Remove transition for instant layout update
    track.style.transition = "none";
    const width = track.clientWidth;
    const translateX = -index * width;
    track.style.transform = `translateX(${translateX}px)`;
    lastTranslate = translateX;
  });

  // Buttons
  prevBtn?.addEventListener("click", () => { stopAuto(); prev(); startAuto(); });
  nextBtn?.addEventListener("click", () => { stopAuto(); next(); startAuto(); });

  // Dots click
  dots.forEach((d, i) => d.addEventListener("click", () => { stopAuto(); jumpTo(i); startAuto(); }));

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { stopAuto(); next(); startAuto(); }
    if (e.key === "ArrowLeft") { stopAuto(); prev(); startAuto(); }
  });

  // Pointer / touch drag
  const opts = { passive: true };
  track.addEventListener("pointerdown", (e) => {
    isDragging = true;
    startX = e.clientX;
    currentX = startX;
    track.setPointerCapture(e.pointerId);
    track.style.transition = "none";
    stopAuto();
  }, opts);

  track.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
    const dx = currentX - startX;
    const width = track.clientWidth;
    const translateX = -index * width + dx;
    track.style.transform = `translateX(${translateX}px)`;
  }, opts);

  track.addEventListener("pointerup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    const dx = currentX - startX;
    const width = track.clientWidth;
    // Threshold swipe
    if (Math.abs(dx) > width * 0.15) {
      if (dx < 0) next();
      else prev();
    } else {
      update();
    }
    startAuto();
  }, opts);

  track.addEventListener("pointercancel", () => {
    if (!isDragging) return;
    isDragging = false;
    update();
    startAuto();
  }, opts);

  // Initialize
  update();
  startAuto();
})();

// === Enhancements: lazy-load all non-carousel images and fix scroll-margin where needed ===
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img:not([loading])').forEach(img => {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });
});
