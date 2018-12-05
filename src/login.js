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
// export class Login extends Component {
//     constructor(props){
//         super(props);
//         this.state = {loading: true};
//     }

//     handleSignUp(email, password, name, airline, airport) {
//         firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then((userCredentials) => {
//             let user = userCredentials.user; //access the newly created user
//             user.updateProfie({
//             displayName: name,
//             airline: airline,
//             airport: airport
//             })
//         })
//         .catch((error) => { //report any errors
//         this.setState({errorMessage:error.message}); 
//         if(error.code == 'auth/email-already-in-use') {
//             alert('The provided email is already in use by an existing user');
//         } else {
//             alert(error.message);
//         }
//         });
//     }    

//     handleSignIn(email, password) {
//         this.setState({errorMessage:null}); //clear any old errors
    
//         /* TODO: sign in user here */
//         firebase.auth().signInWithEmailAndPassword(email, password)
//        .catch(err => this.setState({errorMessage:err.message})); //log any errors for debugging
//       }

//     handleSignOut(){
//     this.setState({errorMessage:null}); //clear any old errors

//     /* TODO: sign out user here */
//     firebase.auth().signOut()
//     .catch(err => this.setState({errorMessage:err.message})); //log any errors for debugging
//     }

//     componentDidMount() {
//         this.authUnregFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
//          if(firebaseUser){ //firebaseUser defined: is logged in
//              //do something with firebaseUser (e.g. assign with this.setState())
//              this.setState({user:firebaseUser,
//                              loading:false
//                             });
//          }
//          else { //firebaseUser undefined: is not logged in
//              this.setState({user:null,
//                            loading:false});
//          }
//      });
//      }
   
//      componentWillUnmount() {
//        this.authUnregFunc();
//      }

//     render() {
//         return (


       
//     );
//     }
// }
export class Login extends Component {
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