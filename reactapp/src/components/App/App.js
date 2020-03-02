import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import logo from '../../logo.svg';
import './App.css';
import BookPage from '../Page/BookPage/BookPage'
import AboutPage from '../Page/AboutPage/AboutPage'
import HomePage from '../Page/HomePage/HomePage'
import MyNavbar from "../Navbar/MyNavbar";
import DetailedBookPage from '../Page/BookPage/DetailedBookPage';
require('dotenv').config()

function App() {
  return (
    <Router>
      <div className="App">
        <MyNavbar/>
        <header className="App-body">
          <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/books" exact component={BookPage}/>
            <Route path="/about" component={AboutPage}/>
            <Route path="/books/:isbn" component={DetailedBookPage}/>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
