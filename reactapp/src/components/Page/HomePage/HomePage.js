import React from "react";
import {Jumbotron, Container, Form, FormGroup, Label, Input, Row, Col} from 'reactstrap';
import { TwitterTimelineEmbed} from 'react-twitter-embed';
import "./HomePage.css";

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
                <div className="searchContainer">
                    <Jumbotron className="jumboTron" fluid>
                            <h1 className="title">Home Plate</h1>
                            <Form className="searchBarContainer">
                                <FormGroup className="searchBar">
                                    {/* <Label for="exampleSearch">Search</Label> */}
                                    <Input
                                    type="search"
                                    name="search"
                                    id="exampleSearch"
                                    placeholder="Search our website..."
                                    />
                                </FormGroup>
                            </Form>
                        <Row>
                            <Col>
                                <TwitterTimelineEmbed
                                    sourceType="profile"
                                    screenName="MLB"
                                    options={{height: 400, width: 400}}
                                />
                            </Col>
                        </Row>
                    </Jumbotron>
                </div>
            )
        }
    }
}

export default HomePage;