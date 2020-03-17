import React, { Component } from 'react';
import FetchModel from '../../models/fetchModel';

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleLoginSubmit = (event) => {
    if (!this.state.username || !this.state.password) {
      alert("Error, enter valid username and password")
      return
    }
    event.preventDefault();

    const userLogin = this.state;
    FetchModel.loginUser(userLogin)
    .then(data => {
      console.log("Success!", data);
      this.props.setCurrentUser(data.signedJwt);
      this.props.history.push('/profile');
    })
    .catch(err => {
      this.setState({ error: err })
    });
  };

  render() {
    return (
      <div className="login_comp">

        <section
          id="login"
          className="login_section"
        >
          <h2>Login</h2>
          <form onSubmit={this.handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="email">Username</label>
              <input
                type="username"
                id="username"
                name="username"

                onChange={this.handleChange}
                className="login_username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Password</label>
              <input
                type="password"
                id="password"
                name="password"

                onChange={this.handleChange}
                className="password_login"
              />
            </div>
            <button type="submit" className="submit_login">Login</button>
          </form>
        </section>

      </div>
    );
  };
};

export default Login;
