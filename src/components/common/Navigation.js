import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.scss";

const Navigation = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <NavLink
            to="/contracts"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Contracts
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Customers
          </NavLink>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Navigation;
