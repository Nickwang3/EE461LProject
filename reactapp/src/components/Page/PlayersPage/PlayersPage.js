import React from "react";
import Player from "./Player";
import ApiService from "../../../api/ApiService";
import { Container, Button, Row } from "reactstrap"
import ReactPaginate from 'react-paginate';
import Axios from "axios";

const apiService = new ApiService();

class PlayersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      players: [],
      page: 1,
      prevPage: null,
      nextPage: null,
      count: null,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    apiService
      .getPlayers(this.state.page)
      .then(result => {
        this.setState({
          isLoaded: true,
          players: result.data.results,
          prevPage: result.data.previous,
          nextPage: result.data.next,
          count: result.data.count
        });
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  nextPage() {
    if (this.state.nextPage == null) {
      return;
    }
    this.setState({
      isLoaded: false,
    })
    apiService
      .getPlayers(this.state.page + 1)
      .then(result => {
        this.setState({
          isLoaded: true,
          players: result.data.results,
          page: this.state.page + 1,
          prevPage: result.data.previous,
          nextPage: result.data.next,
        });
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  prevPage() {
    if (this.state.prevPage == null) {
      return;
    }
    this.setState({
      isLoaded: false,
    })
    apiService
      .getPlayers(this.state.page - 1)
      .then(result => {
        this.setState({
          isLoaded: true,
          players: result.data.results,
          page: this.state.page - 1,
          prevPage: result.data.previous,
          nextPage: result.data.next,
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
          <h5>Results: {this.state.count}</h5>
          <Container>
            {players.map(player => (
              <Player player={player}/>
            ))}
          </Container>
          <Container>
            <Button onClick={() => this.prevPage()} disabled={this.state.prevPage == null}>Previous</Button>
            <h5>Current Page: {this.state.page}</h5>
            <Button onClick={() => this.nextPage()} disabled={this.state.nextPage == null}>Next</Button>
          </Container>
        </div>
      );
    }
  }

}

export default PlayersPage;
