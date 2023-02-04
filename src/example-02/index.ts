import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

/**
 * @file 添加轨道控制器和坐标辅助器
 */

 const scene  = new THREE.Scene();
 const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
 camera.position.set(0,0,10)
 const renderer = new THREE.WebGLRenderer();

 // 创建轨道控制器
 new OrbitControls( camera, renderer.domElement );
 // 创建坐标辅助器
 const axesHelper = new THREE.AxesHelper( 5 );

 renderer.setSize( window.innerWidth, window.innerHeight );
 
 document.getElementById('root')?.appendChild(renderer.domElement)
 
 // 创建一个物体
 const geometry = new THREE.BoxGeometry( 1, 1, 1 );
 const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
 const cube = new THREE.Mesh( geometry, material );

 scene.add(cube);
 scene.add(axesHelper)
 
 function animate() {
     requestAnimationFrame( animate );
     renderer.render( scene, camera );
 }
 
 animate();
 