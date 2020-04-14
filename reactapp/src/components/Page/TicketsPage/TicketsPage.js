import React from "react";
import Ticket from "./Ticket.js";
import ApiService from "../../../api/ApiService";
import { Container, Button, Form, FormGroup, Input, Label } from "reactstrap";

const apiService = new ApiService();

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
      .getTickets()
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

  nextPage() {
    if (this.state.nextPage == null) {
      return;
    }
    this.setState({
      isLoaded: false,
    })
    apiService
      .getTickets(this.state.page + 1)
      .then(result => {
        this.setState({
          isLoaded: true,
          tickets: result.data.results,
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
      .getTickets(this.state.page - 1)
      .then(result => {
        this.setState({
          isLoaded: true,
          tickets: result.data.results,
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

  onEnterPressed = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      this.onSubmit(e);
    }
  }

  render() {
    const { error, isLoaded, tickets } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>Game Tickets</h1>
          <Form className="searchBarContainer" onSubmit={this.onSubmit}>
            <FormGroup className="searchBar">
                {/* <Label for="exampleSearch">Search</Label> */}
                <Input
                type="search"
                name="search"
                id="ticketSearch"
                placeholder="Search for tickets..."
                value={this.state.searchValue}
                onChange={e => this.setState({ searchValue: e.target.value })}
                onKeyDown={this.onEnterPressed}
                />
            </FormGroup>
            <FormGroup>
              <Label for="ticketSearchSelect">search by</Label>
              <Input 
              type="select" 
              name="searchSelect" 
              id="ticketSearchSelect"
              onChange={e => this.setState({ searchFields: e.target.value })}
              >
                <option>datetime_local</option>
                <option>home_team</option>
                <option>away_team</option>
                <option>title</option>
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
                <option>datetime_local</option>
                <option>home_team</option>
                <option>away_team</option>
                <option>average_price</option>
              </Input>
            </FormGroup>
            <Button type="submit" className="btn btn-success">Search</Button>
          </Form>  
          <Container>
            {tickets.map(ticket => (
              <Ticket ticket={ticket} />
            ))}
          </Container>
          <Container>
            <Button color="info" onClick={() => this.prevPage()} disabled={this.state.prevPage == null}>Previous</Button>
            <h5>Current Page: {this.state.page}</h5>
            <Button color="info" onClick={() => this.nextPage()} disabled={this.state.nextPage == null}>Next</Button>
          </Container>
        </div>
      );
    }
  }

}

export default TicketsPage;
