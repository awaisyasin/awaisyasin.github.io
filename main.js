/* ═══════════════════════════════════════════════════════════════
   THE BACKEND DISPATCH — main.js
   Minimal interactions: reticle cursor, scroll reveals, active
   section nav, mobile menu, ticker doubling, clock.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── CURSOR — RETICLE ─────────────────────────────────────── */
  const reticle = document.getElementById('reticle');
  const dot = document.getElementById('reticle-dot');
  let mx = -100, my = -100, rx = -100, ry = -100;
  let cursorEnabled = window.matchMedia('(min-width: 761px)').matches &&
                      !window.matchMedia('(pointer: coarse)').matches;

  if (cursorEnabled) {
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });

    (function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      reticle.style.left = rx + 'px';
      reticle.style.top  = ry + 'px';
      requestAnimationFrame(loop);
    })();

    document.addEventListener('mouseleave', () => {
      reticle.style.opacity = '0';
      dot.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      reticle.style.opacity = '1';
      dot.style.opacity = '1';
    });

    document.querySelectorAll('a, button, .ctc, .chip, .archive-item, .brief, .svc, .step, .report, .tk-row, .mn-hire, .btn').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  } else {
    reticle.style.display = 'none';
    dot.style.display = 'none';
  }

  /* ── MOBILE MENU ─────────────────────────────────────────── */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');

  function toggleMenu(force) {
    const isOpen = typeof force === 'boolean'
      ? force
      : !burger.classList.contains('open');
    burger.classList.toggle('open', isOpen);
    mobileMenu.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  burger.addEventListener('click', () => toggleMenu());
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => toggleMenu(false));
  });

  /* ── ACTIVE NAV ON SCROLL ────────────────────────────────── */
  const navLinks = document.querySelectorAll('.mn-links a[data-jump]');
  const sections = Array.from(document.querySelectorAll('section[id]'));

  const navObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const id = '#' + e.target.id;
        navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });

  sections.forEach((s) => navObs.observe(s));

  /* ── SCROLL REVEAL ──────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.rv');
  const rvObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        rvObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el) => rvObs.observe(el));

  /* hero fires immediately on load */
  window.addEventListener('load', () => {
    document.querySelectorAll('.hero .rv').forEach((el, i) => {
      setTimeout(() => el.classList.add('on'), i * 70);
    });
  });

  /* ── DOUBLE THE WIRE TICKER (so the marquee loops seamlessly) ── */
  const wireTrack = document.getElementById('wire-track');
  if (wireTrack) {
    const items = Array.from(wireTrack.children);
    items.forEach((el) => wireTrack.appendChild(el.cloneNode(true)));
  }

  /* ── COLOPHON CLOCK (footer ticker) ──────────────────────── */
  const clock = document.getElementById('clock');
  if (clock) {
    function tick() {
      const d = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      clock.textContent =
        pad(d.getUTCHours()) + ':' +
        pad(d.getUTCMinutes()) + ':' +
        pad(d.getUTCSeconds()) + ' UTC';
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ── SMOOTH JUMP WITH OFFSET FOR STICKY MASTHEAD ─────────── */
  document.querySelectorAll('a[data-jump]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const masthead = document.getElementById('masthead');
      const offset = masthead ? masthead.offsetHeight - 1 : 0;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  /* ── KEYBOARD: ESC closes mobile menu ─────────────────────── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger.classList.contains('open')) toggleMenu(false);
  });

})();
