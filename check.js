// Create the Three.js Scene
var scene = new THREE.Scene();
const canvas = document.querySelector('#bg')
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

// Create a new Perspective Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)



// Create a Full Screen WebGL Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(new THREE.Color('black'), 1)

document.body.appendChild(renderer.domElement);

// Add a light
var light = new THREE.PointLight(0xFFFFFF, 1.4, 1000)
light.position.set(0,15,15);
scene.add(light);

// Defining a variable for our two models
var ourObj;
var ourObj2;

// Create a material
var mtlLoader = new THREE.MTLLoader();
mtlLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/glass.mtl', function (materials) {

    materials.preload();

    // Load the object
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/glass.obj', function (object) {
        scene.add(object);
        ourObj = object;
        object.position.z -= 370;
        object.rotation.x = 250;

    });
});

// Create a material
var mtlLoader = new THREE.MTLLoader();
mtlLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/center.mtl', function (materials) {

    materials.preload();

    // Load the object
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/center.obj', function (object) {
        scene.add(object);
        ourObj2 = object;
        object.position.z -= 70;
        object.rotation.x = 250;

        this.tl = new TimelineMax();
        this.tl.from(ourObj2.scale, 2, {y: 0, x:0, z: 0, ease: Expo.easeOut})
        this.tl.from(ourObj2.position, 2, {y: 0, z: -30,  ease: Expo.easeOut})
        this.tl.from(ourObj.scale, 2, {x: 1.5, y: 1.5, z: 0, ease: Expo.easeOut}, '-=2')
        this.tl.from(ourObj.position, 1, {y: -20, ease: Expo.easeOut}, '-=3')
    });
});




var render = function() {
    requestAnimationFrame(render);
    
    // Rotate the objects indefinitely
    ourObj.rotation.z -= .01;
    ourObj2.rotation.z += .03;

    renderer.render(scene, camera);
}

// Call this to render the entire scene
render();