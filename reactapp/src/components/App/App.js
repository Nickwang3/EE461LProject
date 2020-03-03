import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import logo from '../../logo.svg';
import './App.css';
import MyNavbar from "../Navbar/MyNavbar";
import AboutPage from '../Page/AboutPage/AboutPage'
import HomePage from '../Page/HomePage/HomePage'

import TeamsPage from '../Page/TeamsPage/TeamsPage'
import PlayersPage from '../Page/PlayersPage/PlayersPage'
import ScoresPage from '../Page/ScoresPage/ScoresPage'

import DetailedBookPage from '../Page/BookPage/DetailedBookPage';
import BookPage from '../Page/BookPage/BookPage'

require('dotenv').config();

function App() {
  return (
    <Router>
      <div className="App">
        <MyNavbar/>
        <header className="App-body">
          <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/about" component={AboutPage}/>
            <Route path="/teams" component={TeamsPage}/>
            <Route path="/players" component={PlayersPage}/>
            <Route path="/scores" exact component={ScoresPage}/>
            <Route path="/books" component={BookPage}/>
            <Route path="/books/:isbn" component={DetailedBookPage}/>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
