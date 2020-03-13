import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../asserts/pc-logo-2.png";
import "./style.scss";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <NavLink to="/" className="navbar__logo--link">
          <img
            className="navbar__logo--img"
            src={Logo}
            alt="Logo"
            height="60"
            width="60"
          />
        </NavLink>
      </div>
      <div className="navbar__container">
        <ul className="navbar__items">
          <li className="navbar__link">
            <NavLink
              to="/create-blog"
              activeClassName="active__link"
              className="navbar__item"
            >
              Create Blog
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink
              to="/blog"
              activeClassName="active__link"
              className="navbar__item"
            >
              Blog
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink
              to="/login"
              activeClassName="active__link"
              className="navbar__item "
            >
              Log in
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
