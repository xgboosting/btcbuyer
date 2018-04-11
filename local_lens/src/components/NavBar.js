import React from 'react';
import PropTypes from 'prop-types';
import FAQ from './FAQ';
import login from './login';
import enterUrl from './enterUrl';
import logOut from './logOut';
import createAccount from './createAccount';
import passwordRecover from './passwordRecover';
import changePassword from './changePassword';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import {
  Link,
  Switch,
  Route
} from 'react-router-dom'


const divStyle = {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   textAlign: 'center'
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
  if (localStorage.getItem('token')) {
    return (
       <div style={divStyle} >
         <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">NAME</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem eventKey={3} href="/faq">
          FAQ
        </NavItem>
        <NavDropdown eventKey={3.1} title="Dashboard" id="basic-nav-dropdown">
     <MenuItem href="/faq" eventKey={3.5}>FAQ</MenuItem>
     <MenuItem href="/change-password" eventKey={3.6}>change password</MenuItem>
     <MenuItem href="/logOut" eventKey={3.2}>logout</MenuItem>
   </NavDropdown>
      </Nav>
    </Navbar>
     <div>
       <Switch>
       <Route path="/faq" component={FAQ}/>
       <Route path="/logOut" component={logOut} />
       <Route path="/change-password" component={changePassword} />
       <Route path="/" component={enterUrl}/>
       </Switch>
     </div>
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
   <div>
     <Switch>
     <Route path="/faq" component={FAQ}/>
     <Route path="/login" component={login}/>
     <Route path="/createAccount" component={createAccount}/>
     <Route path="/password-recover" component={passwordRecover}/>
     <Route path="/" component={enterUrl}/>
     </Switch>
   </div>
    </div>

  )
}


export default NavBar
