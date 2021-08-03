
//import * as THREE from 'three';
//import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'

//initializations
const canvas = document.querySelector('#bg')
const scene = new THREE.Scene();

//initial objects


//first parameter is size 0.5 means 50% of original size (geometries initializations)

const particlesGeometry = new THREE.BufferGeometry;
const bloodGeometry = new THREE.BufferGeometry;
const clusterGeometry = new THREE.BufferGeometry;
const blueStreakGeometry = new THREE.BufferGeometry;
const shardGeometry = new THREE.BufferGeometry;

//loading custom png for particles
const loader = new THREE.TextureLoader()
const redDot = loader.load('./assets/dotm.png')
const bloodDot = loader.load('./assets/newblood.png')
const streakDot = loader.load('./assets/streakc.png')
const cluster = loader.load('./assets/big-streak-final.png')
const blueStreak = loader.load('./assets/bluestreaknew.png')
const shardStreak = loader.load('./assets/circlestreak.png')

//logic for creating randomly scattered particles
const particleCnt = 1000;
const posArray = new Float32Array(particleCnt * 3);
for (let i = 0; i < particleCnt * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5
}

const bloodCnt = 400;
const pArray = new Float32Array(bloodCnt * 3);
for (let i = 0; i < bloodCnt * 3; i++) {
    pArray[i] = (Math.random() - 0.5) * 2
}

const clusterCnt = 500;
const cArray = new Float32Array(clusterCnt * 3);
for (let i = 0; i < clusterCnt * 3; i++) {
    cArray[i] = (Math.random() - 0.5) * 5
}

const blueCnt = 200;
const bArray = new Float32Array(blueCnt * 3);
for (let i = 0; i < blueCnt * 3; i++) {
    bArray[i] = (Math.random() - 0.5) * 5
}

const shardCnt = 200;
const sArray = new Float32Array(shardCnt * 3);
for (let i = 0; i < shardCnt * 3; i++) {
    sArray[i] = (Math.random() - 0.5) * 5
}


//initializing particles
clusterGeometry.setAttribute('position', new THREE.BufferAttribute(cArray, 3))
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
bloodGeometry.setAttribute('position', new THREE.BufferAttribute(pArray, 3))
blueStreakGeometry.setAttribute('position', new THREE.BufferAttribute(bArray, 3))
shardGeometry.setAttribute('position', new THREE.BufferAttribute(sArray, 3))


//materials for initial objects
const material = new THREE.PointsMaterial({
    size: 0.01,
    map: streakDot,
    transparent: true
})

const clusterMaterial = new THREE.PointsMaterial({
    size: 0.05,
    map: cluster,
    transparent: false
})

const blueMaterial = new THREE.PointsMaterial({
    size: 0.2,
    map: blueStreak,
    transparent: true
})

const bloodMaterial = new THREE.PointsMaterial({
    size: 0.12,
    map: bloodDot,
    transparent: true
})

const shardMaterial = new THREE.PointsMaterial({
    size: 0.08,
    map: shardStreak,
    transparent: true
})

// creating meshs (material + geometry)
const particlesMesh = new THREE.Points(particlesGeometry, material)
const bloodMesh = new THREE.Points(bloodGeometry, bloodMaterial)
const secondBloodMesh = new THREE.Points(bloodGeometry, bloodMaterial)
const clusterMesh = new THREE.Points(clusterGeometry, clusterMaterial)
const blueMesh = new THREE.Points(blueStreakGeometry, blueMaterial)
let rightCMesh = new THREE.Points(clusterGeometry, clusterMaterial)
let rightblueMesh = new THREE.Points(blueStreakGeometry, blueMaterial)
let blueStreakF = new THREE.Points(clusterGeometry, blueMaterial)
let shardMesh = new THREE.Points(shardGeometry, shardMaterial)
let shardMesh2 = new THREE.Points(shardGeometry, shardMaterial)

//particle system positions
rightCMesh.position.set(6.5, 0, 1);
rightblueMesh.position.set(6.5, 0, 1);
bloodMesh.position.set(-1, -48, -6)
bloodMesh.scale.set(6, 4.5, 2)
bloodMesh.rotation.z = 1;
secondBloodMesh.position.set(0, -120, 0)
clusterMesh.position.set(-6.5, 0, 1);
blueMesh.position.set(-6.5, 0, 1);
blueStreakF.position.set(0, -24, -12)
blueStreakF.scale.set(3, 3, 3)
shardMesh.position.set(0, -24, -8)
shardMesh.scale.set(2, 2, 2)
shardMesh2.position.set(0, -64, -8)
shardMesh2.scale.set(2, 2, 2)

