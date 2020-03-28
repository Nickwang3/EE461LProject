import React from "react";
import { Link } from 'react-router-dom';
import PitcherStats from './PitcherStats'
import { Table } from 'reactstrap';
import './DetailedPlayerPage.css'


class PitcherTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const {stats} = this.props

        return (
            <Table className="tableStyle">
                <thead  style={{color: "white"}}>
                <tr>
                    <th>Season</th>
                    <th>Team</th>
                    <th>GP</th>
                    <th>GS</th>
                    <th>W</th>
                    <th>L</th>
                    <th>ERA</th>
                    <th>GF</th>
                    <th>CG</th>
                    <th>SHO</th>
                    <th>SV</th>
                    <th>IP</th> 
                    <th>H</th>
                    <th>R</th>
                    <th>ER</th>
                    <th>HR</th>
                    <th>B</th>
                    <th>SO</th>
                </tr>
                </thead>
                <tbody  style={{color: "white"}}>
                    {stats.map(stat => <PitcherStats stat={stat}/>)}
                </tbody>
            </Table>
        )
    }
}

export default PitcherTable;