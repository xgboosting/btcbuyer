import React from 'react';
import PropTypes from 'prop-types';
import FAQ from './FAQ';
import login from './login';
import enterUrl from './enterUrl';
import createAccount from './createAccount';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import {
  Link
} from 'react-router-dom'


const divStyle = {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   textAlign: 'center'
};

const h1Style = {
  color: 'white',
  fontSize: 70,
  alignSelf: 'center',
  justifyContent: 'center'
};

const pDivStyle = {
  marginLeft: 250,
  marginRight: 250
};

const pStyle = {
  color: 'white',
  fontSize: 50
};

const psmallStyle = {
  color: 'white',
  fontSize: 25
};

const isMobile = window.innerWidth <= 500;

const NavBar = () => {
  if (isMobile) {
    return (
      <div style={divStyle} >
          <Navbar inverse collapseOnSelect>
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
       <MenuItem href="/" eventKey={3.1}>Home</MenuItem>
       <MenuItem href="/createAccount" eventKey={3.2}>Create Account</MenuItem>
       <MenuItem href="/login" eventKey={3.3}>login</MenuItem>
       <MenuItem href="/faq" eventKey={3.4}>FAQ</MenuItem>
     </NavDropdown>
     </Navbar>
       </div>
    )
  }
  return (
     <div style={divStyle} >
       <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">NAME</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href="/createAccount">
        create account
      </NavItem>
      <NavItem eventKey={2} href="/login">
        login
      </NavItem>
      <NavItem eventKey={3} href="/faq">
        FAQ
      </NavItem>
    </Nav>
  </Navbar>
    </div>

  )
}



/*Hello.propTypes = {
 onClick: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired

}*/

export default NavBar
