/* EuKosmos Website — main.js */
'use strict';

// ── Star field canvas ─────────────────────────────────────────────────
(function initStars() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [], w, h, animId;

  function resize() {
    w = canvas.width  = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function createStars(n) {
    stars = Array.from({length: n}, () => ({
      x:    Math.random() * w,
      y:    Math.random() * h,
      r:    Math.random() * 1.4 + .2,
      o:    Math.random() * .7 + .1,
      sp:   Math.random() * .15 + .03,
      dir:  Math.random() < .5 ? 1 : -1,
      twinkle: Math.random() * Math.PI * 2,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    stars.forEach(s => {
      s.twinkle += s.sp * s.dir;
      const opacity = s.o * (.6 + .4 * Math.sin(s.twinkle));
      // Occasional cyan-tinted stars
      const isCyan = s.r > 1.2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = isCyan
        ? `rgba(51,217,255,${opacity * .8})`
        : `rgba(255,255,255,${opacity})`;
      ctx.fill();
    });
    animId = requestAnimationFrame(draw);
  }

  function init() {
    resize();
    createStars(220);
    draw();
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    resize();
    createStars(220);
    draw();
  });

  init();
})();

// ── Nav scroll effect ─────────────────────────────────────────────────
(function initNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

// ── Reveal on scroll ──────────────────────────────────────────────────
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .12 });
  els.forEach(el => obs.observe(el));
})();

// ── Animated counter ──────────────────────────────────────────────────
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();
      function update(now) {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(ease * target).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      obs.unobserve(el);
    });
  }, { threshold: .5 });
  counters.forEach(el => obs.observe(el));
})();

// ── Terminal typewriter ───────────────────────────────────────────────
(function initTerminal() {
  const lines = document.querySelectorAll('.t-type');
  if (!lines.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      typeLines(lines);
      obs.disconnect();
    });
  }, { threshold: .4 });
  obs.observe(lines[0]);

  function typeLines(all) {
    let delay = 0;
    all.forEach((el, i) => {
      const text = el.dataset.text || '';
      const speed = 28;
      setTimeout(() => {
        el.textContent = '';
        el.style.opacity = '1';
        let j = 0;
        const t = setInterval(() => {
          el.textContent += text[j++];
          if (j >= text.length) clearInterval(t);
        }, speed);
      }, delay);
      delay += text.length * speed + 300;
    });
  }
})();

// ── Marquee duplicate ─────────────────────────────────────────────────
(function duplicateMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  const clone = track.innerHTML;
  track.innerHTML += clone;
})();

// ── Smooth anchor links ───────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── Copy to clipboard for code snippets ──────────────────────────────
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.dataset.copy || '';
    navigator.clipboard.writeText(text).then(() => {
      const orig = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = orig, 1800);
    });
  });
});
