import React from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import { Link } from 'react-router-dom';

class Ticket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {
        const cardStyle = {
            margin: 10, 
            width: 200, 
            height: 320,
        }

        const cardTextStyle = {
            color:"black",
            fontSize: 20
        }

        const cardTitleStyle = {
            color:"black", 
            fontSize: 20
        }

            return (
                <Link to={`/tickets/${this.props.ticket.ticket_id}`}>
                    <Card style={cardStyle}>
                        <CardBody>
                            <CardTitle style={cardTextStyle}>{this.props.ticket.title}</CardTitle>
                            <CardText style={cardTextStyle}>{this.props.ticket.datetime_local.slice(0, 10)}</CardText>
                        </CardBody>
                        <CardImg style={{width:100, height:100}} src={this.props.ticket.image_url} alt="Card image cap" />
                    </Card>
                </Link>
            )
    }
}

export default Ticket;