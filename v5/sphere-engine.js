/**
 * Ali Nasser V5 — 3D Spherical Orbital Engine & Spatial Physics
 */

(function () {
  'use strict';

  let currentRotationY = 0;
  let currentRotationX = 0;
  let targetRotationY = 0;
  let targetRotationX = 0;

  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let velocityX = 0;
  let velocityY = 0;

  let activeIndex = 0;
  const sphereRadius = 920; // 3D Spherical radius in pixels

  // 8 Spherical Nodes Configuration (Longitude & Latitude in degrees)
  const nodesConfig = [
    { id: 'panel-hero', lon: 0, lat: 0, title: 'Home' },
    { id: 'panel-quantum', lon: 45, lat: 0, title: 'Quantum' },
    { id: 'panel-software', lon: 90, lat: 0, title: 'AI & Code' },
    { id: 'panel-robotics', lon: 135, lat: 0, title: 'Robotics' },
    { id: 'panel-skills', lon: 180, lat: 0, title: 'Skills' },
    { id: 'panel-milestones', lon: 225, lat: 0, title: 'Honors' },
    { id: 'panel-essays', lon: 270, lat: 0, title: 'Essays' },
    { id: 'panel-contact', lon: 315, lat: 0, title: 'Contact' }
  ];

  document.addEventListener('DOMContentLoaded', () => {
    initSphericalPositions();
    initDragPhysics();
    initWheelNavigation();
    initRadarControls();
    initThreeBackground();
    initBlochSphereV5();
    updateActiveFocus();
  });

  /* ==========================================================================
     1. Calculate & Set 3D Spherical Panel Transforms
     ========================================================================== */
  function initSphericalPositions() {
    nodesConfig.forEach((node) => {
      const panel = document.getElementById(node.id);
      if (!panel) return;

      // Position each panel tangentially on the sphere surface facing outward
      panel.style.transform = `rotateY(${node.lon}deg) rotateX(${node.lat}deg) translateZ(${sphereRadius}px)`;
    });
  }

  /* ==========================================================================
     2. Drag Physics & Spherical Rotation
     ========================================================================== */
  function initDragPhysics() {
    const viewport = document.getElementById('spatial-viewport');
    const pivot = document.getElementById('sphere-pivot');
    if (!viewport || !pivot) return;

    viewport.addEventListener('mousedown', (e) => {
      // Don't drag if clicking buttons, links, or canvas
      if (e.target.closest('button, a, input, canvas, .schematic-mini, .sphere-panel')) return;
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      velocityX = 0;
      velocityY = 0;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      velocityX = deltaX * 0.25;
      velocityY = deltaY * 0.15;

      targetRotationY += velocityX;
      targetRotationX -= velocityY;

      // Clamp vertical tilt to prevent flipping
      targetRotationX = Math.max(-25, Math.min(25, targetRotationX));

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    // Touch Support
    viewport.addEventListener('touchstart', (e) => {
      if (e.target.closest('button, a, input, canvas, .sphere-panel')) return;
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    });
    window.addEventListener('touchend', () => { isDragging = false; });
    window.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;

      targetRotationY += deltaX * 0.25;
      targetRotationX -= deltaY * 0.15;
      targetRotationX = Math.max(-25, Math.min(25, targetRotationX));

      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    });

    // Smooth Physics Animation Loop
    function renderPhysics() {
      requestAnimationFrame(renderPhysics);

      if (!isDragging) {
        // Inertia Damping
        velocityX *= 0.92;
        velocityY *= 0.92;
        targetRotationY += velocityX;
        targetRotationX -= velocityY;
      }

      currentRotationY += (targetRotationY - currentRotationY) * 0.1;
      currentRotationX += (targetRotationX - currentRotationX) * 0.1;

      pivot.style.transform = `rotateX(${currentRotationX}deg) rotateY(${-currentRotationY}deg)`;
    }
    renderPhysics();
  }

  /* ==========================================================================
     3. Wheel / Keyboard Navigation between Nodes
     ========================================================================== */
  function initWheelNavigation() {
    let wheelTimeout = null;

    window.addEventListener('wheel', (e) => {
      if (e.target.closest('.sphere-panel')) return; // Allow natural panel scroll
      if (wheelTimeout) return;

      if (e.deltaY > 20 || e.deltaX > 20) {
        navigateOrbit(1);
      } else if (e.deltaY < -20 || e.deltaX < -20) {
        navigateOrbit(-1);
      }

      wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 350);
    }, { passive: true });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') navigateOrbit(1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') navigateOrbit(-1);
    });
  }

  /* ==========================================================================
     4. Navigation Radar & HUD Controls
     ========================================================================== */
  function initRadarControls() {
    const prevBtn = document.getElementById('orbit-prev-btn');
    const nextBtn = document.getElementById('orbit-next-btn');

    prevBtn?.addEventListener('click', () => navigateOrbit(-1));
    nextBtn?.addEventListener('click', () => navigateOrbit(1));

    // Radar Dots
    document.querySelectorAll('.radar-dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'), 10);
        rotateToNode(index);
      });
    });

    // HUD Links
    document.querySelectorAll('.island-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        const index = parseInt(link.getAttribute('data-node-index'), 10);
        if (!isNaN(index)) {
          e.preventDefault();
          rotateToNode(index);
        }
      });
    });
  }

  function navigateOrbit(direction) {
    let newIndex = (activeIndex + direction) % nodesConfig.length;
    if (newIndex < 0) newIndex += nodesConfig.length;
    rotateToNode(newIndex);
  }

  function rotateToNode(index) {
    activeIndex = index;
    const node = nodesConfig[index];

    // Align target rotation so that node faces camera (angle = node.lon)
    targetRotationY = node.lon;
    targetRotationX = 0;

    updateActiveFocus();
  }

  function updateActiveFocus() {
    // Update Radar Dots
    document.querySelectorAll('.radar-dot').forEach((d, i) => {
      d.classList.toggle('active', i === activeIndex);
    });

    // Update HUD Links
    document.querySelectorAll('.island-link').forEach((l, i) => {
      l.classList.toggle('active', i === activeIndex);
    });

    // Update Panels Focus Style
    nodesConfig.forEach((n, i) => {
      const p = document.getElementById(n.id);
      if (p) p.classList.toggle('is-active-focus', i === activeIndex);
    });
  }

  /* ==========================================================================
     5. Three.js Celestial Background
     ========================================================================== */
  function initThreeBackground() {
    const canvas = document.getElementById('sphere-bg-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 800;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Star / Celestial Quantum Particles
    const count = 300;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const cBlue = new THREE.Color(0x0071e3);
    const cCyan = new THREE.Color(0x0ea5e9);
    const cSky = new THREE.Color(0x38bdf8);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 1400;
      pos[i3 + 1] = (Math.random() - 0.5) * 1400;
      pos[i3 + 2] = (Math.random() - 0.5) * 1000;

      const c = i % 3 === 0 ? cBlue : (i % 2 === 0 ? cCyan : cSky);
      cols[i3] = c.r; cols[i3 + 1] = c.g; cols[i3 + 2] = c.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));

    const mat = new THREE.PointsMaterial({
      size: 4.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const stars = new THREE.Points(geo, mat);
    scene.add(stars);

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function anim() {
      requestAnimationFrame(anim);
      stars.rotation.y += 0.0005;
      stars.rotation.x += 0.0002;
      renderer.render(scene, camera);
    }
    anim();
  }

  /* ==========================================================================
     6. Bloch Sphere in Quantum Node
     ========================================================================== */
  function initBlochSphereV5() {
    const canvas = document.getElementById('bloch-canvas-v5');
    if (!canvas || typeof THREE === 'undefined') return;

    const width = canvas.clientWidth || 320;
    const height = canvas.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2.4, 1.8, 2.8);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(width, height);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const pLight = new THREE.PointLight(0x00d2ff, 2.0, 50);
    pLight.position.set(4, 5, 5);
    scene.add(pLight);

    const group = new THREE.Group();
    scene.add(group);

    const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
    const sphereMat = new THREE.MeshPhongMaterial({ color: 0x0071e3, transparent: true, opacity: 0.15, shininess: 90 });
    group.add(new THREE.Mesh(sphereGeo, sphereMat));

    const ringMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 });
    const eqPoints = [];
    for (let i = 0; i <= 64; i++) {
      const th = (i / 64) * Math.PI * 2;
      eqPoints.push(new THREE.Vector3(Math.cos(th), 0, Math.sin(th)));
    }
    const eqGeo = new THREE.BufferGeometry().setFromPoints(eqPoints);
    group.add(new THREE.Line(eqGeo, ringMat));

    const arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 1.0, 0x00d2ff, 0.2, 0.1);
    group.add(arrow);

    let curDir = new THREE.Vector3(0, 1, 0);
    let tgtDir = new THREE.Vector3(0, 1, 0);

    const formula = document.getElementById('v5-qubit-formula');
    function setTarget(dir, text) {
      tgtDir.copy(dir);
      if (formula) formula.textContent = text;
    }

    document.getElementById('v5-gate-zero')?.addEventListener('click', () => setTarget(new THREE.Vector3(0, 1, 0), '|ψ⟩ = |0⟩'));
    document.getElementById('v5-gate-one')?.addEventListener('click', () => setTarget(new THREE.Vector3(0, -1, 0), '|ψ⟩ = |1⟩'));
    document.getElementById('v5-gate-hadamard')?.addEventListener('click', () => setTarget(new THREE.Vector3(1, 0, 0), '|ψ⟩ = (|0⟩ + |1⟩)/√2'));
    document.getElementById('v5-gate-rand')?.addEventListener('click', () => {
      const th = Math.random() * Math.PI;
      const ph = Math.random() * Math.PI * 2;
      setTarget(new THREE.Vector3(Math.sin(th)*Math.cos(ph), Math.cos(th), Math.sin(th)*Math.sin(ph)), '|ψ⟩ = α|0⟩ + e^(iφ)β|1⟩');
    });

    function renderBloch() {
      requestAnimationFrame(renderBloch);
      curDir.lerp(tgtDir, 0.1);
      arrow.setDirection(curDir.clone().normalize());
      group.rotation.y += 0.003;
      renderer.render(scene, camera);
    }
    renderBloch();
  }

  window.rotateToNode = rotateToNode;
})();
