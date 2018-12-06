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
                <DropdownItem value="all" onClick={(e) => this.setState({airlinename: "Show All"})}>Show All</DropdownItem >
                    <DropdownItem value="UA" onClick={(e) => this.setState({airlinename: "United Airlines"})}>United Airlines</DropdownItem >
                    <DropdownItem value="AA" onClick={(e) => this.setState({airlinename: "American Airlines"})}>American Airlines</DropdownItem>
                    <DropdownItem value="US" onClick={(e) => this.setState({airlinename: "US Airways"})}>US Airways</DropdownItem>
                    <DropdownItem value="F9" onClick={(e) => this.setState({airlinename: "Frontier Airlines"})}>Frontier Airlines</DropdownItem>
                    <DropdownItem value="B6" onClick={(e) => this.setState({airlinename: "JetBlue Airways"})}>JetBlue Airways</DropdownItem>
                    <DropdownItem value="OO" onClick={(e) => this.setState({airlinename: "Skywest Airlines"})}>Skywest Airlines</DropdownItem>
                    <DropdownItem value="AS" onClick={(e) => this.setState({airlinename: "Alaska Airlines"})}>Alaska Airlines</DropdownItem>
                    <DropdownItem value="WN" onClick={(e) => this.setState({airlinename: "Spirit Air Lines"})}>Spirit Air Lines</DropdownItem>
                    <DropdownItem value="DL" onClick={(e) => this.setState({airlinename: "Southwest Airlines"})}>Southwest Airlines</DropdownItem>
                    <DropdownItem value="EV" onClick={(e) => this.setState({airlinename: "Atlantic Southeast Airlines"})}>Atlantic Southeast Airlines</DropdownItem>
                    <DropdownItem value="HA" onClick={(e) => this.setState({airlinename: "Hawaiian Airlines"})}>Hawaiian Airlines</DropdownItem>
                    <DropdownItem value="MQ" onClick={(e) => this.setState({airlinename: "American Eagle Airlines"})}>American Eagle Airlines</DropdownItem>
                    <DropdownItem value="VX" onClick={(e) => this.setState({airlinename: "Virgin America"})}>Virgin America</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            </div>
    
            {/* <div className="form-group">
            <button className="signup btn btn-primary mr-2" onClick={(e) => this.handleSignup(e)}>
                Sign Up
            </button>
            <button className="login btn btn-primary" onClick={(e) => this.handleLogin(e)}>
                Login
            </button>
            </div> */}
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