import React from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

class Team extends React.Component {

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
                        <CardTitle style={cardTitleStyle}>{this.props.name}</CardTitle>
                        <CardText style={cardTextStyle}>#{this.props.number}</CardText>
                        {/* <CardText style={cardTextStyle}>Division: {this.props.division}</CardText>
                        <CardText style={cardTextStyle}>Venue: {this.props.venue}</CardText> */}
                    </CardBody>
                </Card>
            )
            
        
    }
}

export default Team;