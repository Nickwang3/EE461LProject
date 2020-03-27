import React from "react";
import ApiService from "../../../api/ApiService";
import ScoreBoard from "./Scoreboard";

const apiService = new ApiService();

class ScoresPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      games: []
    };
  }

  componentDidMount() {
    apiService
      .getGames()
      .then(result => {
        this.setState({
          isLoaded: true,
          games: result.data.results
        });
        console.log(result.data.results)
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  render() {
    const { error, isLoaded, games } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>Today's Scores</h1>
          <ul>
            {games.map(game => (
              <ScoreBoard game={game}/>
            ))}
          </ul>
        </div>
      );
    }
  }

}

export default ScoresPage;
