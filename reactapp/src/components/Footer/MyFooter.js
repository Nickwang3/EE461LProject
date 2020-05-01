import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './MyFooter.css'

class MyFooter extends React.Component {
    render() {
        return (
            <div>
            <Navbar className="bgColor" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/">
                                <li className="footerLinks">Home</li>
                            </Link> 
                            <Link to="/about">
                                <li class="footerLinks">About</li>
                            </Link>
                            <Link to="/teams">
                                <li class="footerLinks">Teams</li>
                            </Link>
                            <Link to="/players">
                                <li class="footerLinks">Players</li>
                            </Link>
                            <Link to="/scores">
                                <li class="footerLinks">Scores</li>
                            </Link>
                            <Link to="/tickets">
                                <li class="footerLinks">Tickets</li>
                            </Link>
                        </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        );
    }
  }
  
  export default MyFooter;