import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class MyFooter extends React.Component {
    render() {
        return (
            <div className="MyFooter" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                <i className="fa fa-angle-up" />
                <p>Scroll to top</p>
            </div>
        );
    }
  }
  
  export default MyFooter;