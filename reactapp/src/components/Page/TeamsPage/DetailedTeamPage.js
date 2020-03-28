import React from "react";
import ApiService from "../../../api/ApiService";
import { withRouter } from 'react-router';
import { Table, Container, Row, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import RosterPlayer from "./RosterPlayer";
import "./DetailedTeamPage.css"
import Weather from "../../Weather/Weather";

const apiService = new ApiService();

class DetailedTeamPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      team: null,
      roster: null,
      activeTab: "1",
      record: null
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
            // console.log(res.data)
        })
        .then(() => apiService.getRecordByTeamIdAndSeason(this.state.team.team_id.concat("2020")))
        .then(res => {
            this.setState({
              record: res.data,
              isLoaded: true
            })
            console.log(res.data)
        })
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

    const { error, isLoaded, team, roster, activeTab, record } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (

        <Container className="detailedTeamContainer">

          <Row className="teamNameRow">
            <h1 className="titleStyle">{team.name}</h1>
          </Row>

          <Row className="teamInfoRow">
            <Row className="navRow">
              <Nav>
                <NavItem>
                  <NavLink onClick={() => this.switchTabs("1")} style={navItemStyle}>About</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => this.switchTabs("2")} style={navItemStyle}>Roster</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => this.switchTabs("3")} style={navItemStyle}>Stats</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => this.switchTabs("4")} style={navItemStyle}>Schedule</NavLink>
                </NavItem>
              </Nav>
            </Row>

            <Row className="contentRow">
              <TabContent activeTab={activeTab}>

                <TabPane tabId="1">
                  <Row>
                    <Weather team_id={team.team_id}/>
                    <h5 style={{width: "100%",marginBottom: "10px"}}>Stadium: {team.venue}</h5>
                    <h5 style={{width: "100%",marginBottom: "10px"}}>Record: {record.wins} - {record.losses}</h5>
                    <h5 style={{width: "100%",marginBottom: "10px"}}>#{record.division_rank} in {team.division}</h5>
                    <h5 style={{width: "100%",marginBottom: "10px"}}>#{record.league_rank} in {team.division.split(" ").slice(0,2)}</h5>
                  </Row>
                </TabPane>

                <TabPane tabId="2">
                  <Row>
                    <Row className="rosterRow">
                      {/* <h2 style={{width: "100%",marginBottom: "30px"}}>Roster</h2> */}
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

                <TabPane tabId="3">
                  <Row>
                      Stats
                  </Row>
                </TabPane>

                <TabPane tabId="4">
                  <Row>
                    Schedule
                  </Row>
                </TabPane>
                
              </TabContent>
            </Row>
            
          </Row>

        </Container>
      );
    }
  }

}

export default withRouter(DetailedTeamPage);