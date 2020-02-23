import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, CardGroup, Col, Row, Button } from 'react-bootstrap';
import card1front from './image/card1front.jpg';
import axios from 'axios';
import BookCard from './BookCard';
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

        let bookCards = this.state.bookData.map(book => {
            return (
                <Col sm={4}>
                    <BookCard bookData={book} />
                </Col>
            )
        })
        return (
            <div>
                <Container>
                    <CardGroup>
                        <Row>
                            {bookCards}
                        </Row>
                    </CardGroup >
                </Container>
            </div >
        )
    }
}

