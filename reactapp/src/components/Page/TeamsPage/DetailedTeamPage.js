import React from "react";
import ApiService from "../../../api/ApiService";
import { withRouter } from 'react-router';
import { Table, Container, Row } from 'reactstrap';
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
      roster: null
    };
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
              isLoaded: true,
              roster: res.data
            })
            // console.log(res.data)
        })
  }

  render() {
    const { error, isLoaded, team, roster } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Container className="detailedTeamContainer">
          <Row className="teamNameRow">
            <h1 className="titleStyle">{team.name}</h1>
            <h5 style={{width: "100%",marginBottom: "10px"}}>Division: {team.division}</h5>
            <h5 style={{width: "100%"}}>Stadium: {team.venue}</h5>
          </Row>
          <Weather team_id={team.team_id}/>

          <Row className="rosterRow">
            <h2 style={{width: "100%",marginBottom: "30px"}}>Roster</h2>
            <Table className="tableStyle">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Age</th>
                  <th>Height</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                {roster.map(player => (
                  <RosterPlayer player={player}/>
                ))}
              </tbody>
            </Table>
          </Row>

        </Container>
      );
    }
  }

}

export default withRouter(DetailedTeamPage);