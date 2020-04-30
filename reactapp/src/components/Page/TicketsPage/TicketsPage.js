import React from "react";
import Ticket from "./Ticket.js";
import ApiService from "../../../api/ApiService";
import { Container, Row, Col, Spinner } from "reactstrap";
import './TicketsPage.css'
import SearchController from "../../Controllers/SearchController";
import PaginationController from "../../Controllers/PaginationController";

const apiService = ApiService.getInstance();

class TicketsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      tickets: [],
      page: 1,
      prevPage: null,
      nextPage: null,
      count: null,
      searchValue: '', 
      searchFields: "datetime_local",
      ordering: "datetime_local",
    };
  }

  componentDidMount() {
    apiService
      .getTicketsBySearch(this.state.page, this.state.searchValue, this.state.searchFields, this.state.ordering)
      .then(result => {
        this.setState({
          isLoaded: true,
          tickets: result.data.results,
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
      tickets: results,
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
    const { error, isLoaded, tickets } = this.state;
    let results;
    let searchFieldOptions = ["datetime_local", "home_team", "away_team", "title"]
    let orderingOptions = ["datetime_local", "home_team", "away_team", "average_price"]

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      results = (<Row style={{width: "100%", display:"flex", justifyContent:"center", marginBottom:"40px"}}>
                    <Spinner style={{ width: '4rem', height: '4rem' }} type="grow" color="light" />
                </Row>)
    } else {
      results = <Row style={{display: "flex", justifyContent: "center"}}>
                  <h5>Results: {this.state.count}</h5>
                    <Row>
                      {tickets.map(ticket => (
                        <Col>
                          <Ticket ticket={ticket}/>                        
                        </Col>
                      ))}
                    </Row>
                </Row>;
    }
    return (
      <Container className="ticketsPageContainer">
        <Row style={{margin:"60px", width:"100%", display:"flex", justifyContent:"center"}}><h1 style={{font: "400 50px/1.5 'Pacifico', Helvetica, sans-serif"}}>Tickets</h1></Row>
        <SearchController
          getResults={apiService.getTicketsBySearch.bind(apiService)}
          defaultSearchField="datetime_local"
          defaultOrdering="datetime_local"
          setResults={this.setResults.bind(this)}
          placeholderText="Search for tickets..."
          searchFieldOptions={searchFieldOptions}
          orderingOptions={orderingOptions}
        />
        {results}
        <PaginationController
          getResults={apiService.getTicketsBySearch.bind(apiService)}
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

export default TicketsPage;
