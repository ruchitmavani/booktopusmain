import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Form, FormControl, Container, NavItem, Button, NavDropdown } from 'react-bootstrap';
import { GiOpenBook } from 'react-icons/gi';
import { GiBookCover } from 'react-icons/gi';
//import { GoSearch } from 'react-icons/go';
import jwtDecode from 'jwt-decode';
import {
    NavLink, Redirect, BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from 'react-router-dom'
import './css/index.css';
import Logout from './Logout';
import store from './reduxStore';
import { LOGOUT_SUCCESS, SESSION_EXPIRED } from '../actions/types';
import { Login } from './Login';
import { login } from '../actions/authActions';
import { Home } from './Home';

export class Navbar1 extends Component {

    state = {
        token: null,
        logoutSuccess: false,
        firstName: null,
        lastName: null,
        email: null,
        bookUploadAccess: null,
        materialUploadAccess: null,
        toolUploadAccess: null,
        tokenExpired: null,
        msg: ''
    }

    componentDidMount(e) {

        var token = store.getState().auth.token;
        if (token) {
            var current_time = new Date().getTime() / 1000;
            //console.log('Current time' + current_time);
            var decoded = jwtDecode(token);
            //console.log('Expiry time' + decoded.exp);

            if (current_time > decoded.exp) {

                this.setState({ msg: 'Your session is expired. Please login again to continue.' });
                this.setState({ tokenExpired: true });
                store.dispatch({
                    type: SESSION_EXPIRED
                })
                alert(this.state.msg);
            }


        }

        this.setState({
            firstName: store.getState().auth.first_name
        })
    }

    checkAuthBook = e => {

        const token = store.getState().auth.token;
        /**
         * If user is logged in then token will not be empty
         */
        if (token) {
            this.setState({
                bookUploadAccess: true
            })
        }
        /**
         * Not logged in
         */
        else {
            this.setState({
                bookUploadAccess: false
            })
            window.localStorage.clear();
            alert("You haven't logged in. Please log in to continue.");
        }
    }

    checkAuthMaterial = e => {

        const token = store.getState().auth.token;
        /**
         * If user is logged in then token will not be empty
         */
        if (token) {
            this.setState({
                materialUploadAccess: true
            })
        }
        /**
         * Not logged in
         */
        else {
            this.setState({
                materialUploadAccess: false
            })
            window.localStorage.clear();
            alert('Please log in to continue the material uploading');
        }
    }

    checkAuthTool = e => {

        const token = store.getState().auth.token;
        /**
         * If user is logged in then token will not be empty
         */
        if (token) {
            this.setState({
                toolUploadAccess: true
            })
        }
        /**
         * Not logged in
         */
        else {
            this.setState({
                toolUploadAccess: false
            })
            window.localStorage.clear();
            alert('Please log in to continue the tool uploading');
        }
    }

    handelLogout = e => {
        //e.preventDefault();

        store.dispatch({
            type: LOGOUT_SUCCESS
        })

        this.setState({
            logoutSuccess: true
        })

        alert('You are successfully logged out !');
    }

    render() {

        /**
         * To check the user is logged in or not.. And if not sidho ene login par redirect mar
         */
        if (this.state.tokenExpired === true) {
            return <Redirect to='/' />
        }

        /**
         * If logged in, then redirect to upload book page
         */
        if (this.state.bookUploadAccess === true) {
            return <Redirect to='/UplBook' />
        }

        // if (this.state.tokenExpired === true) {
        //     return <Redirect to='/Login' />
        // }

        const token = store.getState().auth.token;

        const renderAuthButton = () => {
            if (token !== null) {
                /**
                 * User is logged in
                 */
                return (
                    <React.Fragment>

                        <NavLink to="#" className="font1" style={{ marginTop: '2.5%', marginRight: '10%' }}>Home</NavLink>
                        <NavLink to="#" className="font1" style={{ marginTop: '2.5%', marginRight: '10%' }}>AboutUs</NavLink>
                        <NavDropdown title={this.state.firstName} className="font1">
                            <NavDropdown.Item ><NavLink to='/UploadBook' onClick={this.checkAuthBook}>Upload Book</NavLink></NavDropdown.Item>
                            <NavDropdown.Item ><NavLink to='/UploadMat' onClick={this.checkAuthMaterial}>Upload Material</NavLink></NavDropdown.Item>
                            <NavDropdown.Item ><NavLink to='/UploadTool' onClick={this.checkAuthTool}>Upload Tools</NavLink></NavDropdown.Item>
                            <NavDropdown.Item ><NavLink to='#'>Check History</NavLink></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item><NavLink to="#" className="font1" onClick={this.handelLogout}>Log Out</NavLink></NavDropdown.Item>
                        </NavDropdown>


                    </React.Fragment>

                );

            } else {

                /**
                 * User is not logged in
                 */
                return (

                    <React.Fragment>

                        <NavLink to="#" className="font1" style={{ marginTop: '2.5%', marginRight: '10%' }}>Home</NavLink>
                        <NavLink to="#" className="font1" style={{ marginTop: '2.5%', marginRight: '10%' }}>AboutUs</NavLink>
                        <NavDropdown title="More" className="font1">
                            <NavDropdown.Item onClick={this.checkAuthBook}>Upload Book</NavDropdown.Item>
                            <NavDropdown.Item onClick={this.checkAuthMaterial}>Upload Material</NavDropdown.Item>
                            <NavDropdown.Item onClick={this.checkAuthTool}>Upload Tools</NavDropdown.Item>
                            {/* <NavDropdown.Item onClick={this.checkHistoryAccess}>Check History</NavDropdown.Item> */}
                            <NavDropdown.Divider />
                            <NavDropdown.Item><NavLink to="/Login" className="font1">Log In</NavLink></NavDropdown.Item>
                        </NavDropdown>
                    </React.Fragment>
                );
            }
        }

        return (
            <div>

                <Navbar className="navbar" expand="lg">
                    <GiBookCover size="50px" className="font1" style={{ marginRight: '10px' }} />
                    <Navbar.Brand>
                        <NavLink to="/" className="font1" style={{ fontWeight: 'bold' }}>BOOKTOPUS</NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Form inline style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            <FormControl type="text" placeholder="Search" style={{ borderRadius: '53px', width: '300px' }} />
                            <Button variant="outline-success" style={{ borderRadius: '53px' }}>Search</Button>
                        </Form>
                        <Nav className="mr-auto">
                            {renderAuthButton()}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div >
        )
    }
}
export default Navbar1