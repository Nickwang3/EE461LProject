import React from "react";
import Ticket from "./Ticket.js";
import ApiService from "../../../api/ApiService";
import { Container, Button } from "reactstrap";

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
