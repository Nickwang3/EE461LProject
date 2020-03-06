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
            height: 200,
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
                <Card style={cardStyle}>
                    {/* <CardImg style={{width:199, height:200}} src={this.props.avatar} alt="Card image cap" /> */}
                    <CardBody>
                        <CardTitle style={cardTitleStyle}>{this.props.player.name}</CardTitle>
                        <CardText style={cardTextStyle}>#{this.props.player.number}</CardText>
                        {/* <CardText style={cardTextStyle}>Division: {this.props.division}</CardText>
                        <CardText style={cardTextStyle}>Venue: {this.props.venue}</CardText> */}
                        <Link to={`/players/${this.props.player.player_id}`}>
                            <button className="btn btn-primary">Go to Player Page!</button>
                        </Link>
                    </CardBody>
                </Card>
            )
            
        
    }
}

export default Player;