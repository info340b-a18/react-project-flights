import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { Homepage } from './Homepage.js';
import { Airlines } from './Airlines.js';
import { Region } from './region/Region.js';
import { About } from './About.js';
import { Login } from './login.js'

import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';


export class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.changeName = this.changeName.bind(this);
    this.state = {
      isOpen: false,
      loginState: {},
      user: null,
      displayName: null
    };
    this.loginState = {};
  }
  
  // getLoginState = (loginStateFromLoginPage) => {
  //   console.log("test")
  //   this.loginState = {
  //   //this.setState({
  //     email: loginStateFromLoginPage.email,
  //     password: loginStateFromLoginPage.password,
  //     displayName: loginStateFromLoginPage.displayName,
  //     airline: loginStateFromLoginPage.airline
  //   };
  //   console.log(loginStateFromLoginPage);
  // }


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

  changeName(name) {
    console.log(name)
    this.setState({displayName: name})
  }
  
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    return (
      <Router>
        <div>
          <Navbar color="dark" dark expand="md" fixed="top">
            <NavbarBrand tag={Link} to="/" style={{color: 'white'}}>Flight</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar >
              <NavItem>
                  <NavLink tag={Link} to="/" style={{color: 'white'}}>Home</NavLink>
                </NavItem>
              <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret style={{color: 'white'}}>
                  Airlines  
                </DropdownToggle>
                  <DropdownMenu right style={{backgroundColor: '#003459'}}>
                    <DropdownItem>
                    <HashLink to="/Airlines#graph" style={{color: 'white'}}>Graph</HashLink>
                  </DropdownItem>
                    <DropdownItem>
                    <HashLink to="/Airlines#table" style={{color: 'white'}}>Table</HashLink>
                  </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink tag={Link} to="/Region" style={{color: 'white'}}>Region</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/about" style={{color: 'white'}}>About</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/login" style={{color: 'white'}}>
                  {this.state.displayName !== null?
                    this.state.displayName
                  :this.state.user !== null?
                  this.state.user.displayName
                  :
                   "Login"
                  }                  
                  </NavLink>
                </NavItem>
                
              </Nav>
            </Collapse>
          </Navbar>
          <Route exact path="/" component={Homepage} />
          <Route path="/Airlines" render={ () => {
            return <Airlines  user={this.state.user}/>} } />
          <Route path="/Region" component={Region} />
          <Route path="/about" component={About} />
          {/* <Route path="/login" component={Login} /> */}
          <Route path="/login" render={ () => {
            return <Login changeNavName={this.changeName}/>
            // return <Login returnLoginState={this.getLoginState} />
          } } />
        </div>
      </Router>
    )
  }
  
}


export default App;