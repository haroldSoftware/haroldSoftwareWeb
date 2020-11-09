//==============================================================================

import React, { Component } from 'react';
import FetchModel from '../../models/fetchModel';

//==============================================================================

class Register extends Component {
  state = {
    users: [],
    username: '',
    email: '',
    password: '',
    password2: '',
    errors: null
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleRegisterSubmit = (event) => {
    if (this.state.password != this.state.password2) {
      alert("Password do not match");
    }
    else {
      event.preventDefault()
      let inputUser = {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
      }
      FetchModel.createRegister(inputUser).then(data => {
        this.setState({ users: data }, () => {
          this.props.history.push('/login')
        })
      })
    }
  };

  render() {
    return (
      <div className="register_comp">
        <section
          id="register"
          className="register_section"
        >
          <h2 className="mb-4">Register</h2>

          <form onSubmit={this.handleRegisterSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="username"
                id="username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                className="register_username" placeholder="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                className="form-control form-control-lg"
                placeholder="@.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                className="form-control form-control-lg"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password"
                id="password2"
                name="password2"
                value={this.state.password2}
                onChange={this.handleChange}
                className="form-control form-control-lg"
              />
            </div>
            <button
              type="submit"
              className="button_main_register"
            >
                Register
            </button>
          </form>

        </section>
      </div>
    );
  };
};

//==============================================================================

export default Register;

//==============================================================================
