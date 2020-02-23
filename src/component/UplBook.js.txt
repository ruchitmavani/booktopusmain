// import React from 'react';
// import {Form, Button, Table} from 'react-bootstrap';
// import {Link} from 'react-router-dom';

// export const UplBook = () => {
//      return (
//           <div style={{marginBlockEnd: '25px', marginBottom: '50px' }}>
//                <h1 className="mt-3 ml-4 mb-3">Upload Book!</h1>
//                <div style={{ overflow: 'hidden', backgroundColor: '#000000', width: '100%' }}>
//                     <h2 className="mt-3 mb-3 ml-4" style={{ color: '#ffffff' }}>Book Details</h2>
// <Table style={{ overflow: 'hidden', backgroundColor: '#000000', width: '100%' }}>
//      <tr>
//           <td>
//                <div className="ml-3 mt-3 mb-3 mr-3" style={{ overflow: 'hidden', backgroundColor: '#000000' }}>
//                     <Form style={{ color: '#ffffff' }}>
//                          <Form.Group>
//                               <Form.Label>Title</Form.Label>
//                               <Form.Control type="text" name="text" id="Name" placeholder="Title" />
//                          </Form.Group>
//                          <Form.Group>
//                               <Form.Label >Description</Form.Label>
//                               <Form.Control type="textarea" name="text" id="enter description" />
//                          </Form.Group>
//                          <Form.Group>
//                               <Form.Label for="text">Tags</Form.Label>
//                               <Form.Control type="text" name="text" id="Name" placeholder="Tags" />
//                          </Form.Group>
//                          <Form.Group>
//                               <Form.Label for="text">Author Name</Form.Label>
//                               <Form.Control type="text" name="text" id="Name" placeholder="Author name" />
//                          </Form.Group>
//                          <Form.Group>
//                               <Form.Label for="text">Category</Form.Label>
//                               <Form.Control type="text" name="text" id="Name" placeholder="category" />
//                          </Form.Group>
//                          <Form.Group controlId="formGridState">
//                               <Form.Label>Semester</Form.Label>
//                               <Form.Control as="select" value="Choose...">
//                                    <option>1</option>
//                                    <option>2</option>
//                                    <option>3</option>
//                                    <option>4</option>
//                                    <option>5</option>
//                                    <option>6</option>
//                                    <option>7</option>
//                                    <option>8</option>
//                               </Form.Control>
//                          </Form.Group>
//                     </Form>
//                </div>
//           </td>
//           <td>
//                <div className="ml-3 mt-3 mb-3 mr-3" style={{ overflow: 'hidden', backgroundColor: '#000000' }}>
//                     <Form style={{ color: '#ffffff' }}>
//                     <Form.Group controlId="formGridState">
//                               <Form.Label>Edition</Form.Label>
//                               <Form.Control as="select" value="Choose...">
//                                    <option>1</option>
//                                    <option>2</option>
//                                    <option>3</option>
//                                    <option>4</option>
//                                    <option>5</option>
//                                    <option>6</option>
//                                    <option>7</option>
//                                    <option>8</option>
//                               </Form.Control>
//                          </Form.Group>
//                          <Form.Group>
//                               <Form.Label for="exampleNumber">Subject Code</Form.Label>
//                               <Form.Control
//                                    type="number"
//                                    name="number"
//                                    id="exampleNumber"
//                                    placeholder="subject code"/>
//                          </Form.Group>
//                     </Form>
//                </div>
//           </td>
//           <td>
//                <div className="ml-3 mt-3 mb-3 mr-3" style={{ overflow: 'hidden', backgroundColor: '#000000' }}>
//                     <Form style={{ color: '#ffffff' }}>
//                          <Form.Group>
//                               <Form.Label for="exampleFile">Cover Photo</Form.Label>
//                               <Form.Control type="file" name="file" id="exampleFile" />
//                          </Form.Group>
//                          <Form.Group>
//                               <Form.Label for="exampleFile">Condition Photos</Form.Label>
//                               <Form.Control type="file" name="file" id="exampleFile" />
//                          </Form.Group>
//                     </Form>
//                </div>
//           </td>
//      </tr>
// </Table>
//                </div>
//                 <div  style={{backgroundColor: '#000000' ,width:'100%', textAlign:'center'}}>
//                <Form style={{color:'#ffffff'}}>
//                     <Form.Group check inline>
//                          <Form.Label check>
//                               <Form.Control type="checkbox" /> Agree terms and condition
//                          </Form.Label>
//                     </Form.Group>
//                     <Form.Group className="mt-3 mb-3">
//                          <Link to="/"><Button onClick={() => alert("New Book uploaded successfully!!")}>Upload Book</Button></Link>
//                     </Form.Group>
//                     <Form.Group style={{color:'#000000'}}>hj</Form.Group>
//                </Form>
//            </div> 
//           </div>
//      );
// }

