import React from 'react';
import './Scoreboard.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card , CardBody,
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
        console.log(this.props)
        apiService
            .getTeamById(this.props.game.away_team)
            .then(res => {
                this.setState({
                    awayTeam: res.data
                })
                console.log(this.state.awayTeam)
            })
            .then(() => apiService.getTeamById(this.props.game.home_team))
            .then(res => {
                this.setState({
                    homeTeam: res.data,
                    isLoaded: true
                })
                console.log(this.state.homeTeam)
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
                            <Link to={`teams/${homeTeam.team_id}`}><img src={homeTeam.logo}></img></Link>
                        </Col>

                        <Col className="teamNameCol">
                            <h3 className="teamNameStyle">{homeTeam.name}</h3>
                        </Col>

                        <Col className="teamScoreCol">
                            <h2>{game.home_score}</h2>
                            <h5>{game.current_inning}th</h5>
                        </Col>

                        <Col styleName="boxScoreCol">
                        
                        </Col>

                    </Row>

                    <Row className="awayTeamRow">

                        <Col className="teamPictureCol">
                            <Link to={`teams/${awayTeam.team_id}`}><img src={awayTeam.logo}></img></Link>
                        </Col>

                        <Col className="teamNameCol">
                            <h3 className="teamNameStyle">{awayTeam.name}</h3>
                        </Col>

                        <Col className="teamScoreCol">
                            <h2>{game.away_score}</h2>
                            <h5>{game.current_inning}th</h5>
                        </Col>

                        <Col styleName="boxScoreCol">
                        
                        </Col>

                    </Row>

                </Row>
            );
        }
    }
}

export default ScoreBoard;
