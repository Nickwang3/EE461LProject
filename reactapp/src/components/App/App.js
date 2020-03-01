import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import logo from '../../logo.svg';
import './App.css';
import BookPage from '../Page/BookPage/BookPage'
import AboutPage from '../Page/AboutPage/AboutPage'
import HomePage from '../Page/HomePage/HomePage'
import MyNavbar from "../Navbar/MyNavbar";
require('dotenv').config()

function App() {
  return (
    <Router>
      <div className="App">
        <MyNavbar/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/books" component={BookPage}/>
            <Route path="/about" component={AboutPage}/>
          </Switch>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </Router>
  );
}

export default App;
