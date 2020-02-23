import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
var path = '../serverSideCode/public/uploads/';

export default class BookCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={"/uploads/" + this.props.bookData.imageName} />
                    <Card.Body>
                        <Card.Title style={{color:'white'}}>{this.props.bookData.book_title}</Card.Title>
                        <Card.Text>{this.props.bookData.authorName}</Card.Text>
                        <Card.Text>{this.props.bookData.branch}</Card.Text>
                        <Card.Text>{this.props.bookData.semester}</Card.Text>
                        <Button variant="primary" >Go somewhere</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}