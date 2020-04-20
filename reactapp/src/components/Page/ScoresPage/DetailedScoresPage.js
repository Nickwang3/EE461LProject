import React from 'react';

import ApiService from '../../../api/ApiService';
import BoxScore from './BoxScore';
import './BoxScore.css'
import { Table, Container, Row, Col } from 'reactstrap';

const apiService = new ApiService();

class DetailedScoresPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            boxscore_id: this.props.match.params.boxscore_id,
            boxscore: null,
            isLoaded: false,
            error: null,
            game: null,
            homeTeam: null,
            awayTeam: null
        }
    }

    componentDidMount() {
        apiService.getBoxscoreById(this.state.boxscore_id)
            .then(res => {
                this.setState({
                    boxscore: res.data,
                })
            })
            .then(() => {
                return apiService.getGameById(this.state.boxscore_id)
            })
            .then(res => {
                this.setState({
                    game: res.data,
                })
            })
            .then(() => {
                return apiService.getTeamById(this.state.game.away_team)
            })
            .then(res => {
                this.setState({
                    awayTeam: res.data
                })
            })
            .then(() => {
                return apiService.getTeamById(this.state.game.home_team)
            })
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

    render() {
        const { error, isLoaded, boxscore, awayTeam, homeTeam, game } = this.state; 
        console.log(game)
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <Container className="boxScoreContainer">
                <Row className="scoreRow">
                    <Col className="teamScoreCol">
                        <a href={`/teams/${homeTeam.team_id}`}><img className="teamLogos" src={homeTeam.logo}/></a>
                        <h1 style={{marginLeft: "80px"}}>{game.home_score}</h1>
                    </Col>

                    <Col className="teamScoreCol">
                        <h1 style={{marginRight: "80px"}}>{game.away_score}</h1>
                        <a href={`/teams/${awayTeam.team_id}`}><img className="teamLogos" src={awayTeam.logo}/></a>
                    </Col>
                </Row>
                <BoxScore boxscore={boxscore}>Hello</BoxScore>
            </Container>
                            
            )
        }
    }
}

export default DetailedScoresPage;