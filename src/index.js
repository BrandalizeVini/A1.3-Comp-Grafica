import * as THREE from 'three';
import { BlendingEquation, Box2, SpotLight } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

//Atribuiçaõ de texturas
const loader = new THREE.TextureLoader()
const ground = loader.load('textures/ground.jpg')
const textPalco = loader.load('textures/ground5.jpg')


const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
);
camera.position.set(0, 25, 40);
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();

// Criação das luzes
const light = new THREE.PointLight( 0xffffff, 0.5, 40 );
light.position.set( 0, 30, 0 ); 
light.castShadow = true; 
scene.add( light );

const spotlight = new THREE.SpotLight( 0xffffff, 0.5);
spotlight.position.set( -32, 32, 20 );
spotlight.castShadow = true;  false
spotlight.shadow.mapSize.width = 1024;
spotlight.shadow.mapSize.height = 1024;
spotlight.shadow.camera.near = 0.5;
spotlight.shadow.camera.far = 60;
spotlight.shadow.camera.fov = 20;
scene.add( spotlight );

const spotlight2 = new THREE.SpotLight( 0xffffff, 0.5);
spotlight2.position.set( 32, 32, 20 );
spotlight2.castShadow = true; 
spotlight2.shadow.mapSize.width = 1024;
spotlight2.shadow.mapSize.height = 1024;
spotlight2.shadow.camera.near = 0.5;
spotlight2.shadow.camera.far = 60;
spotlight2.shadow.camera.fov = 20;
scene.add( spotlight2 );

const spotlight3 = new THREE.SpotLight( 0xffffff , 0.5);
spotlight3.position.set( 0, 32, 20 );
spotlight3.castShadow = true; 
spotlight3.shadow.mapSize.width = 1024;
spotlight3.shadow.mapSize.height = 1024;
spotlight3.shadow.camera.near = 0.5;
spotlight3.shadow.camera.far = 60;
spotlight3.shadow.camera.fov = 20;
scene.add( spotlight3 );


// Criação do chão
const planeGeometry = new THREE.BoxGeometry( 60, 0.5, 60 );
const planeMaterial = new THREE.MeshStandardMaterial( { 
    map: ground,
    roughness: 1,

} )
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
scene.add(plane)


// Criação do palco
const palcoGeometry = new THREE.BoxGeometry(20, 10, 20 );
const palcoMaterial = new THREE.MeshStandardMaterial( { 
    map: textPalco,
} );
const palco = new THREE.Mesh( palcoGeometry, palcoMaterial );
palco.castShadow = true; 
palco.receiveShadow = true; 
scene.add( palco );


//Criação da animação
const geometry = new THREE.TorusKnotGeometry( 10, 3, 300, 20,2,3 );
const material = new THREE.MeshStandardMaterial( { 
    color: 0x049ef4,
    emissive:0x000000,
    metalness: 0.5,
    roughness: 0
});
const torusKnot = new THREE.Mesh( geometry, material );
torusKnot.castShadow = true; 
torusKnot.receiveShadow = false; 
torusKnot.position.set(0,12,0);
torusKnot.scale.set(0.35,0.35,0.35)
scene.add( torusKnot );



const helper2 = new THREE.CameraHelper( spotlight.shadow.camera );
//scene.add( helper2 );

const helper3 = new THREE.CameraHelper( spotlight2.shadow.camera );
//scene.add( helper3 );

const helper4 = new THREE.CameraHelper( spotlight3.shadow.camera );
//scene.add( helper4 );

const helper = new THREE.CameraHelper( light.shadow.camera );
//scene.add( helper );


const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

function animate() {
	requestAnimationFrame( animate );

    //Animação do objeto
    torusKnot.rotateX(0.01)
    torusKnot.rotateY(0.01)
    torusKnot.rotateZ(0.01)

	controls.update();
	renderer.render( scene, camera );
}
animate();

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize);