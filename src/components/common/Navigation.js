import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navigation.scss";
import AuthContext from "../../AuthContext";

const Navigation = ({ username }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
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
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Products
            </NavLink>
          </li>
          <li className="logout-button-container">
            <button onClick={handleLogout} className="logout-button">
              Log Out
            </button>
          </li>
        </ul>
      </nav>
      {username && (
        <div className="logged-in-info">Logged in as: {username}</div>
      )}
    </>
  );
};

export default Navigation;
