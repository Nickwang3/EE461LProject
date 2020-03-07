import React from 'react';

import { Container, Row, Col, Card , CardBody,
    CardTitle, Badge } from 'reactstrap';



class ScoreBoard extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }
    render(){
        const { match, home, visitor } = this.props
 
         return(
            <Container>
                <Row>
                    <Col md={4}>
                    <Card>
                        <CardBody>
                            <CardTitle><Badge color="info">Mandante</Badge></CardTitle>
                            <div>
                                    <Team name={home.name} 
                                    gols={this.state.gols_home} 
                                    marcarGol={this.marcarGolHome.bind(this)}/>
                            </div>
                        </CardBody>
                    </Card>
                    </Col>
                    <Col md={4}>
                        <Match {...match}/>
                    </Col>
                    <Col md={4}>
                    <Card>
                        <CardBody>
                        <CardTitle><Badge color="info">Visitante</Badge></CardTitle>
                            <div>
                                    <Team name={visitor.name} 
                                    gols={this.state.gols_visitor} 
                                    marcarGol={this.marcarGolvisitor.bind(this)}/>
                        </div>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ScoreBoard;
