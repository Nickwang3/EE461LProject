import React from "react";
import ApiService from "../../../api/ApiService";
import ScoreBoard from "./Scoreboard";
import DatePicker from 'react-datepicker';
import { Container, Button, Form, FormGroup, Input, Label, Row, Col, Spinner } from "reactstrap";
import './ScoresPage.css';
import "react-datepicker/dist/react-datepicker.css";


const apiService = ApiService.getInstance();
const monthMapping = {'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06','Jul': '07', 'Aug': '08', 
                      'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'}


class ScoresPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      games: [],
      startDate: new Date(),
      formattedDate: this.formatDate(new Date()),
      filterByDate: true,
      page: 1,
      prevPage: null,
      nextPage: null,
      count: null,
      searchValue: '', 
      searchFields: "home_team_name",
      ordering: "home_team_name",
    };
    this.criteriaChanged = this.criteriaChanged.bind(this);
    this.changeDates = this.changeDates.bind(this);

  }

  componentDidMount() {
    console.log("Comp did mount")
    if (this.state.filterByDate) {
      apiService
        .getGamesByDate(this.state.formattedDate)
        .then(result => {
          this.setState({
            isLoaded: true,
            games: result.data
          });
        })
        .catch(error => {
          this.setState({
            isLoaded: true,
            error
          });
        });
    } else {
      apiService
      .getGamesBySearch(this.state.page, this.state.searchValue, this.state.searchFields, this.state.ordering)
      .then(result => {
        this.setState({
          isLoaded: true,
          games: result.data.results,
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
  }

  nextPage() {
    if (this.state.nextPage == null) {
      return;
    }
    this.setState({
      isLoaded: false,
    })
    apiService
      .getGamesBySearch(this.state.page + 1, this.state.searchValue, this.state.searchFields, this.state.ordering)
      .then(result => {
        this.setState({
          isLoaded: true,
          games: result.data.results,
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
      .getGamesBySearch(this.state.page - 1, this.state.searchValue, this.state.searchFields, this.state.ordering)
      .then(result => {
        this.setState({
          isLoaded: true,
          games: result.data.results,
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
    .getGamesBySearch(1, this.state.searchValue, this.state.searchFields, this.state.ordering)
    .then(result => {
      this.setState({
        isLoaded: true,
        games: result.data.results,
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
    .getGamesBySearch(1, this.state.searchValue, this.state.searchFields, e.target.value)
    .then(result => {
      this.setState({
        isLoaded: true,
        games: result.data.results,
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

  formatDate(date) {
    var temp = (date.toString().split(" "))
    return (temp[3] + "-" + monthMapping[temp[1]] + "-" + temp[2])
  }

  changeDates(date) {

    this.setState({
      isLoaded: false,
    });

    console.log("chang function called")
    var new_date = this.formatDate(date);

    apiService.getGamesByDate(new_date)
    .then(result => {
      this.setState({
        startDate: date,
        formattedDate: new_date,
        games: result.data,
        isLoaded: true
      });
      console.log(this.state.games)
      console.log("new game data received")
    })
    .catch(error => {
      this.setState({
        isLoaded: true,
        error
      });
    });
  };

  criteriaChanged() {
    if (this.state.filterByDate == true) {
      this.setState({
        filterByDate: false
      })
    } else {
      this.setState({
        filterByDate: true
      })
    }
  }

  render() {
    const { error, isLoaded, games, startDate } = this.state;

    let criteria;
    let datePickerRow;
    let searchFormRow;
    let results;
    let paginationButtons;

    if (this.state.filterByDate) {
      criteria = "Search For Games"
      datePickerRow =   <Row className="datePickerRow">
                          <DatePicker style={{}} selected={startDate} onChange={(date) => this.changeDates(date)} />
                        </Row>;
    } else {
      criteria = "Use Date Picker";
      paginationButtons = <Row style={{width: "100%", display: "flex", justifyContent: "center"}}>
                            <Button style={{margin: "20px"}} color="info" onClick={() => this.prevPage()} disabled={this.state.prevPage == null}>Previous</Button>
                            <h4 style={{margin: "23px"}}>Page {this.state.page}</h4>
                            <Button style={{margin: "20px"}} color="info" onClick={() => this.nextPage()} disabled={this.state.nextPage == null}>Next</Button>
                          </Row>
      searchFormRow = <Form className="ticketsFormStyle" onSubmit={this.onSubmit}>
                        <Row form>
                          <Col md={9}>
                            <FormGroup className="ticketsSearchBar">
                                {/* <Label for="exampleSearch">Search</Label> */}
                                <Input
                                type="search"
                                name="search"
                                id="ticketSearch"
                                placeholder="Search for games..."
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
                                <option>home_team_name</option>
                                <option>away_team_name</option>
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
                                <option>home_team_name</option>
                                <option>away_team_name</option>
                                <option>datetime_local</option>
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>;  
    }

    if (error) {
      results = <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      results = <Row style={{width: "100%", display:"flex", justifyContent:"center", marginBottom:"40px"}}>
                  <Spinner style={{ width: '4rem', height: '4rem' }} type="grow" color="light" />
                </Row>;
    } else {
      results = <Row className="scoreBoardsRow">
                  {games.map(game => (<ScoreBoard game={game}/>))}
                </Row>
    }
    return (
      
      
      <Container className="scoresPageContainer">

        <Row className="titleRow">
          <h1 className="titleStyle">Scores</h1>
        </Row>

        <Row className="titleRow">
          <Button color="info" onClick={this.criteriaChanged}>{criteria}</Button>
        </Row>

        {datePickerRow}
        {searchFormRow}

        {results}

        {paginationButtons}

      </Container>
    );
  }

}

export default ScoresPage;
