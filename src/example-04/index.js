import * as THREE from 'three'
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'
import {
    PCDLoader
} from 'three/examples/jsm/loaders/PCDLoader'

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.01, 900);
camera.up.set(0, 0, 1);
camera.position.set(0, 0, 20)

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

const loader = new PCDLoader();
console.log(loader);

loader.load('./demo.pcd', function (points) {
    scene.add(points);
    // mapinit()
});

var axisHelper = new THREE.AxesHelper(110);
scene.add(axisHelper)


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();