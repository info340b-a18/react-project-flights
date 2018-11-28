import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

export default class NavBar extends Component {
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
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/" style={{ color: 'white' }}>Flight</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar >
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret style={{ color: 'white' }}>
                  <Link to="/Airlines" style={{ color: 'white' }}>Airlines</Link>
                </DropdownToggle>
                <DropdownMenu right style={{ backgroundColor: '#003459' }}>
                  <DropdownItem>
                    <Link to="/Airlines" style={{ color: 'white' }}>Chart</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/Airlines" style={{ color: 'white' }}>Table</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink><Link to="/Region" style={{ color: 'white' }}>Region</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to="/about" style={{ color: 'white' }}>About</Link></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}