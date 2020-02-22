import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import logo from './image/loginimage.jpg';
import { GiOpenBook, GiHeavyThornyTriskelion } from 'react-icons/gi';
import { MdPerson, MdLock } from 'react-icons/md';
import axios from 'axios';
import PropTypes from 'prop-types';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import { connect } from 'react-redux';
import store from '../component/reduxStore';
import { LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/types';
import { getErrors } from '../actions/errorActions';
import { Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router';
import App from '../../src/App';

import './css/index.css';
import { Home } from './Home';

export class Login extends Component {

    state = {
        email: '',
        password: '',
        msg: null,
        isAuthenticated: false,
        loginSuccess: false
    };

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    handleSubmit = (e) => {

        e.preventDefault();

        var { email, password } = this.state;

        /**
         * Converting user's email into lower case to reduce errors
         */
        email = email.toLowerCase();

        const user = {
            email,
            password
        }

        axios
            .post('/users/login', {
                email,
                password
            })
            .then(res => {

                const msg = res.data.msg;
                this.setState({
                    msg
                })
                alert(this.state.msg);

                store.dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })

                this.setState({
                    loginSuccess: true
                })
            })
            .catch(err => {

                const msg = err.response.data.msg;
                this.setState({
                    msg
                })
                alert(this.state.msg);

                if (err.response && err.response.data) {
                    store.dispatch(getErrors(err.response.data, err.response.status));
                    store.dispatch({
                        type: LOGIN_FAIL
                    })
                }

            })

        /**
         * THis loginSuccess is used to route to the homepage when user is authenticated
         */
        if (store.getState().auth.isAuthinticated) {
            //console.log(store.getState().auth.isAuthinticated);

            this.setState({
                loginSuccess: true
            })
        }
        else {
            this.setState({
                loginSuccess: false
            })
        }

    }
    render() {

        if (this.state.loginSuccess === true) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <Table className="login-form mt-5 mb-5"
                    style={{
                        backgroundColor: '#e0e0e0',
                        maxWidth: '600px', margin: 'auto', borderRadius: '53px'
                    }}>
                    <tr>
                        <td style={{ padding: '0px', width: '250px', border: 'none' }}>
                            <img src={logo} width="260px" height='458px' style={{ borderTopLeftRadius: '48px', borderBottomLeftRadius: '48px' }} alt="img" />
                        </td>
                        <td style={{ paddingLeft: '5px', opacity: '0.8', border: 'none' }}>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <div className="text-center mt-3 mb-3"><GiOpenBook size="50px" color="black" /></div>
                                    <h2 className='text-center' style={{ fontFamily: 'Verdana', marginBottom: '20px' }}>BOOKTOPUS</h2>
                                    <MdPerson size="20px" style={{ marginLeft: '40px', marginRight: '0px' }} />
                                    <Form.Label style={{ marginTop: '5px', fontFamily: 'Verdana', marginLeft: '4px', marginBottom: '1px' }}><h5>Email</h5></Form.Label>
                                    <Form.Control type="email" name="email" onChange={this.handleChange('email')} placeholder="Enter email" style={{ borderRadius: '53px', width: '251px', marginLeft: '40px' }} />
                                    <Form.Text className="text-muted" style={{ fontFamily: 'Verdana', marginLeft: '52px', fontSize: '10px' }}>
                                        We'll never share your email with anyone else.
                                </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <MdLock size="20px" style={{ marginLeft: '40px' }} />
                                    <Form.Label style={{ fontFamily: 'Verdana', marginBottom: '1px' }}><h5>Password</h5></Form.Label>
                                    <Form.Control type="password" name="password" onChange={this.handleChange('password')} placeholder="Password" style={{ borderRadius: '53px', width: '251px', marginLeft: '40px' }} />
                                </Form.Group>
                                <div className="text-center">
                                    <Button style={{ fontFamily: 'Verdana', backgroundColor: '#154CFF' }} type="submit" onClick={this.handleSubmit}>
                                        Submit
                                    </Button>
                                </div>
                                <div style={{ textAlign: 'center', marginTop: '15px', fontFamily: 'Verdana' }}>
                                    <Link to="/Register" style={{ color: 'Black' }}>Sign up</Link>
                                    <span className="p-2" style={{ fontSize: '20px', color: 'Black' }}>|</span>
                                    {/* <a href='/'>Home</a> */}
                                    <Link to="/" style={{ color: 'Black' }}>Home</Link>
                                    <span className="p-2" style={{ fontSize: '20px', color: 'Black' }}>|</span>
                                    <Link to="/Forgotpassword" style={{ color: 'Black' }}>Forgot Password</Link>
                                </div>
                            </Form>
                        </td>
                    </tr>
                </Table>
            </div>
        )
    }
}

// const mapStateToProps = (state) => ({
//     isAuthenticated: state.auth.isAuthinticated,
//     error: state.error
// })

export default (Login);