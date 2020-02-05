import React from 'react';
import FetchModel from '../../models/fetchModel';
const THREE = require('three')
const OrbitControls = require('three-orbitcontrols')

const Profile = (props) => {

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//========================THREE_JS_SET_UP=======================================
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    45, window.innerWidth/window.innerHeight, 1, 10000
  );
  var renderer = new THREE.WebGLRenderer();

  var controls = new THREE.OrbitControls( camera, renderer.domElement );

  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//===========================GRID_LINES=========================================
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  var lines = new THREE.Geometry();
  var line_material = new THREE.LineBasicMaterial({color:'white'});
  var size = 10000, step = 8;
  for (var i = -size; i <= size; i+= step) {
    lines.vertices.push(new THREE.Vector3(-size, -0.004, i));
    lines.vertices.push(new THREE.Vector3(size, -0.004, i));

    lines.vertices.push(new THREE.Vector3(i, -0.004, -size));
    lines.vertices.push(new THREE.Vector3(i, -0.004, size));
  }
  var line = new THREE.Line( lines, line_material, THREE.LineSegments);
  scene.add(line)

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//============================CUBE==============================================
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  var geometry = new THREE.BoxGeometry( 10, 10, 10 );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
  var cube = new THREE.Mesh( geometry, material );
  cube.position.set(-50,200,200);
  scene.add( cube );

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//============================CUBE_2============================================
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  var geometry2 = new THREE.BoxGeometry( 10, 10, 10 );
  var material2 = new THREE.MeshBasicMaterial( { color: 0xbf3232 } );
  var cube2 = new THREE.Mesh( geometry2, material2 );
  scene.add( cube2 );
  cube2.position.set(50,50,50);

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  var cylinder_geometry = new THREE.CylinderGeometry(5,5,20,30);
  var cylinder_material = new THREE.MeshBasicMaterial({color: 0xffffff});
  var cylinder = new THREE.Mesh(geometry, material);
  scene.add(cylinder);

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  camera.position.z = 5;
  camera.position.set( 0, 20, 100 );
  controls.update();

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  var animate = function () {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    renderer.render( scene, camera );
  };

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    animate();
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  let randoColo = () => {
    return parseInt('0x' + (function co(lor){   return (lor +=
  [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])
  && (lor.length == 6) ?  lor : co(lor); })(''));
  }

  let addRandom = (event) => {
    event.preventDefault();
    for (let i = 0; i < 20; i++) {
      let rando_pos_neg = Math.random() < 0.5 ? -1 : 1;

      let x_size = Math.floor(Math.random() * Math.floor(70));
      let y_size = Math.floor(Math.random() * Math.floor(70));
      let z_size = Math.floor(Math.random() * Math.floor(70));

      let x_pos = Math.floor(Math.random() * Math.floor(300));
      let y_pos = Math.floor(Math.random() * Math.floor(300));
      let z_pos = Math.floor(Math.random() * Math.floor(300));

      let rando_geo = new THREE.CubeGeometry(x_size, y_size, z_size);
      let rando_mat = new THREE.MeshBasicMaterial({color: randoColo()});
      let rando_mesh = new THREE.Mesh(rando_geo, rando_mat);
      rando_mesh.position.set(
        x_pos * rando_pos_neg,
        y_pos * rando_pos_neg,
        z_pos * rando_pos_neg
      );

      scene.add(rando_mesh);
    }
  }

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  return (

    <div>
      <div className="profileInfo">

        <p><strong>Username:</strong> {props.user.username}</p>
        <p><strong>Email:</strong> {props.user.email}</p>

        <form id="addRandomObject">
          <button onClick={addRandom}>
            Add Random
          </button>
        </form>

      </div>
    </div>

  );

};

export default Profile;
