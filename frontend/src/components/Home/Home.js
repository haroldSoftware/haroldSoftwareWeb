//==============================================================================
//==============================================================================
//==============================================================================

import React, { Component } from 'react'; import ReactDom from 'react-dom';
import Popup from '../Popup/Popup';

import DragControls from 'drag-controls';

const THREE = require('three');
const OrbitControls = require('three-orbitcontrols');

DragControls.install({THREE: THREE})

// May produce error by using code below: "THREE not defined in DragControls.js"
// import DragControls from "../../../node_modules/three/examples/js/controls/DragControls.js";

// May have to attach the module imported to the actual THREE object
// const DragControls = require("drag-controls")(THREE);
// Or
// const DragControls = require('drag-controls');
// Or

//==============================================================================

class Home extends Component {

//==============================================================================

 state = {
  windowHeight:  window.innerHeight, 
  windowWidth: window.innerWidth
 };

//==============================================================================
//==================================POPUP=======================================
//==============================================================================

 popUpFunc = (event) => {
   event.preventDefault();
   let popup = document.getElementById("myPopUp");
   popup.popuptext.toggle("show");
 }

 togglePopup = (event) => {
   event.preventDefault();
   this.setState({
     showPopup: !this.state.showPopup
   });
 }

//==============================================================================

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//=============================THREE_JS_SET_UP==================================
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// For Height and Width of 3D Canvas, you can also use this.mount.clientWidth
// or Height as the values
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//==============================================================================
//=========================componentDidMount====================================
//==============================================================================

componentDidMount() {

//==============================================================================
//========================SCENE_CAMERA_RENDER===================================
//==============================================================================

  const width = 500;
  const height = 500;

  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(75,width / height,0.1,1000);
  this.camera.position.x = 0;
  this.camera.position.y = 70;
  this.camera.position.z = 110;
  this.renderer = new THREE.WebGLRenderer({ antialias: true });
  this.renderer.setClearColor('#000000');
  this.renderer.setSize(width, height);

  let camera = this.camera;
  let renderer = this.renderer;

//==============================================================================
//=============================MOUNT============================================
//==============================================================================

  this.mount.appendChild(this.renderer.domElement)

//==============================================================================
//========================MOUNT_Renderer_2======================================
//==============================================================================

  // CURRENTLY BLANK CANVAS
  // CSS styles

  // this.renderer2 = new THREE.WebGLRenderer({ antialias: true });
  // this.renderer2.setClearColor('#000000');
  // this.renderer2.setSize(width, height);
  // this.mount.appendChild(this.renderer2.domElement)

//==============================================================================
//=============================Orbit_Controls===================================
//==============================================================================


  var controls = new THREE.OrbitControls( camera, renderer.domElement );


//==============================================================================
//=============================Drag_Objects=====================================
//==============================================================================

  let dragObjects = [];

  var dragGeometry = new THREE.BoxGeometry(12, 12, 12);
  var dragMaterial = new THREE.MeshNormalMaterial();

  var dragMesh = new THREE.Mesh(dragGeometry, dragMaterial);
  this.scene.add(dragMesh);
  dragMesh.position.set(-12,0,0);
  dragObjects.push(dragMesh);

//==============================================================================
//=============================Drag_Controls====================================
//==============================================================================

  // var controls = new DragControls( objects, camera, renderer.domElement );

  const dragControls = new DragControls(
    dragObjects, camera, renderer.domElement
  );
  dragControls.addEventListener('dragstart', function() {
    controls.enabled = false;
  });
  dragControls.addEventListener('dragend', function() {
    controls.enabled = true;
  });

//==============================================================================
//=================================Circle=======================================
//==============================================================================

const circle_radius = 7;  
const circle_segments = 24;  
const circle_thetaStart = Math.PI * 0.25;  
const circle_thetaLength = Math.PI * 1.5;

const circle_geometry = new THREE.CircleBufferGeometry(circle_radius, circle_segments, circle_thetaStart, circle_thetaLength);
const circle_material = new THREE.MeshBasicMaterial({ color: '#433F81' });

this.circle1 = new THREE.Mesh(circle_geometry, circle_material);
this.circle1.position.set(0,30,0); 
this.scene.add(this.circle1);

//==============================================================================
//================================Cone_Buffer===================================
//==============================================================================

const coneBuff_radius = 6;  
const coneBuff_height = 8;  
const coneBuff_radialSegments = 16;  
const coneBuff_heightSegments =  6;  
const coneBuff_openEnded = true;  
const coneBuff_thetaStart = Math.PI * 0.96;  
const coneBuff_thetaLength = Math.PI * 2.00; 
const coneBuff_geometry = new THREE.ConeBufferGeometry(
  coneBuff_radius, 
  coneBuff_height, 
  coneBuff_radialSegments, 
  coneBuff_heightSegments, 
  coneBuff_openEnded, 
  coneBuff_thetaStart, 
  coneBuff_thetaLength
);

const coneBuff_material = new THREE.MeshBasicMaterial({ color: '#288AC9' }); 
this.coneBuff = new THREE.Mesh(coneBuff_geometry, coneBuff_material);
this.coneBuff.position.set(12,30,0); 
this.scene.add(this.coneBuff);

//==============================================================================
//===============================Cylinder_Buff==================================
//==============================================================================



//==============================================================================
//=============================SPINNING_CUBE====================================
//==============================================================================

  const geometry1 = new THREE.BoxGeometry(3, 3, 3);
  const material1 = new THREE.MeshBasicMaterial({ color: '#433F81' });
  this.cube1 = new THREE.Mesh(geometry1, material1);
  this.cube1.position.set(0,-7,0);
  this.scene.add(this.cube1);

//==============================================================================
//==============================================================================
//==============================================================================


//==============================================================================
//==============================DODECAHEDRON====================================
//==============================================================================

var dodecGeom = new THREE.DodecahedronGeometry(9, 3);
var dodecMat = new THREE.MeshBasicMaterial({ color: '#433F81' });
this.dodecMesh = new THREE.Mesh(dodecGeom, dodecMat);
this.dodecMesh.position.set(10,50,-20);
this.scene.add(this.dodecMesh);

var geo = new THREE.EdgesGeometry(dodecGeom);
var mat = new THREE.LineBasicMaterial( { color: "white", linewidth: 2 } );
var wires = new THREE.LineSegments( geo, mat );
this.dodecMesh.add( wires );

dragObjects.push(this.dodecMesh);


//==============================================================================
//===============================LETTERS========================================
//==============================================================================

  // let loader = new THREE.FontLoader();
  // let font = loader.parse(fontJSON);
  // let geometry = new THREE.TextGeometry("Hello World",{font: font, size: 1, height:1 });
  //
  // let material = new THREE.MeshBasicMaterial({color:0xffffff});
  // let text = new THREE.Mesh(geometry, material);
  // text.position.x = 1;
  // this.scene.add(text)


//==============================================================================
//==============================LIGHTING========================================
//==============================================================================

  
  this.scene.add( new THREE.AmbientLight( 0x0f0f0f ) );

  var light = new THREE.SpotLight( 0xffffff, 1.5 );
  light.position.set( 0, 500, 2000 );

  this.scene.add(light);
  

//==============================================================================
//==============================SHADOWS=========================================
//==============================================================================

  // object.castShadow = true;
  // object.receiveShadow = true;

//==============================================================================
//=============================WHITE_THREE======================================
//==============================================================================

  const geometry3 = new THREE.BoxGeometry(7, 1, 1)
  const material3 = new THREE.MeshBasicMaterial({ color: '#FFFFFF'     })
  this.cube3 = new THREE.Mesh(geometry3, material3)
  this.cube3.position.set(0,9,0);
  this.scene.add(this.cube3)

  const geometry3a = new THREE.BoxGeometry(7, 1, 1)
  const material3a = new THREE.MeshBasicMaterial({ color: '#FFFFFF'     })
  this.cube3a = new THREE.Mesh(geometry3a, material3a)
  this.cube3a.position.set(0,5,0);
  this.scene.add(this.cube3a)

  const geometry3b = new THREE.BoxGeometry(7, 1, 1)
  const material3b = new THREE.MeshBasicMaterial({ color: '#FFFFFF'     })
  this.cube3b = new THREE.Mesh(geometry3b, material3b)
  this.cube3b.position.set(0,1,0);
  this.scene.add(this.cube3b)

  const geometry3c = new THREE.BoxGeometry(1, 9, 1)
  const material3c = new THREE.MeshBasicMaterial({ color: '#FFFFFF'     })
  this.cube3c = new THREE.Mesh(geometry3c, material3c)
  this.cube3c.position.set(4,5,0);
  this.scene.add(this.cube3c)

//==============================================================================
//==============================GRID_LINES======================================
//==============================================================================

  var lines = new THREE.Geometry();
  var line_material = new THREE.LineBasicMaterial({color:'white'});
  var size = 10000, step = 16;
  for (var i = -size; i <= size; i+= step) {
    lines.vertices.push(new THREE.Vector3(-size, -0.004, i)); // -0.004
    lines.vertices.push(new THREE.Vector3(size, -0.004, i)); // -0.004

    lines.vertices.push(new THREE.Vector3(i, -0.004, -size)); // -0.004
    lines.vertices.push(new THREE.Vector3(i, -0.004, size)); // -0.004
  }
  var line = new THREE.Line(lines, line_material, THREE.LineSegments);
  this.scene.add(line)

//==============================================================================
//=====================END_componentDidMount====================================
//==============================================================================

  this.start()
}

//==============================================================================
//==============================================================================
//==============================================================================

componentWillUnmount(){
  this.stop()
  this.mount.removeChild(this.renderer.domElement)
}
start = () => {
  if (!this.frameId) {
    this.frameId = requestAnimationFrame(this.animate)
  }
}
stop = () => {
  cancelAnimationFrame(this.frameId)
}
animate = () => {
 this.cube1.rotation.x += 0.01
 this.cube1.rotation.y += 0.01

 this.cube3.rotation.x += 0.02;
 this.cube3.rotation.y += 0.02;
 this.cube3a.rotation.x += 0.02;
 this.cube3a.rotation.y += 0.02;
 this.cube3b.rotation.x += 0.02;
 this.cube3b.rotation.y += 0.02;
 this.cube3c.rotation.x += 0.02;
 this.cube3c.rotation.y += 0.02;

 this.renderScene()
 this.frameId = window.requestAnimationFrame(this.animate)
}
renderScene = () => {
  this.renderer.render(this.scene, this.camera)
}
resetComponent = (event) => {
  event.preventDefault();
  this.camera.position.x = 0;
  this.camera.position.y = 0;
  this.camera.position.z = 30;
  this.camera.rotation.x = 0;
  this.camera.rotation.y = 0;
  this.camera.rotation.z = 0;
}
//==============================================================================
//==============================End_Three_JS====================================
//==============================================================================

render(){
  return(
    <div>
      <div className="threeJSDemo">
        <text> 3D Modelling Demo </text> 
      </div> <br/>
      <text className="threeJSDemo">TOOLS</text> <br/> 
      <nav className="tools_nav">
        <select className="tools_nav_item">
          <option selected disabled hidden>Import</option>
          <option className="tools_nav_link" >Files</option>
          <option className="tools_nav_link" >URL</option>
          <option className="tools_nav_link" >.zip</option>
        </select>
        <select className="tools_nav_item">
          <option selected disabled hidden>Export</option>
          <option className="tools_nav_link" >raw</option>
          <option className="tools_nav_link" >javaScript</option>
          <option className="tools_nav_link" >.zip</option>
        </select>
        <select className="tools_nav_item">
          <option selected disabled hidden>Move</option>
          <option className="tools_nav_link" >Drag On</option>
          <option className="tools_nav_link" >Drag Off</option>
        </select>
        <select className="tools_nav_item">
          <option selected disabled hidden>Select</option>
          <option className="tools_nav_link" >Single</option>
          <option className="tools_nav_link" >Multiple</option>
          <option className="tools_nav_link" >Custom</option>
        </select>
        <button className="tools_nav_item">
          Copy
        </button>
        <button className="tools_nav_item">
          Remove
        </button>
        <button className="tools_nav_item">
          Undo
        </button>
        <button className="tools_nav_item">
          Redo
        </button>
        <select className="tools_nav_item">
          <option selected disabled hidden>Letters</option>
          <option className="tools_nav_link" >lower</option>
          <option className="tools_nav_link" >upper</option>
          <option className="tools_nav_link" >symbols</option>
          <option className="tools_nav_link" >font import</option>
        </select>
        <select className="tools_nav_item">
          <option selected disabled hidden>Lines</option>
          <option className="tools_nav_link" >Draw</option>
          <option className="tools_nav_link" >Straight</option>
          <option className="tools_nav_link" >Points</option>
        </select>
        <select className="tools_nav_item">
          <option selected disabled hidden>Shapes</option>
          <option className="tools_nav_link" >Box</option>
          <option className="tools_nav_link" >Square</option>
          <option className="tools_nav_link" >Rectangle</option>
          <option className="tools_nav_link" >Triangle</option>
          <option className="tools_nav_link" >Circle</option>
          <option className="tools_nav_link" >Elipse</option>
          <option className="tools_nav_link" >Conic</option>
          <option className="tools_nav_link" >Parabolic</option>
          <option className="tools_nav_link" >Parametric</option>
          <option className="tools_nav_link" >Cylinder</option>
          <option className="tools_nav_link" >Dodecahedron</option>
          <option className="tools_nav_link" >Icosahedron</option>
          <option className="tools_nav_link" >Octahedron</option>
          <option className="tools_nav_link" >Polyhedron</option>
          <option className="tools_nav_link" >Bezier</option>
          <option className="tools_nav_link" >Lathe</option>
        </select>
      </nav>

      <span className="add_new">
        <button>Add New</button>          
        <text className="at_pos">at position</text>
        <input type="text" size="5" placeholder="X"></input> 
        <input type="text" size="5" placeholder="Y"></input> 
        <input type="text" size="5" placeholder="Z"></input>
      </span> 

      <div className="mainHome"> 
        <div className="home3D" ref={(mount) => { this.mount = mount }}>
        </div>
      </div>

      <button className="popup" onClick={this.togglePopup.bind(this)}>
        HELP
      </button>

      {this.state.showPopup ?
        <Popup
        closePopup={this.togglePopup}
        />
        : null
      }
      <button onClick={this.resetComponent}>
          Reset Camera
      </button>


      <br/>
      <br/> 


    </div>
  )
}
}

export default Home;

//==============================================================================