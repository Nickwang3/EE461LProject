import React, {useEffect, useState} from "react";
import './AboutPage.css';
import ApiService from "../../../api/ApiService";
import Contributor from './Contributor.js'
import {
    Container, Row, Col, CardDeck
  } from 'reactstrap';
  import { Link } from 'react-router-dom';


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
                this.setState({cardResponse: res.data.results}, () => {
                    this.setState({cardArray: this.state.cardResponse.slice(0).map((item, i) => <Contributor key={i} name={item.name} avatar={item.avatar} description={item.description} issues={item.issues} commits={item.commits} tests={item.tests} />) });
                console.log(this.state.cardArray)
                });
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
                            <Row style={{paddingLeft: "80px", paddingRight: "80px"}} className="siteRow">
                                <h1 className="rowTitle">Our Site</h1>
                                <p style={{fontSize: "23px"}}>We developed this website in order to provide baseball lovers easy access to all the data and scores they desire. Whether you are a casual or diehard baseball fan, you'll find what you want at Home Plate.</p>
                            </Row>
                            <Row className="dataSourcesRow">
                                <h1 className="rowTitle" style={{width: "100%",marginBottom: "30px"}}>Data Sources</h1>
                                <Col className="cols">
                                    <a href="https://pypi.org/project/MLB-StatsAPI/">
                                        <img style={{width: "80%", height: "60%", marginBottom: "10px"}}src={require("./../../../statics/mlbstatsapi.png")}/>
                                    </a>
                                    <h4>MLBStats API</h4>
                                </Col>
                                <Col className="cols">
                                    <a href="https://sportsdata.io/">
                                        <img style={{width: "90%", height: "60%", marginBottom: "10px"}} src={require("./../../../statics/sportsdata_io.png")} />
                                    </a>
                                    <h4>Sportsdata.io API</h4>
                                </Col>
                                <Col className="cols">
                                    <a href="https://rapidapi.com/api-sports/api/api-baseball">
                                        <img style={{width: "90%", height: "60%", marginBottom: "10px"}} src={require("./../../../statics/api_baseball.png")}/>
                                    </a>
                                    <h4>Api-Baseball (from Rapidapis)</h4>
                                </Col>
                                <Col className="cols">
                                    <a href="https://seatgeek.com/">
                                        <img style={{width: "90%", height: "60%", marginBottom: "10px"}} src={require("./../../../statics/seatgeek.png")}/>
                                    </a>
                                    <h4>Seat Geek</h4>
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
                                        <img style={{width: "100%", height: "50%", marginBottom: "10px"}} src={require("./../../../statics/react.png")}/>
                                        <h4>React</h4>
                                        <p style={{fontSize: "14px"}}>This tool is a frontend JavaScript framework that allowed us to write our frotend in and object-oriented style.</p>
                                    </Col>
                                    <Col className="cols">
                                        <img style={{width: "70%", height: "50%", marginBottom: "10px"}} src={require("./../../../statics/django.png")}></img>
                                        <h4>Django</h4>
                                        <p style={{fontSize: "14px"}}>We used Django framwork for our backend/api</p>
                                    </Col>
                                    <Col className="cols">
                                        <img style={{width: "70%", height: "50%", marginBottom: "10px"}} src={require("./../../../statics/postgresql.png")}></img>
                                        <h4>PostgreSQL</h4>
                                        <p style={{fontSize: "14px"}}>In order to store all of our scraped data, we used PostgreSQL</p> 
                                    </Col>
                                </Row>
                                    <Col className="cols">
                                        <img style={{width: "70%", height: "50%", marginBottom: "15px"}}src={require("./../../../statics/docker.png")}></img>
                                        <h4>Docker</h4>
                                        <p style={{fontSize: "14px"}}>Docker is a neat tool that eased local debugging by providing a virtual environment for our backend.</p>
                                    </Col>
                                    <Col className="cols">
                                        <img style={{width: "70%", height: "50%", marginBottom: "15px"}} src={require("./../../../statics/slack.png")}></img>
                                        <h4>Slack</h4>
                                        <p style={{fontSize: "14px"}}>We used slack as our main channel of communication throughout the project.</p>
                                    </Col>
                                    <Col className="cols">
                                        <img style={{width: "70%", height: "50%", marginBottom: "15px"}} src={require("./../../../statics/aws.png")}></img>
                                        <h4>AWS</h4>
                                        <p style={{fontSize: "14px"}}>We hosted both our frontend and backend on AWS.</p>
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