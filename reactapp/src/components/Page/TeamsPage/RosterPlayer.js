import React from "react";

import { Link } from 'react-router-dom';

class RosterPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const {player} = this.props

        return (
            <tr>
                <td>{player.number}</td>
                <td><Link style={{color:"white"}} to={`/players/${player.player_id}`}>{player.name}</Link></td>
                <td>{player.position}</td>
                <td>{player.age}</td>
                <td>{player.height}</td>
                <td>{player.weight}</td>
            </tr>
        )
    }
}

export default RosterPlayer;