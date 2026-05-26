import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

const container = document.getElementById('hero3d');
const isMobile = window.innerWidth <= 768 || matchMedia('(pointer: coarse)').matches;
if (container && THREE) {

  const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: isMobile ? 'default' : 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 200);
  camera.position.set(0, 1.05, 5.2);

  const hemi = new THREE.HemisphereLight(0xFFFAF0, 0xC9C3BA, 0.85);
  scene.add(hemi);

  const keyLight = new THREE.DirectionalLight(0xFFFFFF, 1.6);
  keyLight.position.set(3, 5, 4);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xF0E8DD, 0.6);
  fillLight.position.set(-4, 2, 3);
  scene.add(fillLight);

  const rim = new THREE.DirectionalLight(0xFFFFFF, 1.2);
  rim.position.set(0, 3, -5);
  scene.add(rim);

  const warm = new THREE.PointLight(0xE85D2A, 0.6, 8);
  warm.position.set(2, 2.5, 1);
  scene.add(warm);

  const shadowTexture = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, 'rgba(10,10,10,0.32)');
    g.addColorStop(0.5, 'rgba(10,10,10,0.15)');
    g.addColorStop(1, 'rgba(10,10,10,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  })();
  const floorShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 1.4),
    new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, opacity: 0.7, depthWrite: false })
  );
  floorShadow.rotation.x = -Math.PI / 2;
  floorShadow.position.y = 0.001;
  scene.add(floorShadow);

  const loadingMesh = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.3, 1),
    new THREE.MeshBasicMaterial({ color: 0x0A0A0A, wireframe: true, transparent: true, opacity: 0.5 })
  );
  loadingMesh.position.set(0, 1.4, 0);
  scene.add(loadingMesh);

  function makeDarkSkin() {
    return new THREE.MeshPhysicalMaterial({
      color: 0x0E0E0E,
      metalness: 0.55,
      roughness: 0.38,
      clearcoat: 0.85,
      clearcoatRoughness: 0.22,
      reflectivity: 0.4,
    });
  }
  function makeJoint() {
    return new THREE.MeshPhysicalMaterial({
      color: 0x050505,
      metalness: 0.95,
      roughness: 0.3,
    });
  }

  let mixer = null;
  let model = null;
  const clock = new THREE.Clock();

  const loader = new FBXLoader();
  loader.load(
    'assets/robot.fbx',
    (fbx) => {
      const TARGET_HEIGHT = 2.0;
      let box = new THREE.Box3().setFromObject(fbx);
      const rawHeight = box.max.y - box.min.y;
      const scale = rawHeight > 0 ? TARGET_HEIGHT / rawHeight : 0.01;
      fbx.scale.setScalar(scale);

      box = new THREE.Box3().setFromObject(fbx);
      const center = new THREE.Vector3(); box.getCenter(center);
      fbx.position.x -= center.x;
      fbx.position.z -= center.z;
      fbx.position.y -= box.min.y;

      const skin = makeDarkSkin();
      const joint = makeJoint();

      fbx.traverse((child) => {
        if (child.isMesh || child.isSkinnedMesh) {
          const name = (child.name || '').toLowerCase();
          if (name.includes('joint') || name.includes('socket')) {
            child.material = joint.clone();
          } else {
            child.material = skin.clone();
          }
          child.material.needsUpdate = true;
          child.frustumCulled = false;
          child.castShadow = false;
          child.receiveShadow = false;
        }
      });

      if (fbx.animations && fbx.animations.length) {
        mixer = new THREE.AnimationMixer(fbx);
        const action = mixer.clipAction(fbx.animations[0]);
        action.play();
      }

      scene.remove(loadingMesh);
      scene.add(fbx);
      model = fbx;

      /* Fade-in the model by scaling up from 0 */
      const finalScale = fbx.scale.x;
      fbx.scale.setScalar(finalScale * 0.85);
      const startTime = clock.elapsedTime;
      const entrance = () => {
        const p = Math.min((clock.elapsedTime - startTime) / 0.8, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        fbx.scale.setScalar(finalScale * (0.85 + 0.15 * ease));
        if (p < 1) requestAnimationFrame(entrance);
      };
      entrance();
    },
    undefined,
    (err) => {
      console.error('FBX load failed:', err);
      loadingMesh.material.color.set(0xFF0000);
      loadingMesh.material.opacity = 1;
    }
  );

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w < 560 ? 36 : w < 768 ? 32 : 28;
    camera.updateProjectionMatrix();
  }
  resize();
  new ResizeObserver(resize).observe(container);

  let mx = 0, my = 0, tx = 0, ty = 0;
  window.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth) * 2 - 1;
    my = -((e.clientY / window.innerHeight) * 2 - 1);
  });
  if (isMobile) {
    window.addEventListener('touchmove', (e) => {
      const t = e.touches[0];
      mx = (t.clientX / window.innerWidth) * 2 - 1;
      my = -((t.clientY / window.innerHeight) * 2 - 1);
    }, { passive: true });
  }

  function tick() {
    const dt = clock.getDelta();
    const t = clock.elapsedTime;

    tx += (mx - tx) * 0.06;
    ty += (my - ty) * 0.06;

    if (mixer) mixer.update(dt);

    if (model) {
      model.rotation.y = tx * 0.35 + Math.sin(t * 0.3) * 0.07;
      model.position.y += Math.sin(t * 0.8) * 0.0008; /* subtle float */
    }
    if (loadingMesh.parent === scene) {
      loadingMesh.rotation.y = t * 1.2;
      loadingMesh.rotation.x = t * 0.6;
    }

    camera.position.x = tx * 0.25;
    camera.position.y = 1.05 + ty * 0.15;
    camera.lookAt(0, 0.95, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
}
