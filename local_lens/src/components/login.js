import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar'
import { Link, Redirect } from 'react-router-dom';
import { updateMessage, loginUser } from '../actions';
import { connect } from 'react-redux';
import { Form,
         FormGroup,
         Col,
         ControlLabel,
         FormControl,
         Checkbox,
         Button,
         HelpBlock
 } from 'react-bootstrap';


class login extends Component {

  constructor(props) {
  super(props);
  this.state = {emailValue: '', passwordValue: ''};
  this.emailChange = this.emailChange.bind(this);
  this.passwordChange = this.passwordChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}


emailChange(event) {
   this.setState({emailValue: event.target.value});
 }

passwordChange(event) {
   this.setState({passwordValue: event.target.value});
 }

  handleSubmit(event) {
    console.log('here');
    event.preventDefault();
    this.props.loginUser(this.state.emailValue, this.state.passwordValue)
  }

  render () {
    if (this.props.loginMessage == 'you are now logged in') {
      return (
      <div>
        <Redirect to="/"/>
      </div>
    )
    }
  return (
     <div>
     <Form horizontal onSubmit={this.handleSubmit}>
  <FormGroup controlId="formHorizontalEmail">
    <Col componentClass={ControlLabel} sm={2}>
      Email
    </Col>
    <Col sm={4}>
      <FormControl value={this.state.emailValue} onChange={this.emailChange} type="email" placeholder="Email" />
    </Col>
  </FormGroup>

  <FormGroup controlId="formHorizontalPassword">
    <Col componentClass={ControlLabel} sm={2}>
      Password
    </Col>
    <Col sm={2}>
      <FormControl  value={this.state.passwordValue} onChange={this.passwordChange} type="password" placeholder="Password" />
    </Col>
  </FormGroup>
  <HelpBlock>{this.props.loginMessage}</HelpBlock>
  <FormGroup>
    <Col smOffset={0} sm={10}>
      <Button type="submit">login</Button>
    </Col>
  </FormGroup>
</Form>
   <a href='/password-recover'>forgot your password?</a>
    </div>
  )
}
}


const mapStateToProps = state => {
  console.log(state)
return {
  loginMessage: state.auth.loginMessage,
 };
};

export default connect(mapStateToProps, {
 updateMessage,
 loginUser
})(login);
