/**
 * Ali Nasser V2 Portfolio & Research Hub — Core Logic & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initSkillObserver();
  initQuantumSimulation();
  initBibtexModal();
  initSmoothScroll();
});

/* ==========================================================================
   Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check stored theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const activeTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(activeTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
}

/* ==========================================================================
   Mobile Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        icon.className = navMenu.classList.contains('mobile-open') ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    // Close on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        const icon = mobileBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }
}

/* ==========================================================================
   Skill Bar Observer
   ========================================================================== */
function initSkillObserver() {
  const skillSection = document.getElementById('skills');
  if (skillSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.skill-bar-fill');
          fills.forEach(fill => {
            const width = fill.getAttribute('data-width') || '0%';
            fill.style.width = width;
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(skillSection);
  }
}

/* ==========================================================================
   Interactive Quantum Key Distribution (BB84) Simulator
   ========================================================================== */
function initQuantumSimulation() {
  const runBtn = document.getElementById('run-quantum-sim-btn');
  const aliceBitsEl = document.getElementById('alice-bits');
  const aliceBasesEl = document.getElementById('alice-bases');
  const bobBasesEl = document.getElementById('bob-bases');
  const sharedKeyEl = document.getElementById('shared-key');

  if (!runBtn) return;

  const bases = ['+', '×'];

  function runSim() {
    const length = 12;
    let aliceBits = [];
    let aliceBases = [];
    let bobBases = [];
    let sharedKey = [];

    // Clear previous
    aliceBitsEl.innerHTML = '';
    aliceBasesEl.innerHTML = '';
    bobBasesEl.innerHTML = '';
    sharedKeyEl.innerHTML = '';

    for (let i = 0; i < length; i++) {
      const bit = Math.random() > 0.5 ? 1 : 0;
      const aBase = bases[Math.floor(Math.random() * bases.length)];
      const bBase = bases[Math.floor(Math.random() * bases.length)];

      aliceBits.push(bit);
      aliceBases.push(aBase);
      bobBases.push(bBase);

      const isMatch = aBase === bBase;
      if (isMatch) {
        sharedKey.push(bit);
      }

      // Render tags with animation delay
      setTimeout(() => {
        // Alice Bit
        const bitBadge = document.createElement('span');
        bitBadge.className = 'photon-bit';
        bitBadge.textContent = bit;
        aliceBitsEl.appendChild(bitBadge);

        // Alice Basis
        const aBaseBadge = document.createElement('span');
        aBaseBadge.className = 'photon-bit';
        aBaseBadge.textContent = aBase;
        aliceBasesEl.appendChild(aBaseBadge);

        // Bob Basis
        const bBaseBadge = document.createElement('span');
        bBaseBadge.className = `photon-bit ${isMatch ? 'match' : ''}`;
        bBaseBadge.style.borderColor = isMatch ? '#10b981' : 'var(--card-border)';
        bBaseBadge.textContent = bBase;
        bobBasesEl.appendChild(bBaseBadge);

        // Shared Key
        if (isMatch) {
          const keyBadge = document.createElement('span');
          keyBadge.className = 'photon-bit';
          keyBadge.style.background = '#10b981';
          keyBadge.style.color = '#ffffff';
          keyBadge.textContent = bit;
          sharedKeyEl.appendChild(keyBadge);
        }
      }, i * 70);
    }
  }

  runBtn.addEventListener('click', runSim);
  // Auto run once
  runSim();
}

/* ==========================================================================
   BibTeX Modal & Copy
   ========================================================================== */
function initBibtexModal() {
  const modalBackdrop = document.getElementById('bibtex-modal');
  const openBtns = document.querySelectorAll('.open-bibtex-btn');
  const closeBtn = document.getElementById('close-bibtex-modal');
  const copyBtn = document.getElementById('copy-bibtex-btn');
  const bibtexCodeEl = document.getElementById('bibtex-code-text');

  if (!modalBackdrop) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modalBackdrop.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.classList.remove('active');
    }
  });

  if (copyBtn && bibtexCodeEl) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(bibtexCodeEl.innerText).then(() => {
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy BibTeX';
        }, 2000);
      });
    });
  }
}

/* ==========================================================================
   Smooth Scrolling & Active Link Spy
   ========================================================================== */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
