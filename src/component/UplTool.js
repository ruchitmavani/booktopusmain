import React, { Component } from 'react'
import { Form, Button, Table } from 'react-bootstrap'
//import axios from 'axios';

export class UplTool extends Component {
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
                <div style={{ overflow: 'hidden', backgroundColor: '#e0e0e0', margin: 'auto', width: '30%', marginTop: '20%', padding: '0', borderRadius: '53px' }}>
                    <Form style={{ marginTop: '15%', marginLeft: '15%', marginBottom: '15%', fontFamily: 'Verdana' }}>
                        <Form.Group >
                            <Form.Label for="exampleFile" style={{ fontSize: '16px' }}>Tool Image</Form.Label>
                            <Form.Control type="file" id="file" name="image" accept="image" onChange={this.fileChange} style={{ width: '251px' }} />
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
                    <Table style={{ overflow: 'hidden', backgroundColor: '#e0e0e0', margin: 'auto', width: '30%', marginTop: '5%', padding: '0', borderRadius: '53px' }}>
                        <tr>
                            <td>
                                <Form style={{ maxWidth: '75%', margin: 'auto', marginTop: '15%', marginBottom: '15%', fontFamily: 'Roboto', fontSize: '16px' }} >
                                    <Form.Group>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="text" id="Name" placeholder="Title" style={{ borderRadius: '53px', }} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label >Description</Form.Label>
                                        <Form.Control type="textarea" name="text" id="Description" placeholder="Description" style={{ borderRadius: '53px', }} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label for="text">Brand</Form.Label>
                                        <Form.Control type="text" name="text" id="Name" placeholder="Brand" style={{ borderRadius: '53px', }} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label for="text">Branch</Form.Label>
                                        <Form.Control type="text" name="text" id="Name" placeholder="Branch" style={{ borderRadius: '53px', }} />
                                    </Form.Group>                                    
                                    <Form.Group>
                                        <Form.Label for="exampleNumber">How much old (years)</Form.Label>
                                        <Form.Control type="tel" name="number" id="exampleNumber" placeholder="Used years" style={{ borderRadius: '53px', }}/>
                                    </Form.Group>
                                    <Button onClick={this.prevStep} style={{ marginRight: '15px' }}>Back</Button>
                                    <Button onClick={() => alert("New Material uploaded successfully!!")}>Upload Material</Button>
                                </Form>
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