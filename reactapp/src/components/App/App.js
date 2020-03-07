import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import logo from '../../logo.svg';
import './App.css';
import MyNavbar from "../Navbar/MyNavbar";
import MyFooter from "../Footer/MyFooter"
import AboutPage from '../Page/AboutPage/AboutPage'
import HomePage from '../Page/HomePage/HomePage'

import TeamsPage from '../Page/TeamsPage/TeamsPage'
import PlayersPage from '../Page/PlayersPage/PlayersPage'
import ScoresPage from '../Page/ScoresPage/ScoresPage'

import DetailedTeamPage from '../Page/TeamsPage/DetailedTeamPage';
import DetailedPlayerPage from '../Page/PlayersPage/DetailedPlayerPage';

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
            <Route path="/teams" exact component={TeamsPage}/>
            <Route path="/teams/:team_id" component={DetailedTeamPage}/>
            <Route path="/players" exact component={PlayersPage}/>
            <Route path="/players/:player_id" component={DetailedPlayerPage}/>
            <Route path="/scores" exact component={ScoresPage}/>
          </Switch>

          <MyFooter />
        </header>
      
      </div>
    </Router>
  );
}

export default App;
