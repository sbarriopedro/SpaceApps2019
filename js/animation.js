renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 1.5;

// Three.js support different light sources that have specific behaviour and uses. I'm using ambient and directional light:
// Ambient light: Basic light which is applied globally.  The dimmed ambient light shows areas away from the sun.
// Directional light: Light that mimics the sun. All the light rays we receive on Earth are parallel to each other. 

var ambientLight	= new THREE.AmbientLight( 0x888888 )
scene.add( ambientLight )

var directionalLight	= new THREE.DirectionalLight( 0x686868, 1 )
directionalLight.position.set(5,3,5)
scene.add( directionalLight )

// The sphere is created using THREE.SphereGeometry. 
// The first parameter is the radius, and the second and third parameter is the number of width and height segments. 
// The sphere is drawn as a polygon mesh, and by adding more segments it will be less "blocky" - and take more time to render.

// Next, we use THREE.MeshPhongMaterial to wrap map data around the sphere. 
// This material is used to create shiny materials, and we use it to make the ocean reflective.

var hearth = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 32, 32),
    new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load( 'textures/chlorophyll_map.jpeg' ),
        bumpMap: new THREE.TextureLoader().load( 'textures/elev_bump_4k.jpg' ),
        bumpScale:   0.005,
        specularMap: new THREE.TextureLoader().load( 'textures/water_4k.png' ),
        specular: new THREE.Color('grey')
    })
);

var universe = new THREE.Mesh(
    new THREE.SphereGeometry(90, 64, 64), 
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load( 'backgrounds/galaxy_starfield.png' ), 
        side: THREE.BackSide
    })
);

scene.add(hearth);
scene.add(universe);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 2;
controls.maxDistance = 110;

render();

function render() {
    controls.update();
    hearth.rotation.y += 0.0005;  
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}