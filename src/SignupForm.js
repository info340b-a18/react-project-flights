import React, { Component } from 'react';
import './SignupForm.css';

import firebase from 'firebase/app';
import 'firebase/auth';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class SignupForm extends Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            email: undefined,
            password: undefined,
            username: undefined,
            airline: undefined,
            dropdownOpen: false,
            airlinename: undefined
        }; 
    }

    //Updates the state when user type email, password, name and airline
    handleChange(event) {
        let field = event.target.name;
        let value = event.target.value;
        let changes = {};
        changes[field] = value;
        this.setState(changes);
    }

    //Call this function when user clicks handlesignup
    //If the user did not choose airline, it shows alert.
    handleSignup(event) {
        event.preventDefault();
        if(this.state.displayName !== undefined
            && this.state.airline !== undefined) {
            this.props.signupCallback(
                this.state.email,
                this.state.password,
                this.state.displayName,
                this.state.airline
            );
        } else {
            alert("Please enter your name and airline")
        }
    }

    //call this function when user log in
    handleLogin(event) {
        event.preventDefault();
        this.props.loginCallback(
            this.state.email, this.state.password
        )
    }

    //Update the dropdown open/close
    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        return (
        //Email input box
        <form>
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <input className="form-control" 
                id="email" 
                type="email" 
                name="email"
                placeholder="required"
                onChange={(e) => this.handleChange(e)}
            />
            </div>
            
            {/* Passwod input box */}
            <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control" 
                id="password" 
                type="password"
                name="password"
                placeholder="required"
                onChange={(e) => this.handleChange(e)}
            />
            </div>
    
            {/* Name input box */}
            <div className="form-group">
            <label htmlFor="username">Name</label>
            <input className="form-control" 
                id="username" 
                type="username"
                name="displayName"
                placeholder="required only when signup"
                onChange={(e) => this.handleChange(e)}
            />
            </div>
            <div className="form-group">
            <label htmlFor="airline">Airline</label>
            {/* Airline dropdownmenu */}
            <Dropdown  className="col-12" style={{'backgroundColor': '#003459', 'color': 'white', 'marginBottom':'1rem', 'borderRadius': '8px'}} isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                <DropdownToggle className="col-12" caret style={{'backgroundColor': '#003459', 'color': 'white', 'borderRadius': '8px'}}>

                {this.state.airlinename === undefined?
                    "Choose your airline"
                    :
                    this.state.airlinename
                }
                </DropdownToggle >
                <DropdownMenu className="col-12">
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} name="airline" value="all" onClick={(e) => this.setState({airlinename: "Show All"})}>Show All</DropdownItem >
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} name="airline" value="UA - United Airlines" onClick={(e) => {this.setState({airlinename: "United Airlines"}); this.handleChange(e);}}>United Airlines</DropdownItem >
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} name="airline" value="NK - Spirit Airlines" onClick={(e) => {this.setState({airlinename: "Spirit Airlines"}); this.handleChange(e);}}>Spirit Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} name="airline" value="AA - American Airlines" onClick={(e) => {this.setState({airlinename: "American Airlines"}); this.handleChange(e);}}>American Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} name="airline" value="US - US Airways" onClick={(e) => {this.setState({airlinename: "US Airways"}); this.handleChange(e);}}>US Airways</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} name="airline" value="F9 - Frontier Airlines" onClick={(e) => {this.setState({airlinename: "Frontier Airlines"}); this.handleChange(e);}}>Frontier Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} name="airline" value="B6 - JetBlue Airways" onClick={(e) => {this.setState({airlinename: "JetBlue Airways"}); this.handleChange(e);}}>JetBlue Airways</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} name="airline" value="OO - Skywest Airlines" onClick={(e) => {this.setState({airlinename: "Skywest Airlines"}); this.handleChange(e);}}>Skywest Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} name="airline" value="AS - Alaska Airlines" onClick={(e) => {this.setState({airlinename: "Alaska Airlines"}); this.handleChange(e);}}>Alaska Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} name="airline" value="WN - Southwest Airlines" onClick={(e) => {this.setState({airlinename: "Southwest Airlines"}); this.handleChange(e);}}>Southwest Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} name="airline" value="DL - Delta Airlines" onClick={(e) => {this.setState({airlinename: "Delta Airlines"}); this.handleChange(e);}}>Delta Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} name="airline" value="EV - Atlantic Southeast Airlines" onClick={(e) => {this.setState({airlinename: "Atlantic Southeast Airlines"}); this.handleChange(e);}}>Atlantic Southeast Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} name="airline" value="HA - Hawaiian Airlines" onClick={(e) => {this.setState({airlinename: "Hawaiian Airlines"}); this.handleChange(e);}}>Hawaiian Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} name="airline" value="MQ - American Eagle Airlines" onClick={(e) => {this.setState({airlinename: "American Eagle Airlines"}); this.handleChange(e);}}>American Eagle Airlines</DropdownItem>
                    <DropdownItem className="col-12" style={{'backgroundColor': '#003459', 'color': 'white'}} name="airline" value="VX - Virgin America" onClick={(e) => {this.setState({airlinename: "Virgin America"}); this.handleChange(e);}}>Virgin America</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            </div>
            {/* signup button */}
            <div className="form-group">
            <button className="signup btn btn-primary mr-2" onClick={(e) => {this.handleSignup(e); this.props.changeNavName(this.state.displayName)}}>
                Sign Up
            </button>
            </div>
            {/* login button */}
            <div className="form-group">
            <button className="login btn btn-primary" onClick={(e) => this.handleLogin(e)}>
                Login
            </button>
            </div>
        </form>
        )
    }
}

export default SignupForm;