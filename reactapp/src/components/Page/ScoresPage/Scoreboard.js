import React from 'react';

import { Container, Row, Col, Card , CardBody,
    CardTitle, Badge, CardText } from 'reactstrap';



class ScoreBoard extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }
    render(){

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


        const {game} = this.props
 
         return(
            <div>
                <Card>
                    <CardTitle style={cardTitleStyle}>{game.home_team} vs. {game.away_team}</CardTitle>
                    <CardText style={cardTextStyle}>{game.home_score} {game.away_score}</CardText>
                    <CardText style={cardTextStyle}>Current Inning: {game.current_inning}</CardText>
                </Card>
            </div>
        );
    }
}

export default ScoreBoard;
