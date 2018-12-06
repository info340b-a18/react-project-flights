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


    handleChange(event) {
        let field = event.target.name;
        let value = event.target.value;
        console.log(field + " " + value)
        let changes = {};
        changes[field] = value;
        this.setState(changes);
    }

    // handleAirlineChange(event, selectedIndex, menulItem) {

    // }

    handleSignup(event) {
        event.preventDefault();
        console.log(this.state.airline);
        this.props.signupCallback(
            this.state.email,
            this.state.password,
            this.state.displayName,
            this.state.airline
        );
    }

    handleLogin(event) {
        event.preventDefault();
        this.props.loginCallback(
            this.state.email, this.state.password
        )
        // .then(() => {
        //     firebase.database().ref('airlinePref/' + firebase.auth().currentUser).set(this.state.airline);
        // });
        //console.log(this.state.airlinename);
        //firebase.database().ref('airlinePref/' + firebase.auth().currentUser).set(this.state.airlinename);
    }

    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        
        console.log(this.state)
        return (
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
    
            <div className="form-group">
            <label htmlFor="username">Username</label>
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
            {/* dropdownmenu */}
            <Dropdown  className="col-12" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle className="col-12"caret>

                {this.state.airlinename === undefined?
                    "Choose your airline"
                    :
                    this.state.airlinename
                }
                </DropdownToggle >
                <DropdownMenu className="col-12">
                <DropdownItem className="col-12" value="all" type="airline" name="airline"  onClick={
                    (e) => {this.setState({airlinename: "Show All"}); 
                            this.handleChange(e);}}
                    >Show All</DropdownItem >
                    <DropdownItem className="col-12" value="UA"  type="airline" name="airline" onChange={(e) => this.handleChange(e)} onClick={(e) => {this.setState({airlinename: "United Airlines"}); this.handleChange(e);}}>United Airlines</DropdownItem >
                    <DropdownItem className="col-12" value="AA"  type="airline" name="airline" onChange={(e) => this.handleChange(e)} onClick={(e) => {this.setState({airlinename: "American Airlines"}); this.handleChange(e);}}>American Airlines</DropdownItem>
                    <DropdownItem className="col-12" value="US"  type="airline" name="airline" onChange={(e) => this.handleChange(e)} onClick={(e) => {this.setState({airlinename: "US Airways"}); this.handleChange(e);}}>US Airways</DropdownItem>
                    <DropdownItem className="col-12" value="F9"  type="airline" name="airline" onChange={(e) => this.handleChange(e)} onClick={(e) => {this.setState({airlinename: "Frontier Airlines"}); this.handleChange(e);}}>Frontier Airlines</DropdownItem>
                    <DropdownItem className="col-12" value="B6"  type="airline" name="airline" onChange={(e) => this.handleChange(e)} onClick={(e) => {this.setState({airlinename: "JetBlue Airways"}); this.handleChange(e);}}>JetBlue Airways</DropdownItem>
                    <DropdownItem className="col-12" value="OO"  type="airline" name="airline" onChange={(e) => this.handleChange(e)} onClick={(e) => {this.setState({airlinename: "Skywest Airlines"}); this.handleChange(e);}}>Skywest Airlines</DropdownItem>
                    <DropdownItem className="col-12" value="AS"  type="airline" name="airline" onChange={(e) => this.handleChange(e)} onClick={(e) => {this.setState({airlinename: "Alaska Airlines"}); this.handleChange(e);}}>Alaska Airlines</DropdownItem>
                    <DropdownItem className="col-12" value="WN"  type="airline" name="airline" onChange={(e) => this.handleChange(e)} onClick={(e) => {this.setState({airlinename: "Spirit Air Lines"}); this.handleChange(e);}}>Spirit Air Lines</DropdownItem>
                    <DropdownItem className="col-12" value="DL"  type="airline" name="airline" onChange={(e) => this.handleChange(e)} onClick={(e) => {this.setState({airlinename: "Southwest Airlines"}); this.handleChange(e);}}>Southwest Airlines</DropdownItem>
                    <DropdownItem className="col-12" value="EV"  type="airline" name="airline" onChange={(e) => this.handleChange(e)} onClick={(e) => {this.setState({airlinename: "Atlantic Southeast Airlines"}); this.handleChange(e);}}>Atlantic Southeast Airlines</DropdownItem>
                    <DropdownItem className="col-12" value="HA"  type="airline" name="airline" onChange={(e) => this.handleChange(e)} onClick={(e) => {this.setState({airlinename: "Hawaiian Airlines"}); this.handleChange(e);}}>Hawaiian Airlines</DropdownItem>
                    <DropdownItem className="col-12" value="MQ"  type="airline" name="airline" onChange={(e) => this.handleChange(e)} onClick={(e) => {this.setState({airlinename: "American Eagle Airlines"}); this.handleChange(e);}}>American Eagle Airlines</DropdownItem>
                    <DropdownItem className="col-12" value="VX"  type="airline" name="airline" onChange={(e) => this.handleChange(e)} onClick={(e) => {this.setState({airlinename: "Virgin America"}); this.handleChange(e);}}>Virgin America</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            {/* <input className="form-control" 
                id="airline"
                type="airline"
                name="airline"
                placeholder="required only when signup"
                onChange={(e) => this.handleChange(e)} 
                /> */}
            </div>
    
            <div className="form-group">
            <button className="signup btn btn-primary mr-2" onClick={(e) => this.handleSignup(e)}>
                Sign Up
            </button>
            </div>
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