import React from "react";
import ApiService from "../../../api/ApiService";
import ScoreBoard from "./Scoreboard";
import { Container, Row } from 'reactstrap'
import './ScoresPage.css'

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
      .getGamesByDate('2020-03-03')
      .then(result => {
        this.setState({
          isLoaded: true,
          games: result.data
        });
        console.log(result.data)
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
        <Container className="scoresPageContainer">

          <Row>
            <h1>Today's Scores</h1>
          </Row>
         
          <Row className="scoreBoardsRow">
            {games.map(game => (<ScoreBoard game={game}/>))}
          </Row>

        </Container>
      );
    }
  }

}

export default ScoresPage;
