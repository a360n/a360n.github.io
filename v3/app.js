/**
 * Ali Nasser V3 — 3D UI/UX Engine & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  init3DTiltCards();
  initThemeV3();
  initSkillsRadar();
  initBibtexModalV3();
  initHapticAudio();
});

/* ==========================================================================
   1. 3D Tilt Cards with Dynamic Specular Glare
   ========================================================================== */
function init3DTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    // Add specular glare layer
    if (!card.querySelector('.card-glare')) {
      const glare = document.createElement('div');
      glare.className = 'card-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (-10deg to +10deg)
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      // Update glare position
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* ==========================================================================
   2. Theme Toggle (V3 Light / Dark)
   ========================================================================== */
function initThemeV3() {
  const toggleBtn = document.getElementById('v3-theme-toggle');
  const icon = document.getElementById('v3-theme-icon');

  const savedTheme = localStorage.getItem('theme-v3') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme-v3', theme);
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
}

/* ==========================================================================
   3. Skills Radar Fill Observer
   ========================================================================== */
function initSkillsRadar() {
  const section = document.getElementById('skills-v3');
  if (!section || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.skill-radar-fill').forEach(bar => {
          const width = bar.getAttribute('data-width') || '0%';
          bar.style.width = width;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(section);
}

/* ==========================================================================
   4. BibTeX Modal
   ========================================================================== */
function initBibtexModalV3() {
  const modal = document.getElementById('v3-bibtex-modal');
  const openBtns = document.querySelectorAll('.open-v3-bibtex');
  const closeBtn = document.getElementById('close-v3-bibtex');
  const copyBtn = document.getElementById('copy-v3-bibtex');
  const codeEl = document.getElementById('v3-bibtex-text');

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
   5. Cyber Audio Feedback (Web Audio API Synthesizer)
   ========================================================================== */
function initHapticAudio() {
  let audioCtx = null;

  function playCyberClick(freq = 800, type = 'sine') {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
      // Audio autoplay blocked or unsupported
    }
  }

  // Bind to buttons
  document.querySelectorAll('.btn-3d, .q-gate-btn, .hud-btn').forEach(el => {
    el.addEventListener('click', () => playCyberClick(600, 'sine'));
  });
}
