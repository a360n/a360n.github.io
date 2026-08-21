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
  initMobileMenu();
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
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  if (!navLinks.length && !mobileLinks.length) return;

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

  function setActive(activeId) {
    navLinks.forEach(link => {
      if (link.getAttribute('href') === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileLinks.forEach(link => {
      if (link.getAttribute('href') === activeId) {
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
      setActive(sectionMap[0].id);
      return;
    }

    // Edge case 2: Near bottom of page (highlight Contact)
    if (scrollY + windowHeight >= documentHeight - 60) {
      setActive(sectionMap[sectionMap.length - 1].id);
      return;
    }

    // Scroll offset check with HUD breathing space
    const navbarOffset = 220;
    let currentActiveId = sectionMap[0].id;

    for (let i = 0; i < sectionMap.length; i++) {
      const { section, id } = sectionMap[i];
      const top = section.offsetTop - navbarOffset;

      if (scrollY >= top) {
        currentActiveId = id;
      }
    }

    setActive(currentActiveId);
  }

  // Smooth scroll and immediate active state on desktop clicks
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          setActive(href);
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
      setActive('#hero-v4');
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

/* ==========================================================================
   7. Apple VisionOS Liquid Glass Mobile Drawer Interactions
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('apple-mobile-toggle');
  const toggleIcon = document.getElementById('mobile-toggle-icon');
  const menu = document.getElementById('apple-mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !menu) return;

  function openMenu() {
    menu.classList.add('active');
    if (toggleIcon) {
      toggleIcon.className = 'fas fa-times';
    }
  }

  function closeMenu() {
    menu.classList.remove('active');
    if (toggleIcon) {
      toggleIcon.className = 'fas fa-bars';
    }
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (menu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Smooth scroll and auto-close drawer on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          closeMenu();
          const top = target.offsetTop - 75;
          setTimeout(() => {
            window.scrollTo({
              top: Math.max(0, top),
              behavior: 'smooth'
            });
          }, 150);
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('active') && !menu.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('active')) {
      closeMenu();
    }
  });

  // Auto-close if resized to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && menu.classList.contains('active')) {
      closeMenu();
    }
  });
}
