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
      <NavLink exact to="/profile">
          Profile
      </NavLink>

      <NavLink
        to="/contacts">
          Contacts
      </NavLink>

      <div className="auth_links_logout" onClick={logout}>
          Logout
      </div>
    </div>
  );

  return (

    <nav>
      <div className="top_container">
        <strong className="harold_software"> HAROLD SOFTWARE . COM </strong>
        <br/>
        <br/>
        <div className="top_links">
          <a href="https://github.com/haroldSoftware"> GitHub </a>
	        <a href="https://haroldsoftware.github.io/platformGame_2D/"> Bounce Game (Chrome) </a>
	        <a href="https://profiles.generalassemb.ly/profiles/haroldulrich"> GA Profile </a>
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
