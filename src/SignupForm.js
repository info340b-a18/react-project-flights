import React, { Component } from 'react';
import './SignupForm.css';

import firebase from 'firebase/app';
import 'firebase/auth';

class SignupForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            'email': undefined,
            'password': undefined,
            'username': undefined,
            'airline': undefined
        }; 
    }

    handleChange(event) {
        let field = event.target.name;
        let value = event.target.value;
        let changes = {};
        changes[field] = value;
        this.setState(changes);
    }

    handleSignup(event) {
        event.preventDefault();
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
        );
    }

    render() {
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
            <input className="form-control" 
                id="airline"
                type="airline"
                name="airline"
                placeholder="required only when signup"
                onChange={(e) => this.handleChange(e)} 
                />
            </div>
    
            <div className="form-group">
            <button className="signup btn btn-primary mr-2" onClick={(e) => this.handleSignup(e)}>
                Sign Up
            </button>
            <button className="login btn btn-primary" onClick={(e) => this.handleLogin(e)}>
                Login
            </button>
            </div>
        </form>
        )
    }
}

export default SignupForm;