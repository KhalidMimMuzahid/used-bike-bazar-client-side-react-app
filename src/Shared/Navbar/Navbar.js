import React, { useContext } from "react";
import { Link } from "react-router-dom";
import bikeLogo from "../../Assets/Logo/bike-logo.png";
import { AuthContext } from "../../Context/AuthProvider";
const Navbar = () => {
  const { currentUser, logOut } = useContext(AuthContext);
  const handleSignOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  const navElement = (
    <>
      <li>
        <a>Item 1</a>
      </li>
      <li>
        <a>Item 2</a>
      </li>
      <li>
        <a>Item 3</a>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navElement}
          </ul>
        </div>
        <Link className="h-9">
          <img className="h-full" src={bikeLogo} alt="" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{navElement}</ul>
      </div>
      <div className="navbar-end">
        {!currentUser?.uid ? (
          <>
            <Link to="/signup" className="btn">
              sign Up
            </Link>
            <Link to="/signin" className="btn">
              sign In
            </Link>
          </>
        ) : (
          <>
            {" "}
            <button onClick={handleSignOut} className="btn">
              sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
