// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');
const links = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .portfolio-card, .about-text, .about-img').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== TYPED TEXT EFFECT =====
const titleEl = document.querySelector('.title-text');
if (titleEl) {
  const texts = [
    'est. <span class="red">2026</span>',
    'E-Sports <span class="red">Design</span>',
    'Business <span class="red">Branding</span>',
    'Academic <span class="red">Design</span>'
  ];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % texts.length;
    titleEl.innerHTML = texts[i];
  }, 3000);
}

// ===== BACKGROUND MUSIC =====
let musicPlaying = false;
const bgMusic = document.getElementById('bg-music');

function overlayPlay() {
  const overlay = document.getElementById('music-overlay');
  const vinyl   = document.getElementById('overlay-vinyl');

  if (!bgMusic) {
    // No audio — just close overlay
    if (overlay) {
      overlay.classList.add('hide');
      setTimeout(() => overlay.style.display = 'none', 800);
    }
    return;
  }

  bgMusic.volume = 0.4;
  bgMusic.play().then(() => {
    musicPlaying = true;
    if (vinyl) vinyl.style.animationPlayState = 'running';
    if (overlay) {
      overlay.classList.add('hide');
      setTimeout(() => overlay.style.display = 'none', 800);
    }
    const btn = document.getElementById('music-btn');
    const label = document.getElementById('music-label');
    if (btn) btn.classList.add('playing');
    if (label) label.textContent = '♪ Hold me down';
  }).catch(() => {
    // Still close overlay even if audio fails
    if (overlay) {
      overlay.classList.add('hide');
      setTimeout(() => overlay.style.display = 'none', 800);
    }
  });
}

function toggleMusic() {
  const btn   = document.getElementById('music-btn');
  const icon  = document.getElementById('music-icon');
  const label = document.getElementById('music-label');
  if (!bgMusic) return;

  if (musicPlaying) {
    bgMusic.pause();
    if (btn) { btn.classList.remove('playing'); btn.classList.add('paused'); }
    if (icon) icon.className = 'fas fa-pause';
    if (label) label.textContent = '♪ Paused';
    musicPlaying = false;
  } else {
    bgMusic.play();
    if (btn) { btn.classList.remove('paused'); btn.classList.add('playing'); }
    if (icon) icon.className = 'fas fa-music';
    if (label) label.textContent = '♪ Hold me down';
    musicPlaying = true;
  }
}

// ===== LIGHTBOX =====
function openImg(src) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if (!lb || !img) return;
  img.src = src;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
