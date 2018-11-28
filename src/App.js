import React, { Component } from 'react';
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
import './App.css';

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
          <Navbar color="light" light expand="md" fixed="top">
            <NavbarBrand href="/" style={{color: 'white'}}>Flight</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar >
              <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret style={{color: 'white'}}>
                  <Link to="/Airlines" style={{color: 'white'}}>Airlines</Link>
                </DropdownToggle>
                  <DropdownMenu right style={{backgroundColor: '#003459'}}>
                    <DropdownItem>
                    <Link to="/Airlines" style={{color: 'white'}}>Chart</Link>
                  </DropdownItem>
                    <DropdownItem>
                    <Link to="/Airlines" style={{color: 'white'}}>Table</Link>
                  </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink><Link to="/Region" style={{color: 'white'}}>Region</Link></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink><Link to="/about" style={{color: 'white'}}>About</Link></NavLink>
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