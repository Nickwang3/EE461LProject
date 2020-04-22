import React from 'react';
import './Scoreboard.css';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Card , CardBody,
    CardTitle, Badge, CardText } from 'reactstrap';

import ApiService from '../../../api/ApiService';
import { Form } from 'react-bootstrap';

const monthMapping = {'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06','Jul': '07', 'Aug': '08', 
                      'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'}

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

    postPrediction = (game,team_side) => {
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
        awayButton.innerHTML= `${awayPercent.toFixed(2)}% predict to win.`
        homeButton.innerHTML= `${homePercent.toFixed(2)}% predict to win.`
        
        

    }

    formatTime (time) {
        var hour = time.split(":")[0]
        var minute = time.split(":")[1]
        var set = ""

        if (parseInt(hour) > 12) {
            set = "PM"
            hour = (parseInt(hour) % 12).toString()
        }
        else {
            set = "AM"
        }

        return hour + ":" + minute + " " + set 
            
    }

    render(){


        const {homeTeam, awayTeam, isLoaded, error} = this.state
        const {game} = this.props
        const full_date = (new Date(game.game_datetime)).toString()
 
        const date = monthMapping[full_date.split(" ")[1]] + "/" + full_date.split(" ")[2]
        const time = this.formatTime(full_date.split(" ")[4])

        console.log(date)

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
                            <Container style={{display: "flex", justifyContent:"center", alignContent: "center"}}>
                                <Row style={{width: "100%", margin: "10px", fontSize: "26px"}}>{date}</Row>
                                <Row style={{width: "100%", fontSize: "16px", display: "flex", justifyContent:"center", alignContent: "center"}}>{time}</Row>
                            </Container>
                        </Col>
                        <Col>
                            <Button outline style={{marginTop: "12%", color: "white"}} id={`homePrediction${game.game_id}`} onClick={() => { this.postPrediction(game,'home')}} className="predictionButton">{homeTeam.name} will win.</Button>
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
                            <Link to={`/scores/${game.game_id}`}><Button outline style={{color: "white"}}>Boxscore</Button></Link>
                        </Col>

                        <Col>
                            <Button outline style={{marginTop: "12%", color: "white"}} id={`awayPrediction${game.game_id}`} onClick={() => { this.postPrediction(game,'away')}} className="predictionButton"  >{awayTeam.name} will win.</Button>
                        </Col>

                    </Row>

                </Row>
            );
        }
    }
}

export default ScoreBoard;
