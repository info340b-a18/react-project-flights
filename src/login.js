import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import {
    Card, CardText, CardBody,
    CardTitle, CardImg, Button
} from 'reactstrap';
import SignupForm from './SignupForm';
import './SignupForm.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);

        this.state = {user: null,
                      dropdownOpen: false};
    }

    componentDidMount() {
        this.authUnRegFunc = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user: user
                });
            } else {
                this.setState({
                    user: null
                });
            }
        });
    }
    
    componentWillMount() {
        return this.authUnRegFunc;
    }
    
    handleSignup(email, password, username, airline) {
        console.log(email + password + username + airline);
        this.setState({errorMessage:null});
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(
            email, password
        ).then((userCredentials) => {
            let user = userCredentials.user;
            user.updateProfile({
                displayName: username,
                airline: airline
            })
        }).catch(function(error) {
            console.log(error.message);
            this.setState({errorMessage: error.message});
        }.bind(this));
    }
    
    handleLogin(email, password) {
        this.setState({errorMessage:null});
        firebase.auth().signInWithEmailAndPassword(
            email, password
        ).catch(function(error) {
            console.log(error.message);
            this.setState({errorMessage: error.message});
        });
    }

    handleSignOut(){
        this.setState({errorMessage:null});
        firebase.auth().signOut(
        ).catch((error) => {
            this.setState({errorMessage: error.message});
            console.log(error.message);
        });
    }
    
    //keep
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        if(!this.state.user) {
            var content = (
            <div className="signupLoginContainer">
                <h1>Sign Up or Login</h1>
                <SignupForm 
                signupCallback={(e,p,h,a) => this.handleSignup(e,p,h,a)} 
                loginCallback={(e,p) => this.handleLogin(e,p)} 
                />
            </div>
            );
        } else {
            this.props.returnLoginState(this.state.user);
            content = (
            <div className="logout">
                       <form>
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <p>{this.state.user.email}</p>
            </div>
            
            <div className="form-group">
            <label htmlFor="password">Password</label>
            <p>{this.state.user.password}</p>
            </div>
    
            <div className="form-group">
            <label htmlFor="username">Username</label>
            <input className="form-control" 
                id="username" 
                type="username"
                name="displayName"
                placeholder={this.state.user.displayName}
                onChange={(e) => this.handleChange(e)}
            />
            </div>
    
            <div className="form-group">
            <label htmlFor="airline">Airline</label>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                {this.state.user.airline}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem value="all">Show All</DropdownItem >
                    <DropdownItem value="UA">United Airlines</DropdownItem >
                    <DropdownItem value="AA">American Airlines</DropdownItem>
                    <DropdownItem value="US">US Airways</DropdownItem>
                    <DropdownItem value="F9">Frontier Airlines</DropdownItem>
                    <DropdownItem value="B6">JetBlue Airways</DropdownItem>
                    <DropdownItem value="OO">Skywest Airlines</DropdownItem>
                    <DropdownItem value="AS">Alaska Airlines</DropdownItem>
                    <DropdownItem value="WN">Spirit Air Lines</DropdownItem>
                    <DropdownItem value="DL">Southwest Airlines</DropdownItem>
                    <DropdownItem value="EV">Atlantic Southeast Airlines</DropdownItem>
                    <DropdownItem value="HA">Hawaiian Airlines</DropdownItem>
                    <DropdownItem value="MQ">American Eagle Airlines</DropdownItem>
                    <DropdownItem value="VX">Virgin America</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            </div>

        </form>
                {this.state.user &&
                    <button className="logout btn btn-warning" 
                            onClick={() => this.handleSignOut()}>
                    Log Out {this.state.user.displayName}
                    </button>
                }
            </div>
            );
        }
        return (
        <div>
            {this.state.errorMessage &&
            <p className="alert alert-danger">{this.state.errorMessage}</p>
            }
            {content}
        </div>
        );
    }
}