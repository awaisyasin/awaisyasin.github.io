/* ═══════════════════════════════════════════════════════════════
   awaisyasin.co — interactions
   Smooth scroll · reveals · active nav · mobile menu · marquee
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── NAV — blur + border on scroll ───────────────────────── */
  const nav = document.getElementById('nav');
  let lastY = 0;
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 12);
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── MOBILE MENU ─────────────────────────────────────────── */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');

  function setMenu(open) {
    burger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', () => setMenu(!burger.classList.contains('open')));
  mobileMenu.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => setMenu(false))
  );
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger.classList.contains('open')) setMenu(false);
  });

  /* ── ACTIVE NAV ON SCROLL ────────────────────────────────── */
  const navLinks = document.querySelectorAll('.nav-links a[data-jump]');
  const sections = Array.from(document.querySelectorAll('section[id]'));

  const navObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = '#' + e.target.id;
          navLinks.forEach((a) =>
            a.classList.toggle('active', a.getAttribute('href') === id)
          );
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );
  sections.forEach((s) => navObs.observe(s));

  /* ── SCROLL REVEAL ──────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.rv');
  const rvObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('on');
          rvObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => rvObs.observe(el));

  /* hero fires immediately on load (don't wait for scroll) */
  window.addEventListener('load', () => {
    document.querySelectorAll('.hero .rv').forEach((el, i) => {
      setTimeout(() => el.classList.add('on'), i * 70);
    });
  });

  /* ── SMOOTH SCROLL WITH NAV OFFSET ───────────────────────── */
  document.querySelectorAll('a[data-jump]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = (nav ? nav.offsetHeight : 0) + 8;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  /* ── DOUBLE THE MARQUEE TRACK FOR SEAMLESS LOOP ──────────── */
  const marqueeTrack = document.getElementById('marquee-track');
  if (marqueeTrack) {
    Array.from(marqueeTrack.children).forEach((el) =>
      marqueeTrack.appendChild(el.cloneNode(true))
    );
  }

  /* ── CODE-CARD: gentle parallax tilt on hover (desktop only) ── */
  const codeCard = document.querySelector('.code-card');
  if (codeCard && window.matchMedia('(min-width: 901px) and (pointer: fine)').matches) {
    let rect = null;
    let raf = 0;
    let tx = 0, ty = 0, ctx = 0, cty = 0;

    function measure() { rect = codeCard.getBoundingClientRect(); }
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, { passive: true });

    codeCard.addEventListener('mouseenter', () => {
      codeCard.style.transition = 'transform .25s cubic-bezier(.22,1,.36,1)';
    });
    codeCard.addEventListener('mousemove', (e) => {
      if (!rect) return;
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      tx = px * -3;
      ty = py * 2;
      if (!raf) raf = requestAnimationFrame(tick);
    });
    codeCard.addEventListener('mouseleave', () => {
      tx = 0; ty = 0;
      codeCard.style.transition = 'transform .45s cubic-bezier(.22,1,.36,1)';
      if (!raf) raf = requestAnimationFrame(tick);
    });

    function tick() {
      ctx += (tx - ctx) * 0.18;
      cty += (ty - cty) * 0.18;
      codeCard.style.transform = `perspective(1200px) rotateY(${ctx}deg) rotateX(${cty}deg)`;
      if (Math.abs(tx - ctx) > 0.01 || Math.abs(ty - cty) > 0.01) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    }
  }

  /* ── CODE-CARD: tab switching (cosmetic) ─────────────────── */
  document.querySelectorAll('.code-tabs').forEach((tabs) => {
    tabs.querySelectorAll('.code-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.querySelectorAll('.code-tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  });

})();
