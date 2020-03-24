import React, {useEffect, useState} from "react";
import './AboutPage.css';
import ApiService from "../../../api/ApiService";
import Contributor from './Contributor.js'
import {
    Container, Row, Col, CardDeck
  } from 'reactstrap';

import mlbstatsapi from "../../../statics/mlbstatsapi.png";
const apiService = new ApiService();


class AboutPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            cardArray: null,
            cardResponse: null
        }

    }

    componentDidMount() {

        apiService
            .getTeammembers()
            .then(res => {
                this.setState({cardResponse: res.data.results});
                this.setState({cardArray: this.state.cardResponse.slice(0).map((item, i) => <Contributor key={i} name={item.name} avatar={item.avatar} description={item.description} issues={item.issues} commits={item.commits} tests={item.tests} />) });
                console.log(this.state.cardArray)
            })
                
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
                    <Container className="aboutContainer">
                        <Row className="mainAboutRow">
                            <Row className="siteRow">
                                <h1 className="rowTitle">Our Site</h1>
                                <p style={{fontSize: "23px"}}>We developed this website in order to provide baseball lovers easy access to all the data and scores they desire. Whether you are a casual or diehard baseball fan, you'll find what you want at Home Plate.</p>
                            </Row>
                            <Row className="dataSourcesRow">
                                <h1 className="rowTitle" style={{width: "100%",marginBottom: "30px"}}>Data Sources</h1>
                                <Col className="cols">
                                    <img style={{width: "80%", height: "60%", marginBottom: "10px"}}src={require("./../../../statics/mlbstatsapi.png")}></img>
                                    <h4>MLBStats API</h4>
                                </Col>
                                <Col className="cols">
                                    <img style={{width: "80%", height: "60%", marginBottom: "10px"}} src={require("./../../../statics/sportsdata_io.png")}></img>
                                    <h4>Sportsdata.io API</h4>
                                </Col>
                                <Col className="cols">
                                    <img style={{width: "80%", height: "60%", marginBottom: "10px"}} src={require("./../../../statics/api_baseball.png")}></img>
                                    <h4>Api-Baseball (from Rapidapis)</h4>
                                </Col>
                            </Row>
                            <Row className="teamRow">
                                <h1 className="rowTitle" style={{width: "100%",marginBottom: "30px"}}>The Team</h1>
                                <CardDeck className="cardDeckRow">
                                    {this.state.cardArray ? this.state.cardArray.slice(0,3):console.log("Not loaded")}
                                </CardDeck>
                                <CardDeck className="cardDeckRow">
                                    {this.state.cardArray ? this.state.cardArray.slice(3,6):console.log("Not loaded")}
                                </CardDeck>                                
                            </Row> 
                            <Row className="toolsRow">
                                <h1 className="rowTitle" style={{width: "100%",marginBottom: "50px"}}>Tools</h1>
                                <Row>
                                    <Col className="cols">
                                        <img style={{width: "100%", height: "50%", marginBottom: "10px"}}src={require("./../../../statics/react.png")}></img>
                                        <h4>React</h4>
                                    </Col>
                                    <Col className="cols">
                                        <img style={{width: "70%", height: "50%", marginBottom: "10px"}} src={require("./../../../statics/django.png")}></img>
                                        <h4>Django</h4>
                                    </Col>
                                    <Col className="cols">
                                        <img style={{width: "70%", height: "50%", marginBottom: "10px"}} src={require("./../../../statics/postgresql.png")}></img>
                                        <h4>PostgreSQL</h4>
                                    </Col>
                                </Row>
                                    <Col className="cols">
                                        <img style={{width: "70%", height: "50%", marginBottom: "15px"}}src={require("./../../../statics/docker.png")}></img>
                                        <h4>Docker</h4>
                                    </Col>
                                    <Col className="cols">
                                        <img style={{width: "70%", height: "50%", marginBottom: "15px"}} src={require("./../../../statics/slack.png")}></img>
                                        <h4>Slack</h4>
                                    </Col>
                                    <Col className="cols">
                                        <img style={{width: "70%", height: "50%", marginBottom: "15px"}} src={require("./../../../statics/aws.png")}></img>
                                        <h4>AWS</h4>
                                    </Col>
                                <Row>

                                </Row>
                            </Row> 
                        </Row>

                    </Container> 
                </div>               
            )
        }
    }
}

export default AboutPage;