import React, { Component } from 'react'
import { Form, Button, Table } from 'react-bootstrap'
//import axios from 'axios';

export class UplBook extends Component {
     state = {
          step: 1,

          // step 1
          file: null,

          // step 2

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
     fileChange = event => {
          this.setState({
               file: event.target.files[0],
          })
     }
     fileUploadHandler = () => {
          //const fd=new FormData();
          //fd.append('image',this.state.file,this.state.file.name);
          // axios.post('',fd);
          //      .then(res=>{
          //           console.log(res);
          //      });
          this.nextStep();
     }
     showStep = () => {
          const { step, } = this.state;
          if (step === 1)
               return (
                    <div style={{ overflow: 'hidden', backgroundColor: '#e0e0e0', margin: 'auto', width: '30%', marginTop: '20%', padding: '0',borderRadius: '53px' }}>
                         <Form style={{  marginTop: '15%', marginLeft: '15%', marginBottom: '15%',fontFamily:'Verdana'}}>
                              <Form.Group >
                                   <Form.Label for="exampleFile" style={{fontSize:'16px'}} >Cover Photo</Form.Label>
                                   <Form.Control type="file" id="file" name="image" accept="image" onChange={this.fileChange} />
                              </Form.Group>
                              <Form.Group className="mt-3 mb-3">
                                   <Button onClick={this.fileUploadHandler}>Next</Button>
                              </Form.Group>
                         </Form>
                    </div>
               );
          if (step === 2)
               return (
                    <div >
                         <Table style={{ overflow: 'hidden', backgroundColor: '#e0e0e0', margin: 'auto', width: '30%',marginTop:'5%', padding: '0',borderRadius: '53px' }}>
                              <tr>
                                   <td>
                                        <div >
                                             <Form style={{maxWidth:'75%',margin:'auto',marginTop:'15%',marginBottom:'15%',fontFamily:'verdana',fontSize:'12px'}} >
                                                  <Form.Group>
                                                       <Form.Label>Title</Form.Label>
                                                       <Form.Control type="text" name="text" id="Name" placeholder="Title" />
                                                  </Form.Group>
                                                  <Form.Group>
                                                       <Form.Label >Description</Form.Label>
                                                       <Form.Control type="textarea" name="text" id="Description" placeholder="Description"/>
                                                  </Form.Group>
                                                  <Form.Group>
                                                       <Form.Label for="text">Author Name</Form.Label>
                                                       <Form.Control type="text" name="text" id="Name" placeholder="Author name" />
                                                  </Form.Group>
                                                  <Form.Group>
                                                       <Form.Label for="text">Branch</Form.Label>
                                                       <Form.Control type="text" name="text" id="Name" placeholder="Branch" />
                                                  </Form.Group>
                                                  <Form.Group controlId="formGridState">
                                                       <Form.Label>Semester</Form.Label>
                                                       <Form.Control as="select" value="Choose...">
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
                                                       <Form.Control as="select" value="Choose...">
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
                                                            type="number"
                                                            name="number"
                                                            id="exampleNumber"
                                                            placeholder="ISBN code" />
                                                  </Form.Group>
                                                  <Button onClick={this.prevStep} style={{marginRight:'15px'}}>Back</Button>
                                                  <Button onClick={() => alert("New Book uploaded successfully!!")}>Upload Book</Button>
                                             </Form>
                                        </div>
                                   </td>
                              </tr>
                         </Table>
                    </div>
               );
     }
     render() {
          return (
               <>
                    {this.showStep()}
               </>
          );
     }
}