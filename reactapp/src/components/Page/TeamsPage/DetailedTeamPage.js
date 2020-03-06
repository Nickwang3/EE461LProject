import React from "react";
import ApiService from "../../../api/ApiService";
import { withRouter } from 'react-router';

const apiService = new ApiService();

class DetailedTeamPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      team: null,
    };
  }

  componentDidMount() {
      apiService
        .getTeamById(this.props.match.params.team_id)
        .then(result => {
            this.setState({
                isLoaded: true,
                team: result.data
            })
        })

  }

  render() {
    const { error, isLoaded, team } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>Team: {team.name}</h1>
          <h5>Division: {team.division}</h5>
          <h5>Stadium: {team.venue}</h5>
        </div>
      );
    }
  }

}

export default withRouter(DetailedTeamPage);