//adding objects to the scene

/*scene.add(particlesMesh)*/
scene.add(bloodMesh)
//scene.add(secondBloodMesh)

scene.add(clusterMesh)
scene.add(blueMesh)
scene.add(rightCMesh)
scene.add(rightblueMesh)
//scene.add(blueStreakF)
scene.add(shardMesh)
scene.add(shardMesh2)

//custom models importing and code
var ourObj1;
var ourObj2;

var ourObjc1;
var ourObjc2;

var mtlLoader = new THREE.MTLLoader();

/*mtlLoader.load('lastpane.mtl', function(materials){
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
})*/

var ship_material = new THREE.MeshPhongMaterial({
    color: 'rgb(79,19,9)',
    emissive: 'rgb(79,19,9)',
    specular: 'orange',
    shininess: 50,
    reflectivity: 1,
    transparent: true,
    opacity: 0.4
});
var newloader = new THREE.OBJLoader();
newloader.load('lastpane.obj',
    function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = ship_material;
            }
        });
        scene.add(object);
        ourObj2 = object;

        //object.children[0].name
        //console.log(object);
        object.position.z -= 10;
        object.rotation.x = 0.5;
        object.rotation.y = 69.8;
        object.position.y = -125;
        object.position.x = 4;

    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + "% loaded")
    },
    function (err) {
        console.error("Error loading 'ship.obj'")
    }
);



var shards_material = new THREE.MeshPhongMaterial({
    color: 'rgb(79,19,9)',
    specular: 'orange',
    shininess: 50,
    reflectivity: 1,
    transparent: true,
    opacity: 0.3
})

var redblue_material = new THREE.MeshPhongMaterial({
    color: 'rgb(79,19,9)',
    emissive: 'rgb(79,19,9)',
    specular: 'orange',
    shininess: 50,
    reflectivity: 1,
    transparent: true,
    opacity: 0.5
})

newloader.load('lastpane.obj',
    function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = ship_material;
            }
        });
        scene.add(object);
        ourObj1 = object;

        //object.children[0].name
        //console.log(object);
        object.position.z -= 10;
        object.rotation.x = 0.5;
        object.rotation.y = 69.8;
        object.position.y = -53;
        object.position.x = 4;
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + "% loaded")
    },
    function (err) {
        console.error("Error loading 'ship.obj'")
    }
);
newloader.load('Final Shape/Final.obj',
    function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = redblue_material;
            }
        });
        scene.add(object);
        ourObjc1 = object;

        //object.children[0].name
        object.position.z -= 6;
        object.position.y = -24;
        object.position.x = 2;
        object.rotation.y = 11;
        object.rotation.x = 11;
        object.rotation.z = 0.5;
        object.scale.set(3, 3, 3)
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + "% loaded")
    },
    function (err) {
        console.error("Error loading 'ship.obj'")
    }
);
newloader.load('Final Shape/Final.obj',
    function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = redblue_material;
            }
        });
        scene.add(object);
        ourObjc2 = object;

        //object.children[0].name
        object.position.z -= 6;
        object.position.y = -64;
        object.position.x = 3;
        object.rotation.y = 11;
        object.rotation.x = 11;
        object.rotation.z = 0.5;
        object.scale.set(3, 3, 3)
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + "% loaded")
    },
    function (err) {
        console.error("Error loading 'ship.obj'")
    }
);






//initialization of lights

const shard1L1 = new THREE.PointLight('blue', 40, 20)
shard1L1.position.set(6, -30, -4)
scene.add(shard1L1);

const shard2L1 = new THREE.PointLight('blue', 30, 20)
shard2L1.position.set(7, -70, -4)
scene.add(shard2L1);



/*const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper(shard1L1, sphereSize);
scene.add(pointLightHelper);*/


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

/*var light = new THREE.PointLight( 0x340E07, 1, 1000)   //top left
        light.position.set(-20 ,-111,-10);
        scene.add(light);*/

/*var fifthLight = new THREE.PointLight( 0xC65337, 20, 1000)  //top middle
fifthLight.position.set(5 ,-111,-16);
scene.add(fifthLight);       

var sixthLight = new THREE.PointLight(0xC65337, 20, 1000)  //bottom middle
sixthLight.position.set(5,-126,-16)
scene.add(sixthLight)*/

