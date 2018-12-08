import React, { Component } from 'react';
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
        this.select = this.select.bind(this);
        this.state = {user: null,
            'username': undefined,
            'airline': undefined,
             dropdownOpen: false};
    }
    //update the state when the field changes
    handleChange(event) {
        let field = event.target.name;
        let value = event.target.value;
        let changes = {};
        changes[field] = value;
        this.setState(changes);
    }

    //get the prefer airline fromt the firebase when user signed in
    componentDidMount() {
        this.authUnRegFunc = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user: user
                });
                firebase.database().ref('users').child(this.state.user.uid).on('value', (snapshot) => {this.setState({'airline' : snapshot.val().text})})
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
    
    //call this function when user sign up
    //push the prefer airline into the firebase
    handleSignup(email, password, username, airline) {
        this.setState({errorMessage:null});
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(
            email, password
        ).then((userCredentials) => {
            let user = userCredentials.user;
            user.updateProfile({
                displayName: username                
            })
            firebase.database().ref('users').child(user.uid)
                .set({'text':airline})
                .then()
                .catch(err => console.log(err))
                ;
        }).catch(function(error) {
            this.setState({errorMessage: error.message});
        }.bind(this));
        this.setState({'airline':airline});
    }

    //call this function when user login
    //sign user into the firebase
    handleLogin(email, password) {
        this.setState({errorMessage:null});
        firebase.auth().signInWithEmailAndPassword(
            email, password
        ).then()
        .catch(function(error) {
            this.setState({errorMessage: error.message});
        }.bind(this));
    }

    //signout user from the firebase
    handleSignOut(){
        this.setState({errorMessage:null});
        firebase.auth().signOut(
        ).catch((error) => {
            this.setState({errorMessage: error.message});
            console.log(error.message);
        });
    }
    
    //keep track of dropdown menu open/close
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    //change the selected airline in the dropdown
    select(event) {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            airlinename: event.target.innerText
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
                changeNavName={this.props.changeNavName}
                />
            </div>
            );
        } else {
            content = (
            <div className="logout">
                       <form>
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <p style={{ 'borderStyle': 'solid', 'borderWidth': '1px', 'borderColor':'rgb(211,211,211)', 'padding':'7px', 'width': '100%', 'marginLeft': '0'}}>{this.state.user.email}</p>
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
            <label htmlFor="username">Name</label>
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
            
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{'backgroundColor': '#003459', 'color': 'white', 'borderRadius': '8px'}}>
                <DropdownToggle className="col-12" caret style={{'backgroundColor': '#003459', 'color': 'white', 'borderRadius': '8px'}}>
                {this.state.airline}
                </DropdownToggle>
                <DropdownMenu className="col-12" style={{'backgroundColor': '#003459', 'color': 'white' , 'borderRadius': '8px'}}>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="all" onClick={(e) => {
                                                                                                                            this.setState({airlinename: "Show All"})
                                                                                                                            this.setState({'airline':e.target.value})}}>Show All</DropdownItem >
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="UA - United Airlines" onClick={(e) => this.setState({airline: "UA - United Airlines"})}>United Airlines</DropdownItem >
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="NK - Spirit Airlines" onClick={(e) => this.setState({airline: "NK - Spirit Airlines"})}>Spirit Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="AA - American Airlines" onClick={(e) => this.setState({airline: "AA - American Airlines"})}>American Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="US - US Airways" onClick={(e) => this.setState({airline: "US - US Airways"})}>US Airways</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="F9 - Frontier Airlines" onClick={(e) => this.setState({airline: "F9 - Frontier Airlines"})}>Frontier Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="B6 - JetBlue Airways" onClick={(e) => this.setState({airline: "B6 - JetBlue Airways"})}>JetBlue Airways</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="OO - Skywest Airlines" onClick={(e) => this.setState({airline: "OO - Skywest Airlines"})}>Skywest Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="AS - Alaska Airlines" onClick={(e) => this.setState({airline: "AS - Alaska Airlines"})}>Alaska Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="WN - Southwest Airlines" onClick={(e) => this.setState({airline: "WN - Southwest Airlines"})}>Southwest Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="DL - Delta Airlines" onClick={(e) => this.setState({airline: "DL - Delta Airlines"})}>Delta Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="EV - Atlantic Southeast Airlines" onClick={(e) => this.setState({airline: "EV - Atlantic Southeast Airlines"})}>Atlantic Southeast Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="HA - Hawaiian Airlines" onClick={(e) => this.setState({airline: "HA - Hawaiian Airlines"})}>Hawaiian Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="MQ - American Eagle Airlines" onClick={(e) => this.setState({airline: "MQ - American Eagle Airlines"})}>American Eagle Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} value="VX - Virgin America" onClick={(e) => this.setState({airline: "VX - Virgin America"})}>Virgin America</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            </div>

        </form>
        {/* update the airline and displayname in the firebase */}
        <button className="logout btn" style={{'backgroundColor': '#003459', 'color': 'white', 'marginBottom':'1rem', 'borderRadius': '8px'}} 
                onClick={() => {
                    if(this.state.displayName !== undefined) {
                        firebase.auth().currentUser.updateProfile({
                            displayName: this.state.displayName
                        })
                        this.props.changeNavName(this.state.displayName)
                    }
                    var userid = this.state.user.uid;
                firebase.database().ref('users').child(userid)
                .set({'text':this.state.airline})
                .then()
                .catch(err => console.log(err))
                ;
                }}>
                 Update Profile
             </button>
             {/* log out button */}
            {this.state.user &&
                <button className="logout btn" style={{'backgroundColor': '#003459', 'color': 'white', 'borderRadius': '8px'}} 
                        onClick={() => {this.handleSignOut(); this.props.changeNavName(null);}}>
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