import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar'
import { updateMessage } from '../actions';
import { connect } from 'react-redux';
import enterUrl from './enterUrl';
import {
  Link,
  Switch,
  Route
} from 'react-router-dom'
import { Form,
         FormGroup,
         Col,
         ControlLabel,
         FormControl,
         Checkbox,
         Button
 } from 'react-bootstrap';


class logOut extends Component {


    constructor() {
      super();
      this.state = { show: false, secondshow: false };
    }

  render () {
  return (
     <div>
     <div style={logoutStyle}>
         <p>are you sure you want to logout?</p>
      <a href="/"><Button onClick={() => localStorage.removeItem('token')}>Log Out</Button></a>
    </div>
    <div>
    </div>
    </div>
  )
}
}

const divStyle = {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   textAlign: 'center'
};

const logoutStyle = {
   flex: 1,
   justifyContent: 'flex-start',
};

const mapStateToProps = state => {
  console.log(state)
return {
  message: state.auth.message,
 };
};

export default connect(mapStateToProps, {
 updateMessage
})(logOut);
