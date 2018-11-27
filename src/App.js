import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Homepage } from './Homepage.js';
import { Airlines } from './Airlines.js';
import { Region } from './Region.js';
import { About } from './About.js';
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
  DropdownItem } from 'reactstrap';

export class App extends Component {
  render() {
    
    return (
      
      <div className="container">
      
        <Router>
        
      <div className="contianer">
      <Navbar color= "light" fixed-top expand="lg">
      <NavbarBrand href="/">Flight!</NavbarBrand>
      <NavItem>
      <Link to="/">Home</Link>
      </NavItem>
      <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <Link to="/Airlines">Airline</Link>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
      <NavItem>
      <Link to="/Region">Region</Link>
      </NavItem>
      <NavItem>
      <Link to ="/About">About</Link>
      </NavItem>
      </Navbar>
      <Route exact path="/" component={Homepage} />
      <Route path="/Airlines" component={Airlines} />
      <Route path="/Region" component={Region} />
      <Route path = "/about" component={About} />
      </div>
    </Router>
   
      </div>
    )
  }
}

export default App;