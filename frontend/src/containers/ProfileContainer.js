import React, { Component } from 'react';
import Profile from '../components/Profile/Profile';
import FetchModel from '../models/fetchModel';

class ProfileContainer extends Component {
  state = {
    user: {},
    newUser: {},
    x: "",
    y: "",
    z: "",
    error: {},
    createdObject: {
      x: "",
      y: "",
      z: ""
    }
  };

  createdObjectsArray = [];

//==============================================================================

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCreateObject = (event) => {
    event.preventDefault();
    let newObjectInput = {
      username: this.state.user.username,
      x: this.state.x,
      y: this.state.y,
      z: this.state.z
    };
    this.state.createdObject.x = newObjectInput.x;
    this.state.createdObject.y = newObjectInput.y;
    this.state.createdObject.z = newObjectInput.z;
    FetchModel.createObjects(newObjectInput).then(data => {
      this.setState({ newUser: data })
    })
    .catch(err => {
      this.setState({ error: err })
    });
    this.createdObjectsArray.push(this.state.createdObject);
  }; 


//==============================================================================

  componentDidMount() {
    fetch(`http://localhost:3300/profile`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('uid')}`
      }
    })
    .then(res => res.json())
    .then(parsedData => {
      this.setState({ user: parsedData[0] })
    })
    .catch(err => console.log(err))
  };

  render() {
    return <Profile
            user={this.state.user}
            handleCreateObject={this.handleCreateObject}
            handleChange={this.handleChange}
            state={this.state}
            createdObject={this.state.createdObject}
            createdObjectsArray={this.createdObjectsArray}
          />;
  };
};

export default ProfileContainer;
