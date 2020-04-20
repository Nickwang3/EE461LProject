import React from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Player.css'


class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        const extraStyle = {
            borderRadius: "1%",
            border: "solid rgb(240, 211, 211)",
            borderWidth: "3px 3px",
            backgroundColor: "rgba(14, 156, 161, 0.26)"
        }

        const cardTextStyle = {
            color:"white",
            fontSize: 20
        }

        const cardTitleStyle = {
            color:"white", 
            fontSize: 20
        }

        const playerPictureStyle = {
            height: "100%",
            width: "75%",
        
            // borderRadius: "50%",
            // border: "2px solid white"
        }

            return (
                <Link to={`/players/${this.props.player.player_id}`}>
                    <Card style={extraStyle} className="playerCardStyle">
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