/* global.js – portfolio interactivity */
'use strict';

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Typed-text animation in the hero section */
function initTypedText() {
  const el = document.querySelector('.typed-text');
  if (!el) return;

  const phrases = [
    'Developer & Open-Source Enthusiast',
    'GitHub Skills Graduate 🎓',
    'Always Learning, Always Building',
    'Turning Ideas into Reality 🚀',
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pauseTicks = 0;

  function tick() {
    const current = phrases[phraseIdx];
    if (deleting) {
      el.textContent = current.slice(0, --charIdx);
    } else {
      el.textContent = current.slice(0, ++charIdx);
    }

    let delay = deleting ? 60 : 100;

    if (!deleting && charIdx === current.length) {
      // Pause at end of phrase
      pauseTicks++;
      if (pauseTicks < 20) { delay = 100; }
      else { deleting = true; pauseTicks = 0; }
    } else if (deleting && charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(tick, delay);
  }

  tick();
}

// ─── Dark / Light theme toggle ───────────────────────────────────────────────

function initThemeToggle() {
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;

  const icon = btn.querySelector('i');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    icon.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (_) { /* ignore */ }
  }

  // Read saved preference, fall back to OS
  let saved;
  try { saved = localStorage.getItem('theme'); } catch (_) { saved = null; }
  applyTheme(saved ? saved === 'dark' : prefersDark.matches);

  btn.addEventListener('click', () => {
    applyTheme(document.documentElement.getAttribute('data-theme') !== 'dark');
  });

  prefersDark.addEventListener('change', e => {
    try { if (!localStorage.getItem('theme')) applyTheme(e.matches); } catch (_) { applyTheme(e.matches); }
  });
}

// ─── Mobile navigation ───────────────────────────────────────────────────────

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open', !expanded);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
    }
  });
}

// ─── Active nav link on scroll ───────────────────────────────────────────────

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  sections.forEach(s => observer.observe(s));
}

// ─── Skill bar + card reveal on scroll ───────────────────────────────────────

function initSkillBars() {
  const cards = document.querySelectorAll('.skill-card');
  if (!cards.length) return;

  // Assign stable stagger indices so the delay matches DOM order, not observation order
  cards.forEach((card, i) => { card.dataset.staggerIdx = i; });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.dataset.staggerIdx, 10) || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach(card => observer.observe(card));
}

// ─── Project filter ──────────────────────────────────────────────────────────

function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.hidden = !show;
      });
    });
  });
}

// ─── Contact form validation & submission ────────────────────────────────────

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const statusEl = document.getElementById('form-status');

  function validateField(input) {
    const group = input.closest('.form-group');
    const errorEl = group ? group.querySelector('.field-error') : null;
    let msg = '';

    if (!input.value.trim()) {
      msg = 'This field is required.';
    } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
      msg = 'Please enter a valid email address.';
    }

    input.classList.toggle('invalid', !!msg);
    if (errorEl) errorEl.textContent = msg;
    return !msg;
  }

  // Live validation on blur
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('invalid')) validateField(field);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    let valid = true;
    form.querySelectorAll('input[required], textarea[required]').forEach(field => {
      if (!validateField(field)) valid = false;
    });

    if (!valid) return;

    // Simulate async form submission (replace with real endpoint as needed)
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    statusEl.textContent = '';
    statusEl.className = 'form-status';

    setTimeout(() => {
      form.reset();
      statusEl.textContent = '✅ Thanks! Your message was sent successfully.';
      statusEl.className = 'form-status success';
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Send Message';
      setTimeout(() => { statusEl.textContent = ''; statusEl.className = 'form-status'; }, 6000);
    }, 1200);
  });
}

// ─── Back-to-top button ──────────────────────────────────────────────────────

function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.hidden = window.scrollY < 400;
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── Footer year ─────────────────────────────────────────────────────────────

function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

// ─── Boot ────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypedText();
  initMobileNav();
  initScrollSpy();
  initSkillBars();
  initProjectFilter();
  initContactForm();
  initBackToTop();
  initYear();
});
