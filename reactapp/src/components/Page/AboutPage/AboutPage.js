import React, {useEffect, useState} from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';


class AboutPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            name: null,
            avatar: null,
            contributions: null,
            // issues: null
        }

        this.setData = this.setData.bind(this);
    }
  
  
    setData(name, contributions, avatar) {
        this.setState({avatar: avatar});
        this.setState({name: name});
        this.setState({contributions: contributions});
        console.log(avatar)
    };



    componentDidMount() {

        fetch('https://api.github.com/repos/Nickwang3/EE461LProject/contributors')
            .then(res => res.json())
            .then(data => {this.setData(data[0].login, data[0].contributions, data[0].avatar_url)});

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
                <div>
                    <Card>
                        <CardImg top width="20%" src={this.state.avatar} alt="Card image cap" />
                        <CardBody>
                            <CardTitle style={{color:"black"}}>{this.state.name}</CardTitle>
                            {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                            <CardText style={{color:"black"}}>Contributions: {this.state.contributions}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }
    }
}

export default AboutPage;