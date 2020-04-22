import React from "react";
import ApiService from "../../../api/ApiService";
import { withRouter } from 'react-router';
import { Container, Row, Col} from 'reactstrap'
import { Button } from "react-bootstrap";


const apiService = new ApiService();

class DetailedTicketPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      ticket: null,
      home_team: null,
      away_team: null,
      game: null,
    };
  }

  componentDidMount() {
    apiService
        .getTicketById(this.props.match.params.ticket_id)
        .then(result => {
            this.setState({
                ticket: result.data
            })
        })
        .then(()=> apiService.getTeamByName(this.state.ticket.home_team))
        .then(res => {
          this.setState({
            home_team: res.data
          })
        })
        .then(()=> apiService.getTeamByName(this.state.ticket.away_team))
        .then(res => {
          this.setState({
            away_team: res.data,
          })
        })
        .then(()=> apiService.getGameByTeamsAndDate(this.state.away_team.team_id,this.state.home_team.team_id,this.state.ticket.datetime_local.slice(0,10)))
        .then(res => {
          this.setState({
            game: res.data,
            isLoaded: true
          })
        })
        .catch(error => {
            this.setState({
                isLoaded: true,
                error
            });
        });
  }

  render() {
    const { error, isLoaded, ticket,home_team,away_team ,game} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
            <Row className="ticketTitleRow">
              <h1 className="titleStyle">{ticket.title}</h1>
            </Row>
            <Row className="ticketInfoRow">
              <img className="ticketPictureStyle" src={ticket.image_url}></img>
              <Col>
                <h5> Venue: {ticket.venue}</h5>
                <h5> Home Team: <a href={`/teams/${home_team.team_id}`}>{ticket.home_team}</a></h5>
                <h5> Away Team: <a href={`/teams/${away_team.team_id}`}>{ticket.away_team}</a></h5>
                <h5> Date: {ticket.datetime_local.slice(0, 10)} </h5>
                <h5> Local Time: {ticket.datetime_local.slice(11)} </h5>
                <h5> average price: ${ticket.average_price} </h5>
                <Button color="primary" target="_blank" href={ticket.event_url}>Purchase at SeatGeak</Button> <br></br>
                <Button color="primary" href={`/scores/${game.game_id}`}>View Box Scores</Button>
              </Col>
            </Row>
        </div>
      );
    }
  }

}

export default withRouter(DetailedTicketPage);