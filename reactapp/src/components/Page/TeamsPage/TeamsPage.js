import React from "react";
import Team from "./Team.js";
import ApiService from "../../../api/ApiService";
import { Spinner, Container, Button, Row , Form, FormGroup, Input, Label, Col} from "reactstrap"
import './TeamsPage.css'

const apiService = new ApiService();

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

  nextPage() {
    if (this.state.nextPage == null) {
      return;
    }
    this.setState({
      isLoaded: false,
    })
    apiService
    .getTeamsBySearch(this.state.page + 1, this.state.searchValue, this.state.searchFields, this.state.ordering)
    .then(result => {
        this.setState({
          isLoaded: true,
          teams: result.data.results,
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
    .getTeamsBySearch(this.state.page - 1, this.state.searchValue, this.state.searchFields, this.state.ordering)
    .then(result => {
        this.setState({
          isLoaded: true,
          teams: result.data.results,
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
    .getTeamsBySearch(1, this.state.searchValue, this.state.searchFields, this.state.ordering)
    .then(result => {
      this.setState({
        isLoaded: true,
        teams: result.data.results,
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
    .getTeamsBySearch(1, this.state.searchValue, this.state.searchFields, e.target.value)
    .then(result => {
      this.setState({
        isLoaded: true,
        teams: result.data.results,
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
    const { error, isLoaded, teams } = this.state;
    let results;
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
        <Form className="teamFormStyle" onSubmit={this.onSubmit}>
          <Row form>
            <Col md={9}>
              <FormGroup className="teamSearchBar">
                  {/* <Label for="exampleSearch">Search</Label> */}
                  <Input
                  type="search"
                  name="search"
                  id="teamSearch"
                  placeholder="Search for teams..."
                  value={this.state.searchValue}
                  onChange={e => this.setState({ searchValue: e.target.value })}
                  onKeyDown={this.onEnterPressed}
                  />
              </FormGroup>
            </Col>
            <Col style={{display: "flex", justifyContent:"center"}} md={3}>
              <Button type="submit" style={{width: "80%", height: "70%"}} className="btn btn-success">Search</Button>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label style={{fontSize: "medium"}} for="teamSearchSelect">Search by</Label>
                <Input 
                type="select" 
                name="searchSelect" 
                id="teamSearchSelect"
                onChange={e => this.setState({ searchFields: e.target.value })}
                >
                  <option>name</option>
                  <option>division</option>
                  <option>venue</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label style={{fontSize: "medium"}} for="teamOrderSelect">Order by</Label>
                <Input 
                type="select" 
                name="teamOrderSelect" 
                id="teamOrderSelect"
                onChange={e => this.orderingChanged(e)}
                >
                  <option>name</option>
                  <option>division</option>
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

export default TeamsPage;
