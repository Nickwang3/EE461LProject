import React from "react";
import Player from "./Player";
import ApiService from "../../../api/ApiService";
import {Container} from "reactstrap"

const apiService = new ApiService();

class PlayersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      players: []
    };
  }

  componentDidMount() {
    apiService
      .getPlayers()
      .then(result => {
        this.setState({
          isLoaded: true,
          players: result.data
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
    const { error, isLoaded, players } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="PlayersPage">
          <h1>MLB Players</h1>
          <Container>
            {players.map(player => (
              <Player player={player}/>
            ))}
          </Container>
        </div>
      );
    }
  }

}

export default PlayersPage;
