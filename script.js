
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
const bloodGeometry = new THREE.BufferGeometry;
const clusterGeometry = new THREE.BufferGeometry;
const blueStreakGeometry = new THREE.BufferGeometry;


//loading custom png for particles
const loader = new THREE.TextureLoader()
const redDot = loader.load('./assets/dotm.png')
const bloodDot = loader.load('./assets/newblood.png')
const streakDot = loader.load('./assets/streakc.png')
const cluster = loader.load('./assets/sharp.png')
const blueStreak = loader.load('./assets/bluestreak.png')

//logic for creating randomly scattered particles
const particleCnt = 1000;
const posArray = new Float32Array(particleCnt * 3);
for (let i = 0; i < particleCnt * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5
}

const bloodCnt = 400;
const pArray = new Float32Array(bloodCnt * 3);
for (let i = 0; i < bloodCnt * 3; i++) {
    pArray[i] = (Math.random() - 0.5) * 3
}

const clusterCnt = 1000;
const cArray = new Float32Array(clusterCnt * 3);
for (let i = 0; i < clusterCnt * 3; i++) {
    cArray[i] = (Math.random() - 0.5) * 5
}

const blueCnt = 500;
const bArray = new Float32Array(blueCnt * 3);
for (let i = 0; i < blueCnt * 3; i++) {
    bArray[i] = (Math.random() - 0.5) * 5
}


clusterGeometry.setAttribute('position', new THREE.BufferAttribute(cArray, 3))
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
bloodGeometry.setAttribute('position', new THREE.BufferAttribute(pArray,3))
blueStreakGeometry.setAttribute('position', new THREE.BufferAttribute(bArray,3))


//materials for initial objects
const material = new THREE.PointsMaterial({
    size: 0.01,
    map: streakDot,
    transparent: true
})

const clusterMaterial = new THREE.PointsMaterial({
    size: 0.03,
    map: cluster,
    transparent: true
})

const blueMaterial = new THREE.PointsMaterial({
    size: 0.03,
    map: blueStreak,
    transparent: true
})

const bloodMaterial = new THREE.PointsMaterial({
    size: 0.03,
    map: bloodDot,
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

const bloodMesh = new THREE.Points(bloodGeometry, bloodMaterial)

const secondBloodMesh = new THREE.Points(bloodGeometry, bloodMaterial)

const clusterMesh = new THREE.Points(clusterGeometry, clusterMaterial)
const blueMesh = new THREE.Points(blueStreakGeometry, blueMaterial)

let rightCMesh = new THREE.Points(clusterGeometry, clusterMaterial)
let rightblueMesh = new THREE.Points(blueStreakGeometry, blueMaterial)

rightCMesh.position.set(6,0,0);
rightblueMesh.position.set(6,0,0);

bloodMesh.position.set(0,-50,0)
secondBloodMesh.position.set(0,-120,0)
clusterMesh.position.set(-6,0,0);
blueMesh.position.set(-6,0,0);
//adding objects to the scene
/*scene.add(particlesMesh)
scene.add(bloodMesh)
scene.add(secondBloodMesh)*/

scene.add(clusterMesh)
scene.add(blueMesh)
scene.add(rightCMesh)
scene.add(rightblueMesh)



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

mtlLoader.load('lastpane.mtl', function(materials){
    materials.preload();

    //Load the object
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials)
    objLoader.load('lastpane.obj', function(object){
        scene.add(object);
        ourObj2 = object;
        object.position.z -= 10;
        object.rotation.x = 0.5;
        object.rotation.y = 70;
        object.position.y = -123;
        object.position.x = 4;
    })
})

mtlLoader.load('lastpane.mtl', function(materials){
    materials.preload();

    //Load the object
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials)
    objLoader.load('lastpane.obj', function(object){
        scene.add(object);
        ourObj1 = object;
        object.position.z -= 10;
        object.rotation.x = 0.5;
        object.rotation.y = 70;
        object.position.y = -53;
        object.position.x = 4;
        
    })
})

/*object.position.z -= 8;
        object.rotation.x = 0.5;
        object.rotation.y = 70;
        object.position.y = -53;
        object.position.x = 4;*/







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

//(0,-86,-2)

var light = new THREE.PointLight( 0x340E07, 20, 1000)   //top left
        light.position.set(-20 ,-111,-10);
        scene.add(light);

/*var fifthLight = new THREE.PointLight( 0xC65337, 20, 1000)  //top middle
fifthLight.position.set(5 ,-111,-16);
scene.add(fifthLight);       

var sixthLight = new THREE.PointLight(0xC65337, 20, 1000)  //bottom middle
sixthLight.position.set(5,-126,-16)
scene.add(sixthLight)*/

var secondLight = new THREE.PointLight( 0x340E07, 20, 1000) //bottom middle
        secondLight.position.set(10 ,-126,-10);
        scene.add(secondLight);

var thirdLight = new THREE.PointLight( 0x340E07, 20, 1000)  //top right
        thirdLight.position.set(10 ,-111,-10);
        scene.add(thirdLight);

var fourthLight = new THREE.PointLight( 0x340E07, 20, 1000) //bottom left
        fourthLight.position.set(-20 ,-126,-10);
        scene.add(fourthLight);


      /*  const sphereSize = 1;
        const pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
        scene.add(pointLightHelper);  
        
        const secondHelper = new THREE.PointLightHelper(secondLight, sphereSize);
        scene.add(secondHelper);

        const thirdHelper = new THREE.PointLightHelper(thirdLight, sphereSize);
        scene.add(thirdHelper);

        const fourthHelper = new THREE.PointLightHelper(fourthLight, sphereSize);
        scene.add(fourthHelper);*/


        var newlight = new THREE.PointLight( 0x340E07, 50, 1000)   //top left
        newlight.position.set(-20 ,-41,-10);
        scene.add(newlight);



