import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logOut } from "../../Store/Actions/auth";

export const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="">Developers</Link>
        </li>
        {auth.isAuthenticated !== true ? (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        ) : null}
        {auth.isAuthenticated === true ? (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <a onClick={logOut} href="#!">
                {" "}
                <i className="fas fa-sign-out-alt"></i>{" "}
                <span className="hide-sm">Log Out</span>
              </a>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
};
