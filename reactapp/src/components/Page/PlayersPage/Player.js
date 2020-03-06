import React from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import { Link } from 'react-router-dom';


class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const cardStyle = {
            margin: 10, 
            width: 200, 
            height: 300,
        }

        const cardTextStyle = {
            color:"black",
            fontSize: 20
        }

        const cardTitleStyle = {
            color:"black", 
            fontSize: 20
        }

        const playerPictureStyle = {
            width: "75%",
        }

            return (
                <Link to={`/players/${this.props.player.player_id}`}>
                    <Card style={cardStyle}>
                        <CardBody>
                            <CardImg style={playerPictureStyle} src={this.props.player.picture} alt="Card image cap" />
                        </CardBody>
                        <CardBody>
                            <CardTitle style={cardTitleStyle}>{this.props.player.name}</CardTitle>
                            <CardText style={cardTextStyle}>#{this.props.player.number}</CardText>
                            {/* <CardText style={cardTextStyle}>Division: {this.props.division}</CardText>
                            <CardText style={cardTextStyle}>Venue: {this.props.venue}</CardText> */}
                        </CardBody>
                    </Card>
                </Link>
            )
            
        
    }
}

export default Player;