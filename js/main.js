import { initStarsCanvas } from './effects/starsCanvas.js';
import { openModal, closeModal } from './lib/modals.js';
import { initLibrary } from './modules/library.js';
import { initScrollProgress, initBackToTop, initScrollReveal } from './lib/scrollEffects.js';
import { Carousel } from './lib/carousel.js';

// ... todo o resto do seu código permanece igual

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 80;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
window.scrollToSection = scrollToSection;
window.scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

document.addEventListener('DOMContentLoaded', () => {
  initStarsCanvas();

  // Efeito de digitação
  const rotatingWordEl = document.getElementById('rotating-word');
  if (rotatingWordEl) {
    const words = ['desenvolvedor', 'criativo', 'aprendiz', 'entusiasta de tecnologia'];
    let wi = 0, ci = 0, deleting = false;
    const TTYPE = 120, TDEL = 55, PAUSE = 1600;
    function type() {
      const w = words[wi];
      if (!deleting) {
        rotatingWordEl.textContent = w.substring(0, ci + 1);
        ci++;
        if (ci === w.length) { deleting = true; setTimeout(type, PAUSE); return; }
      } else {
        rotatingWordEl.textContent = w.substring(0, ci - 1);
        ci--;
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
      }
      setTimeout(type, deleting ? TDEL : TTYPE);
    }
    type();
  }

  initLibrary().catch(console.warn);
  initScrollProgress('scroll-progress');
  initBackToTop('back-to-top');
  initScrollReveal('.reveal-section');

  // Carrossel
  const carouselTrack = document.querySelector('.carousel-track');
  if (carouselTrack) {
    const updateSlidesPerView = () => {
      const w = window.innerWidth;
      if (w <= 480) return 1;
      if (w <= 768) return 2;
      return 3;
    };
    let carousel;
    const updateCarouselDots = (index) => {
      const dotsContainer = document.getElementById('carouselDots');
      if (!dotsContainer || !carousel) return;
      const totalPages = Math.ceil(carousel.slides.length / carousel.slidesPerView);
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === index ? ' active' : '');
        dot.addEventListener('click', () => carousel.goTo(i));
        dotsContainer.appendChild(dot);
      }
    };
    carousel = new Carousel('.carousel-track', {
      auto: false, gap: 16, slidesPerView: updateSlidesPerView(),
      onChange: (index) => updateCarouselDots(index)
    });
    updateCarouselDots(0);
    window.addEventListener('resize', () => {
      carousel.slidesPerView = updateSlidesPerView();
      carousel.updateDimensions();
      updateCarouselDots(carousel.current);
    });
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    if (prevBtn) prevBtn.addEventListener('click', () => carousel.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => carousel.next());
  }

  // Menu mobile
  const mobileToggle = document.getElementById('mobileToggle');
  const headerNav = document.getElementById('header-nav');
  if (mobileToggle && headerNav) {
    mobileToggle.addEventListener('click', () => {
      headerNav.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      document.body.style.overflow = headerNav.classList.contains('open') ? 'hidden' : '';
    });
    document.querySelectorAll('.header-nav .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        headerNav.classList.remove('open');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Header scroll effect
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  window.openModal = openModal;
  window.closeModal = closeModal;
});