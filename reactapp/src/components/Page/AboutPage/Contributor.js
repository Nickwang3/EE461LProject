import React from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

  import styles from './AboutPage.css'

class Contributor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {
        const cardStyle = {
            margin: 20, 
            width: 250, 
            height: 450,
            border: "solid rgb(207, 193, 193)",
            borderWidth: 2
        }

        const cardTextStyle = {
            color:"black",
            fontSize: 12,
            margin: 0
        }

        const cardTitleStyle = {
            color:"black", 
            fontSize: 20,
            marginBottom: 0
        }

        const CardSubtitleStyle = {
            color: "black",
            fontSize: 15,
            color: "grey"
        }

        const cardImgStyle = {
            width:246, 
            height:200,
            alignSelf: "center"
        }

            return (
                <Card className={styles.cardStyle}>
                    <CardImg className={styles.cardImgStyle} src={`/members/${this.props.avatar}`} alt="Card image cap" />
                    <CardBody>
                        <CardTitle className={styles.cardTitleStyle}>{this.props.name}</CardTitle>
                        <CardSubtitle className={styles.cardSubtitleStyle}>{this.props.description}</CardSubtitle>
                        <CardText className={styles.cardTextStyle}>Commits: {this.props.commits}</CardText>
                        <CardText className={styles.cardTextStyle}>Issues: {this.props.issues}</CardText>
                        <CardText className={styles.cardTextStyle}>Tests: {this.props.tests}</CardText>
                    </CardBody>
                </Card>
            )
            
        
    }
}

export default Contributor;