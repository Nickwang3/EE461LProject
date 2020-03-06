import React from "react";
import ApiService from "../../../api/ApiService";
import { withRouter } from 'react-router';

const apiService = new ApiService();

class DetailedPlayerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      player: null,
    };
  }

  componentDidMount() {
      apiService
        .getPlayerById(this.props.match.params.player_id)
        .then(result => {
            this.setState({
                isLoaded: true,
                player: result.data
            })
        })

  }

  render() {
    const { error, isLoaded, player } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>Name: {player.name}</h1>
          <h5>Team: {player.age}</h5>
          <h5>Position: {player.position}</h5>
          <h5>Number: {player.number}</h5>
          <h5>Age: {player.age}</h5>
          <h5>Height: {player.height}</h5>
          <h5>Weight: {player.weight}</h5>
        </div>
      );
    }
  }

}

export default withRouter(DetailedPlayerPage);