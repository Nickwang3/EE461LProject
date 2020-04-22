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
        const extraStyle = {
            borderRadius: "1%",
            // border: "solid rgb(240, 211, 211)",
            // borderWidth: "3px 3px",
            backgroundColor: "white"
        }

        const cardTextStyle = {
            color:"black",
            fontSize: 20
        }

        const cardTitleStyle = {
            color:"white", 
            fontSize: 20
        }

        const ticketPictureStyle = {
            height: "100%",
            width: "100%",
        }

            return (
                <Link to={`/tickets/${this.props.ticket.ticket_id}`}>
                    <Card style={extraStyle} className="ticketCardStyle">
                        <CardBody>
                            <CardImg style={ticketPictureStyle} src={this.props.ticket.image_url} alt="Card image cap" />
                        </CardBody>
                        <CardBody>
                            <CardTitle style={cardTextStyle}>{this.props.ticket.title}</CardTitle>
                            <CardText style={cardTextStyle}>{this.props.ticket.datetime_local.slice(0, 10)}</CardText>
                        </CardBody>
                    
                    </Card>
                </Link>
            )
    }
}

export default Ticket;