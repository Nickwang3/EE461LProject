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
    };
  }

  componentDidMount() {
    apiService
        .getTicketById(this.props.match.params.ticket_id)
        .then(result => {
            this.setState({
                isLoaded: true,
                ticket: result.data
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
    const { error, isLoaded, ticket } = this.state;
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
                <h5> Home Team: {ticket.home_team} </h5>
                <h5> Away Team: {ticket.away_team} </h5>
                <h5> Date: {ticket.datetime_local.slice(0, 10)} </h5>
                <h5> Local Time: {ticket.datetime_local.slice(11)} </h5>
                <h5> average price: ${ticket.average_price} </h5>
                <Button className="primary" href={ticket.event_url}>Purchase at SeatGeak</Button>
              </Col>
            </Row>
        </div>
      );
    }
  }

}

export default withRouter(DetailedTicketPage);