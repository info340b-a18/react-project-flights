import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Homepage } from './Homepage.js';
import { Airlines } from './Airlines.js';
import { Region } from './region/Region.js';
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
  DropdownItem
} from 'reactstrap';

export class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
    
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
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Flight</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                  <Link to="/Airlines">Airlines</Link>
                </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                    <Link to="/Airlines">Table</Link>
                  </DropdownItem>
                    <DropdownItem>
                    <Link to="/Airlines">Table</Link>
                  </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink><Link to="/Region">Region</Link></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink><Link to="/about">About</Link></NavLink>
                </NavItem>
                
              </Nav>
            </Collapse>
          </Navbar>
          <Route exact path="/" component={Homepage} />
          <Route path="/Airlines" component={Airlines} />
          <Route path="/Region" component={Region} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    )
  }
  
}


export default App;