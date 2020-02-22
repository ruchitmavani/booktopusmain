import React, { Component } from 'react'
import { Form, Button, Table, Container, Col, Row, Card } from 'react-bootstrap'
import { NavLink, Redirect } from 'react-router-dom';
import store from './reduxStore';
import axios from 'axios';
//import axios from 'axios';
export class UplBook extends Component {
     state = {

          step: 1,
          file: null,
          msg: '',

          book_title: '',
          description: '',
          authorName: '',
          branch: '',
          semester: '',
          edition: '',
          isbnCode: '',
          bookUploaded: null

     }

     nextStep = () => {
          const { step } = this.state;
          this.setState({
               step: step + 1
          });
     }
     prevStep = () => {
          const { step } = this.state;
          this.setState({
               step: step - 1
          });
     }
     handleChange = input => e => {
          this.setState({ [input]: e.target.value });

     }
     fileChange = e => {
          e.preventDefault();

          let file = e.target.files[0];
          this.setState({
               file: file
          })
     }
     imageTraceHandler = async (e) => {

          e.preventDefault();

          const headers = {
               "Content-Type": "form-data"
          };
          /**
           * Here we convert our image into text
           */
          let file = this.state.file
          console.log(this.state.file)
          let formData = new FormData();
          formData.append('images', file);

          try {
               await axios
                    .post('/book/imageTrace', formData, headers)
                    .then(res => {
                         //alert('Into the right one');
                         this.setState({
                              msg: res.data.msg
                         })
                         //alert(this.state.msg);

                         // this.setState({
                         //      step: step + 1
                         // });
                         this.nextStep();
                    })
                    .catch(err => {

                         this.setState({
                              msg: err.response.data.msg
                         })
                         alert(this.state.msg)
                    })
          }
          catch (error) {
               this.setState({
                    msg: error
               })
               alert(this.state.msg);
          }



     }

