import * as THREE from 'three';
import { BlendingEquation, Box2, SpotLight } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const loader = new THREE.TextureLoader()
const ground = loader.load('textures/ground.jpg')
const textPalco = loader.load('textures/ground5.jpg')
const height = loader.load('textures/4.png')

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
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

//Create a DirectionalLight and turn on shadows for the light
const light = new THREE.PointLight( 0xffffff, 0.5, 40 );
light.position.set( 0, 30, 0 ); //default; light shining from top
light.castShadow = true; // default false
scene.add( light );

//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default


//Create a SpotLight and turn on shadows for the light
const spotlight = new THREE.SpotLight( 0xffffff, 0.5);
spotlight.position.set( -32, 32, 20 );
spotlight.castShadow = true; // default false

//Set up shadow properties for the light
spotlight.shadow.mapSize.width = 1024;
spotlight.shadow.mapSize.height = 1024;

spotlight.shadow.camera.near = 0.5;
spotlight.shadow.camera.far = 60;
spotlight.shadow.camera.fov = 20;

scene.add( spotlight );

//Create a SpotLight and turn on shadows for the light
const spotlight2 = new THREE.SpotLight( 0xffffff, 0.5);
spotlight2.position.set( 32, 32, 20 );
spotlight2.castShadow = true; // default false

//Set up shadow properties for the light
spotlight2.shadow.mapSize.width = 1024;
spotlight2.shadow.mapSize.height = 1024;

spotlight2.shadow.camera.near = 0.5;
spotlight2.shadow.camera.far = 60;
spotlight2.shadow.camera.fov = 20;
scene.add( spotlight2 );

//Create a SpotLight and turn on shadows for the light
const spotlight3 = new THREE.SpotLight( 0xffffff , 0.5);
spotlight3.position.set( 0, 32, 20 );
spotlight3.castShadow = true; // default false

//Set up shadow properties for the light
spotlight3.shadow.mapSize.width = 1024;
spotlight3.shadow.mapSize.height = 1024;

spotlight3.shadow.camera.near = 0.5;
spotlight3.shadow.camera.far = 60;
spotlight3.shadow.camera.fov = 20;
scene.add( spotlight3 );



//Create a plane that receives shadows (but does not cast them)
const planeGeometry = new THREE.BoxGeometry( 60, 0.5, 60 );
const planeMaterial = new THREE.MeshStandardMaterial( { 
    map: ground,
    //color: 0xffffff,
    //emissive:0x000000,
    //metalness: 0.5,
    roughness: 1,
    //displacementMap: height,
    //displacementScale: 1
} )
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
scene.add(plane)

const palcoGeometry = new THREE.BoxGeometry(20, 10, 20 );
const palcoMaterial = new THREE.MeshStandardMaterial( { 
    map: textPalco,
    //color: 0x049ef4,
    //emissive:0x000000,
    //metalness: 0.5,
    //roughness: 0
} );
const palco = new THREE.Mesh( palcoGeometry, palcoMaterial );
palco.castShadow = true; //default is false
palco.receiveShadow = true; //default
scene.add( palco );


//Create a box that cast shadows (but does not receive them)
// const boxGeometry = new THREE.BoxGeometry(4, 4,4 );
// const boxMaterial = new THREE.MeshStandardMaterial( { 
//     color: 0x049ef4,
//     emissive:0x000000,
//     metalness: 0.5,
//     roughness: 0
// } );
// const box = new THREE.Mesh( boxGeometry, boxMaterial );
// box.castShadow = true; //default is false
// box.receiveShadow = false; //default
// box.position.set(0,10,0);
// scene.add( box );


const geometry = new THREE.TorusKnotGeometry( 10, 3, 300, 20,2,3 );
const material = new THREE.MeshBasicMaterial( { 
    color: 0x049ef4,
    emissive:0x000000,
    metalness: 1,
    roughness: 0
});
const torusKnot = new THREE.Mesh( geometry, material );
torusKnot.castShadow = true; //default is false
torusKnot.receiveShadow = false; //default
torusKnot.position.set(0,12,0);
torusKnot.scale.set(0.35,0.35,0.35)
scene.add( torusKnot );


// const loader2 = new GLTFLoader();
// loader2.load('textures/Ankit.glb', function(glb){
//     console.log(glb);
//     const root = glb.scene;
//     root.position.set(0,0,5);
//     root.scale.set(5,5,5);
//     root.rotateX(90);
//     root.castShadow = true;
//     root.receiveShadow = true;
//     //scene.add(root);
// })


//Create a helper for the shadow camera (optional)
const helper2 = new THREE.CameraHelper( spotlight.shadow.camera );
scene.add( helper2 );

//Create a helper for the shadow camera (optional)
const helper3 = new THREE.CameraHelper( spotlight2.shadow.camera );
scene.add( helper3 );

//Create a helper for the shadow camera (optional)
const helper4 = new THREE.CameraHelper( spotlight3.shadow.camera );
scene.add( helper4 );


//Create a helper for the shadow camera (optional)
const helper = new THREE.CameraHelper( light.shadow.camera );
scene.add( helper );


const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

function animate() {
	requestAnimationFrame( animate );

    //loader2.root.rotateX(0.1)

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