import React from "react";
import ApiService from "../../../api/ApiService";
import { withRouter } from 'react-router';
import { Container, Row} from 'reactstrap'
import PitcherTable from "./PitcherTable";
import HitterTable from "./HitterTable";
import './DetailedPlayerPage.css'

const apiService = new ApiService();

class DetailedPlayerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      player: null,
      stats: null
    };
  }

  componentDidMount() {
      apiService
        .getPlayerById(this.props.match.params.player_id)
        .then(result => {
            this.setState({
                player: result.data
            })
        })
        .then(() => {
          if (this.state.player.position.includes("P")) {
            return apiService.getPitcherStatsById(this.state.player.player_id)
          } 
          else {
            return apiService.getHitterStatsById(this.state.player.player_id)
          }
        })
        .then(res => {
          this.setState({
            isLoaded: true,
            stats: res.data
          })
        })
  }

  render() {
    const { error, isLoaded, player, stats } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>


          <Container className="detailedPlayerContainer">

            <Row className="playerPictureRow">
              <img className="playerPictureStyle" src={player.picture}></img>
            </Row>
            <Row className="playerNameRow">
              <h1 className="titleStyle">{player.name}</h1>
            </Row>

              <h5> Team: {player.age} </h5>
              <h5> Position: {player.position} </h5>
              <h5> Number: {player.number} </h5>
              <h5> Age: {player.age} </h5>
              <h5> Height: {player.height} </h5>
              <h5> Weight: {player.weight} </h5>

            <Row className="playerInfoRow">
              

              <Row className="statsRow"> 
                {(this.state.player.position.includes("P") ? <PitcherTable stats={stats}/>:<HitterTable stats={stats}/>)}
              </Row>
              
            </Row>
          </Container>
        </div>
      );
    }
  }

}

export default withRouter(DetailedPlayerPage);