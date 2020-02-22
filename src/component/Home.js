import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, CardGroup, Col, Row, Button } from 'react-bootstrap';
import card1front from './image/card1front.jpg';
import card1back from './image/card1back.jpg';
import card2front from './image/card2front.jpg';
import card2back from './image/card2back.jpg';
import card3front from './image/card3front.jpg';
import card3back from './image/card3back.jpg';
import card4front from './image/card4front.jpg';
import card4back from './image/card4back.jpg';
import axios from 'axios';
import './css/index.css';
export class Home extends Component {

    state = {
        bookData: [],
        msg: ''
    }

    async componentDidMount() {

        await axios
            .get('/book/getBookData')
            .then(res => {

                this.setState({
                    bookData: res.data.bookData
                })
            })
            .catch(err => {
                this.setState({
                    msg: err.response.data.msg
                })
                alert(this.state.msg);
            })
        console.log(this.state.bookData);

    }
    render() {
        return (
            <div>
                <Container>
                    <CardGroup>
                        <Row>
                            <Col sm={4}>
                                <Card className='card'>
                                    <Card.Img variant="top" src={card1front} className="cardimage" />
                                    <Card.Body className='opct'>
                                        <Card.Title>C++</Card.Title>
                                        <Card.Text>
                                            Subject Code: 215002<br />
                                            Semister :4th<br />
                                            Author : Balaguruswami
                                                <Button id='buttoncolor'>Request</Button>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </CardGroup >
                </Container>
            </div >
        )
    }
}

