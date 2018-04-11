import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar'
import { Link, Redirect } from 'react-router-dom';
import { recoverPassword } from '../actions';
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


class passwordRecover extends Component {

  constructor(props) {
  super(props);
  this.state = {emailValue: ''};
  this.emailChange = this.emailChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}


emailChange(event) {
   this.setState({emailValue: event.target.value});
 }

  handleSubmit(event) {
    console.log('here');
    event.preventDefault();
    this.props.recoverPassword(this.state.emailValue)
  }

  render () {
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
  <HelpBlock>{this.props.recoverMessage}</HelpBlock>
  <FormGroup>
    <Col smOffset={0} sm={10}>
      <Button type="submit">send me a secret</Button>
    </Col>
  </FormGroup>
</Form>
    </div>
  )
}
}


const mapStateToProps = state => {
  console.log(state)
return {
  recoverMessage: state.auth.recoverMessage,
 };
};

export default connect(mapStateToProps, {
 recoverPassword
})(passwordRecover);