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
          A place to make, save, and share 3-D objects
          in your own 3-D world.
        </body>
        <div className="home_background">
          <img
            src={require('./images/back2.jpg')}
          />
        </div>

      </div>
    )
  }
}

export default Home;

//==============================================================================
