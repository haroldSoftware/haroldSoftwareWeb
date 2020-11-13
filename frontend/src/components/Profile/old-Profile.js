//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

import React from 'react';
import FetchModel from '../../models/fetchModel';
import Popup from '../Popup/Popup';

const THREE = require('three');
const OrbitControls = require('three-orbitcontrols');

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

class Profile extends React.Component {


//==============================================================================


  componentDidMount() {

    const width = 500;
    const height = 500;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75,width / height,0.1,1000);
    this.camera.position.y = 10;
    this.camera.position.z = 20;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('#000000');
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)
    let camera = this.camera;
    let renderer = this.renderer;
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
//==============================================================================
    const geometry1 = new THREE.BoxGeometry(1, 1, 1)
    const material1 = new THREE.MeshBasicMaterial({ color: '#433F81'     })
    this.cube1 = new THREE.Mesh(geometry1, material1)
    this.cube1.position.set(0,25,0);
    this.scene.add(this.cube1)
//==============================================================================

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//===========================GRID_LINES=========================================
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

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

    var geometry2 = new THREE.BoxGeometry( 10, 10, 10 );
    var material2 = new THREE.MeshBasicMaterial( { color: 0xbf3232 } );
    var cube2 = new THREE.Mesh( geometry2, material2 );
    this.scene.add( cube2 );
    cube2.position.set(50,50,50)

//==============================================================================

    this.start()
  }
   // ends componentDidMount()
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
   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
  }
  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

//==============================================================================






//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  state = {

  };

  constructor(props) {
    super(props);
    this.state = { showPopup: false };
  }

  togglePopup = (event) => {
    event.preventDefault();
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  nullFunc = (event) => {
    event.preventDefault();
    return null;
  }

  popUpFunc = (event) => {
    event.preventDefault();
    let popup = document.getElementById("myPopUp");
    popup.popuptext.toggle("show");
  }

  resetComponent = (event) => {
    event.preventDefault();
    this.camera.position.x = 3;
    this.camera.position.y = 8;
    this.camera.position.z = 50;
    this.camera.rotation.x = 0;
    this.camera.rotation.y = 0;
    this.camera.rotation.z = 0;
  }

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  nullFunc = (event) => {
    event.preventDefault();
    return null;
  }

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//=================================RANDOM_COLOR=================================
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  randoColo = () => {
    return parseInt('0x' + (function co(lor) {
      return (lor += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
        [Math.floor(Math.random()*16)])
      && (lor.length == 6) ?  lor : co(lor);
    })('')
    );
  }

  getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//================================EVENT_FUNCTION================================
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  addRandom = (event) => {
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
      let rando_mat = new THREE.MeshBasicMaterial({color: this.getRandomColor()});
      let rando_mesh = new THREE.Mesh(rando_geo, rando_mat);
      rando_mesh.position.set(
        x_pos * rando_pos_neg,
        y_pos * rando_pos_neg,
        z_pos * rando_pos_neg
      );

      this.scene.add(rando_mesh);
    }
  }

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//===========================REACT_COMPONENT_RENDERING==========================
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  render() {
    return (
      <div>
      <div>
        <div
          className="home3D"

          ref={(mount) => { this.mount = mount }}
        >
        </div>
        <span className="buttonBarHome3D">
          <button onClick={this.resetComponent}>
            Reset
          </button>
        </span>
      </div>
      <div>
        <div className="profileInfo">

          <form>
            <button onClick={this.addRandom}>
              Add Random Cubes
            </button>

          </form>
          <br/>

          {this.state.showPopup ?
            <Popup
            text='This Is Your Pop Up Component'
            closePopup={this.togglePopup}
            />
            : null
          }

        </div>
      </div>

        <div className="enterObj">
          <label>Top Text</label>
          <input type="text" placeholder="type...">
          </input> <br/>

          <label>Bottom Text</label>
          <input type="text" placeholder="type...">
          </input> <br/>

          <label>Animation</label>
          <select>
                  <option value="Stay Still">Stay Still</option>
                  <option value="Spin">Spin</option>
                  <option value="Grow and Shrink">Grow and Shrink</option>
                  <option value="Rotate">Rotate</option>
          </select> <br/>

          <label>Color</label>
          <select>
                  <option value="Red">Red</option>
                  <option value="Green">Green</option>
                  <option value="Blue">Blue</option>
                  <option value="Random">Random</option>
          </select> <br/>

          <button><strong>Add Object</strong></button>
        </div>

      </div>

    );
  }

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

};

export default Profile;

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//================================END_ALL=======================================
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
