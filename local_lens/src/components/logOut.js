import React, { Component } from 'react';
import { updateMessage } from '../actions';
import { connect } from 'react-redux';
import {
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
      <a href="/"><Button bsStyle='primary' onClick={() => localStorage.removeItem('token')}>Log Out</Button></a>
    </div>
    <div>
    </div>
    </div>
  )
}
}


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
