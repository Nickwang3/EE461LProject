import React from "react";
import ApiService from "../../../api/ApiService";
import { withRouter } from 'react-router';
import { Spinner, Table, Container, Row, Nav, NavItem, NavLink, TabContent, TabPane, Col } from 'reactstrap';
import RosterPlayer from "./RosterPlayer";
import "./DetailedTeamPage.css"
import Weather from "../../Weather/Weather";
import ScoreBoard from "../ScoresPage/Scoreboard"
import MapContainer from "../../Map/MapContainer";
import YouTube from 'react-youtube';
import { SocialIcon } from 'react-social-icons';

const apiService = ApiService.getInstance();
const monthMapping = {'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06','Jul': '07', 'Aug': '08', 
                      'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'}

class DetailedTeamPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      team: null,
      roster: null,
      activeTab: "1",
      record: null,
      weekly_games: null
    };

    this.switchTabs = this.switchTabs.bind(this);
  }

  componentDidMount() {
      apiService
        .getTeamById(this.props.match.params.team_id)
        .then(result => {
            this.setState({
              team: result.data
            })
        })
        .then(() => apiService.getPlayersByTeamId(this.state.team.team_id))
        .then(res => {
            this.setState({
              roster: res.data
            })
        })
        .then(() => apiService.getRecordByTeamIdAndSeason(this.state.team.team_id.concat("2020")))
        .then(res => {
            this.setState({
              record: res.data,
            })
        })
        .then(() => {
          return apiService.getWeeklyGamesByDateAndTeam(this.formatDate(new Date()), this.state.team.team_id);
        })
        .then(res => {
          this.setState({
            weekly_games: res.data,
            isLoaded: true
          })
          console.log(res.data)
        })
        .catch(error => {
          this.setState({
            isLoaded: true,
            error
          });
        });
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

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  render() {

    const navItemStyle = {
      color: "white",
      marginLeft: "25px",
      marginRight: "25px"
    }

    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    const { error, isLoaded, team, roster, activeTab, record, weekly_games } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <Row className='unloadedRowStyle'>
            <Spinner className='loadIcon' type="grow" color="light" />
        </Row>
        )
    } else {
      return (

        <Container className="detailedTeamContainer">
          {/* <MapContainer lat={team.latitude} lng={team.longitude}/>     */}
          <Row className="teamNameRow">
            <h1 className="titleStyle">{team.name}</h1>
          </Row>

          <Row className="teamInfoRow">
            <Row className="navRow">
              <Nav>
                <NavItem className="teamNavItem">
                  <NavLink onClick={() => this.switchTabs("1")} style={navItemStyle}>About</NavLink>
                </NavItem>
                <NavItem className="teamNavItem">
                  <NavLink onClick={() => this.switchTabs("2")} style={navItemStyle}>Roster</NavLink>
                </NavItem>
                <NavItem className="teamNavItem">
                  <NavLink onClick={() => this.switchTabs("3")} style={navItemStyle}>Schedule</NavLink>
                </NavItem>
                <NavItem className="teamNavItem">
                  <NavLink onClick={() => this.switchTabs("4")} style={navItemStyle}>Stadium</NavLink>
                </NavItem>
              </Nav>
            </Row>

            <TabContent className="contentRow" activeTab={activeTab}>

              <TabPane className="contentRow" tabId="1">
                <Row>
                  <h5 style={{width: "100%",marginBottom: "10px"}}>Stadium: {team.venue}</h5>
                  <h5 style={{width: "100%",marginBottom: "10px"}}>Record: {record.wins} - {record.losses}</h5>
                  <h5 style={{width: "100%",marginBottom: "10px"}}>#{record.division_rank} in {team.division}</h5>
                  <h5 style={{width: "100%",marginBottom: "10px"}}>#{record.league_rank} in {team.division.split(" ").slice(0,2)}</h5>
                </Row>
                <YouTube videoId={team.video_id} opts={opts} onReady={this._onReady}/>
                <Row style={{textAlign: "center",marginTop: "10px"}}>
                  <Col>
                    <SocialIcon url={team.twitter}>twitter</SocialIcon>
                  </Col>
                  <Col>
                    <SocialIcon url={team.facebook}>facebook</SocialIcon>
                  </Col>
                  <Col>
                    <SocialIcon url={team.instagram}>instagram</SocialIcon>
                  </Col>

                </Row>
              </TabPane>

              <TabPane className="contentRow" tabId="2">
                <Row>
                  <Row className="rosterRow">
                    <Table className="tableStyle">
                      <thead  style={{color: "white"}}>
                        <tr>
                          <th>Number</th>
                          <th>Name</th>
                          <th>Position</th>
                          <th>Age</th>
                          <th>Height</th>
                          <th>Weight</th>
                        </tr>
                      </thead>
                      <tbody  style={{color: "white"}}>
                        {roster.map(player => (
                          <RosterPlayer player={player}/>
                        ))}
                      </tbody>
                    </Table>
                  </Row>
                </Row>
              </TabPane>

              <TabPane className="contentRow" tabId="3">
                <Row className="scoreBoardsRow">
                  {weekly_games.map(game => (<ScoreBoard game={game}/>))}
                </Row>
              </TabPane>

              <TabPane className="contentRow" tabId="4">
                <Container>
                  <Row style={{width: "100%", margin: "10px", display:"flex", justifyContent:"center"}}>
                    <Weather team_id={team.team_id}/>
                  </Row>  
                    <MapContainer stadiumName={team.venue} lat={team.latitude} lng={team.longitude}/>    
                </Container>
              </TabPane>
              
            </TabContent>
          </Row>
            

        </Container>
      );
    }
  }

}

export default withRouter(DetailedTeamPage);