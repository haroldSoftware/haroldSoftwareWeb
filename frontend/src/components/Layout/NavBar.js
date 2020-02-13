import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ currentUser, logout }) => {
  const links = (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/register">Register</NavLink>
      </li>
    </>
  );

  const authLinks = (
    <>
      <li className="nav-item">
        <NavLink
          className="nav-link"
          exact to="/profile">
            Profile
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className="nav-link"
          exact to="/home">
            Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className="nav-link"
          to="/contacts">
            Contacts
        </NavLink>
      </li>
      <li className="nav-item">
        <span
          className="nav-link"
          style={{cursor: 'pointer'}}
          onClick={logout}>
            Logout
        </span>
      </li>
    </>
  );

  return (
    <nav>
      <div className="top_container">
        <strong>3-D Objects App </strong> <br/>
        haroldSoftware@github.com <br/>
      </div>
      <div>
        <br/>
      </div> 
      <div className="navbar_collapse">
        <ul className="navbar_authlinks">
          { currentUser ? authLinks : links }
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
