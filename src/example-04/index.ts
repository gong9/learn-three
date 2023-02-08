import * as THREE from 'three'
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'
import {
    PCDLoader
} from 'three/examples/jsm/loaders/PCDLoader'

// create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// create camera
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.01, 900);
camera.up.set(0, 0, 1);
camera.position.set(0, 0, 20)
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

const loader = new PCDLoader();

// 加载pcd，创建点云
loader.load('./demo.pcd', function (points) {
    scene.add(points);
});

var axisHelper = new THREE.AxesHelper(110);
scene.add(axisHelper)

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);



const zoom = (cube) => {
    const vector = new THREE.Vector3(20, 20, 0);
    var matrix = new THREE.Matrix4();

    matrix.makeTranslation(3, 0, 0)
    matrix.makeScale(-3, 2, 2)

    cube.matrix = matrix
    cube.matrixAutoUpdate = false;
}

zoom(cube)

function animate() {
    requestAnimationFrame(animate);
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children)

    // 如果有相交的物体
    if (intersects.length > 0) {
        console.log(intersects);
    } else {

    }
    renderer.render(scene, camera);
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2()

document.addEventListener("mousemove", onDocumentMouseMove, false);

function onDocumentMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}





animate()