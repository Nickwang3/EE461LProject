import React from "react";
import Team from "./Team.js";
import ApiService from "../../../api/ApiService";
import { Container, Button, Row, Col } from "reactstrap";
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
      count: null
    };
  }

  componentDidMount() {
    apiService
      .getTeams()
      .then(result => {
        this.setState({
          isLoaded: true,
          teams: result.data.results
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
      .getTeams(this.state.page + 1)
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
      .getTeams(this.state.page - 1)
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

  render() {
    const { error, isLoaded, teams } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Container className="teamsPageContainer">
          <Row className="titleRow">Teams</Row>
          <Row className="teamCardsRow">
            {teams.map(team => (
              <Col style={{display: "flex", justifyContent: "center"}}>
                <Team team={team} />
              </Col>
            ))}
          </Row>
          <Row>
            <Button color="info" onClick={() => this.prevPage()} disabled={this.state.prevPage == null}>Previous</Button>
            <h5>Current Page: {this.state.page}</h5>
            <Button color="info" onClick={() => this.nextPage()} disabled={this.state.nextPage == null}>Next</Button>
          </Row>
        </Container>
      );
    }
  }

}

export default TeamsPage;
