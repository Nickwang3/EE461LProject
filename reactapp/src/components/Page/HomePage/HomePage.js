import React from "react";
import {Jumbotron, Container} from 'react-bootstrap';
import baseballImg from "./baseballHomePage.jpeg";

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

                    <Jumbotron>
                        <h1>Baseball Website</h1>
                        <img id="baseballImg" src={baseballImg} alt="baseball"/>
                        <br/>
                        <p>This website was developed by UT students as a project for our Software Design Lab. The site features live updates of baseball data.</p>
                    </Jumbotron>
            )
        }
    }
}

export default HomePage;