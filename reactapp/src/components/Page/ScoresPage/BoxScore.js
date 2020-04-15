import React from 'react';
import './BoxScore.css';
import { Link } from 'react-router-dom';
import { Table, Container, Row, Col } from 'reactstrap';

import ApiService from '../../../api/ApiService';

const apiService = new ApiService();


class BoxScore extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            homeHittingTotals: this.props.boxscore.home_hitting_totals,
            awayHittingTotals: this.props.boxscore.away_hitting_totals,
            homePitchingTotals: this.props.boxscore.home_pitching_totals,
            awayPitchingTotals: this.props.boxscore.away_pitching_totals,
            homePlayerHitting: this.props.boxscore.home_player_hitting,
            awayPlayerHitting: this.props.boxscore.away_player_hitting,
            homePlayerPitching: this.props.boxscore.home_player_pitching,
            awayPlayerPitching: this.props.boxscore.away_player_pitching
        }
    }

    componentDidMount() {
        console.log(this.state)
    }

    render(){
        const { homeHittingTotals, awayHittingTotals, homePitchingTotals, awayPitchingTotals, homePlayerHitting, awayPlayerHitting, homePlayerPitching, awayPlayerPitching } = this.state

        console.log(homePlayerHitting)

        return (
            <Container className="boxScoreContainer">

                <Row className="scoreAndTeams">

                </Row>

                <Row className="battingStats">
                    <Col className="homeTeamHittingTable">
                        <Table className="tableStyle">
                            <thead>
                                <tr>
                                    <th>Player</th>
                                    <th>AB</th>
                                    <th>R</th>
                                    <th>H</th>
                                    <th>HR</th>
                                    <th>RBI</th>
                                    <th>BB</th>
                                    <th>K</th> 
                                    <th>LOB</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(homePlayerHitting).map((key, player) => {
                                    return (
                                        <tr>
                                            <td>{homePlayerHitting[key]['person']['fullName']}</td>
                                            <td>{homePlayerHitting[key]['stats']['batting']['atBats']}</td>
                                            <td>{homePlayerHitting[key]['stats']['batting']['runs']}</td>
                                            <td>{homePlayerHitting[key]['stats']['batting']['hits']}</td>
                                            <td>{homePlayerHitting[key]['stats']['batting']['homeRuns']}</td>
                                            <td>{homePlayerHitting[key]['stats']['batting']['rbi']}</td>
                                            <td>{homePlayerHitting[key]['stats']['batting']['baseOnBalls']}</td>
                                            <td>{homePlayerHitting[key]['stats']['batting']['strikeOuts']}</td>
                                            <td>{homePlayerHitting[key]['stats']['batting']['leftOnBase']}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>

                    <Col className="awayTeamHittingTable">
                        <Table>
                            <thead>
                                <tr>
                                    <th>Player</th>
                                    <th>AB</th>
                                    <th>R</th>
                                    <th>H</th>
                                    <th>HR</th>
                                    <th>RBI</th>
                                    <th>BB</th>
                                    <th>K</th> 
                                    <th>LOB</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(awayPlayerHitting).map((key, player) => {
                                    return (
                                        <tr>
                                            <td>{awayPlayerHitting[key]['person']['fullName']}</td>
                                            <td>{awayPlayerHitting[key]['stats']['batting']['atBats']}</td>
                                            <td>{awayPlayerHitting[key]['stats']['batting']['runs']}</td>
                                            <td>{awayPlayerHitting[key]['stats']['batting']['hits']}</td>
                                            <td>{awayPlayerHitting[key]['stats']['batting']['homeRuns']}</td>
                                            <td>{awayPlayerHitting[key]['stats']['batting']['rbi']}</td>
                                            <td>{awayPlayerHitting[key]['stats']['batting']['baseOnBalls']}</td>
                                            <td>{awayPlayerHitting[key]['stats']['batting']['strikeOuts']}</td>
                                            <td>{awayPlayerHitting[key]['stats']['batting']['leftOnBase']}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Row className="pitchingStats">
                    <Col className="homeTeamPitchingTable">

                    </Col>

                    <Col className="awayTeamPitchingTable">
                        
                    </Col>
                </Row>

            </Container>
        )
    }
}

export default BoxScore;
