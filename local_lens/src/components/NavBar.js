import React from 'react';
import contact from './contact';
import login from './login';
import enterUrl from './enterUrl';
import logOut from './logOut';
import terms from './terms';
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
import styles from '../assets/styling.css';
import kab from './../assets/kabuto.png'
import kableft from './../assets/kabutoleft.png'
import name from './../assets/name.png'



const divStyle = {
   flex: 1,

   backgroundColor: '#ff4a83',
   color: '#f5f5f5'
};

let SITE_NAME = process.env.SITE_NAME
SITE_NAME = 'bitagora.co'

//const isMobile = window.innerWidth <= 500;

const NavBar = () => {

  if (localStorage.getItem('token')) {
    return (
       <div style={divStyle} >
         <Navbar style={{ backgroundColor: '#ff8bac', color: 'white'}}>
      <Navbar.Header>
        <a href="/"><img src={kableft} alt="kabuto" /></a>
        <Navbar.Brand>
          <a href="/"><img src={name} alt="kabuto" /></a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>

        <NavDropdown eventKey={3.1} title="Settings" id="basic-nav-dropdown" class="ndd">
          <MenuItem href="/change-password" eventKey={3.6}><b style={{ color: '#eec500'}}>change password</b></MenuItem>
          <MenuItem href="/change-email" eventKey={3.7}><b style={{ color: '#eec500'}}>change email</b></MenuItem>
          <MenuItem href="/addresses" eventKey={3.8}><b style={{ color: '#eec500'}}>addresses</b></MenuItem>
          <MenuItem href="/logOut" eventKey={3.2}><b style={{ color: '#eec500'}}>logout</b></MenuItem>
        </NavDropdown>
        <NavDropdown eventKey={3.1} title="Orders" id="basic-nav-dropdown" class="ndd">
         <MenuItem href="/" eventKey={3.5}><b style={{ color: '#eec500'}}>new order</b></MenuItem>
         <MenuItem href="/paid-orders" eventKey={3.7}><b style={{ color: '#eec500'}}>paid orders</b></MenuItem>
         <MenuItem href="/unpaid-orders" eventKey={3.6}><b style={{ color: '#eec500'}}>unpaid orders</b></MenuItem>
         <MenuItem href="/completed-orders" eventKey={3.2}><b style={{ color: '#eec500'}}>shipped orders</b></MenuItem>
        </NavDropdown>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={4} href="https://github.com/llennox/bitagoraAPI/blob/master/README.md">
          <b style={{ color: '#ffffff'}}>API</b>
        </NavItem>
        <NavItem eventKey={3} href="/contact">
          <b style={{ color: '#ffffff'}}>contact</b>
        </NavItem>
        <a href="http://pokepalettes.com/#kabuto"><img src={kab} alt="kabuto" /></a>
      </Nav>
    </Navbar>
     <div>
       <Switch>
       <Route path="/contact" component={contact} />

       <Route path="/logOut" component={logOut} />
       <Route path="/change-password" component={changePassword} />
       <Route path="/change-email" component={changeEmail} />
       <Route path="/addresses" component={addresses} />
       <Route path="/unpaid-orders" component={unpaidOrder} />
       <Route path="/paid-orders" component={paidOrder} />
       <Route path="/completed-orders" component={completedOrder} />
       <Route path="/order-form" component={makeOrder}/>
       <Route path="/terms" component={terms}/>
       <Route path="/" component={enterUrl} />
       </Switch>
     </div>
      </div>

    )
  }
  return (
     <div style={divStyle} >
       <Navbar style={{ backgroundColor: '#ff8bac', color: 'white'}}>

    <Navbar.Header>
      <a href="/"><img src={kableft} alt="kabuto" /></a>
      <Navbar.Brand style={{ color: '#4a2900' }}>
        <a href="/"><img src={name} alt="kabuto" /></a>
      </Navbar.Brand>
    </Navbar.Header>

    <Nav>
      <NavItem eventKey={1} href="/createAccount">
        <b style={{ color: '#ffffff'}}>create account</b>
      </NavItem>
      <NavItem eventKey={2} href="/login">
        <b style={{ color: '#ffffff'}}>login</b>
      </NavItem>

    </Nav>
    <Nav pullRight>
      <NavItem eventKey={4} href="https://github.com/llennox/bitagoraAPI/blob/master/README.md">
        <b style={{ color: '#ffffff'}}>API</b>
      </NavItem>
      <NavItem eventKey={3} href="/contact">
        <b style={{ color: '#ffffff'}}>contact</b>
      </NavItem>
        <a href="http://pokepalettes.com/#kabuto"><img src={kab} alt="kabuto" /></a>
    </Nav>
  </Navbar>
   <div>
     <Switch>
     <Route path="/contact" component={contact}/>
     <Route path="/login" component={login}/>
     <Route path="/createAccount" component={createAccount}/>
     <Route path="/password-recover" component={passwordRecover}/>
     <Route path="/order-form" component={makeOrder}/>
     <Route path="/terms" component={terms}/>
     <Route path="/" component={enterUrl}/>
     </Switch>
   </div>
    </div>

  )
}


export default NavBar
