import React, {useEffect, useState} from "react";
import './AboutPage.css';
import Contributor from './Contributor.js'
import {
    Container, Row, Col
  } from 'reactstrap';

import mlbstatsapi from "../../../statics/mlbstatsapi.png";

class AboutPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            cardArray: null,
            cardResponse: null
        }

        this.setData = this.setData.bind(this)
    }
  
  
    setData(cardResponse) {
        this.setState({cardResponse: cardResponse});
        this.setState({cardArray: this.state.cardResponse.slice(0).map((item, i) => <Contributor key={i} name={item.login} avatar={item.avatar_url} contributions={item.contributions} />) });
        console.log(this.state.cardArray)
    };



    componentDidMount() {

        fetch('https://api.github.com/repos/Nickwang3/EE461LProject/contributors')
            .then(res => res.json())
            .then(data => {this.setData(data)});

        this.setState({
            isLoaded: true,
        })
    }

    

    render() {

        const {error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                // loop through all of rendered cards
                <div className="AboutPage">
                    {/* <h1 className="header">About our team...</h1> */}
                    <Container className="aboutContainer">
                        <Row className="mainAboutRow">
                            <Row className="siteRow">
                                <h1 className="rowTitle">Our Site</h1>
                                <p style={{fontSize: "23px"}}>We developed this website in order to provide baseball lovers easy access to all the data and scores they desire. Whether you are a casual or diehard baseball fan, you'll find what you want at Home Plate.</p>
                            </Row>
                            <Row className="dataSourcesRow">
                                <h1 className="rowTitle" style={{width: "100%",marginBottom: "30px"}}>Data Sources</h1>
                                <Col className="cols">
                                    <img style={{width: "100%", height: "60%", marginBottom: "10px"}}src={require("./../../../statics/mlbstatsapi.png")}></img>
                                    <h4>MLBStats API</h4>
                                </Col>
                                <Col className="cols">
                                    <img style={{width: "100%", height: "60%", marginBottom: "10px"}} src={require("./../../../statics/sportsdata_io.png")}></img>
                                    <h4>Sportsdata.io API</h4>
                                </Col>
                                <Col className="cols">
                                    <img style={{width: "100%", height: "60%", marginBottom: "10px"}} src={require("./../../../statics/api_baseball.png")}></img>
                                    <h4>Api-Baseball (from Rapidapis)</h4>
                                </Col>
                            </Row>
                            <Row className="teamRow">
                                <h1 className="rowTitle" style={{width: "100%",marginBottom: "30px"}}>The Team</h1>
                                {this.state.cardArray}
                            </Row> 
                            <Row className="toolsRow">
                                <h1 className="rowTitle" style={{width: "100%",marginBottom: "30px"}}>Tools</h1>
                            </Row> 
                        </Row>

                    </Container> 
                </div>               
            )
        }
    }
}

export default AboutPage;