import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import "./MyNavbar.css"

class MyNavbar extends React.Component {
  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Link to="/">
            <Navbar.Brand className="siteName">Home Plate</Navbar.Brand>
            </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Link to="/about">
                    <li class="nav-link">About</li>
                </Link>
                <Link to="/teams">
                    <li class="nav-link">Teams</li>
                </Link>
                <Link to="/players">
                    <li class="nav-link">Players</li>
                </Link>
                <Link to="/scores">
                    <li class="nav-link">Scores</li>
                </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
