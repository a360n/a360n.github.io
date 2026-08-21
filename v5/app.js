/**
 * Ali Nasser V5 — UI Logic, Modals & Audio
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeV5();
  initProgressV5();
  initBibtexV5();
  initAudioV5();
});

/* ==========================================================================
   1. Theme Toggle
   ========================================================================== */
function initThemeV5() {
  const toggleBtn = document.getElementById('v5-theme-toggle');
  const icon = document.getElementById('v5-theme-icon');

  const saved = localStorage.getItem('theme-v5') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
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
    localStorage.setItem('theme-v5', theme);
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
}

/* ==========================================================================
   2. Skills Progress Fill
   ========================================================================== */
function initProgressV5() {
  setTimeout(() => {
    document.querySelectorAll('.progress-pill-fill').forEach(fill => {
      const w = fill.getAttribute('data-width') || '0%';
      fill.style.width = w;
    });
  }, 400);
}

/* ==========================================================================
   3. BibTeX Modal
   ========================================================================== */
function initBibtexV5() {
  const modal = document.getElementById('v5-bibtex-modal');
  const openBtns = document.querySelectorAll('.open-v5-bibtex');
  const closeBtn = document.getElementById('close-v5-bibtex');
  const copyBtn = document.getElementById('copy-v5-bibtex');
  const codeEl = document.getElementById('v5-bibtex-text');

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
   4. Synthesizer Audio
   ========================================================================== */
function initAudioV5() {
  let ctx = null;

  function click(freq = 900) {
    try {
      if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  }

  document.querySelectorAll('.btn-apple, .island-btn, .orbit-arrow-btn, .radar-dot, .q-gate-pill').forEach(el => {
    el.addEventListener('click', () => click(1000));
  });
}
