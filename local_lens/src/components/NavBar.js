import React from 'react';
import FAQ from './FAQ';
import login from './login';
import enterUrl from './enterUrl';
import logOut from './logOut';
import createAccount from './createAccount';
import passwordRecover from './passwordRecover';
import changePassword from './changePassword';
import changeEmail from './changeEmail';
import addresses from './addresses';
import makeOrder from './makeOrder';
import paidOrder from './orders/paidOrder';
import completedOrder from './orders/completedOrder';
import unpaidOrder from './orders/unpaidOrder';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import {
  Switch,
  Route
} from 'react-router-dom';


const divStyle = {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   textAlign: 'center'
};



//const isMobile = window.innerWidth <= 500;

const NavBar = () => {
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
        <NavDropdown eventKey={3.1} title="Settings" id="basic-nav-dropdown">
          <MenuItem href="/faq" eventKey={3.5}>FAQ</MenuItem>
          <MenuItem href="/change-password" eventKey={3.6}>change password</MenuItem>
          <MenuItem href="/change-email" eventKey={3.7}>change email</MenuItem>
          <MenuItem href="/addresses" eventKey={3.8}>addresses</MenuItem>
          <MenuItem href="/logOut" eventKey={3.2}>logout</MenuItem>
        </NavDropdown>
        <NavDropdown eventKey={3.1} title="Orders" id="basic-nav-dropdown">
         <MenuItem href="/" eventKey={3.5}>new order</MenuItem>
         <MenuItem href="/paid-orders" eventKey={3.7}>paid orders</MenuItem>
         <MenuItem href="/unpaid-orders" eventKey={3.6}>unpaid orders</MenuItem>
         <MenuItem href="/completed-orders" eventKey={3.2}>shipped orders</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
     <div>
       <Switch>
       <Route path="/faq" component={FAQ} />
       <Route path="/logOut" component={logOut} />
       <Route path="/change-password" component={changePassword} />
       <Route path="/change-email" component={changeEmail} />
       <Route path="/addresses" component={addresses} />
       <Route path="/unpaid-orders" component={unpaidOrder} />
       <Route path="/paid-orders" component={paidOrder} />
       <Route path="/completed-orders" component={completedOrder} />
       <Route path="/order-form" component={makeOrder}/>

       <Route path="/" component={enterUrl} />
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
     <Route path="/order-form" component={makeOrder}/>
     <Route path="/" component={enterUrl}/>
     </Switch>
   </div>
    </div>

  )
}


export default NavBar
