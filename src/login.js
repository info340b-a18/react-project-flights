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

export class login extends Component {
    constructor(props) {
        super(props);
        this.state = {user: null};
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
            this.setState({errorMessage: error.message});
            console.log(error.message);
        }.bind(this));
    }
    
    handleLogin(email, password) {
        this.setState({errorMessage:null});
        firebase.auth().signInWithEmailAndPassword(
            email, password
        ).catch(function(error) {
            this.setState({errorMessage: error.message});
            console.log(error.message);
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
            content = (
            <div className="logout">
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

export default login;