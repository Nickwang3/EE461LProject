import React from "react";
import Team from "./Team.js";
import ApiService from "../../../api/ApiService";
import { Spinner, Container, Row, Col} from "reactstrap"
import './TeamsPage.css'
import SearchController from "../../Controllers/SearchController";
import PaginationController from "../../Controllers/PaginationController";

const apiService = ApiService.getInstance();

class TeamsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      teams: [],
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
    apiService
    .getTeamsBySearch(this.state.page, this.state.searchValue, this.state.searchFields, this.state.ordering)
    .then(result => {
        this.setState({
          isLoaded: true,
          teams: result.data.results,
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
      teams: results,
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
    const { error, isLoaded, teams } = this.state;
    let results;
    let searchFieldOptions = ["name", "division", "venue"]
    let orderingOptions = ["name", "division"]

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      results = <Row style={{width: "100%", display:"flex", justifyContent:"center", marginBottom:"40px"}}>
                  <Spinner style={{ width: '4rem', height: '4rem' }} type="grow" color="light" />
                </Row>
    } else {
      results = <Row className="teamCardsRow">
                  {teams.map(team => (
                    <Col style={{display: "flex", justifyContent: "center"}}>
                      <Team team={team} />
                    </Col>
                  ))}
                </Row>;
    }
    return (
      <Container className="teamsPageContainer">
        <Row className="titleRow">Teams</Row>
        <SearchController
          getResults={apiService.getTeamsBySearch.bind(apiService)}
          defaultSearchField="name"
          defaultOrdering="name"
          setResults={this.setResults.bind(this)}
          placeholderText="Search for teams..."
          searchFieldOptions={searchFieldOptions}
          orderingOptions={orderingOptions}
        />
        {results}
        <PaginationController
          getResults={apiService.getTeamsBySearch.bind(apiService)}
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

export default TeamsPage;