     handleSubmit = async (e) => {

          e.preventDefault();

          /**
           * This method is used to upload the book details
           */

          var { book_title, description, authorName, branch, semester, edition, isbnCode, file } = this.state;
          book_title = book_title.toLowerCase().trimLeft();
          description = description.toLowerCase().trimLeft();
          authorName = authorName.toLowerCase().trimLeft();
          branch = branch.toLowerCase().trimLeft();
          isbnCode = isbnCode.trimLeft();

          var user_id = store.getState().auth.id;

          const headers = {
               "Content-Type": "form-data"
          };

          let formData = new FormData();

          formData.append('images', file);
          formData.append('book_title', book_title);
          formData.append('description', description);
          formData.append('authorName', authorName);
          formData.append('branch', branch);
          formData.append('semester', semester);
          formData.append('edition', edition);
          formData.append('isbnCode', isbnCode);
          formData.append('user_id', user_id);

          await axios
               .post('/book/uploadBook', formData, headers)
               .then(res => {

                    this.setState({
                         msg: res.data.msg,
                         bookUploaded: true
                    })
                    alert(this.state.msg);
               })
               .catch(err => {
                    this.setState({
                         msg: err.response.data.msg,
                         bookUploaded: false
                    })
                    alert('Error :' + this.state.msg);
               })
     }
     showStep = () => {
          const { step, } = this.state;
          if (step === 1)
               return (
                    <div style={{ overflow: 'hidden', backgroundColor: '#e0e0e0', margin: 'auto', width: '30%', marginTop: '20%', padding: '0', borderRadius: '53px' }}>

                         <Form style={{ marginTop: '15%', marginLeft: '15%', marginBottom: '15%', fontFamily: 'Verdana' }} enctype="multipart/form-data">
                              <Form.Group >
                                   <Form.Label for="exampleFile" style={{ fontSize: '16px' }} >Cover Photo</Form.Label>
                                   <Form.Control type="file" id="file" name="images" accept="image/*" onChange={(e) => this.fileChange(e)} style={{ width: '251px' }} />
                              </Form.Group>
                              <Form.Group className="mt-3 mb-3">
                                   <Button onClick={this.imageTraceHandler}>Next</Button>
                                   <NavLink to='/'>Home</NavLink>
                              </Form.Group>
                         </Form>
                    </div>
               );
          if (step === 2)
               return (
                    <Container>
                         <Row>
                              <Col>
                                   <Card text="white" style={{ overflow: 'hidden', backgroundColor: '#e0e0e0', fontFamily: 'Roboto', margin: 'auto', marginTop: '50%', padding: '0', borderRadius: '53px', width: '70%' }}>
                                        <Card.Header style={{ color: '#000000' }}>Suggestions</Card.Header>
                                        <Card.Body>
                                             <Card.Text>
                                                  {this.state.msg}
                                             </Card.Text>
                                        </Card.Body>
                                   </Card>
                                   <br />

                              </Col>
                              <Col>
                                   <Table style={{ overflow: 'hidden', backgroundColor: '#e0e0e0', margin: 'auto', marginTop: '5%', padding: '0', borderRadius: '53px' }}>
                                        <tr>
                                             <td>
                                                  <Form style={{ maxWidth: '75%', margin: 'auto', marginTop: '15%', marginBottom: '15%', fontFamily: 'Roboto', fontSize: '16px' }} >
                                                       <Form.Group>
                                                            <Form.Label>Title</Form.Label>
                                                            <Form.Control type="text" name="book_title" onChange={this.handleChange('book_title')} id="Name" placeholder="Title" style={{ borderRadius: '53px', }} />
                                                       </Form.Group>
                                                       <Form.Group>
                                                            <Form.Label >Description</Form.Label>
                                                            <Form.Control type="textarea" name="description" onChange={this.handleChange('description')} id="Description" placeholder="Description" style={{ borderRadius: '53px', }} />
                                                       </Form.Group>
                                                       <Form.Group>
                                                            <Form.Label for="text">Author Name</Form.Label>
                                                            <Form.Control type="text" name="authorName" onChange={this.handleChange('authorName')} id="Name" placeholder="Author name" style={{ borderRadius: '53px', }} />
                                                       </Form.Group>
                                                       <Form.Group>
                                                            <Form.Label>Branch</Form.Label>
                                                            <Form.Control as="select" name="branch" onChange={this.handleChange('branch')} style={{ borderRadius: '53px', }}>
                                                                 <option>None</option>
                                                                 <option>Computer</option>
                                                                 <option>Electrical</option>
                                                                 <option>Electronics</option>
                                                                 <option>Civil</option>
                                                                 <option>Mechenical</option>
                                                                 <option>Robotics</option>
                                                                 <option>AutoMobile</option>
                                                                 <option>Aeronotics</option>
                                                            </Form.Control>
                                                       </Form.Group>
                                                       <Form.Group controlId="formGridState">
                                                            <Form.Label>Semester</Form.Label>
                                                            <Form.Control as="select" name="semester" onChange={this.handleChange('semester')} style={{ borderRadius: '53px', }}>
                                                                 <option>None</option>
                                                                 <option>1</option>
                                                                 <option>2</option>
                                                                 <option>3</option>
                                                                 <option>4</option>
                                                                 <option>5</option>
                                                                 <option>6</option>
                                                                 <option>7</option>
                                                                 <option>8</option>
                                                            </Form.Control>
                                                       </Form.Group>
                                                       <Form.Group controlId="formGridState">
                                                            <Form.Label>Edition</Form.Label>
                                                            <Form.Control as="select" name="edition" onChange={this.handleChange('edition')} style={{ borderRadius: '53px', }}>
                                                                 <option>None</option>
                                                                 <option>1</option>
                                                                 <option>2</option>
                                                                 <option>3</option>
                                                                 <option>4</option>
                                                                 <option>5</option>
                                                                 <option>6</option>
                                                                 <option>7</option>
                                                                 <option>8</option>
                                                            </Form.Control>
                                                       </Form.Group>
                                                       <Form.Group>
                                                            <Form.Label for="exampleNumber">ISBN Code</Form.Label>
                                                            <Form.Control
                                                                 type="tel"
                                                                 name="isbnCode"
                                                                 onChange={this.handleChange('isbnCode')}
                                                                 id="exampleNumber"
                                                                 placeholder="ISBN code" style={{ borderRadius: '53px', }} />
                                                       </Form.Group>
                                                       <Button onClick={this.prevStep} style={{ marginRight: '15px' }}>Back</Button>
                        
                                                       <Button onClick={this.handleSubmit}>Upload Book</Button>
                                                  </Form>
                                             </td>
                                        </tr>
                                   </Table>
                              </Col>
                         </Row>
                    </Container>
               );
     }
     render() {

          /**
           * if book is uploaded then redirect to the home page
           */
          if (this.state.bookUploaded === true) {
               return <Redirect to='/' />
          }

          return (
               <>
                    {this.showStep()}
               </>
          );
     }
}