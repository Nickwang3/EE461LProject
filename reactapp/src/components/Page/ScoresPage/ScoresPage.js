import React from "react";
import ApiService from "../../../api/ApiService";
import ScoreBoard from "./Scoreboard";
import DatePicker from 'react-datepicker';
import { Container, Row, Spinner } from 'reactstrap';
import './ScoresPage.css';
import "react-datepicker/dist/react-datepicker.css";


const apiService = new ApiService();
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
      formattedDate: this.formatDate(new Date())
    };

      this.changeDates = this.changeDates.bind(this);

  }

  componentDidMount() {
    console.log("Comp did mount")
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

  render() {
    const { error, isLoaded, games, startDate } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <Row style={{width: "100%", display:"flex", justifyContent:"center", marginBottom:"40px"}}>
            <Spinner style={{ width: '4rem', height: '4rem' }} type="grow" color="light" />
        </Row>
        )
    } else {
      return (
        
        
        <Container className="scoresPageContainer">

          <Row className="titleRow">
            <h1 className="titleStyle">Scores</h1>
          </Row>

          <Row className="datePickerRow">
            <DatePicker style={{}} selected={startDate} onChange={(date) => this.changeDates(date)} />
          </Row>
         
          <Row className="scoreBoardsRow">
            {games.map(game => (<ScoreBoard game={game}/>))}
          </Row>

        </Container>
      );
    }
  }

}

export default ScoresPage;
