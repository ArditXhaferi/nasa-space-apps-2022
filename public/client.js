import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls.js';

// global variables
let scene;
let camera;
let renderer;
const canvas = document.querySelector('.webgl');
const slide = document.querySelector('#slider')
const btn = document.querySelector('.btn')
const title = document.querySelector('.title-container')
// scene setup
scene = new THREE.Scene();

// camera setup
const fov = 100;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
scene.add(camera);
let zoom = 2
const timer = ms => new Promise(res => setTimeout(res, ms))

btn.addEventListener('click', () =>{
    zoomF()
})

let items = ["year", "mm", "ppm", "°C", "GT"]

$(".input-catch").each((e, b) => {
    let currentValue = $(b).find(".value p")
    let input = $(b).find("input[type='range']")
    $(input).on("input", (curreInput) =>{
        if(e == 0){
            $.ajax({
                url: "http://127.0.0.1:8000/sea-level/" + $(curreInput.target).val(),
                type: 'GET',
                success: function(res) {
                    $("#sea_level_text").text(res['sea-level'] + "mm");
                    $("#carbon_level_text").text(res['co2-level'] + "ppm");
                    $("#carbon_level").val(res['co2-level']);
                    $("#sea_level").val(res['sea-level']);
                    $("#global").val(res['global_temp']);
                    $("#global_text").text(res['global_temp'] + "°C");
                    changeImage(Math.round(res['global_temp']));
                }
            });
        }
        currentValue.text($(curreInput.target).val() + " " + items[e]);
    })
})



let numberOffset = [1993, 1, 1, 1, 1]

function getAllNumber(){
    let num = 0;
    $("input[type='range']").each(function(e, element){
        num += $(element).val() - numberOffset[e];
        console.log(num)
    })
    return num;

}

let posLeft = 0;

async function zoomF(){
    $(".title").fadeOut();

    while(zoom > 1.05){
        zoom -= 0.01;
        posLeft -= 0.01;
        camera.position.set(0, 0, zoom)
        earthMesh1.position.x = posLeft
        render();
        await timer(5); // then the created Promise can be awaited
    }
    $(".form").fadeIn();

}
// renderer setup
renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);

// orbit control setup
const controls = new OrbitControls(camera, renderer.domElement);

// earth geometry
const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);

// earth material
let earthMaterial1 = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    map: THREE.ImageUtils.loadTexture('texture/earthmap1k.jpg'),
    bumpScale: 0.3
});

let earthMaterial2 = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    opacity: 0,
    map: THREE.ImageUtils.loadTexture('texture/2.png'),
    bumpScale: 0.3
});

let earthMaterial3 = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    opacity: 0,
    map: THREE.ImageUtils.loadTexture('texture/3.png'),
    bumpScale: 0.3
});

let earthMaterial4 = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    opacity: 0,
    map: THREE.ImageUtils.loadTexture('texture/4.png'),
    bumpScale: 0.3
});

let earthMaterial5 = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    opacity: 0,
    map: THREE.ImageUtils.loadTexture('texture/5.png'),
    bumpScale: 0.3
});

let earthMaterial6 = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    map: THREE.ImageUtils.loadTexture('texture/6.png'),
    bumpScale: 0.3
});

let earthMaterial7 = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    opacity: 0,
    map: THREE.ImageUtils.loadTexture('texture/7.png'),
    bumpScale: 0.3
});

let earthMaterial8 = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    opacity: 0,
    map: THREE.ImageUtils.loadTexture('texture/8.png'),
    bumpScale: 0.3
});

let earthMaterial9 = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    opacity: 0,
    map: THREE.ImageUtils.loadTexture('texture/9.png'),
    bumpScale: 0.3
});

let earthMaterial10 = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    opacity: 0,
    map: THREE.ImageUtils.loadTexture('texture/10.png'),
    bumpScale: 0.3
});

// earth mesh
const earthMesh1 = new THREE.Mesh(earthGeometry, earthMaterial1);
scene.add(earthMesh1);

// cloud Geometry
const cloudGeometry = new THREE.SphereGeometry(0.63, 32, 32);

// cloud metarial
const cloudMetarial = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('texture/earthloud.png'),
    transparent: true,
});

// cloud mesh
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMetarial);
scene.add(cloudMesh);

// galaxy geometry
const starGeometry = new THREE.SphereGeometry(80, 64, 64);

// galaxy material
const starMaterial = new THREE.MeshBasicMaterial({
    map : THREE.ImageUtils.loadTexture('texture/glaxy.png'),
    side: THREE.BackSide
});

// galaxy mesh
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starMesh);

// ambient light
const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientlight);

// point light
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(5, 3, 5);
scene.add(pointLight);

// point light helper
const Helper = new THREE.PointLightHelper(pointLight);
scene.add(Helper);

// handling resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}, false);

// current fps
var frame = 0;
var index = 0;
var frames = [earthMaterial1, earthMaterial2, earthMaterial3, earthMaterial4, earthMaterial5, earthMaterial6, earthMaterial7, earthMaterial8, earthMaterial9, earthMaterial10];
// spinning animation
const animate = () => {
    frame++;
    requestAnimationFrame(animate);
    starMesh.rotation.y -= 0.002;
    earthMesh1.rotation.y -= 0.0015;
    cloudMesh.rotation.y -= 0.001;
    controls.update();
    render();
};

function changeImage(value){
    if(value == 10){
        value = 9
    }
    earthMesh1.material = frames[value];
}

// rendering
const render = () => {
    renderer.render(scene, camera);
}

animate();