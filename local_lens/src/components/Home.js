import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FAQ from './FAQ';
import login from './login';
import NavBar from './NavBar';
import enterUrl from './enterUrl';
import createAccount from './createAccount';
import { connect } from 'react-redux';
import { getInitialState } from '../actions';
import { Form,
         FormGroup,
         Col,
         ControlLabel,
         FormControl,
         Checkbox,
         Button
 } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'


const divStyle = {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   textAlign: 'center'
};

const isMobile = window.innerWidth <= 500;

const Home = () => {

  if (isMobile) {
    return (
      <div>
    <NavBar />
    <Switch>
    <Route path="/faq" component={FAQ}/>
    <Route path="/login" component={login}/>
    <Route path="/createAccount" component={createAccount}/>
    <Route path="/" component={enterUrl}/>
    </Switch>
    </div>
    )
  }
  return (
    <div style={divStyle}>
  <NavBar />
  <Switch>
  <Route path="/faq" component={FAQ}/>
  <Route path="/login" component={login}/>
  <Route path="/createAccount" component={createAccount}/>
  <Route path="/" component={enterUrl}/>
  </Switch>
  </div>

  )

}



/*Hello.propTypes = {
 onClick: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired

}*/

export default Home;
