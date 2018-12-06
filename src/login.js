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
        //console.log(email + password + username + airline);
        this.setState({errorMessage:null});
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(
            email, password
        ).then((userCredentials) => {
            let user = userCredentials.user;
            user.updateProfile({
                displayName: username,
                // airline: airline
            })

            //console.log(user.uid);
        }).catch(function(error) {
            this.setState({errorMessage: error.message});
        }.bind(this));
    }
    
    handleLogin(email, password) {
        this.setState({errorMessage:null});
        firebase.auth().signInWithEmailAndPassword(
            email, password
        ).catch(function(error) {
            console.log(this.props.airlinename);
            console.log(error.message);
            this.setState({errorMessage: error.message});
        }.bind(this));
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
            //this.props.returnLoginState(this.state.user)
            content = (
            <div className="logout">
                       <form>
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <p>{this.state.user.email}</p>
            </div>
            
            <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control" 
                id="password" 
                type="password"
                name="password"
                placeholder="type here to change the password"
                onChange={(e) => this.handleChange(e)}
            />
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
            {console.log(this.state.user)}
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{'background-color': '#003459', 'color': 'white'}}>
                <DropdownToggle className="col-12" caret style={{'background-color': '#003459', 'color': 'white'}}>
                {this.state.user.airline === "all"?
                    "Show All"
                :this.state.user.airline === "UA"?
                    "United Airlines"
                :this.state.user.airline === "AA"?
                    "American Airlines"
                :this.state.user.airline === "US"?
                    "US Airways"
                :this.state.user.airline === "F9"?
                    "Frontier Airlines"
                :this.state.user.airline === "B6"?
                    "JetBlue Airways"
                :this.state.user.airline === "OO"?
                    "Skywest Airlines"
                :this.state.user.airline === "AS"?
                    "Alaska Airlines"
                :this.state.user.airline === "WN"?
                    "Spirit Air Lines"
                :this.state.user.airline === "DL"?
                    "Southwest Airlines"
                :this.state.user.airline === "EV"?
                    "Atlantic Southeast Airlines"
                :this.state.user.airline === "HA"?
                    "Hawaiian Airlines"
                :this.state.user.airline === "MQ"?
                    "American Eagle Airlines"
                : "Virgin America"
                }
                {this.state.user.airline}
                </DropdownToggle>
                <DropdownMenu className="col-12" style={{'background-color': '#003459', 'color': 'white'}}>
                    <DropdownItem className="col-12" style={{'background-color': '#003459', 'color': 'white'}} value="all" onClick={(e) => this.setState({airlinename: "Show All"})}>Show All</DropdownItem >
                    <DropdownItem className="col-12" style={{'background-color': '#003459', 'color': 'white'}} value="UA" onClick={(e) => this.setState({airlinename: "United Airlines"})}>United Airlines</DropdownItem >
                    <DropdownItem className="col-12" style={{'background-color': '#003459', 'color': 'white'}} value="AA" onClick={(e) => this.setState({airlinename: "American Airlines"})}>American Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'background-color': '#003459', 'color': 'white'}} value="US" onClick={(e) => this.setState({airlinename: "US Airways"})}>US Airways</DropdownItem>
                    <DropdownItem className="col-12" style={{'background-color': '#003459', 'color': 'white'}} value="F9" onClick={(e) => this.setState({airlinename: "Frontier Airlines"})}>Frontier Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'background-color': '#003459', 'color': 'white'}} value="B6" onClick={(e) => this.setState({airlinename: "JetBlue Airways"})}>JetBlue Airways</DropdownItem>
                    <DropdownItem className="col-12" style={{'background-color': '#003459', 'color': 'white'}} value="OO" onClick={(e) => this.setState({airlinename: "Skywest Airlines"})}>Skywest Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'background-color': '#003459', 'color': 'white'}} value="AS" onClick={(e) => this.setState({airlinename: "Alaska Airlines"})}>Alaska Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'background-color': '#003459', 'color': 'white'}} value="WN" onClick={(e) => this.setState({airlinename: "Spirit Air Lines"})}>Spirit Air Lines</DropdownItem>
                    <DropdownItem className="col-12" style={{'background-color': '#003459', 'color': 'white'}} value="DL" onClick={(e) => this.setState({airlinename: "Southwest Airlines"})}>Southwest Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'background-color': '#003459', 'color': 'white'}} value="EV" onClick={(e) => this.setState({airlinename: "Atlantic Southeast Airlines"})}>Atlantic Southeast Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'background-color': '#003459', 'color': 'white'}} value="HA" onClick={(e) => this.setState({airlinename: "Hawaiian Airlines"})}>Hawaiian Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'background-color': '#003459', 'color': 'white'}} value="MQ" onClick={(e) => this.setState({airlinename: "American Eagle Airlines"})}>American Eagle Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'background-color': '#003459', 'color': 'white'}} value="VX" onClick={(e) => this.setState({airlinename: "Virgin America"})}>Virgin America</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            </div>

                </form>
                {this.state.user &&
                    <button className="logout btn" style={{'background-color': '#003459', 'color': 'white'}} 
                            onClick={() => this.handleSignOut()}>
                    Log Out
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