import React from "react";
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand">
            Navbar
          </a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <div class="nav-item active">
                <Link to="/">
                    <li class="nav-link">Home</li>
                </Link>
              </div>
              <div class="nav-item active">
                <Link to="/about">
                    <li class="nav-link">About</li>
                </Link>
              </div>
              <div class="nav-item active">
                <Link to="/books">
                    <li class="nav-link">Books</li>
                </Link>
              </div>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
