import loadResource from './util';

let camera;
let scene;
let renderer;
let material;

let stop = false;

const fallSpeen = 2; // 下落速度
const initialCount = 100;

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticle(count = 10) {
  while (count--) {
    const particle = new THREE.Sprite(material);
    const randomScale = randomRange(10, 20);

    particle.position.x = randomRange(-1000, 1000);
    particle.position.y = randomRange(-1000, 1000);
    particle.position.z = randomRange(-1000, 1000);
    particle.scale.x = particle.scale.y = particle.scale.z = randomScale;
    particle.v = new THREE.Vector3(
      randomRange(-1, 1),
      -fallSpeen,
      randomRange(-1, 1)
    );

    scene.add(particle);
  }
}

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );

  camera.position.z = 100;

  const map = new THREE.TextureLoader().load(require('./snow.png'));
  material = new THREE.SpriteMaterial({ map });

  createParticle(initialCount);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const container = document.createElement('div');
  container.style.cssText =
    'position: fixed; z-index: 10000; top: 0; bottom: 0;';
  container.appendChild(renderer.domElement);
  document.body.appendChild(container);

  animate();
}

let last = Date.now();

function animate() {
  if (stop) {
    clear();
    return;
  }
  if (Date.now() - last >= 0.1 * 60 * 60 * 1000) {
    createParticle();
    last = Date.now();
  }
  requestAnimationFrame(animate);
  render();
}

function clear() {
  renderer.clear();
}

function render() {
  scene.children.forEach((particle) => {
    const pp = particle.position;

    pp.add(particle.v);

    if (pp.y < -1000) pp.y = 1000;
    if (pp.x > 1000) pp.x = -1000;
    else if (pp.x < -1000) pp.x = 1000;
    if (pp.z > 1000) pp.z = -1000;
    else if (pp.z < -1000) pp.z = 1000;
  });

  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  // fov、aspect、near、far 的修改需要重新计算投影矩阵（projection matrix）
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

// 暂停 开启
document.addEventListener('dblclick', function() {
  stop = !stop;
  if (stop === false) {
    animate();
  }
});

window.addEventListener('resize', onResize, false);

loadResource(['https://unpkg.com/three@0.99.0/build/three.min.js']).then(init);