/*var secondLight = new THREE.PointLight( 0x340E07, 1, 1000) //bottom middle
        secondLight.position.set(10 ,-126,-10);
        scene.add(secondLight);

var thirdLight = new THREE.PointLight( 0x340E07, 1, 1000)  //top right
        thirdLight.position.set(10 ,-111,-10);
        scene.add(thirdLight);

var fourthLight = new THREE.PointLight( 0x340E07, 1, 1000) //bottom left
        fourthLight.position.set(-20 ,-126,-10);
        scene.add(fourthLight);*/


/*  const sphereSize = 1;
  const pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
  scene.add(pointLightHelper);  
  
  const secondHelper = new THREE.PointLightHelper(secondLight, sphereSize);
  scene.add(secondHelper);

  const thirdHelper = new THREE.PointLightHelper(thirdLight, sphereSize);
  scene.add(thirdHelper);

  const fourthHelper = new THREE.PointLightHelper(fourthLight, sphereSize);
  scene.add(fourthHelper);*/


/*   var newlight = new THREE.PointLight( 0x340E07, 1, 1000)   //top left
   newlight.position.set(-20 ,-41,-10);
   scene.add(newlight);



var thirdnewLight = new THREE.PointLight( 0x340E07, 1, 1000)  //top right
   thirdnewLight.position.set(10 ,-41,-10);
   scene.add(thirdnewLight);

var fourthnewLight = new THREE.PointLight(0xe6e91b, 1, 1000) //bottom left
   fourthnewLight.position.set(-20 ,-56,-10);
   scene.add(fourthnewLight);*/


//(1,-32,-5) light falling from top
//(8,-58,-9) light falling from right
//(-10,-60,-7) light falling from left bottom



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

const ambientLight = new THREE.AmbientLight(0xffffff, 2, 100);
scene.add(ambientLight);


/**
 * Screen Sizes
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

//animations on scrolling

window.addEventListener("scroll", () => {

    const t = document.body.getBoundingClientRect().top;
    camera.position.y = t * 0.03;
    particlesMesh.position.y = camera.position.y
    clusterMesh.position.y = camera.position.y
    blueMesh.position.y = camera.position.y
    rightCMesh.position.y = camera.position.y
    rightblueMesh.position.y = camera.position.y
    console.log(t);




    var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"


    if (st > lastScrollTop) {
        //downward scroll  

        if (t > -250) {
            //reset all original scales and rotations
            console.log('reset')
            ourObjc1.scale.set(3, 3, 3)
            ourObjc2.scale.set(3, 3, 3)
            ourObj1.rotation.set(0.5, 69.8, 0)
            ourObj2.rotation.set(0.5, 69.8, 0)
            ourObj1.children[0].material.opacity = 0.4
            ourObj2.children[0].material.opacity = 0.4
        }
        else {

            if (t < -500 && t > -1100) { //first shard scaling increment
                ourObjc1.scale.x += (0.035 + t / 100000)
                ourObjc1.scale.y += (0.035 + t / 100000)
                ourObjc1.scale.z += (0.035 + t / 100000)
            }

            if (t < -1250 && t > -1850) { // first pane rotation anticlock
                ourObj1.rotation.y += (0.035 + t / 100000)
                ourObj1.children[0].material.opacity -= 0.008

            }

            if (t < -1900 && t > -2500) {  //second shard scaling increment

                ourObjc2.scale.x += (0.05 + t / 100000)
                ourObjc2.scale.y += (0.05 + t / 100000)
                ourObjc2.scale.z += (0.05 + t / 100000)
            }
            if (t < -3600 && t > -4200) {  //second pane rotation anticlock

                ourObj2.rotation.y += 0.035
                ourObj2.children[0].material.opacity -= 0.005
            }

        }




        /* ourObj1.rotation.y += 0.05
         ourObj2.rotation.y += 0.05
         ourObj1.children[0].material.opacity -= 0.01;*/
    } else {
        //upward scroll

        if (t > -250) {
            //reset all original scales and rotations
            console.log('reset')
            ourObjc1.scale.set(3, 3, 3)
            ourObjc2.scale.set(3, 3, 3)
            ourObj1.rotation.set(0.5, 70, 0)
            ourObj2.rotation.set(0.5, 70, 0)
            ourObj1.children[0].material.opacity = 0.4
            ourObj2.children[0].material.opacity = 0.4
        }
        else {

            if (t > -1100 && t < -500) {   //first shard scalling decrement
                ourObjc1.scale.x -= (0.035 + t / 100000)
                ourObjc1.scale.y -= (0.035 + t / 100000)
                ourObjc1.scale.z -= (0.035 + t / 100000)
            }

            if (t > -1850 && t < -1250) { // first pane rotation clock
                ourObj1.rotation.y -= (0.035 + t / 100000)
                ourObj1.children[0].material.opacity += 0.008
            }

            if (t > -2500 && t < -1900) {   //second shard scalling decrement
                ourObjc2.scale.x -= (0.05 + t / 100000)
                ourObjc2.scale.y -= (0.05 + t / 100000)
                ourObjc2.scale.z -= (0.05 + t / 100000)
            }
            if (t > -4200 && t < -3600) {   //second pane rotation clock
                ourObj2.rotation.y -= 0.05
                ourObj2.children[0].material.opacity += 0.005
            }
        }


        /* ourObj1.rotation.y -= 0.05
         ourObj2.rotation.y -= 0.05
         ourObj1.children[0].material.opacity += 0.01;*/
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling*/

})

