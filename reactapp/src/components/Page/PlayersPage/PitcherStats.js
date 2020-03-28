import React from "react";
import ApiService from "../../../api/ApiService";
import { Link } from 'react-router-dom';

class PitcherStats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const {stat} = this.props

        return (
            <tr>
                <td>{stat.season}</td>
                <td><Link style={{color:"white"}} to={`/teams/${stat.team}`}>{stat.team}</Link></td>
                <td>{stat.games_played}</td>
                <td>{stat.games_started}</td>
                <td>{stat.wins}</td>
                <td>{stat.losses}</td>
                <td>{stat.era}</td>
                <td>{stat.games_finished}</td>
                <td>{stat.complete_games}</td>
                <td>{stat.shutouts}</td>
                <td>{stat.saves}</td>
                <td>{stat.innings_pitched}</td> 
                <td>{stat.hits}</td>
                <td>{stat.runs}</td>
                <td>{stat.earned_runs}</td>
                <td>{stat.home_runs}</td>
                <td>{stat.walks}</td>         
                <td>{stat.strikeouts}</td> 
            </tr>
        )
    }
}

export default PitcherStats;