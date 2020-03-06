import React, {useEffect, useState} from "react";
import './AboutPage.css';
import Contributor from './Contributor.js'
import {
    Container, Row
  } from 'reactstrap';

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
                    <h1 className="header">About our team...</h1>
                    <Container>
                            {this.state.cardArray}
                    </Container> 
                </div>               
            )
        }
    }
}

export default AboutPage;