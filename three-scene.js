/**
 * Ali Nasser V4 — Apple VisionOS Liquid 3D Three.js Engine & Bloch Sphere
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initLiquidCanvas();
    initLiquidBlochSphere();
  });

  /* ==========================================================================
     1. Liquid Spatial Background Canvas
     ========================================================================== */
  function initLiquidCanvas() {
    const canvas = document.getElementById('liquid-3d-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Refractive Fluid Particles
    const count = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cAppleBlue = new THREE.Color(0x0071e3);
    const cCyan = new THREE.Color(0x0ea5e9);
    const cSky = new THREE.Color(0x38bdf8);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 850;
      positions[i3 + 1] = (Math.random() - 0.5) * 850;
      positions[i3 + 2] = (Math.random() - 0.5) * 600;

      const mixed = i % 3 === 0 ? cAppleBlue : (i % 2 === 0 ? cCyan : cSky);
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 5,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse Tracking
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.15;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.15;
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
      requestAnimationFrame(animate);
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      points.rotation.y += 0.0008;
      points.rotation.x += 0.0004;

      camera.position.x = targetX * 0.5;
      camera.position.y = -targetY * 0.5;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();
  }

  /* ==========================================================================
     2. Apple VisionOS 3D Bloch Sphere
     ========================================================================== */
  function initLiquidBlochSphere() {
    const canvas = document.getElementById('bloch-canvas-v4');
    if (!canvas || typeof THREE === 'undefined') return;

    const width = canvas.clientWidth || 340;
    const height = canvas.clientHeight || 330;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2.4, 1.8, 2.8);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Apple Glass Light Rigs
    const ambLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambLight);
    const pLight = new THREE.PointLight(0x00d2ff, 2.0, 50);
    pLight.position.set(4, 5, 5);
    scene.add(pLight);

    const group = new THREE.Group();
    scene.add(group);

    // Liquid Glass Sphere
    const sphereGeo = new THREE.SphereGeometry(1, 36, 36);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0x0071e3,
      transparent: true,
      opacity: 0.15,
      shininess: 100,
      reflectivity: 0.9
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(sphereMesh);

    // Rings
    const ringMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45 });
    const equatorPoints = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      equatorPoints.push(new THREE.Vector3(Math.cos(theta), 0, Math.sin(theta)));
    }
    const equatorGeo = new THREE.BufferGeometry().setFromPoints(equatorPoints);
    group.add(new THREE.Line(equatorGeo, ringMat));

    const meridian = new THREE.Line(equatorGeo, ringMat);
    meridian.rotation.z = Math.PI / 2;
    group.add(meridian);

    // Coordinate Axes
    function createAxis(p1, p2, color) {
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      return new THREE.Line(geo, new THREE.LineBasicMaterial({ color: color, linewidth: 2 }));
    }
    group.add(createAxis(new THREE.Vector3(0, -1.3, 0), new THREE.Vector3(0, 1.3, 0), 0xef4444)); // Z
    group.add(createAxis(new THREE.Vector3(-1.3, 0, 0), new THREE.Vector3(1.3, 0, 0), 0x10b981)); // X
    group.add(createAxis(new THREE.Vector3(0, 0, -1.3), new THREE.Vector3(0, 0, 1.3), 0x0071e3)); // Y

    // State Vector Arrow
    const arrowHelper = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 1.0, 0x00d2ff, 0.2, 0.1);
    group.add(arrowHelper);

    let currentDir = new THREE.Vector3(0, 1, 0);
    let targetDir = new THREE.Vector3(0, 1, 0);

    // Drag Interaction
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      group.rotation.y += (e.clientX - prevMouse.x) * 0.01;
      group.rotation.x += (e.clientY - prevMouse.y) * 0.01;
      prevMouse = { x: e.clientX, y: e.clientY };
    });

    // Touch Support
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });
    window.addEventListener('touchend', () => { isDragging = false; });
    window.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      group.rotation.y += (e.touches[0].clientX - prevMouse.x) * 0.01;
      group.rotation.x += (e.touches[0].clientY - prevMouse.y) * 0.01;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });

    // Gate Buttons
    const formula = document.getElementById('liquid-qubit-formula');
    function setTarget(dir, text) {
      targetDir.copy(dir);
      if (formula) formula.textContent = text;
    }

    document.getElementById('v4-gate-zero')?.addEventListener('click', () => setTarget(new THREE.Vector3(0, 1, 0), '|ψ⟩ = |0⟩  (Ground State)'));
    document.getElementById('v4-gate-one')?.addEventListener('click', () => setTarget(new THREE.Vector3(0, -1, 0), '|ψ⟩ = |1⟩  (Bit-Flip / Excited)'));
    document.getElementById('v4-gate-hadamard')?.addEventListener('click', () => setTarget(new THREE.Vector3(1, 0, 0), '|ψ⟩ = (|0⟩ + |1⟩)/√2  (Superposition |+⟩)'));
    document.getElementById('v4-gate-hadamard-minus')?.addEventListener('click', () => setTarget(new THREE.Vector3(-1, 0, 0), '|ψ⟩ = (|0⟩ - |1⟩)/√2  (Superposition |-⟩)'));
    document.getElementById('v4-gate-rand')?.addEventListener('click', () => {
      const th = Math.random() * Math.PI;
      const ph = Math.random() * Math.PI * 2;
      setTarget(new THREE.Vector3(Math.sin(th)*Math.cos(ph), Math.cos(th), Math.sin(th)*Math.sin(ph)), `|ψ⟩ = α|0⟩ + e^(iφ)β|1⟩  (θ: ${(th*180/Math.PI).toFixed(0)}°, φ: ${(ph*180/Math.PI).toFixed(0)}°)`);
    });

    function render() {
      requestAnimationFrame(render);
      currentDir.lerp(targetDir, 0.1);
      arrowHelper.setDirection(currentDir.clone().normalize());

      if (!isDragging) {
        group.rotation.y += 0.0025;
      }
      renderer.render(scene, camera);
    }
    render();
  }
})();
