import React from "react";
import Player from "./Player";
import ApiService from "../../../api/ApiService";
import { Container, Button, Row, Col, Spinner} from "reactstrap"
import "./PlayersPage.css"
import SearchController from "../../Controllers/SearchController";
import PaginationController from "../../Controllers/PaginationController";

const apiService = ApiService.getInstance();

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
      ordering: "name",
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

  setResults(isLoaded, error, results, page, prevPage, nextPage, count, searchValue, searchFields, ordering) {
    this.setState({
      isLoaded: isLoaded,
      error: error,
      players: results,
      page: page,
      prevPage: prevPage,
      nextPage: nextPage,
      count: count,
      searchValue: searchValue, 
      searchFields: searchFields,
      ordering: ordering,
    })
  }

  render() {
    const { error, isLoaded, players } = this.state;
    let results;
    let searchFieldOptions = ["name", "age", "number"]
    let orderingOptions = ["name", "team", "age", "number", "height", "weight", "player_id"]

    if (error) {
      results = <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      results = <Row style={{width: "100%", display:"flex", justifyContent:"center", marginBottom:"40px"}}>
                  <Spinner style={{ width: '4rem', height: '4rem' }} type="grow" color="light" />
                </Row>
    } else {
      results = <Row style={{width: "100%", display:"flex", justifyContent:"center"}}>
                  <h5>Results: {this.state.count}</h5>
                    <Row>
                      {players.map(player => (
                        <Col>
                          <Player player={player}/>
                        </Col>
                      ))}
                    </Row>
                </Row>;
    }
    return (
      <Container className="playersPageContainer">
        <Row style={{margin:"60px", width:"100%", display:"flex", justifyContent:"center"}}><h1 style={{font: "400 50px/1.5 'Pacifico', Helvetica, sans-serif"}}>Players</h1></Row>
        <SearchController
          getResults={apiService.getPlayersBySearch.bind(apiService)}
          defaultSearchField="name"
          defaultOrdering="name"
          setResults={this.setResults.bind(this)}
          placeholderText="Search for players..."
          searchFieldOptions={searchFieldOptions}
          orderingOptions={orderingOptions}
        />
        {results}
        <PaginationController
          getResults={apiService.getPlayersBySearch.bind(apiService)}
          setResults={this.setResults.bind(this)}
          count={this.state.count}
          page={this.state.page}
          prevPage={this.state.prevPage}
          nextPage={this.state.nextPage}
          searchValue={this.state.searchValue} 
          searchFields={this.state.searchFields}
          ordering={this.state.ordering}
        />
      </Container>
      );
  }

}

export default PlayersPage;
