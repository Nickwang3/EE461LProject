import React from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

class Contributor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {
        const cardStyle = {
            margin: 20, 
            width: 250, 
            height: 400,
            border: "solid rgb(207, 193, 193)",
            borderWidth: 2
        }

        const cardTextStyle = {
            color:"black",
            fontSize: 12,
            margin: 0
        }

        const cardTitleStyle = {
            color:"black", 
            fontSize: 20,
            marginBottom: 0
        }

        const CardSubtitleStyle = {
            color: "black",
            fontSize: 15,
            color: "grey"
        }

        const cardImgStyle = {
            width:246, 
            height:200,
            alignSelf: "center"
        }

            return (
                <Card style={cardStyle}>
                    <CardImg style={cardImgStyle} src={this.props.avatar} alt="Card image cap" />
                    <CardBody>
                        <CardTitle style={cardTitleStyle}>{this.props.name}</CardTitle>
                        <CardSubtitle style={CardSubtitleStyle}>{this.props.description}</CardSubtitle>
                        <CardText style={cardTextStyle}>Commits: {this.props.commits}</CardText>
                        <CardText style={cardTextStyle}>Issues: {this.props.issues}</CardText>
                        <CardText style={cardTextStyle}>Tests: {this.props.tests}</CardText>
                    </CardBody>
                </Card>
            )
            
        
    }
}

export default Contributor;