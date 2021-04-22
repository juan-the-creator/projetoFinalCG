
import * as THREE from './node_modules/three/src/Three.js';

import { PointerLockControls } from './node_modules/three/examples/jsm/controls/PointerLockControls.js';

import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';

let camera, scene, renderer, controls, cube, cube2, cone, cone2, dode, dode2, ico, ico2, octa, octa2;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();


init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.y = 10;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

    const mainLight = new THREE.DirectionalLight( 0xffffff, 1 );
    mainLight.position.set( -100, 100, -100 );
    //mainLight.castShadow = true;
    scene.add( mainLight );

    const subLight = new THREE.DirectionalLight( 0xffc0cb, 0.8 );
    subLight.position.set( 100, 100, 100 );
    //subLight.castShadow = true;
    scene.add( subLight );

    const officeLight1 = new THREE.PointLight( 0xd8f9ff, 1, 100 );
    officeLight1.position.set( 40, 20, 40 );
    //officeLight1.castShadow = true;
    scene.add( officeLight1 );

    const officeLight2 = new THREE.PointLight( 0x90ee90, 1, 100 );
    officeLight2.position.set( -40, 20, 40 );
    //officeLight2.castShadow = true;
    scene.add( officeLight2 );

    const officeLight3 = new THREE.PointLight( 0xffe7d3, 1, 100 );
    officeLight3.position.set( 40, 20, -40 );
    //officeLight3.castShadow = true;
    scene.add( officeLight3 );

    const officeLight4 = new THREE.PointLight( 0xffd3fd, 1, 100 );
    officeLight4.position.set( -40, 20, -40 );
    //officeLight4.castShadow = true;
    scene.add( officeLight4 );

    

    controls = new PointerLockControls( camera, document.body );

    const loader = new GLTFLoader();


    const blocker = document.getElementById( 'blocker' );
    const instructions = document.getElementById( 'instructions' );

    instructions.addEventListener( 'click', function () {

        controls.lock();

    } );

    controls.addEventListener( 'lock', function () {
        instructions.style.display = 'none';
        blocker.style.display = 'none';

    } );

    controls.addEventListener( 'unlock', function () {

        blocker.style.display = 'block';
        instructions.style.display = '';

    } );

    scene.add( controls.getObject() );

    const onKeyDown = function ( event ) {

        switch ( event.code ) {
            case 'KeyW':
                moveForward = true;
                break;

            case 'KeyA':
                moveLeft = true;
                break;

            case 'KeyS':
                moveBackward = true;
                break;

            case 'KeyD':
                moveRight = true;
                break;
        }

    };

    const onKeyUp = function ( event ) {

        switch ( event.code ) {
            case 'KeyW':
                moveForward = false;
                break;

            case 'KeyA':
                moveLeft = false;
                break;

            case 'KeyS':
                moveBackward = false;
                break;

            case 'KeyD':
                moveRight = false;
                break;
        }

    };

    document.addEventListener( 'keydown', onKeyDown );
    document.addEventListener( 'keyup', onKeyUp );


    // floor
    const floorTexture = new THREE.TextureLoader().load( "textures/FloorColor.jpg" );
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 4, 4 );
    const floorMaterial = new THREE.MeshStandardMaterial( { map: floorTexture } );

    let floorGeometry = new THREE.PlaneGeometry( 200, 200 );
    floorGeometry.rotateX( - Math.PI / 2 );
    const floor = new THREE.Mesh( floorGeometry, floorMaterial );
    scene.add( floor );
    
    const wallTexture = new THREE.TextureLoader().load( "textures/WallColor.jpg" );
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set( 4, 4 );
    const wallMaterial = new THREE.MeshStandardMaterial( { map: wallTexture } );

    let wallNorthGeometry = new THREE.PlaneGeometry( 200, 100 );
    const wallNorth = new THREE.Mesh( wallNorthGeometry, wallMaterial );
    wallNorth.position.z = -100;
    scene.add( wallNorth );

    
    let wallEastGeometry = new THREE.PlaneGeometry( 200, 100 );
    wallEastGeometry.rotateY( - Math.PI / 2 );
    const wallEast = new THREE.Mesh( wallEastGeometry, wallMaterial );
    wallEast.position.x = 100;
    scene.add( wallEast );

    let wallSouthGeometry = new THREE.PlaneGeometry( 200, 100 );
    wallSouthGeometry.rotateY( Math.PI );
    const wallSouth = new THREE.Mesh( wallSouthGeometry, wallMaterial );
    wallSouth.position.z = 100;
    scene.add( wallSouth );

    let wallWestGeometry = new THREE.PlaneGeometry( 200, 100 );
    wallWestGeometry.rotateY( Math.PI / 2 );
    const wallWest = new THREE.Mesh( wallWestGeometry, wallMaterial );
    wallWest.position.x = -100;
    scene.add( wallWest );

    const ceilingTexture = new THREE.TextureLoader().load( "textures/CeilingColor.jpg" );
    ceilingTexture.wrapS = THREE.RepeatWrapping;
    ceilingTexture.wrapT = THREE.RepeatWrapping;
    ceilingTexture.repeat.set( 4, 4 );
    const ceilingEmissive = new THREE.TextureLoader().load( "textures/CeilingEmissive.jpg" );
    ceilingEmissive.wrapS = THREE.RepeatWrapping;
    ceilingEmissive.wrapT = THREE.RepeatWrapping;
    ceilingEmissive.repeat.set( 4, 4 );
    const ceilingMaterial = new THREE.MeshStandardMaterial( { map: ceilingTexture, emissive: 0xffffff, emissiveMap: ceilingEmissive } );


    let ceilingGeometry = new THREE.PlaneGeometry( 200, 200 );
    ceilingGeometry.rotateX( Math.PI / 2 );
    const ceiling = new THREE.Mesh( ceilingGeometry, ceilingMaterial );
    ceiling.position.y = 30;
    scene.add( ceiling );

    const geometryTexture = new THREE.TextureLoader().load( "textures/GeometryColor.jpg" );
    geometryTexture.wrapS = THREE.RepeatWrapping;
    geometryTexture.wrapT = THREE.RepeatWrapping;
    geometryTexture.repeat.set( 2, 2 );
    const geometryMaterial = new THREE.MeshStandardMaterial( {map:geometryTexture} );

    let size = 8;
    // componentes geométricos
    let cubeGeometry = new THREE.BoxGeometry( size*1.5,size*1.5,size*1.5 );
    cube = new THREE.Mesh( cubeGeometry, geometryMaterial );
    cube.position.y = 15;
    cube.position.z = -90;
    scene.add( cube );
    cube2 = cube.clone();
    cube2.position.y = 15;
    cube2.position.z = 90;
    scene.add(cube2);


    let coneGeometry =  new THREE.ConeGeometry( size, 15, 100 );
    cone = new THREE.Mesh( coneGeometry, geometryMaterial );
    cone.position.x = 20;
    cone.position.y = 15;
    cone.position.z = -90;
    scene.add( cone );
    cone2 = cone.clone();
    cone2.position.y = 15;
    cone2.position.z = 90;
    scene.add(cone2);
    
    let dodeGeometry = new THREE.DodecahedronGeometry( size );
    dode = new THREE.Mesh( dodeGeometry, geometryMaterial );
    dode.position.x = 40;
    dode.position.y = 15;
    dode.position.z = -90;
    scene.add( dode );
    dode2 = dode.clone();
    dode2.position.y = 15;
    dode2.position.z = 90;
    scene.add(dode2);
    
    let icoGeometry = new THREE.IcosahedronGeometry( size );
    ico = new THREE.Mesh( icoGeometry, geometryMaterial );
    ico.position.x = -20;
    ico.position.y = 15;
    ico.position.z = -90;
    scene.add( ico );
    ico2 = ico.clone();
    ico2.position.y = 15;
    ico2.position.z = 90;
    scene.add(ico2);
    
    let octaGeometry = new THREE.OctahedronGeometry( size );
    octa = new THREE.Mesh( octaGeometry, geometryMaterial );
    octa.position.x = -40;
    octa.position.y = 15;
    octa.position.z = -90;
    scene.add( octa );
    octa2 = octa.clone();
    octa2.position.y = 15;
    octa2.position.z = 90;
    scene.add(octa2);

    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array( [
        -1.0, -1.0,  1.0,
        1.0, -1.0,  1.0,
        1.0,  1.0,  1.0,

        1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0, -1.0,  1.0
    ] );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.y = 10;
    mesh.position.z = -100;
    scene.add(mesh)


    //pre-made models
    loader.load( 'models/frank/scene.gltf', function ( gltf ) {
        gltf.scene.position.x = 80;
        gltf.scene.position.z = 40;
        gltf.scene.position.y = 10;
        gltf.scene.rotateY(-Math.PI / 2);
        gltf.scene.scale.set(size*0.8,size*0.8,size*0.8)
        scene.add( gltf.scene );
    
    }, undefined, function ( error ) { console.log(error)} );
    
    loader.load( 'models/egyptiancat/scene.gltf', function ( gltf ) {
        gltf.scene.position.x = 80;
        gltf.scene.position.y = 15;
        gltf.scene.position.z = -40;
        gltf.scene.rotateY(-Math.PI / 2);
        gltf.scene.scale.set(size*1.8,size*1.8,size*1.8)
        gltf.scene.traverse( child => {

            if ( child.material ) child.material.metalness = 0;
        
        } );
        scene.add( gltf.scene );
    
    }, undefined, function ( error ) { console.log(error)} );

    loader.load( 'models/granitehead/scene.gltf', function ( gltf ) {
        gltf.scene.position.x = -80;
        gltf.scene.position.z = 40;
        gltf.scene.position.y = -10;
        gltf.scene.rotateY(Math.PI+0.5);
        gltf.scene.scale.set(size,size,size)
        scene.add( gltf.scene );
    
    }, undefined, function ( error ) { console.log(error)} );

    loader.load( 'models/ibex/scene.gltf', function ( gltf ) {
        gltf.scene.position.x = -80;
        gltf.scene.position.z = -40;
        gltf.scene.position.y = 14;
        gltf.scene.rotateY(Math.PI/2);
        gltf.scene.scale.set(size*2,size*2,size*2)
        gltf.scene.traverse( child => {

            if ( child.material ) child.material.metalness = 0;
        
        } );
        scene.add( gltf.scene );
    
    }, undefined, function ( error ) { console.log(error)} );


    //

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );


    //cube, cone, dode, ico, octa
    cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
    cube2.rotation.x += 0.01;
	cube2.rotation.y += 0.01;

    cone.rotation.x += 0.01;
	cone.rotation.y += 0.01;
    cone2.rotation.x += 0.01;
	cone2.rotation.y += 0.01;

    dode.rotation.x += 0.01;
	dode.rotation.y += 0.01;
    dode2.rotation.x += 0.01;
	dode2.rotation.y += 0.01;

    ico.rotation.x += 0.01;
	ico.rotation.y += 0.01;
    ico2.rotation.x += 0.01;
	ico2.rotation.y += 0.01;

    octa.rotation.x += 0.01;
	octa.rotation.y += 0.01;
    octa2.rotation.x += 0.01;
	octa2.rotation.y += 0.01;

    const time = performance.now();

    if ( controls.isLocked === true ) {
        const delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = massa

        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveRight ) - Number( moveLeft );
        direction.normalize(); // movimento consistente

        if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

        controls.moveRight( - velocity.x * delta );
        controls.moveForward( - velocity.z * delta );

    }

    prevTime = time;

    renderer.render( scene, camera );

}
