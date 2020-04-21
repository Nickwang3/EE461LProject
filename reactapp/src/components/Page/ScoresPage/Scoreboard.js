import React from 'react';
import './Scoreboard.css';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Card , CardBody,
    CardTitle, Badge, CardText } from 'reactstrap';

import ApiService from '../../../api/ApiService';
import { Form } from 'react-bootstrap';

const apiService = new ApiService();


class ScoreBoard extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoaded: false,
            homeTeam: null,
            awayTeam: null,
            error: null
        }
    }

    componentDidMount() {
        apiService
            .getTeamById(this.props.game.away_team)
            .then(res => {
                this.setState({
                    awayTeam: res.data
                })
            })
            .then(() => apiService.getTeamById(this.props.game.home_team))
            .then(res => {
                this.setState({
                    homeTeam: res.data,
                    isLoaded: true
                })
            })      
            .catch(error => {
                this.setState({
                  isLoaded: true,
                  error
                });
              });
    }

    postPrediction(game,team_side){
        if(team_side === 'away')
            apiService.postGamePrediction(game.game_id,team_side,++game.away_prediction);
        else
            apiService.postGamePrediction(game.game_id,team_side,++game.home_prediction);
        
        var awayButton = document.getElementById(`awayPrediction${game.game_id}`);
        var homeButton = document.getElementById(`homePrediction${game.game_id}`);

        const totalPredictions = game.away_prediction+game.home_prediction == 0 ? 1 : game.away_prediction+game.home_prediction;
        const homePercent = (game.home_prediction/ (game.away_prediction+game.home_prediction))*100;
        const awayPercent = (game.away_prediction/ (game.away_prediction+game.home_prediction))*100;
        awayButton.disabled = true;
        homeButton.disabled = true;
        awayButton.innerHTML= `${awayPercent}% predict to win.`
        homeButton.innerHTML= `${homePercent}% predict to win.`
        
        

    }

    render(){


        const {homeTeam, awayTeam, isLoaded, error} = this.state
        const {game} = this.props
 
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            // return <div>Loading...</div>;
            return <div></div>
        } else {
            return (
                <Row className="scoreBoardContainer">

                    <Row className="homeTeamRow">
                        
                        <Col className="teamPictureCol">
                            <a href={`/teams/${homeTeam.team_id}`}><img style={{height: "100px", width: "90px"}} src={homeTeam.logo}></img></a>
                        </Col>

                        <Col className="teamNameCol">
                            <h3 className="teamNameStyle">{homeTeam.name}</h3>
                        </Col>

                        <Col className="teamScoreCol">
                            <h2>{game.home_score}</h2>
                        </Col>

                        <Col className="boxScoreCol">
                            <Link to={`/scores/${game.game_id}`}><Button outline color="primary">Boxscore</Button></Link>
                        </Col>
                        <Col>
                            <Button id={`homePrediction${game.game_id}`} name='predictHome' className="predictionButton" onClick="">{homeTeam.name} will win.</Button>
                        </Col>

                    </Row>

                    <Row className="awayTeamRow">

                        <Col className="teamPictureCol">
                            <a href={`/teams/${awayTeam.team_id}`}><img style={{height: "100px", width: "90px"}} src={awayTeam.logo}></img></a>
                        </Col>

                        <Col className="teamNameCol">
                            <h3 className="teamNameStyle">{awayTeam.name}</h3>
                        </Col>

                        <Col className="teamScoreCol">
                            <h2>{game.away_score}</h2>
                        </Col>

                        <Col className="boxScoreCol">
                            {/* <Link to={`/scores/${game.game_id}`}><Button outline color="primary">Boxscore</Button></Link> */}
                        </Col>

                        <Col>
                            <Button id={`awayPrediction${game.game_id}`} onClick={() => { this.postPrediction(game,'away')}} className="predictionButton"  >{awayTeam.name} {game.away_prediction} will win.</Button>
                        </Col>

                    </Row>

                </Row>
            );
        }
    }
}

export default ScoreBoard;
