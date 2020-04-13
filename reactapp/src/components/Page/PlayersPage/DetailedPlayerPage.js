import React from "react";
import ApiService from "../../../api/ApiService";
import { withRouter } from 'react-router';
import { Container, Row, Nav, NavLink, NavItem, TabContent, TabPane} from 'reactstrap'
import PitcherTable from "./PitcherTable";
import HitterTable from "./HitterTable";
import ScoreBoard from "../ScoresPage/Scoreboard"
import './DetailedPlayerPage.css'
import { Link } from 'react-router-dom';

const monthMapping = {'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06','Jul': '07', 'Aug': '08', 
                      'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'} 
const apiService = new ApiService();

class DetailedPlayerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      player: null,
      activeTab: "1",
      stats: null,
      team_name: null,
      weekly_games: null
    };

    this.switchTabs = this.switchTabs.bind(this);
  }

  componentDidMount() {
      apiService
        .getPlayerById(this.props.match.params.player_id)
        .then(result => {
            this.setState({
                player: result.data
            })
        })
        .then(() => {
          if (this.state.player.position.includes("P")) {
            return apiService.getPitcherStatsById(this.state.player.player_id)
          } 
          else {
            return apiService.getHitterStatsById(this.state.player.player_id)
          }
        })
        .then(res => {
          this.setState({
            stats: res.data
          })
        })
        .then(() => {
          return apiService.getTeamById(this.state.player.team);
        })
        .then(res => {
          this.setState({
            team: res.data,
          })
        })
        .then(() => {
          return apiService.getWeeklyGamesByDateAndTeam(this.formatDate(new Date()), this.state.player.team);
        })
        .then(res => {
          this.setState({
            weekly_games: res.data,
            isLoaded: true
          })
        })
  }

  formatDate(date) {
    var temp = (date.toString().split(" "))
    return (temp[3] + "-" + monthMapping[temp[1]] + "-" + temp[2])
  }

  switchTabs(tabId) {
    this.setState({
      activeTab: tabId
    });
  }

  render() {

    const navItemStyle = {
      color: "white",
      marginLeft: "25px",
      marginRight: "25px"
    }

    const { error, isLoaded, player, stats, activeTab, team, weekly_games } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>


          <Container className="detailedPlayerContainer">

            <Row className="playerPictureRow">
              <img className="playerPictureStyle" src={player.picture}></img>
            </Row>
            <Row className="playerNameRow">
              <h1 className="titleStyle">{player.name}</h1>
            </Row>


            <Row className="playerInfoRow">

              <Row className="navRow">
                <Nav>
                  <NavItem>
                    <NavLink onClick={() => this.switchTabs("1")} style={navItemStyle}>About</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={() => this.switchTabs("2")} style={navItemStyle}>Stats</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={() => this.switchTabs("3")} style={navItemStyle}>Schedule</NavLink>
                  </NavItem>
                </Nav>
              </Row>

              <Row className="contentRow">
                <TabContent activeTab={activeTab}>

                  <TabPane tabId="1">
                    <Row>
                      <Link to={`/teams/${team.team_id}`}><h5 style={{width: "100%",marginBottom: "10px"}}>{team.name} </h5></Link>
                      <h5 style={{width: "100%",marginBottom: "10px"}}> Position: {player.position} </h5>
                      <h5 style={{width: "100%",marginBottom: "10px"}}> Number: {player.number} </h5>
                      <h5 style={{width: "100%",marginBottom: "10px"}}> Age: {player.age} </h5>
                      <h5 style={{width: "100%",marginBottom: "10px"}}> Height: {player.height} </h5>
                      <h5 style={{width: "100%",marginBottom: "10px"}}> Weight: {player.weight} </h5>
                    </Row>
                  </TabPane>

                  <TabPane tabId="2">
                    <Row className="statsRow"> 
                      {(this.state.player.position.includes("P") ? <PitcherTable stats={stats}/>:<HitterTable stats={stats}/>)}
                    </Row>
                  </TabPane>

                  <TabPane tabId="3">
                    <Row className="scoreBoardsRow">
                      {weekly_games.map(game => (<ScoreBoard game={game}/>))}
                    </Row>
                  </TabPane>
                  
                </TabContent>
              </Row>
              
            </Row>
          </Container>
        </div>
      );
    }
  }

}

export default withRouter(DetailedPlayerPage);