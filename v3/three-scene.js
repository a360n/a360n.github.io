/**
 * Ali Nasser V3 — Three.js Spatial Background & Interactive 3D Bloch Sphere
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initBackgroundCanvas();
    initBlochSphere();
  });

  /* ==========================================================================
     1. Background 3D Quantum Particle Cosmos
     ========================================================================== */
  function initBackgroundCanvas() {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles Geometry
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x2563eb); // Deep Blue
    const color2 = new THREE.Color(0x0ea5e9); // Cyan
    const color3 = new THREE.Color(0x38bdf8); // Sky

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 800;
      positions[i3 + 1] = (Math.random() - 0.5) * 800;
      positions[i3 + 2] = (Math.random() - 0.5) * 600;

      const mixedColor = i % 3 === 0 ? color1 : (i % 3 === 1 ? color2 : color3);
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Connected Lines Mesh
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 3);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse Interaction
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.2;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.2;
    });

    // Window Resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      camera.position.x = targetX * 0.5;
      camera.position.y = -targetY * 0.5;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();
  }

  /* ==========================================================================
     2. Interactive 3D Bloch Sphere (Quantum Qubit Visualizer)
     ========================================================================== */
  function initBlochSphere() {
    const canvas = document.getElementById('bloch-sphere-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const width = canvas.clientWidth || 340;
    const height = canvas.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2.4, 1.8, 2.8);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00e5ff, 1.5, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Group for rotation
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // 1. Translucent Bloch Sphere
    const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.18,
      wireframe: false,
      shininess: 90
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereGroup.add(sphereMesh);

    // 2. Wireframe Rings (Equator, Meridians)
    const ringMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 });
    
    // Equator Ring (X-Y Plane)
    const equatorGeo = new THREE.BufferGeometry();
    const points = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta), 0, Math.sin(theta)));
    }
    equatorGeo.setFromPoints(points);
    const equatorRing = new THREE.Line(equatorGeo, ringMat);
    sphereGroup.add(equatorRing);

    // Meridian Ring (Z-X Plane)
    const meridianRing = new THREE.Line(equatorGeo, ringMat);
    meridianRing.rotation.z = Math.PI / 2;
    sphereGroup.add(meridianRing);

    // 3. Axes (X, Y, Z)
    const axisMatZ = new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 2 }); // |0> and |1>
    const axisMatX = new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 2 }); // |+> and |->
    const axisMatY = new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 2 });

    function createAxis(p1, p2, mat) {
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      return new THREE.Line(geo, mat);
    }
    sphereGroup.add(createAxis(new THREE.Vector3(0, -1.3, 0), new THREE.Vector3(0, 1.3, 0), axisMatZ)); // Z
    sphereGroup.add(createAxis(new THREE.Vector3(-1.3, 0, 0), new THREE.Vector3(1.3, 0, 0), axisMatX)); // X
    sphereGroup.add(createAxis(new THREE.Vector3(0, 0, -1.3), new THREE.Vector3(0, 0, 1.3), axisMatY)); // Y

    // 4. Quantum State Vector Arrow (|psi>)
    const stateVectorGroup = new THREE.Group();
    const arrowDir = new THREE.Vector3(0, 1, 0).normalize();
    const arrowOrigin = new THREE.Vector3(0, 0, 0);
    const arrowLength = 1.0;
    const arrowColor = 0x00e5ff;
    const stateArrow = new THREE.ArrowHelper(arrowDir, arrowOrigin, arrowLength, arrowColor, 0.2, 0.1);
    stateVectorGroup.add(stateArrow);
    sphereGroup.add(stateVectorGroup);

    // Qubit State Angle Targets
    let currentDir = new THREE.Vector3(0, 1, 0);
    let targetDir = new THREE.Vector3(0, 1, 0);

    // Interactive Drag Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      sphereGroup.rotation.y += deltaX * 0.01;
      sphereGroup.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Touch Support
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });
    window.addEventListener('touchend', () => { isDragging = false; });
    window.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;
      sphereGroup.rotation.y += deltaX * 0.01;
      sphereGroup.rotation.x += deltaY * 0.01;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });

    // Quantum Gates Action Buttons
    const stateDisplay = document.getElementById('qubit-state-formula');

    function updateState(newDir, formulaText) {
      targetDir.copy(newDir);
      if (stateDisplay) stateDisplay.textContent = formulaText;
    }

    document.getElementById('gate-zero')?.addEventListener('click', () => {
      updateState(new THREE.Vector3(0, 1, 0), '|ψ⟩ = |0⟩  (Ground State)');
    });

    document.getElementById('gate-one')?.addEventListener('click', () => {
      updateState(new THREE.Vector3(0, -1, 0), '|ψ⟩ = |1⟩  (Excited State / Bit-Flip)');
    });

    document.getElementById('gate-hadamard')?.addEventListener('click', () => {
      updateState(new THREE.Vector3(1, 0, 0), '|ψ⟩ = (|0⟩ + |1⟩)/√2  (Superposition |+⟩)');
    });

    document.getElementById('gate-hadamard-minus')?.addEventListener('click', () => {
      updateState(new THREE.Vector3(-1, 0, 0), '|ψ⟩ = (|0⟩ - |1⟩)/√2  (Superposition |-⟩)');
    });

    document.getElementById('gate-random')?.addEventListener('click', () => {
      const theta = Math.random() * Math.PI;
      const phi = Math.random() * Math.PI * 2;
      const randX = Math.sin(theta) * Math.cos(phi);
      const randY = Math.cos(theta);
      const randZ = Math.sin(theta) * Math.sin(phi);
      updateState(new THREE.Vector3(randX, randY, randZ), `|ψ⟩ = α|0⟩ + e^(iφ)β|1⟩  (θ: ${(theta*180/Math.PI).toFixed(0)}°, φ: ${(phi*180/Math.PI).toFixed(0)}°)`);
    });

    // Render Loop
    function renderBloch() {
      requestAnimationFrame(renderBloch);

      // Smoothly interpolate vector
      currentDir.lerp(targetDir, 0.1);
      stateArrow.setDirection(currentDir.clone().normalize());

      if (!isDragging) {
        sphereGroup.rotation.y += 0.003;
      }

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    renderBloch();
  }

})();
