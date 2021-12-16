import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera)

const geometry = new THREE.OctahedronGeometry(10, 3, 16, 100)
const texture = new THREE.TextureLoader().load('texture.jpg')
const material = new THREE.MeshStandardMaterial({map: texture})

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const controls = new OrbitControls(camera, renderer.domElement)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const background = new THREE.TextureLoader().load('sky.jpg')
scene.background = background

function addWindParticle() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 'white'});
  const particle = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  particle.position.set(x, y, z)
  scene.add(particle)
}

Array(200).fill().forEach(addWindParticle)

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  controls.update()


  renderer.render(scene, camera);
}

function moveCamera() {
  const top = document.body.getBoundingClientRect().top;

  camera.position.z = top * -0.05;
  camera.position.x = top * -0.0002;
  camera.rotation.y = top * -0.0002;
}

document.body.onscroll = moveCamera

animate();