import React from 'react';

class Popup extends React.Component {

  state = {

  };

  render() {
    return (
      <div>
        <div>
          <h1>{this.props.text}</h1>
            <strong className="controls_title"> Controls </strong> <br/>
            <div className="controls_text"> 
              Drag Left Mouse - Change Camera Rotation <br/>
              Drag Might Mouse - Change Camera Position <br/>
              Scroll - Zoom In and Out <br/>
            </div>
          <button onClick={this.props.closePopup}>
            close
          </button>
        </div>
      </div>
    );
  }
}


export default Popup;
