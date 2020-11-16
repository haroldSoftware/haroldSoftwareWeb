//==============================================================================

import React from 'react';
import { NavLink } from 'react-router-dom';

//==============================================================================

const NavBar = ({ currentUser, logout }) => {

  const links = (
    <div className="nav_links">
      <NavLink exact to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/about">About</NavLink>
    </div>
  );

  const authLinks = (
    <div className="auth_links">
      <NavLink exact to="/profile"> Profile </NavLink>
      <NavLink to="/contacts"> Contacts </NavLink>
      
      <button className="auth_links_logout" onClick={logout}> Logout </button>
    </div>
  );

  return (

    <nav>
      <div className="top_nav_container">
        <strong className="harold_software"> HAROLD SOFTWARE </strong>
        <br/>
        <br/>
        <div className="top_links">
          <a href="https://github.com/haroldSoftware"> GitHub </a>
          {/* <a href="https://stackoverflow.com/users/14160696/hygtfrde"> StackOverflow </a> */}
          <a href="https://www.linkedin.com/in/harold-ulrich-a84123153/"> LinkedIn </a>
          <address>
            <a href="mailto:harold9188@gmail.com"> Email</a>
          </address>
        </div>
      </div>
      <div>
        <br/>
      </div>
      <div>
        <ul>
          { currentUser ? authLinks : links }
        </ul>
      </div>
    </nav>

  );
};

//==============================================================================

export default NavBar;

//==============================================================================
