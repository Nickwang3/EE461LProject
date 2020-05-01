import React from "react";
import { Link } from 'react-router-dom';
import HitterStats from './HitterStats'
import { Table } from 'reactstrap'
import './DetailedPlayerPage.css'

class HitterTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const {stats} = this.props
        return (
            <Table className="tableStyle">
                <thead>
                <tr className = 'statsTableHead'>
                    <th>Season</th>
                    <th>Team</th>
                    <th>G</th>
                    <th>PA</th>
                    <th>AB</th>
                    <th>R</th>
                    <th>H</th>
                    <th>2B</th>
                    <th>3B</th>
                    <th>HR</th>
                    <th>RBI</th>
                    <th>SB</th> 
                    <th>CS</th>
                    <th>SO</th>
                    <th>BA</th>
                    <th>OBP</th>
                    <th>SLG</th>
                    <th>OPS</th>
                </tr>
                </thead>
                <tbody className = 'statsTableBody'>
                    {stats.map(stat => <HitterStats stat={stat}/>)}
                </tbody>
            </Table>
        )
    }
}

export default HitterTable;