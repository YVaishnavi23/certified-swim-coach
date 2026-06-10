(function () {
  'use strict';

  const WHATSAPP_NUMBER = '917702979766';

  function waLink(text) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  /* ── Navigation ── */
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const toggle = nav.querySelector('.nav-toggle');
    toggle?.addEventListener('click', () => nav.classList.toggle('open'));

    nav.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  /* ── Scroll reveal + counter animation ── */
  function initReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          el.classList.add('in');

          if (el.classList.contains('counter')) {
            const num = el.querySelector('.num');
            if (num && !num.dataset.done) {
              num.dataset.done = '1';
              animateCounter(num);
            }
          }
        });
      },
      { threshold: 0.18 }
    );

    document.querySelectorAll('.reveal, .counter').forEach((el) => observer.observe(el));
  }

  function animateCounter(numEl) {
    const target = parseFloat(numEl.dataset.target || '0');
    const suffix = numEl.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      numEl.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  /* ── Hero bubbles ── */
  function initBubbles() {
    const container = document.querySelector('.bubbles');
    if (!container) return;

    for (let i = 0; i < 14; i++) {
      const bubble = document.createElement('span');
      bubble.className = 'bubble';
      const size = 8 + Math.random() * 28;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animationDuration = `${10 + Math.random() * 14}s`;
      bubble.style.animationDelay = `${Math.random() * 8}s`;
      container.appendChild(bubble);
    }
  }

  /* ── FAQ accordion ── */
  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach((item) => {
      item.querySelector('.faq-q')?.addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    });
  }

  /* ── Testimonial carousel ── */
  function initTestimonials() {
    const slides = Array.from(document.querySelectorAll('.testi'));
    const dots = Array.from(document.querySelectorAll('.testi-dots button'));
    if (!slides.length) return;

    let current = 0;
    let intervalId;

    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.style.display = i === current ? 'block' : 'none';
      });
      dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    }

    show(0);
    dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
    intervalId = window.setInterval(() => show(current + 1), 5500);

    window.addEventListener('beforeunload', () => clearInterval(intervalId));
  }

  /* ── Trial booking modal ── */
  function initTrialModal() {
    const modal = document.getElementById('trial-modal');
    if (!modal) return;

    const open = (e) => {
      e.preventDefault();
      modal.classList.add('open');
    };

    const close = () => modal.classList.remove('open');

    document.querySelectorAll('[data-open-trial]').forEach((btn) => {
      btn.addEventListener('click', open);
    });

    modal.querySelector('.x')?.addEventListener('click', close);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });

    const form = document.getElementById('trial-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const message = [
        "Hi! I'd like to book a free trial.",
        `Name: ${data.get('name')}`,
        `Phone: ${data.get('phone')}`,
        `Program: ${data.get('program')}`,
        `Preferred date: ${data.get('date')}`,
      ].join('\n');
      window.open(waLink(message), '_blank');
      close();
    });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initReveal();
    initBubbles();
    initFAQ();
    initTestimonials();
    initTrialModal();
  });
})();
