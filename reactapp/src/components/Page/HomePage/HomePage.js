import React from "react";
import {Jumbotron, Container, Form, FormGroup, Label, Input, Row, Col} from 'reactstrap';
import { TwitterTimelineEmbed} from 'react-twitter-embed';
import "./HomePage.css";
import CarouselContainer from './CarouselContainer'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false
        }
    }

    componentDidMount() {
        this.setState({
            isLoaded: true
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
                <div style={{width: "100%"}}>
                    <Row style={{width: "100%", margin:"50px", display: "flex", justifyContent:"center"}} className="titleStyle">Home Plate</Row>
                    <Row style={{margin: "0px"}} className="carouselRow">
                        <CarouselContainer/>
                    </Row>
                    <Row style={{width: "100%", margin:"40px", display: "flex", justifyContent:"center"}} className="titleStyle">
                        News in Baseball
                    </Row>
                    <Row style={{width: "100%", margin:"40px", display: "flex", justifyContent:"center"}}> 
                        <Col>
                            <TwitterTimelineEmbed
                                sourceType="profile"
                                screenName="astros"
                                options={{height: 400, width: 400}}
                            />
                        </Col>
                        <Col>
                            <TwitterTimelineEmbed
                                sourceType="profile"
                                screenName="MLB"
                                options={{height: 400, width: 400}}
                            />
                        </Col>
                        <Col>
                            <TwitterTimelineEmbed
                                sourceType="profile"
                                screenName="redsox"
                                options={{height: 400, width: 400}}
                            />
                        </Col>
                    </Row>
                </div>
            )
        }
    }
}

export default HomePage;