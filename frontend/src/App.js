//==============================================================================
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Routes from './config/routes';
import NavBar from './components/Layout/NavBar';
//==============================================================================
import FetchModel from './models/fetchModel';
//==============================================================================

//==============================================================================

class App extends Component {

  state = {
    currentUser: localStorage.getItem("uid"), 
    windowHeight: undefined, 
    windowWidth: undefined
  };

  setCurrentUser = (token) => {
    // set user token
    this.setState({ currentUser: token });
    localStorage.setItem('uid', token);
  };

  reportWindowSize = () => {
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    })
    console.log("H: ", this.state.windowHeight);
    console.log("W: ", this.state.windowWidth)
    return window.innerWidth; 
  }

//==============================================================================
//============================Web_Logout_Routes=================================
//==============================================================================
/*
  window.location.href = 'http://haroldSoftware.com/';
  this.props.history.push('http://haroldSoftware.com/');
*/
//==============================================================================

  logout = () => {
    // handle logout
    localStorage.removeItem('uid');
    this.setState({ currentUser: null });
    window.location.href = '/login';
    this.props.history.push('/login');
  };

//==============================================================================

  componentDidMount() {
    window.addEventListener('resize', this.reportWindowSize.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.reportWindowSize.bind(this));
  }

  render () {
    if (this.state.windowWidth > 500 && this.state.windowWidth) {
      return (
        <>    
          <NavBar
            currentUser={this.state.currentUser}
            logout={this.logout}
          />     
          <div className="container">
            <Routes
              currentUser={this.state.currentUser}
              setCurrentUser={this.setCurrentUser}
            />
          </div>
        </>
      );
    } 
    else {
      return (
        <div className="container">
        <Routes
          currentUser={this.state.currentUser}
          setCurrentUser={this.setCurrentUser}
        />
      </div>
      )
    }

  };

}

//==============================================================================

export default App;

//==============================================================================
