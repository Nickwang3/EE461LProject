import React from 'react';
import './Scoreboard.css';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Card , CardBody,
    CardTitle, Badge, CardText } from 'reactstrap';

import ApiService from '../../../api/ApiService';

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

                        <Col styleName="boxScoreCol">
                            <Link to={`scores/${game.game_id}`}><Button outline color="primary">Boxscore</Button></Link>
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

                        <Col styleName="boxScoreCol">
                            <Link to={`scores/${game.game_id}`}><Button outline color="primary">Boxscore</Button></Link>
                        </Col>

                    </Row>

                </Row>
            );
        }
    }
}

export default ScoreBoard;
