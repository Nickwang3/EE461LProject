import React from "react";
import ApiService from "../../../api/ApiService";
import { Link } from 'react-router-dom';

class HitterStats extends React.Component {

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
                <td>{stat.games}</td>
                <td>{stat.plate_appearances}</td>
                <td>{stat.at_bats}</td>
                <td>{stat.runs}</td>
                <td>{stat.hits}</td>
                <td>{stat.doubles}</td>
                <td>{stat.triples}</td>
                <td>{stat.home_runs}</td>
                <td>{stat.runs_batted_in}</td>
                <td>{stat.stolen_bases}</td> 
                <td>{stat.caught_stealing}</td>
                <td>{stat.strikeouts}</td>
                <td>{stat.batting_average}</td>
                <td>{stat.obp}</td>
                <td>{stat.slg}</td>         
                <td>{stat.ops}</td>  
            </tr>
        )
    }
}

export default HitterStats;