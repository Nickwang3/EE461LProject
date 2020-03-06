import React from "react";
import Team from "./Team.js";
import ApiService from "../../../api/ApiService";
import { Container } from "reactstrap";

const apiService = new ApiService();

class TeamsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      teams: []
    };
  }

  componentDidMount() {
    apiService
      .getTeams()
      .then(result => {
        this.setState({
          isLoaded: true,
          teams: result.data
        });
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  render() {
    const { error, isLoaded, teams } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>Hello there</h1>
          <Container>
            {teams.map(team => (
              <Team team_id={team.team_id} name={team.name} division={team.division} venue={team.venue} />
            ))}
          </Container>
        </div>
      );
    }
  }

}

export default TeamsPage;
