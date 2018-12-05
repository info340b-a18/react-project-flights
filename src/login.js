import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import {
    Card, CardText, CardBody,
    CardTitle, CardImg, Button
} from 'reactstrap';

import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase/app';

export class Login extends Component {
    constructor(props){
        super(props);
        this.state = {loading: true};
    }

    handleSignUp(email, password, name, airline, airport) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
            let user = userCredentials.user; //access the newly created user
            user.updateProfie({
            displayName: name,
            airline: airline,
            airport: airport
            })
        })
        .catch((error) => { //report any errors
        this.setState({errorMessage:error.message}); 
        if(error.code == 'auth/email-already-in-use') {
            alert('The provided email is already in use by an existing user');
        } else {
            alert(error.message);
        }
        });
    }    

    handleSignIn(email, password) {
        this.setState({errorMessage:null}); //clear any old errors
    
        /* TODO: sign in user here */
        firebase.auth().signInWithEmailAndPassword(email, password)
       .catch(err => this.setState({errorMessage:err.message})); //log any errors for debugging
      }

    handleSignOut(){
    this.setState({errorMessage:null}); //clear any old errors

    /* TODO: sign out user here */
    firebase.auth().signOut()
    .catch(err => this.setState({errorMessage:err.message})); //log any errors for debugging
    }

    componentDidMount() {
        this.authUnregFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
         if(firebaseUser){ //firebaseUser defined: is logged in
             //do something with firebaseUser (e.g. assign with this.setState())
             this.setState({user:firebaseUser,
                             loading:false
                            });
         }
         else { //firebaseUser undefined: is not logged in
             this.setState({user:null,
                           loading:false});
         }
     });
     }
   
     componentWillUnmount() {
       this.authUnregFunc();
     }

    render() {
        return (


       
    );
    }
}