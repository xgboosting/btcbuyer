import React, { Component, Text } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { updateMessage, sendCreateAccount } from '../actions';
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


class createAccount extends Component {

  constructor(props) {
  super(props);
  this.state = {emailValue: '', passwordValue: '', repeatPasswordValue: ''};
  this.emailChange = this.emailChange.bind(this);
  this.passwordChange = this.passwordChange.bind(this);
  this.repeatPasswordChange = this.repeatPasswordChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}


emailChange(event) {
   this.setState({emailValue: event.target.value});
 }

repeatPasswordChange(event) {
   this.setState({repeatPasswordValue: event.target.value});
 }

passwordChange(event) {
    this.setState({passwordValue: event.target.value});
  }


 handleSubmit(event) {
   console.log('here');
   event.preventDefault();
   if (this.state.repeatPasswordValue !== this.state.passwordValue) {
     this.props.updateMessage('passwords must match');
   } else if (this.state.repeatPasswordValue.length < 10) {
     this.props.updateMessage('password must be 10 characters');
   } else if (this.state.repeatPasswordValue == this.state.passwordValue && this.state.repeatPasswordValue.length > 10) {
      this.props.sendCreateAccount(this.state.emailValue, this.state.passwordValue)
   }
 }

 getRepeatState() {
   console.log(this.state)
  const length = this.state.repeatPasswordValue.length;
  if (length > 10 && this.state.passwordValue == this.state.repeatPasswordValue) return 'success';
  else if (length > 5) return 'error';
  else if (length > 0) return 'error';
  return null;
}

getState() {
 const length = this.state.passwordValue.length;
 if (length > 10) return 'success';
 else if (length > 5) return 'error';
 else if (length > 0) return 'error';
 return null;
}


  render () {
    if (localStorage.getItem('token')) {
      return (
        <p>{this.props.message}</p>
      )
    }
  return (

 <Form horizontal onSubmit={this.handleSubmit}>
  <FormGroup controlId="formHorizontalEmail">
    <Col componentClass={ControlLabel} sm={2}>
      Email
    </Col>
    <Col sm={4}>
      <FormControl value={this.state.emailValue} onChange={this.emailChange} type="email" placeholder="Email" />
    </Col>
  </FormGroup>

  <FormGroup controlId="formHorizontalPassword" validationState={this.getState()}>
    <Col componentClass={ControlLabel} sm={2}>
      Password
    </Col>
    <Col sm={2}>
      <FormControl value={this.state.passwordValue} onChange={this.passwordChange} type="password" placeholder="password" />
    </Col>
  </FormGroup>
  <FormGroup controlId="formHorizontalPassword1" validationState={this.getRepeatState()}>
    <Col componentClass={ControlLabel} sm={2}>
      Password
    </Col>
    <Col sm={2}>
      <FormControl value={this.state.repeatPasswordValue} onChange={this.repeatPasswordChange} type="password" placeholder="repeat password" />
    </Col>
  </FormGroup>
  <HelpBlock>{this.props.message}</HelpBlock>
  <FormGroup>
    <Col smOffset={0} sm={10}>
      <Button type="submit">Create account</Button>
    </Col>
  </FormGroup>
</Form>

  )
}
}


const mapStateToProps = state => {
  console.log(state)
return {
  message: state.auth.message,
 };
};

export default connect(mapStateToProps, {
 updateMessage,
 sendCreateAccount
})(createAccount);