var thirdnewLight = new THREE.PointLight( 0x340E07, 50, 1000)  //top right
        thirdnewLight.position.set(10 ,-41,-10);
        scene.add(thirdnewLight);

var fourthnewLight = new THREE.PointLight( 0x340E07, 50, 1000) //bottom left
        fourthnewLight.position.set(-20 ,-56,-10);
        scene.add(fourthnewLight);


    var middleLight = new THREE.PointLight( 0x340E07, 50, 1000)
        middleLight.position.set(6,-42,-9);
        scene.add(middleLight)

    var middleLight2 = new THREE.PointLight(0x340E07, 20, 1000)  
        middleLight2.position.set(-15,-65,-10)  
        
      /*  const middleSize = 1;
        const newmiddleLightHelper = new THREE.PointLightHelper(middleLight, middleSize);
        scene.add(newmiddleLightHelper); 
        const newmiddleLightHelper2 = new THREE.PointLightHelper(middleLight2, middleSize);
        scene.add(newmiddleLightHelper2); */

     /*  const newsphereSize = 1;
        const newpointLightHelper = new THREE.PointLightHelper(newlight, newsphereSize);
        scene.add(newpointLightHelper);  
        
        const newsecondHelper = new THREE.PointLightHelper(secondnewLight, newsphereSize);
        scene.add(newsecondHelper);

        const newthirdHelper = new THREE.PointLightHelper(thirdnewLight, newsphereSize);
        scene.add(newthirdHelper);

        const newfourthHelper = new THREE.PointLightHelper(fourthnewLight, newsphereSize);
        scene.add(newfourthHelper);*/
 
       

/*var light = new THREE.PointLight( 0x03FE03, 40, 1000)
        light.position.set(-6 ,-51,23);
        scene.add(light);*/

/*const ambientLight = new THREE.AmbientLight(0xffffff, 1, 100);
scene.add(ambientLight); */     


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

var lastScrollTop = 0;

function moveCamera() {

    const t = document.body.getBoundingClientRect().top;
    test.rotation.x += 0.005;
    test.rotation.y += 0.005;
    test.rotation.z += 0.005;

    camera.position.y = t * 0.03;
    particlesMesh.position.y = camera.position.y
    clusterMesh.position.y = camera.position.y
    blueMesh.position.y = camera.position.y
    rightCMesh.position.y = camera.position.y
    rightblueMesh.position.y = camera.position.y

  /*  var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop){
       ourObj1.rotation.y += 0.05
       ourObj2.rotation.y += 0.05
    } else {
       ourObj1.rotation.y -= 0.05
       ourObj2.rotation.y -= 0.05
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling*/
    
    //0.0156
    

   

   // ourObj2.position.y = -0.0002 * t


    //-4222 for lab portion

    console.log(t);

   /* if(t < -4000) {
        ourObj2.position.set(-5,-7,-8)
        ourObj2.rotation.x = -49.8;
        ourObj2.rotation.z = 0;  
    }
    else {
        ourObj2.position.set(-8,-50,-8)
    }*/

}





document.body.onscroll = moveCamera



const tick = () => {

    const elapsedTime = clock.getDelta()
    const incTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    particlesMesh.rotation.y += -.1 * elapsedTime
    bloodMesh.rotation.x += -.5 * elapsedTime
    secondBloodMesh.rotation.y = -.5 * elapsedTime
    test.rotation.y += .1 * elapsedTime
  //  clusterMesh.rotation.y = -.5*elapsedTime
   // blueMesh.rotation.y = -.5 * elapsedTime

    
    
    if (mouseX > 0) {
        particlesMesh.rotation.x -= -mouseY * (elapsedTime * 0.0003)
        particlesMesh.rotation.y -= -mouseX * (elapsedTime * 0.0003)    
        bloodMesh.rotation.x -= -mouseY * (elapsedTime * 0.0003)   
        bloodMesh.rotation.y -= -mouseX * (elapsedTime * 0.0003)
        secondBloodMesh.rotation.x -= -mouseY * (elapsedTime * 0.0003)   
        secondBloodMesh.rotation.y -= -mouseX * (elapsedTime * 0.0003)
        clusterMesh.rotation.x -= -mouseY * (elapsedTime * 0.0003)
        clusterMesh.rotation.y -= -mouseX * (elapsedTime * 0.0003)
        blueMesh.rotation.x -= -mouseY * (elapsedTime * 0.0003)
        blueMesh.rotation.y -= -mouseX * (elapsedTime * 0.0003)
        rightCMesh.rotation.x -= -mouseY * (elapsedTime * 0.0003)
        rightCMesh.rotation.y -= -mouseX * (elapsedTime * 0.0003)
        rightblueMesh.rotation.x -= -mouseY * (elapsedTime * 0.0003)
        rightblueMesh.rotation.y -= -mouseX * (elapsedTime * 0.0003)
        
        
    }
    

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()




var render = function() {
    requestAnimationFrame(render);

    const elapsedTime = clock.getDelta()
    
    // Rotate the objects indefinitely
    ourObj2.rotation.y += 1*elapsedTime;

    if(mouseX > 0) {
        
        ourObj2.rotation.y -= -mouseX * (elapsedTime * 0.003) 
    }
   // light.position.y +=.03;

    renderer.render(scene, camera);
}

// Call this to render the entire scene
//render();




