//==============================================================================

import React from 'react';

//==============================================================================

class About extends React.Component {

  state = {

  };

  render() {
    return (
      <div className="about_comp">
        <h1>
          Welcome to Harold Software <br/>
          A 3D modelling application <br/>
        </h1> 
        <br/>
        <p>
          This project is made with React JS and Three JS
        </p> 
        <p>
          3D objects file types need support for formatting. 
          Then a file buffer can import and export in the Three JS canvas display on screen. 
        </p>
        <p>
          Drawing, coloring, shading, and many more functions can be added and modelled after a program such as Gimp for Linux systems.
        </p>
        <p>
          There are the required features to have a working 3D modelling application. 
        </p>
      </div>
    );
  }
}

//==============================================================================

export default About;

//==============================================================================
