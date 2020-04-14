import React from "react";
import Player from "./Player";
import ApiService from "../../../api/ApiService";
import { Container, Button, Row , Form, FormGroup, Input, Label} from "reactstrap"
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
      searchValue: '', 
      searchFields: "name",
      ordering: "player_id",
    };
  }

  componentDidMount() {
    this._isMounted = true;
    apiService
      .getPlayersBySearch(this.state.page, this.state.searchValue, this.state.searchFields, this.state.ordering)
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
      .getPlayersBySearch(this.state.page + 1, this.state.searchValue, this.state.searchFields, this.state.ordering)
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
      .getPlayersBySearch(this.state.page - 1, this.state.searchValue, this.state.searchFields, this.state.ordering)
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

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({
      isLoaded: false,
    })
    apiService
    .getPlayersBySearch(1, this.state.searchValue, this.state.searchFields, this.state.ordering)
    .then(result => {
      this.setState({
        isLoaded: true,
        players: result.data.results,
        page: 1,
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

  onEnterPressed = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      this.onSubmit(e);
    }
  }

  render() {
    const { error, isLoaded, players } = this.state;
    let results;
    if (error) {
      results = <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      results = <div>Loading...</div>;
    } else {
      results = <div>
                  <h5>Results: {this.state.count}</h5>
                    <Container>
                      {players.map(player => (
                        <Player player={player}/>
                      ))}
                    </Container>
                </div>;
    }
    return (
      <div className="PlayersPage">
        <h1>MLB Players</h1>
        <Form className="searchBarContainer" onSubmit={this.onSubmit}>
          <FormGroup className="searchBar">
              {/* <Label for="exampleSearch">Search</Label> */}
              <Input
              type="search"
              name="search"
              id="playerSearch"
              placeholder="Search for players..."
              value={this.state.searchValue}
              onChange={e => this.setState({ searchValue: e.target.value })}
              onKeyDown={this.onEnterPressed}
              />
          </FormGroup>
          <FormGroup>
            <Label for="playerSearchSelect">search by</Label>
            <Input 
            type="select" 
            name="searchSelect" 
            id="playerSearchSelect"
            onChange={e => this.setState({ searchFields: e.target.value })}
            >
              <option>name</option>
              <option>age</option>
              <option>number</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="playerOrderSelect">order by</Label>
            <Input 
            type="select" 
            name="playerOrderSelect" 
            id="playerOrderSelect"
            onChange={e => this.setState({ ordering: e.target.value })}
            >
              <option>name</option>
              <option>team</option>
              <option>age</option>
              <option>number</option>
              <option>height</option>
              <option>weight</option>
              <option>player_id</option>
            </Input>
          </FormGroup>
          <Button type="submit" className="btn btn-success">Search</Button>
        </Form>               
        {results}
        <Container>
          <Button color="info" onClick={() => this.prevPage()} disabled={this.state.prevPage == null}>Previous</Button>
          <h5>Current Page: {this.state.page}</h5>
          <Button color="info" onClick={() => this.nextPage()} disabled={this.state.nextPage == null}>Next</Button>
        </Container>
      </div>
      );
  }

}

export default PlayersPage;
