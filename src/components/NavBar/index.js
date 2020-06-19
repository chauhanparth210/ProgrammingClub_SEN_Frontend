import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../asserts/pc-logo-2.png";
import "./style.scss";

import { connect } from "react-redux";
import { logoutUser } from "../../store/Actions/authActions";


const NavBar = (props) => {
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
          {props.isPCMember ? (<li className="navbar__link">
            <NavLink
              to="/create-blog"
              activeClassName="active__link"
              className="navbar__item"
            >
              Create Blog
            </NavLink>
          </li>) : null}
          <li className="navbar__link">
            <NavLink
              to="/blogs"
              activeClassName="active__link"
              className="navbar__item"
            >
              Blogs
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink
              to="/qna"
              activeClassName="active__link"
              className="navbar__item"
            >
              QnA
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink
              to="/contests"
              activeClassName="active__link"
              className="navbar__item"
            >
              Contests
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink
              to="/quiz"
              activeClassName="active__link"
              className="navbar__item"
            >
              Quiz
            </NavLink>
          </li>
          <li className="navbar__link">
            <a
              href="/compiler"
              target="_blank"
              activeClassName="active__link"
              className="navbar__item"
            >
              IDE
            </a>
          </li>
          {!props.isAuthenticated ? (
            <li className="navbar__link">
              <NavLink
                to="/login"
                activeClassName="active__link"
                className="navbar__item "
              >
                Log in
              </NavLink>
            </li>
          ) : (
            <button
              className="navbar__button navbar__link navbar__item "
              onClick={props.logoutUser}
            >
              Log Out
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isPCMember: state.auth.user.isPCMember
});

export default connect(mapStateToProps, { logoutUser })(NavBar);
