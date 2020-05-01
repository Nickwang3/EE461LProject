import React from 'react';
import './BoxScore.css';
import { Link } from 'react-router-dom';
import { Table, Container, Row, Col } from 'reactstrap';


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

        console.log(homePlayerPitching)

        return (
            <Row className="boxScoreRow">
                
                <Row className = 'primaryRowStyle'>
                    Batting
                </Row>

                <Row className="battingStats">
                    <Col className="teamTable">
                        <Table className="tableStyle" striped size='sm'>
                            <thead style={{color: "white"}}>
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
                            <tbody style={{color: "white"}}>
                                {Object.keys(homePlayerHitting).map((key, player) => {
                                    if (homePlayerHitting[key]['stats']['batting']['atBats']) {
                                        return (
                                            <tr>
                                                <td><Link style={{color:'white'}} to={`/players/${key}`}>{homePlayerHitting[key]['person']['fullName']}</Link></td>
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
                                    }
                                })}
                                <tr>
                                    <td>Total</td>
                                    <td>{homeHittingTotals['atBats']}</td>
                                    <td>{homeHittingTotals['runs']}</td>
                                    <td>{homeHittingTotals['hits']}</td>
                                    <td>{homeHittingTotals['homeRuns']}</td>
                                    <td>{homeHittingTotals['rbi']}</td>
                                    <td>{homeHittingTotals['baseOnBalls']}</td>
                                    <td>{homeHittingTotals['strikeOuts']}</td>
                                    <td>{homeHittingTotals['leftOnBase']}</td>
                                </tr>  
                            </tbody>
                        </Table>
                    </Col>

                    <Col className="teamTable">
                        <Table className="tableStyle" striped size='sm'>
                            <thead style={{color: "white"}}>
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
                            <tbody style={{color: "white"}}>
                                {Object.keys(awayPlayerHitting).map((key, player) => {
                                    
                                   if(awayPlayerHitting[key]['stats']['batting']['atBats']) {
                                    return (
                                        <tr>
                                            <td><Link style={{color:'white'}} to={`/players/${key}`}>{awayPlayerHitting[key]['person']['fullName']}</Link></td>
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
                                   }

                                   return;

                                })}
                                <tr>
                                    <td>Total</td>
                                    <td>{awayHittingTotals['atBats']}</td>
                                    <td>{awayHittingTotals['runs']}</td>
                                    <td>{awayHittingTotals['hits']}</td>
                                    <td>{awayHittingTotals['homeRuns']}</td>
                                    <td>{awayHittingTotals['rbi']}</td>
                                    <td>{awayHittingTotals['baseOnBalls']}</td>
                                    <td>{awayHittingTotals['strikeOuts']}</td>
                                    <td>{awayHittingTotals['leftOnBase']}</td>
                                </tr>  
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Row className='primaryRowStyle'>
                    Pitching
                </Row>

                <Row className="pitchingStats">
                    <Col className="teamTable">
                        <Table className="tableStyle" striped size="sm">
                            <thead style={{color: "white"}}>
                                <tr>
                                    <th>Player</th>
                                    <th>IP</th>
                                    <th>H</th>
                                    <th>R</th>
                                    <th>ER</th>
                                    <th>BB</th>
                                    <th>K</th> 
                                    <th>HR</th>
                                </tr>
                            </thead>
                            <tbody style={{color: "white"}}>
                                {Object.keys(homePlayerPitching).map((key, player) => {
                                    return (
                                        <tr>
                                            <td><Link style={{color: "white"}}to={`/players/${key}`}>{homePlayerPitching[key]['person']['fullName']}</Link></td>
                                            <td>{homePlayerPitching[key]['stats']['pitching']['inningsPitched']}</td>
                                            <td>{homePlayerPitching[key]['stats']['pitching']['hits']}</td>
                                            <td>{homePlayerPitching[key]['stats']['pitching']['runs']}</td>
                                            <td>{homePlayerPitching[key]['stats']['pitching']['earnedRuns']}</td>
                                            <td>{homePlayerPitching[key]['stats']['pitching']['baseOnBalls']}</td>
                                            <td>{homePlayerPitching[key]['stats']['pitching']['strikeOuts']}</td>
                                            <td>{homePlayerPitching[key]['stats']['pitching']['homeRuns']}</td>
                                        </tr>
                                    )
                                })}
                                <tr>
                                    <td>Total</td>
                                    <td>{homePitchingTotals['inningsPitched']}</td>
                                    <td>{homePitchingTotals['hits']}</td>
                                    <td>{homePitchingTotals['runs']}</td>
                                    <td>{homePitchingTotals['earnedRuns']}</td>
                                    <td>{homePitchingTotals['baseOnBalls']}</td>
                                    <td>{homePitchingTotals['strikeOuts']}</td>
                                    <td>{homePitchingTotals['homeRuns']}</td>
                                </tr>          
                            </tbody>
                        </Table>
                    </Col>

                    <Col className="teamTable">
                        <Table className="tableStyle" striped size="sm">
                            <thead style={{color: "white"}}>
                                <tr>
                                    <th>Player</th>
                                    <th>IP</th>
                                    <th>H</th>
                                    <th>R</th>
                                    <th>ER</th>
                                    <th>BB</th>
                                    <th>K</th> 
                                    <th>HR</th>
                                </tr>
                            </thead>
                            <tbody style={{color: "white"}}>
                                {Object.keys(awayPlayerPitching).map((key, player) => {
                                    return (
                                        <tr>
                                            <td><Link style={{color: "white"}}to={`/players/${key}`}>{awayPlayerPitching[key]['person']['fullName']}</Link></td>
                                            <td>{awayPlayerPitching[key]['stats']['pitching']['inningsPitched']}</td>
                                            <td>{awayPlayerPitching[key]['stats']['pitching']['hits']}</td>
                                            <td>{awayPlayerPitching[key]['stats']['pitching']['runs']}</td>
                                            <td>{awayPlayerPitching[key]['stats']['pitching']['earnedRuns']}</td>
                                            <td>{awayPlayerPitching[key]['stats']['pitching']['baseOnBalls']}</td>
                                            <td>{awayPlayerPitching[key]['stats']['pitching']['strikeOuts']}</td>
                                            <td>{awayPlayerPitching[key]['stats']['pitching']['homeRuns']}</td>
                                        </tr>
                                    )
                                })}
                                <tr>
                                    <td>Total</td>
                                    <td>{awayPitchingTotals['inningsPitched']}</td>
                                    <td>{awayPitchingTotals['hits']}</td>
                                    <td>{awayPitchingTotals['runs']}</td>
                                    <td>{awayPitchingTotals['earnedRuns']}</td>
                                    <td>{awayPitchingTotals['baseOnBalls']}</td>
                                    <td>{awayPitchingTotals['strikeOuts']}</td>
                                    <td>{awayPitchingTotals['homeRuns']}</td>
                                </tr>     
                            </tbody>
                        </Table>                        
                    </Col>
                </Row>
            </Row>
        )
    }
}

export default BoxScore;
