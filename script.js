
//import * as THREE from 'three';
//import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'

//initializations
const canvas = document.querySelector('#bg')
const scene = new THREE.Scene();

//initial objects
const geometry = new THREE.TorusGeometry(.7, .2, 16, 100);

//first parameter is size 0.5 means 50% of original size
const testGeometry = new THREE.OctahedronGeometry(0.5, 0)
const particlesGeometry = new THREE.BufferGeometry;


//loading custom png for particles
const loader = new THREE.TextureLoader()
const redDot = loader.load('./assets/dotm.png')

//logic for creating randomly scattered particles
const particleCnt = 15000;
const posArray = new Float32Array(particleCnt * 3);
for (let i = 0; i < particleCnt * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

//materials for initial objects
const material = new THREE.PointsMaterial({
    size: 0.01,
    map: redDot,
    transparent: true
})

const testMaterial = new THREE.MeshStandardMaterial({
    color: 'yellow',
    roughness:0
})

const torusMaterial = new THREE.PointsMaterial({
    size: 0.01,
    color: 'lightgray'
})
//material.color = new THREE.Color('#880808')

const sphere = new THREE.Points(geometry, torusMaterial)
const test = new THREE.Mesh(testGeometry, testMaterial)

test.position.set(0,-1,0)
const particlesMesh = new THREE.Points(particlesGeometry, material)

//custom objects importing and code
var ourObj1;
var ourObj2;

var mtlLoader = new THREE.MTLLoader();
/*mtlLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/glass.mtl', function(materials){
    materials.preload();

    //Load the object
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials)
    objLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/glass.obj', function(object){
        scene.add(object);

        object.position.z = -20;
        object.position.y = -20;
        object.position.x = 0;
    })
})*/

mtlLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/center.mtl', function(materials){
    materials.preload();

    //Load the object
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials)
    objLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/center.obj', function(object){
       // scene.add(object);
        ourObj2 = object;
        object.position.z -= 30;
        object.rotation.x = 50;
    })
})




//adding objects to the scene
scene.add(particlesMesh)

//initialization of light
/*const pointLight = new THREE.PointLight(0xff0000, 1, 100);
pointLight.position.set(-1, 5, 5);
scene.add(pointLight);

const secondLight = new THREE.PointLight(0xff0000, 1, 100);
secondLight.position.set(25, -10, 10);
scene.add(secondLight)

const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
scene.add(pointLightHelper);*/

var light = new THREE.PointLight(0xFFFFFF, 1.4, 1000)
        light.position.set(0,15,15);
        scene.add(light);




/*particlesMesh.onBeforeRender = function(camera) {
    var pos = camera.position;
    this.position.set( pos.x, pos.y, pos.z-2 );
};*/





/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(new THREE.Color('black'), 1)



/**
 * Animate
 */

const clock = new THREE.Clock()
document.addEventListener('mousemove', animateParticles)


let mouseX = 0;
let mouseY = 0;

function animateParticles(event) {
    mouseY = event.clientY
    mouseX = event.clientX
}

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    test.rotation.x += 0.005;
    test.rotation.y += 0.005;
    test.rotation.z += 0.005;
    camera.position.y = t * 0.0002;

}

document.body.onscroll = moveCamera

const tick = () => {

    const elapsedTime = clock.getDelta()
    const incTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    particlesMesh.rotation.y += -.1 * elapsedTime
    test.rotation.y += .1 * elapsedTime

    
    if (mouseX > 0) {
        particlesMesh.rotation.x -= -mouseY * (elapsedTime * 0.0003)
        particlesMesh.rotation.y -= -mouseX * (elapsedTime * 0.0003)

        test.rotation.y -= -mouseX * (elapsedTime * 0.0003)
        test.rotation.x -= -mouseY * (elapsedTime * 0.0003)


        
    }

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

/*function customAnimate()
{
    requestAnimationFrame(customAnimate)
    ourObj2.rotation.z += 0.05;
    ourObj2.rotation.x += 0.05;
    renderer.render(scene, camera)
}

customAnimate()*/