/**
 * Ali Nasser V4 — Apple VisionOS Liquid Glass Interactions & Micro-Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiquidGlassCards();
  initThemeV4();
  initProgressObserver();
  initBibtexModalV4();
  initAppleAudio();
  initAppleScrollSpy();
});

/* ==========================================================================
   1. Liquid Glass Specular Glare & Apple Spatial Tilt
   ========================================================================== */
function initLiquidGlassCards() {
  const cards = document.querySelectorAll('.liquid-card');

  cards.forEach(card => {
    if (!card.querySelector('.liquid-glare')) {
      const glare = document.createElement('div');
      glare.className = 'liquid-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ==========================================================================
   2. Theme Toggle (Apple VisionOS Light / Dark)
   ========================================================================== */
function initThemeV4() {
  const toggleBtn = document.getElementById('v4-theme-toggle');
  const icon = document.getElementById('v4-theme-icon');

  const saved = localStorage.getItem('theme-v4') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(saved);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme-v4', theme);
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
}

/* ==========================================================================
   3. Liquid Progress Fill Observer
   ========================================================================== */
function initProgressObserver() {
  const section = document.getElementById('skills-v4');
  if (!section || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.liquid-progress-fill').forEach(fill => {
          const width = fill.getAttribute('data-width') || '0%';
          fill.style.width = width;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(section);
}

/* ==========================================================================
   4. BibTeX Citation Modal
   ========================================================================== */
function initBibtexModalV4() {
  const modal = document.getElementById('v4-bibtex-modal');
  const openBtns = document.querySelectorAll('.open-v4-bibtex');
  const closeBtn = document.getElementById('close-v4-bibtex');
  const copyBtn = document.getElementById('copy-v4-bibtex');
  const codeEl = document.getElementById('v4-bibtex-text');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  if (copyBtn && codeEl) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(codeEl.innerText).then(() => {
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied Citation!';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy BibTeX';
        }, 2000);
      });
    });
  }
}

/* ==========================================================================
   5. Apple Audio Feedback (Subtle Click Synthesizer)
   ========================================================================== */
function initAppleAudio() {
  let audioCtx = null;

  function playAppleClick() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.03);
    } catch (e) {
      // Audio unsupported or restricted
    }
  }

  document.querySelectorAll('.btn-liquid, .quantum-gate-btn, .apple-btn-icon').forEach(el => {
    el.addEventListener('click', playAppleClick);
  });
}

/* ==========================================================================
   6. Apple VisionOS HUD ScrollSpy & Smooth Active Navigation
   ========================================================================== */
function initAppleScrollSpy() {
  const navLinks = document.querySelectorAll('.apple-links .apple-link');
  if (!navLinks.length) return;

  const sectionMap = [];
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const section = document.querySelector(href);
      if (section) {
        sectionMap.push({
          link: link,
          section: section,
          id: href
        });
      }
    }
  });

  if (!sectionMap.length) return;

  function setActive(activeLink) {
    navLinks.forEach(link => {
      if (link === activeLink) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function updateActiveLink() {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Edge case 1: Top of page
    if (scrollY < 120) {
      setActive(sectionMap[0].link);
      return;
    }

    // Edge case 2: Near bottom of page (highlight Contact)
    if (scrollY + windowHeight >= documentHeight - 60) {
      setActive(sectionMap[sectionMap.length - 1].link);
      return;
    }

    // Scroll offset check with HUD breathing space
    const navbarOffset = 220;
    let currentActive = sectionMap[0].link;

    for (let i = 0; i < sectionMap.length; i++) {
      const { section, link } = sectionMap[i];
      const top = section.offsetTop - navbarOffset;

      if (scrollY >= top) {
        currentActive = link;
      }
    }

    setActive(currentActive);
  }

  // Smooth scroll and immediate active state on click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          setActive(link);
          const top = target.offsetTop - 85;
          window.scrollTo({
            top: Math.max(0, top),
            behavior: 'smooth'
          });
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      }
    });
  });

  // Handle Apple brand click
  const brandLink = document.querySelector('.apple-brand[href="#hero-v4"]');
  if (brandLink) {
    brandLink.addEventListener('click', (e) => {
      e.preventDefault();
      setActive(sectionMap[0].link);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (history.pushState) {
        history.pushState(null, null, '#hero-v4');
      }
    });
  }

  // Throttled scroll listener
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateActiveLink);
  updateActiveLink();
}
