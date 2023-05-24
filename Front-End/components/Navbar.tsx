import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    // Perform logout logic here
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <a className="navbar-brand" href="/">
        Question-Bank
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {!isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/signin" className="nav-link">
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  to="/signin"
                  className="btn btn-primary btn-lg"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
