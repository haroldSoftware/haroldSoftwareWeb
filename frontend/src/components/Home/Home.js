import React, { Component } from 'react';
const THREE = require('three')
const OrbitControls = require('three-orbitcontrols')

class Home extends Component {

  render() {

    return (
      <div>
        <h2 className="home_tag">



                                 =================== <br/>
                      :::::::::::::::::::::::::::::::::::::::::: <br/>
                           ||||||||||||HOME PAGE|||||||||||| <br/>
                      :::::::::::::::::::::::::::::::::::::::::: <br/>
                                 =================== <br/>



        </h2>
        <body className="home_page">
          ========================== <br/>
          A place to make, save, and share 3-D objects
          in your own 3-D world. <br/>
          ========================== <br/>
          In The Works <br/>
          ========================== <br/>
          * STL and VRML file format Uploading <br/>
          * View and render with orbital controls <br/>
          * Add and Remove objects <br/>
          * Colors, shading, textures <br/>
          * Importing snippets and sizes <br/>

        </body>
        <div className="home_background">
          <img id="images_back2"
            src={require('./images/back2.jpg')}
          />
        </div>

      </div>
    )
  }
}

export default Home;

//==============================================================================