/*let oldValue = 0;

window.addEventListener('scroll' , function(e){

var newValue = window.pageYOffset;

if(oldValue - newValue < 0){
    mixer.update( (newValue - oldValue) / 250 );
} 
else if(oldValue - newValue > 0){
   mixer.update(  (newValue - oldValue ) / 250 ) ;
}
oldValue = newValue;
});*/


//animation per time tick

const tick = () => {

    const elapsedTime = clock.getDelta()
    const incTime = clock.getElapsedTime()

    // Update objects
    particlesMesh.rotation.y += -.1 * elapsedTime
    //bloodMesh.rotation.x += -.1 * elapsedTime
    secondBloodMesh.rotation.y = -.5 * elapsedTime
    clusterMesh.rotation.x = -.1 * elapsedTime
    blueMesh.rotation.x = -.1 * elapsedTime
    blueStreakF.rotation.y = -.1 * elapsedTime
    shardMesh.rotation.x += -.1 * elapsedTime
    shardMesh2.rotation.x += -.1 * elapsedTime
    //bloodMesh.rotation.x += -.5*elapsedTime



    /* if(bloodMesh.position.y > -38) {
         bloodMesh.position.y -= 0.01
     }
 
     else if (bloodMesh.position.y < -50 && bloodMesh.position.y < -38) {
         bloodMesh.position.y += 0.01
     }*/


    if (mouseX > 0) {
        particlesMesh.rotation.x -= -mouseY * (elapsedTime * 0.0003)
        particlesMesh.rotation.y -= -mouseX * (elapsedTime * 0.0003)
        //  bloodMesh.rotation.x -= -mouseY * (elapsedTime * 0.0003)   
        //  bloodMesh.rotation.y -= -mouseX * (elapsedTime * 0.0003)
        secondBloodMesh.rotation.x -= -mouseY * (elapsedTime * 0.0003)
        secondBloodMesh.rotation.y -= -mouseX * (elapsedTime * 0.0003)
        clusterMesh.rotation.x -= -mouseY * (elapsedTime * 0.0001)
        clusterMesh.rotation.y -= -mouseX * (elapsedTime * 0.0001)
        blueMesh.rotation.x -= -mouseY * (elapsedTime * 0.0001)
        blueMesh.rotation.y -= -mouseX * (elapsedTime * 0.0001)
        rightCMesh.rotation.x -= -mouseY * (elapsedTime * 0.0001)
        rightCMesh.rotation.y -= -mouseX * (elapsedTime * 0.0001)
        rightblueMesh.rotation.x -= -mouseY * (elapsedTime * 0.0001)
        rightblueMesh.rotation.y -= -mouseX * (elapsedTime * 0.0001)
        shardMesh.rotation.x -= -mouseY * (elapsedTime * 0.0001)



    }


    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


//animation for custom model

let currentTimeline = window.pageYOffset / 3000
let aimTimeline = window.pageYOffset / 3000

var render = function () {
    requestAnimationFrame(render);

    const elapsedTime = clock.getDelta()

    ourObj1.rotation.z += 0.05;


    /* currentTimeline += (aimTimeline - currentTimeline) * 0.03;
 
     const rx= currentTimeline * -0.5 + 0.5
     const ry = (currentTimeline * 0.9 + 0.1) * Math.PI * 2
 
     ourObj1.rotation.set(rx,ry,0)*/
    renderer.render(scene, camera)

}

//render();

window.addEventListener('scroll', () => {
    aimTimeline = window.pageYOffset / 3000
})




