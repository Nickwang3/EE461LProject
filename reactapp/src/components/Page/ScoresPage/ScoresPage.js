import React from "react";
import ApiService from "../../../api/ApiService";
import ScoreBoard from "./Scoreboard";
import DatePicker from 'react-datepicker';
import { Container, Button, Row, Spinner } from "reactstrap";
import './ScoresPage.css';
import "react-datepicker/dist/react-datepicker.css";
import SearchController from "../../Controllers/SearchController";
import PaginationController from "../../Controllers/PaginationController";


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

  setResults(isLoaded, error, results, page, prevPage, nextPage, count, searchValue, searchFields, ordering) {
    this.setState({
      isLoaded: isLoaded,
      error: error,
      games: results,
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
    const { error, isLoaded, games, startDate } = this.state;

    let criteria;
    let datePickerRow;
    let searchFormRow;
    let results;
    let paginationButtons;

    let searchFieldOptions = ["home_team_name", "away_team_name"]
    let orderingOptions = ["home_team_name", "away_team_name", "datetime_local"]

    if (this.state.filterByDate) {
      criteria = "Search For Games"
      datePickerRow =   <Row className="datePickerRow">
                          <DatePicker style={{}} selected={startDate} onChange={(date) => this.changeDates(date)} />
                        </Row>;
    } else {
      criteria = "Use Date Picker";
      searchFormRow = <SearchController
                        getResults={apiService.getGamesBySearch.bind(apiService)}
                        defaultSearchField="home_team_name"
                        defaultOrdering="home_team_name"
                        setResults={this.setResults.bind(this)}
                        placeholderText="Search for games..."
                        searchFieldOptions={searchFieldOptions}
                        orderingOptions={orderingOptions}
                      />;

      paginationButtons = <PaginationController
                            getResults={apiService.getGamesBySearch.bind(apiService)}
                            setResults={this.setResults.bind(this)}
                            count={this.state.count}
                            page={this.state.page}
                            prevPage={this.state.prevPage}
                            nextPage={this.state.nextPage}
                            searchValue={this.state.searchValue} 
                            searchFields={this.state.searchFields}
                            ordering={this.state.ordering}
                          />;
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
