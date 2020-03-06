import React from "react";
import Player from "./Player";
import ApiService from "../../../api/ApiService";

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
        <div>
          <h1>Hello there</h1>
          <ul>
            {players.map(player => (
              <Player name={player.name}/>
            ))}
          </ul>
        </div>
      );
    }
  }

}

export default PlayersPage;
