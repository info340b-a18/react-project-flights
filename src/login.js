import React, { Component } from 'react';
import SignupForm from './SignupForm';
import './SignupForm.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './SignupForm'

export class Login extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.select = this.select.bind(this);
        this.state = {user: null,
            'username': undefined,
            'airline': undefined,
             dropdownOpen: false};
    }

    handleChange(event) {
        let field = event.target.name;
        let value = event.target.value;
        let changes = {};
        changes[field] = value;
        this.setState(changes);
    }

    componentDidMount() {
        this.authUnRegFunc = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user: user
                });
                firebase.database().ref(this.state.user.uid).on('value', (snapshot) => this.setState({'airline' : snapshot.val().text}))
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
            console.log(airline);
            user.updateProfile({
                displayName: username                
            })
            firebase.database().ref(user.uid)
                .push({'text':airline})
                .then()
                .catch(err => console.log(err))
                ;
        }).catch(function(error) {
            this.setState({errorMessage: error.message});
        }.bind(this));
        this.setState({'airline':airline});
    }
    
    handleLogin(email, password) {
        this.setState({errorMessage:null});
        firebase.auth().signInWithEmailAndPassword(
            email, password
        ).then()
        .catch(function(error) {
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

    select(event) {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            airlinename: event.target.innerText
        });
    }

    getAirlineName(airline) {
        if(airline === "all") {
            return "Show All";
        }else if(airline === "UA") {
            return "United Airlines";
        } else if(airline === "AA") {
            return "American Airlines";
        } else if(airline === "US") {
            return "US Airways";
        } else if(airline === "F9") {
            return  "Frontier Airlines";
        } else if(airline === "B6") {
            return  "JetBlue Airways";
        } else if(airline === "OO") {
            return "Skywest Airlines";
        } else if( airline === "AS") {
            return  "Alaska Airlines";
        } else if(airline === "WN") {
            return "Spirit Air Lines";
        } else if(airline=== "DL") {
            return  "Southwest Airlines";
        } else if(airline === "EV") {
            return "Atlantic Southeast Airlines";
        } else if(airline === "HA") {
            return "Hawaiian Airlines";
        } else if(airline === "MQ") {
            return "American Eagle Airlines";
        } else if(airline === "VX") {
            return  "Virgin America";
        } else {
            return "Choose your flight";
        }
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
            var airline = this.state.airline;
            var airlinename = this.getAirlineName(airline);

            //this.props.returnLoginState(this.state.user)
            content = (
            <div className="logout">
                       <form>
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <p style={{ 'borderStyle': 'solid', 'borderWidth': '1px', 'borderColor':'rgb(211,211,211)', 'padding':'7px'}}>{this.state.user.email}</p>
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
            
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{'backgroundColor': '#003459', 'color': 'white'}}>
                <DropdownToggle className="col-12" caret style={{'backgroundColor': '#003459', 'color': 'white'}}>
                {console.log(airline)}
                {console.log(airlinename)}
                {airlinename}
                </DropdownToggle>
                <DropdownMenu className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}}>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="all" onClick={(e) => {this.setState({'airline':e.target.value})}}>Show All</DropdownItem >
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="UA"  onClick={(e) => {this.setState({'airline':e.target.value});}}>United Airlines</DropdownItem >
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="AA"  onClick={(e) => {this.setState({'airline':e.target.value});}}>American Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="US"  onClick={(e) => {this.setState({'airline':e.target.value});}}>US Airways</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="F9"  onClick={(e) => {this.setState({'airline':e.target.value});}}>Frontier Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="B6"  onClick={(e) => {this.setState({'airline':e.target.value});}}>JetBlue Airways</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="OO"  onClick={(e) => {this.setState({'airline':e.target.value});}}>Skywest Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="AS"  onClick={(e) => {this.setState({'airline':e.target.value});}}>Alaska Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="WN"  onClick={(e) => {this.setState({'airline':e.target.value});}}>Spirit Air Lines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="DL"  onClick={(e) => {this.setState({'airline':e.target.value});}}>Southwest Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="EV"  onClick={(e) => {this.setState({'airline':e.target.value});}}>Atlantic Southeast Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="HA"  onClick={(e) => {this.setState({'airline':e.target.value});}}>Hawaiian Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="MQ"  onClick={(e) => {this.setState({'airline':e.target.value});}}>American Eagle Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="VX"  onClick={(e) => {this.setState({'airline':e.target.value});}}>Virgin America</DropdownItem>
                </DropdownMenu>          </Dropdown>       </div>   </form>       {this.state.user &&
                <button className="logout btn" style={{'backgroundColor': '#003459', 'color': 'white'}} 
                        onClick={() => this.handleSignOut()}>
                Log Out
                </button>
            }
            <button className="logout btn" style={{'backgroundColor': '#003459', 'color': 'white'}} 
                onClick={() => {
                    var userid = this.state.user.uid;
                firebase.database().ref(userid)
                .set({'text':this.state.airline})
                .then()
                .catch(err => console.log(err))
                ;
                }}>
                 Update Profile
             </button>
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