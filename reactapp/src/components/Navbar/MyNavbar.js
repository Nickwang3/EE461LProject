import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import "./MyNavbar.css"

class MyNavbar extends React.Component {
  render() {
    return (
      <div>
        <Navbar className="bgColor" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Link to="/">
                  <li className="links">Home</li>
                </Link> 
                <Link to="/about">
                    <li class="links">About</li>
                </Link>
                <Link to="/teams">
                    <li class="links">Teams</li>
                </Link>
                <Link to="/players">
                    <li class="links">Players</li>
                </Link>
                <Link to="/scores">
                    <li class="links">Scores</li>
                </Link>
                <Link to="/tickets">
                    <li class="links">Tickets</li>
                </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
