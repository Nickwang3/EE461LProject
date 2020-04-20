import React from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Team.css'

class Team extends React.Component {

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
            fontSize: 18
        }

        const cardTitleStyle = {
            font: "400 30px/1.5 'Pacifico', Helvetica, sans-serif",
            color: "white"
        }

            return (
                <Link to={`/teams/${this.props.team.team_id}`}>
                    <Card style={extraStyle} className="cardStyle">
                        <CardBody style={{padding: "50px"}}><CardImg className="cardImageStyle" src={this.props.team.logo} alt="Card image cap" /></CardBody>
                        <CardBody>
                            <CardTitle style={cardTitleStyle}>{this.props.team.name}</CardTitle>
                            {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                            <CardText style={cardTextStyle}>{this.props.team.division}</CardText>
                            <CardText style={cardTextStyle}>{this.props.team.venue}</CardText>
                        </CardBody>
                    </Card>
                </Link>
            )
    }
}

export default Team;