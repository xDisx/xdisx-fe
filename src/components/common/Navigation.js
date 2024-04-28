import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          MyApp
        </NavLink>
        <div className="navbar-nav">
          <NavLink
            className="nav-item nav-link"
            to="/contracts"
            activeClassName="active"
          >
            Contract Management
          </NavLink>
          <NavLink
            className="nav-item nav-link"
            to="/customers"
            activeClassName="active"
          >
            Customer Management
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
