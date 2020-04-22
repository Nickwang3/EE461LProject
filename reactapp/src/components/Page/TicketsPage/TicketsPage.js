import React from "react";
import Ticket from "./Ticket.js";
import ApiService from "../../../api/ApiService";
import { Container, Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap";
import './TicketsPage.css'

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

  nextPage() {
    if (this.state.nextPage == null) {
      return;
    }
    this.setState({
      isLoaded: false,
    })
    apiService
      .getTicketsBySearch(this.state.page + 1, this.state.searchValue, this.state.searchFields, this.state.ordering)
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
      .getTicketsBySearch(this.state.page - 1, this.state.searchValue, this.state.searchFields, this.state.ordering)
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
    .getTicketsBySearch(1, this.state.searchValue, this.state.searchFields, this.state.ordering)
    .then(result => {
      this.setState({
        isLoaded: true,
        tickets: result.data.results,
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

  orderingChanged = (e) => {
    this.setState({ 
      ordering: e.target.value,
      isLoaded: false
    })
    apiService
    .getTicketsBySearch(1, this.state.searchValue, this.state.searchFields, e.target.value)
    .then(result => {
      this.setState({
        isLoaded: true,
        tickets: result.data.results,
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


  render() {
    const { error, isLoaded, tickets } = this.state;
    let results;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      results = <div>Loading...</div>;
    } else {
      results = <Row style={{display: "flex", justifyContent: "center"}}>
                  <h5>Results: {this.state.count}</h5>
                    <Row>
                      {tickets.map(ticket => (
                        <Ticket ticket={ticket}/>
                      ))}
                    </Row>
                </Row>;
    }
    return (
      <Container className="ticketsPageContainer">
        <Row style={{margin:"60px", width:"100%", display:"flex", justifyContent:"center"}}><h1 style={{font: "400 50px/1.5 'Pacifico', Helvetica, sans-serif"}}>Tickets</h1></Row>
        <Form className="ticketsFormStyle" onSubmit={this.onSubmit}>
          <Row form>
            <Col md={9}>
              <FormGroup className="ticketsSearchBar">
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
            </Col>
            <Col style={{display:"flex", justifyContent: "center"}} md={3}>
              <Button type="submit" style={{width: "80%", height:"70%"}} className="btn btn-success">Search</Button>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label style={{fontSize: "medium"}} for="ticketSearchSelect">Search by</Label>
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
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label style={{fontSize: "medium"}} for="playerOrderSelect">Order by</Label>
                <Input 
                type="select" 
                name="playerOrderSelect" 
                id="playerOrderSelect"
                onChange={e => this.orderingChanged(e)}
                >
                  <option>datetime_local</option>
                  <option>home_team</option>
                  <option>away_team</option>
                  <option>average_price</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </Form>  
        {results}
        <Row style={{width: "100%", display: "flex", justifyContent: "center"}}>
          <Button style={{margin: "20px"}} color="info" onClick={() => this.prevPage()} disabled={this.state.prevPage == null}>Previous</Button>
          <h4 style={{margin: "23px"}}>Page {this.state.page}</h4>
          <Button style={{margin: "20px"}} color="info" onClick={() => this.nextPage()} disabled={this.state.nextPage == null}>Next</Button>
        </Row>
      </Container>
    );
  }

}

export default TicketsPage;
